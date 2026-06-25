import { ErrorCode } from "../errorCode";
import { AppError } from "./appError";

export class NotFoundError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.NotFound) {
    super(message, 404, code);
  }
}