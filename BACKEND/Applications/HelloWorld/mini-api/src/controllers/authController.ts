import { NextFunction, Request, Response } from "express";

import { UserDto } from "../types/user/userDTO";
import { loginUser, profileUser, registerUser } from "../services/userService";


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

export async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
     
  try {
    const authData: { token: string, user: UserDto } = await loginUser(req.body);

    return res.status(201).json(authData);
   } catch (error) {
        next(error);
    }
}

export async function getMeController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
     
  try {
    const authData: { text: string } = await profileUser(req.body);

    return res.status(200).json(authData);
   } catch (error) {
        next(error);
    }
}