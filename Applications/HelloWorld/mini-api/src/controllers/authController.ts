import { NextFunction, Request, Response } from "express";

import { UserDto } from "../types/user/userDTO";
import { registerUser } from "../services/userService";


export async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
     
  try {
    const createdUser: UserDto = await registerUser(req.body);

    return res.status(201).json(createdUser);
   } catch (error) {
        next(error);
    }
}
