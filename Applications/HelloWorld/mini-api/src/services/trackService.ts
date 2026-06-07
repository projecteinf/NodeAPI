import { CreateTrackInput } from "../types/track/createTrack";
import { TrackResponse } from "../types/track/trackResponse";
import { getConnectionPool, sql } from "../config/database";

export async function getAllTracks(): Promise<TrackResponse[]> {
  const pool = await getConnectionPool();

  const result = await pool.request().query<TrackResponse>(`
    SELECT
      CONVERT(NVARCHAR(36), Tracks.id) AS id,
      Tracks.title,
      Artists.name AS artist,
      Albums.title AS album,
      Tracks.durationSeconds
    FROM Tracks
    INNER JOIN Artists ON Tracks.artistId = Artists.id
    LEFT JOIN Albums ON Tracks.albumId = Albums.id
    ORDER BY Tracks.title;
  `);

  return result.recordset;
}

export async function findTrackById(
  id: string
): Promise<TrackResponse | null> {
  const pool = await getConnectionPool();

  const result = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .query<TrackResponse>(`
      SELECT
        CONVERT(NVARCHAR(36), Tracks.id) AS id,
        Tracks.title,
        Artists.name AS artist,
        Albums.title AS album,
        Tracks.durationSeconds
      FROM Tracks
      INNER JOIN Artists ON Tracks.artistId = Artists.id
      LEFT JOIN Albums ON Tracks.albumId = Albums.id
      WHERE Tracks.id = @id;
    `);

  return result.recordset[0] ?? null;
}

export async function createTrack(
  input: CreateTrackInput
): Promise<TrackResponse> {
  const pool = await getConnectionPool();

  const insertResult = await pool
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

  const createdId = insertResult.recordset[0].id;

  const createdTrack = await findTrackById(createdId);

  if (!createdTrack) {
    throw new Error("Track was created but could not be retrieved.");
  }

  return createdTrack;
}

export async function updateTrack(
  id: string,
  input: CreateTrackInput
): Promise<TrackResponse | null> {
  const pool = await getConnectionPool();

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

  const affectedRows = result.recordset[0]?.affectedRows ?? 0;

  if (affectedRows === 0) {
    return null;
  }

  return findTrackById(id);
}

export async function deleteTrack(id: string): Promise<boolean> {
  const pool = await getConnectionPool();

  const result = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .query<{ affectedRows: number }>(`
      DELETE FROM Tracks
      WHERE id = @id;

      SELECT @@ROWCOUNT AS affectedRows;
    `);

  const affectedRows = result.recordset[0]?.affectedRows ?? 0;

  return affectedRows > 0;
}