import { CreateTrackInput } from "../types/track/createTrack";
import { getConnectionPool, sql } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import { TrackDto } from "../types/track/trackDTO";
import { NotFoundError } from "../types/error/custom/BadRequestError";
import { SearchTracksInput } from "../types/track/searchTracks";

async function sqlSentence(query: SearchTracksInput, request:sql.Request): Promise<string> {
   
  
  let queryText:string = `SELECT id, title, durationSeconds as duration FROM Tracks WHERE 1=1`;

  if (query.search) {
    request.input("search", sql.NVarChar(200), `%${query.search}%`);
    queryText += ` AND title LIKE @search`; 
  }
  
  if (query.duration) {
    request.input("duration", sql.Int, query.duration);
    queryText += ` AND durationSeconds <= @duration`;     
  }

  let orderByColumn = "Tracks.title"; // Valor per defecte
  if (query.sortBy === "duration") {
    orderByColumn = "Tracks.durationSeconds";
  }

  const orderDirection = query.sortOrder === "DESC" ? "DESC" : "ASC";
  queryText += ` ORDER BY ${orderByColumn} ${orderDirection}`;

  const page = query.page || 1;
  const limit = query.limit || 10;
  const rowsToSkip = (page - 1) * limit;

  // Injectem els valors de la paginació com a paràmetres numèrics segurs
  request.input("offset", sql.Int, rowsToSkip);
  request.input("limit", sql.Int, limit);
  
  queryText += ` OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`;


  return queryText;
}

export async function getAllTracks(input: SearchTracksInput): Promise<TrackDto[]> {
  const pool:ConnectionPool = await getConnectionPool();
  const request:sql.Request = pool.request();

  
  const queryString:string = await sqlSentence(input,request);
  const result:IResult<TrackDto> = await request.query<TrackDto>(queryString);

  return result.recordset;
}

export async function findTrackById(
  id: string
): Promise<TrackDto | null> {
  const pool:ConnectionPool = await getConnectionPool();

  const result:IResult<TrackDto> = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .query<TrackDto>(`
      SELECT
        Tracks.id,
        Tracks.title,
        Artists.name AS artist,
        Albums.title AS album,
        Tracks.durationSeconds
      FROM Tracks
      INNER JOIN Artists ON Tracks.artistId = Artists.id
      LEFT JOIN Albums ON Tracks.albumId = Albums.id
      WHERE Tracks.id = @id;
    `);

  if ( result.recordset.length ==0 ) {
    throw new NotFoundError("Track does not exist");
  }

  return result.recordset[0] ?? null;
}

export async function createTrack(
  input: CreateTrackInput
): Promise<TrackDto> {
  const pool:ConnectionPool = await getConnectionPool();

  const insertResult:IResult<{ id: string }> = await pool
    .request()
    .input("title", sql.NVarChar(200), input.title)
    .input("artistId", sql.UniqueIdentifier, input.artistId)
    .input("albumId", sql.UniqueIdentifier, input.albumId ?? null)
    .input("durationSeconds", sql.Int, input.durationSeconds)
    .query<{ id: string }>(`
      INSERT INTO Tracks (title, artistId, albumId, durationSeconds)
      OUTPUT CONVERT(NVARCHAR(36), INSERTED.id) AS id
      VALUES (@title, @artistId, @albumId, @durationSeconds);
    `);

  const createdId:string = insertResult.recordset[0].id;

  const createdTrack:TrackDto | null = await findTrackById(createdId);

  if (!createdTrack) {
    throw new Error("Track was created but could not be retrieved.");
  }

  return createdTrack;
}

export async function updateTrack(
  id: string,
  input: CreateTrackInput
): Promise<TrackDto | null> {
  const pool:ConnectionPool = await getConnectionPool();

  const result = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .input("title", sql.NVarChar(200), input.title)
    .input("artistId", sql.UniqueIdentifier, input.artistId)
    .input("albumId", sql.UniqueIdentifier, input.albumId ?? null)
    .input("durationSeconds", sql.Int, input.durationSeconds)
    .query<{ affectedRows: number }>(`
      UPDATE Tracks
      SET
        title = @title,
        artistId = @artistId,
        albumId = @albumId,
        durationSeconds = @durationSeconds
      WHERE id = @id;

      SELECT @@ROWCOUNT AS affectedRows;
    `);

  const affectedRows:number = result.recordset[0]?.affectedRows ?? 0;

  if (affectedRows === 0) {
    return null;
  }

  return findTrackById(id);
}

export async function deleteTrack(id: string): Promise<boolean> {
  const pool = await getConnectionPool();

  const result:IResult<{affectedRows:number}> = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .query<{ affectedRows: number }>(`
      DELETE FROM Tracks
      WHERE id = @id;

      SELECT @@ROWCOUNT AS affectedRows;
    `);

  const affectedRows:number = result.recordset[0]?.affectedRows ?? 0;

  return affectedRows > 0;
}