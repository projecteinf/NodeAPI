import { z } from "zod";

export const paramPlaylistSchema = z.object({
  idPlaylist: z.uuid({
    message: "Id of play list must be a valid UUID"
  }),
  idTrack: z.uuid({
    message: "Id of track must be a valid UUID"
  }),
});

