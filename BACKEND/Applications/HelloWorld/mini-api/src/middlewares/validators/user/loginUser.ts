import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.email({
    message: "Invalid email address"
  }),
  password: z.string().trim().min(1, {
    message: "Password is required"
  })
});
