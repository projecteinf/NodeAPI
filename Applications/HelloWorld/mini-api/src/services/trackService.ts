import { CreateTrackInput } from "../types/track/createTrack";
import { TrackResponse } from "../types/track/trackResponse";
import { getConnectionPool, sql } from "../config/database";
import { ConnectionPool, IResult } from "mssql";

export async function getAllTracks(): Promise<TrackResponse[]> {
  const pool:ConnectionPool = await getConnectionPool();

  const result:IResult<TrackResponse> = await pool.request().query<TrackResponse>(`
    SELECT
      CONVERT(NVARCHAR(36), Tracks.id) AS id,
      title,
      artistid,
      albumid,
      durationSeconds
    FROM Tracks
    ORDER BY Tracks.title;
  `);

  return result.recordset;
}

export async function findTrackById(
  id: string
): Promise<TrackResponse | null> {
  const pool:ConnectionPool = await getConnectionPool();

  const result:IResult<TrackResponse> = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .query<TrackResponse>(`
      SELECT
        CONVERT(NVARCHAR(36), Tracks.id) AS id,
        title,
        artistid,
        albumid,
        durationSeconds
      FROM Tracks
      WHERE Tracks.id = @id;
    `);

  return result.recordset[0] ?? null;
}

export async function createTrack(
  input: CreateTrackInput
): Promise<TrackResponse> {
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

  const createdTrack:TrackResponse | null = await findTrackById(createdId);

  if (!createdTrack) {
    throw new Error("Track was created but could not be retrieved.");
  }

  return createdTrack;
}

export async function updateTrack(
  id: string,
  input: CreateTrackInput
): Promise<TrackResponse | null> {
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