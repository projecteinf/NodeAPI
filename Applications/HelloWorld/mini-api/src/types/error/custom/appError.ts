import { ErrorCode } from "../errorCode";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, code: ErrorCode) {
    super(message);
    
    // Assignem el prototip explícitament (requerit en algunes versions de TS en estendre Error)
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // Tots els Custom Errors de l'aplicació seran operacionals

    Error.captureStackTrace(this, this.constructor);
  }
}