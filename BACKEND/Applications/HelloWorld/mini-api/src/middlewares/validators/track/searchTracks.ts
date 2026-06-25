import { z } from "zod";

export const searchTracksSchema = z.object({
  search: z.string().trim().optional(),
  // z.coerce.number() agafarà el string "180", el transformarà al número 180 
  // i finalment comprovarà si és un número vàlid.
  duration: z.coerce.number().optional(),
  sortBy: z.enum(["title", "duration"]).optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional()
});
