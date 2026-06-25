import { z } from "zod";

export const createPlaylistkSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Play list name is required"
  }).max(200,{
    message: "Play list name max length is 200 characters"
  }),
  description: z.string().trim().max(500,{
    message: "Play list description max length is 500 characters"
  }).nullable().optional()
});
