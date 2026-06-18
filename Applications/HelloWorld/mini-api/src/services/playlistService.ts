import { getConnectionPool, sql } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import { BadRequestError } from "../types/error/custom/notFoundError";
import { CreatePlaylistInput } from "../types/playlist/createPlaylist";
import { PlayListDto } from "../types/playlist/playlistDTO";
import { ForbiddenError } from "../types/error/custom/forbiddenError";
import { NotFoundError } from "../types/error/custom/BadRequestError";



export async function createPlaylist(input: CreatePlaylistInput, userId: string): Promise<PlayListDto> {
  const pool: ConnectionPool = await getConnectionPool();

  // Comprovar si l'usuari ja té una llista amb el mateix nom
    const playlistCheckName: IResult<{ id: string }> = await pool
    .request()
    .input("name", sql.NVarChar(256), input.name)
    .input("userId", sql.NVarChar(36), userId)
    .query<{ id: string }>("SELECT id FROM PlayLists WHERE userId = @userId and name = @name");

    if (playlistCheckName.recordset.length > 0) {
        throw new BadRequestError("A play list with this name already exists");
    }


  const insertResult: IResult<{ id: string, name: string }> = await pool
    .request()
    .input("name", sql.NVarChar(100), input.name)
    .input("description", sql.NVarChar(500), input.description)
    .input("userId", sql.NVarChar(255), userId)
    .query<{ id: string, name: string, description: string }>(`
      INSERT INTO Playlists (name, description, userId)
      OUTPUT CONVERT(NVARCHAR(36), INSERTED.id) AS id, INSERTED.name, INSERTED.description
      VALUES (@name, @description, @userId);
    `);

  const createdId:string = insertResult.recordset[0].id;

  const createdPlaylist:PlayListDto | null = await findPlayListById(createdId);

  if (!createdPlaylist) {
    throw new Error("Play list was created but could not be retrieved.");
  }

  return createdPlaylist;

}

export async function deletePlaylist(idPlaylist: string, userId: string): Promise<boolean> {
  const pool: ConnectionPool = await getConnectionPool();

  const requiredPlaylist: IResult<{ userId: string }> = await pool
    .request()
    .input("id", sql.NVarChar(36), idPlaylist)
    .query<{ userId: string }>("SELECT userId FROM PlayLists WHERE id = @id");

    if (requiredPlaylist.recordset.length == 0) {
        throw new NotFoundError("The requested play list does not exist");
    }

    
    if (requiredPlaylist.recordset[0].userId !== userId) {
      throw new ForbiddenError("You have no permissions to remove this playlist")
    }


    const result:IResult<{affectedRows:number}> = await pool
      .request()
      .input("id", sql.UniqueIdentifier, idPlaylist)
      .query<{ affectedRows: number }>(`
        DELETE FROM Playlists
        WHERE id = @id;

        SELECT @@ROWCOUNT AS affectedRows;
      `);

    const affectedRows:number = result.recordset[0]?.affectedRows ?? 0;    
    return affectedRows > 0;
}


export async function findPlayListById(
  id: string
): Promise<PlayListDto | null> {
  const pool:ConnectionPool = await getConnectionPool();

  const result:IResult<PlayListDto> = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .query<PlayListDto>(`
      SELECT
        id, name, description
      FROM Playlists
      WHERE id = @id;
    `);

  return result.recordset[0] ?? null;
}