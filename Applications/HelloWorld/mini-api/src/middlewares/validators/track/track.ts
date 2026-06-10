import { z } from "zod";

export const createTrackSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required"
  }),
  artistId: z.uuid({
    message: "Artist id must be a valid UUID"
  }),
  albumId: z
    .uuid({
      message: "Album id must be a valid UUID"
    })
    .nullable()
    .optional(),
  durationSeconds: z
    .number({
      message: "Duration must be a number"
    })
    .int({
      message: "Duration must be an integer"
    })
    .positive({
      message: "Duration must be greater than 0"
    })
});
