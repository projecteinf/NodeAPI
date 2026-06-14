import { Router } from "express";

import { validate } from "../middlewares/validate";
import { registerUserController } from "../controllers/authController";
import { createUserSchema } from "../middlewares/validators/user/user";

export const authRouter = Router();



authRouter.post(
  "/",
  validate(createUserSchema, "body"),
  registerUserController
);
