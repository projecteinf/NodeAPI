export interface TrackDto {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  durationSeconds: number;
}