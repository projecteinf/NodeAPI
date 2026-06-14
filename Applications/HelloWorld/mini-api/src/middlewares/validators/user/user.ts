import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().trim().min(6, {
    message: "Username must be at least 6 characters long"
  }),
  email: z.email({
    message: "Invalid email address"
  }),
  password: z.string().trim().min(6, {
    message: "Password must be at least 8 characters long"
  }),
  });
