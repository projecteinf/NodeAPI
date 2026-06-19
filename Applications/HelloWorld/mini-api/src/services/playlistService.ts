import { getConnectionPool, sql } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import { BadRequestError } from "../types/error/custom/notFoundError";
import { CreatePlaylistInput } from "../types/playlist/createPlaylist";
import { PlayListDto } from "../types/playlist/playlistDTO";
import { ForbiddenError } from "../types/error/custom/forbiddenError";
import { NotFoundError } from "../types/error/custom/BadRequestError";
import { PlaylistTrackDto } from "../types/playlist/playlistTrackDTO";
import { AddTrackPlaylistInput } from "../types/playlist/addTrackPlaylist";
import { mapSqlRowsToPlaylistTrackDto } from "../mappers/playlistTrackMapper";
import { findTrackById } from "./trackService";



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

// Track management


async function verifyPlaylistOwnership(playlistId: string, userId: string): Promise<void> {
  const pool: ConnectionPool = await getConnectionPool();
  
  const playlist: IResult<{ userId: string }> = await pool
    .request()
    .input("id", sql.NVarChar(36), playlistId)
    .query<{ userId: string }>("SELECT userId FROM PlayLists WHERE Id = @id");

  if (playlist.recordset.length === 0) {
      throw new NotFoundError("The required play list does not exist");
  }
  
  if (playlist.recordset[0].userId !== userId) {
    throw new ForbiddenError("You are not authorized to add tracks to this play list")
  }
}

export async function getTracksPlayList(playlistId: string): Promise<PlaylistTrackDto> {
  const pool: ConnectionPool = await getConnectionPool();
  
  const playlist: IResult<{ trackTile: string, playListName: string, trackId:string, playListId: string, position: number }[]> = await pool
    .request()
    .input("playlistId", sql.NVarChar(36), playlistId)
    .query<{ trackTile: string, playListName: string, trackId:string, playListId: string, position: number }[]>(`
        SELECT T.title as trackTitle, P.Name as playlistName, T.id as trackId, P.id as playlistId, PT.position as position 
          FROM PlayLists as P inner join PlaylistTracks as PT on PT.playlistId = P.id inner join Tracks as T on T.id = PT.trackId 
          WHERE P.id = @playlistId order by position`);

  
  return mapSqlRowsToPlaylistTrackDto(playlist.recordset);
}

export async function addTrackPlaylist(input: AddTrackPlaylistInput, userId: string): Promise<PlaylistTrackDto> {
  const pool: ConnectionPool = await getConnectionPool();

  await verifyPlaylistOwnership(input.playlistId,userId);
  await findTrackById(input.trackId);
  
/*
En el disseny de programari hi ha un principi fonamental anomenat DRY (Don't Repeat Yourself), que diu que cada peça de coneixement o lògica dins d'un sistema ha de tenir una representació única. Si crees una funció nova només per comprovar si el track existeix, estaràs duplicant codi (la mateixa consulta SELECT, el mateix tractament de l'error, etc.).

Reutilitzar findTrackById té grans avantatges, especialment de cara a l'explicació amb els teus alumnes:
1. Reutilització de codi i manteniment

Si el dia de demà canvia la base de dades (per exemple, si el camp id passa a ser un altre tipus de dada, o si afegiu un control per no trobar tracks que hagin estat esborrats lògicament amb un deletedAt), només hauràs de modificar el codi a findTrackById. Si haguessis creat una funció a mida per a les carpetes, hauries de recordar-te d'anar a modificar els dos llocs.
2. Gestió d'errors centralitzada

Si la teva funció findTrackById ja està programada per llançar un NotFoundError quan el track no existeix, el teu nou servei de carpetes no ha de fer absolutament cap control d'errors extra. Simplement crides la funció i confies en el fet que, si l'ID és dolent, el programa tallarà l'execució i llançarà el 404 de manera automàtica.
*/


// Corregit el typo 'positioin' -> 'position'
  const insertResult: IResult<{ playlistId: string, trackId: string, position: number }> = await pool
    .request()
    .input("playlistId", sql.NVarChar(100), input.playlistId)
    .input("trackId", sql.NVarChar(500), input.trackId)
    // Corregit també aquí el typo del genèric
    .query<{ playlistId: string, trackId: string, position: number }>(`
        INSERT INTO PlaylistTracks (playlistId, trackId, position)
        OUTPUT INSERTED.playlistId, INSERTED.trackId, INSERTED.position
        VALUES (
            @playlistId, 
            @trackId, 
            (SELECT ISNULL(MAX(position), 0) + 1 FROM PlaylistTracks WHERE playlistId = @playlistId)
        );
    `);

  const playlistWithTracks:PlaylistTrackDto = await getTracksPlayList(input.playlistId);

  if (!playlistWithTracks) {
    throw new Error("Play list was created but could not be retrieved.");
  }

  return playlistWithTracks;
}
