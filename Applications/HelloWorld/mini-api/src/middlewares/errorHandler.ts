import { NextFunction, Request, Response } from "express";
import { ErrorCode, ErrorResponse } from "../types/error/errorResponse";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  console.error(error);

  const response: ErrorResponse = {
    message: "Internal server error",
    code: ErrorCode.InternalServerError
  };

  return res.status(500).json(response);
}