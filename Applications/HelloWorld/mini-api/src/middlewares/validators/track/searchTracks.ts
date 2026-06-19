import { z } from "zod";

export const searchTracksSchema = z.object({
  search: z.string().trim().optional(),
  // z.coerce.number() agafarà el string "180", el transformarà al número 180 
  // i finalment comprovarà si és un número vàlid.
  duration: z.coerce.number().optional()
});
