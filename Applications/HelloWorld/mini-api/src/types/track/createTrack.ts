export interface CreateTrackInput {
  title: string;
  artistId: string;
  albumId?: string | null;
  durationSeconds: number;
};