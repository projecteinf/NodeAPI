import { ErrorCode } from "../errorCode";
import { AppError } from "./appError";

export class UnauthorizedError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.InvalidCredentials) {
    super(message, 401, code);
  }
}