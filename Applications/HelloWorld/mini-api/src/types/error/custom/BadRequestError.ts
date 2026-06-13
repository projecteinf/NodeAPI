import { ErrorCode } from "../errorCode";
import { AppError } from "./appError";

export class NotFoundError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.InternalServerError) {
    super(message, 404, code);
  }
}