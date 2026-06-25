import { TrackInPlaylistDto } from "./trackInPlaylistDto";

export interface PlaylistTrackDto {
  playlistId: string;
  playlistName: string;
  playlistTracks: TrackInPlaylistDto[];
}