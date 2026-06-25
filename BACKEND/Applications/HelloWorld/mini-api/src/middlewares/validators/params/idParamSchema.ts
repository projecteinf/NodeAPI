import { z } from "zod";

export const idParamSchema = z.object({
  id: z.uuid({
    message: "Id must be a valid UUID"
  })
});

