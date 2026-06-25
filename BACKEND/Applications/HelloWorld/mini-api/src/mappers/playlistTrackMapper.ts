import { PlaylistTrackDto } from "../types/playlist/playlistTrackDTO";
import { TrackInPlaylistDto } from "../types/playlist/trackInPlaylistDto";


export function mapSqlRowsToPlaylistTrackDto(rows: any[]): PlaylistTrackDto {
  if (!rows || rows.length === 0) {
    throw new Error("No data available to map");
  }

  const firstRow = rows[0];
  

  const playlistTrackDto: PlaylistTrackDto = {
    playlistId: firstRow.playlistId,
    playlistName: firstRow.playlistName,
    playlistTracks: rows.map((row): TrackInPlaylistDto => ({
      id: row.trackId,
      title: row.trackTitle,
      position: row.position
    }))
  };

  return playlistTrackDto;
}


