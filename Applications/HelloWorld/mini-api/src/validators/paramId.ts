import { z } from "zod";

export const trackIdParamsSchema = z.object({
  id: z.uuid({
    message: "Track id must be a valid UUID"
  })
});