import { NextFunction, Request, Response } from "express";
import { ErrorCode, ErrorResponse } from "../types/error/errorResponse";
import { AppError } from "../types/error/custom/appError";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  // 1. Si és un error operacional nostre, responem amb les seves dades
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      message: error.message,
      code: error.code
    };
    return res.status(error.statusCode).json(response);
  }

  // 2. Si l'error no és operational (bug, fallada de BD, etc.), fem log intern i responem 500
  console.error("💥 ERROR INESPERAT:", error);

  const response: ErrorResponse = {
    message: "Internal server error",
    code: ErrorCode.InternalServerError
  };

  return res.status(500).json(response);
}