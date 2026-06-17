import { Router } from "express";

import { validate } from "../middlewares/validate";
import { getMeController, loginUserController, registerUserController } from "../controllers/authController";
import { createUserSchema } from "../middlewares/validators/user/user";
import { loginUserSchema } from "../middlewares/validators/user/loginUser";
import { authenticateJWT } from "../middlewares/authMiddleware";

export const authRouter = Router();

authRouter.post(
  "/",
  validate(createUserSchema, "body"),
  registerUserController
);

authRouter.post(
  "/login",
  validate(loginUserSchema, "body"),
  loginUserController
);

authRouter.get("/me", authenticateJWT, getMeController);
