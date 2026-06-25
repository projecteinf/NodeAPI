import { ErrorCode } from "../errorCode";
import { AppError } from "./appError";

export class ForbiddenError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.ForbiddenError) {
    super(message, 403, code);
  }
}