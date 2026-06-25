import { z } from "zod";

export const addSongPlaylistSchema = z.object({
  playlistId: z.uuid({
      message: "Play list id must be a valid UUID"
    }),
  trackId: z.uuid({
      message: "Song id must be a valid UUID"
    })
});

