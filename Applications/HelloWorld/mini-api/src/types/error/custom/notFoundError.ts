import { ErrorCode } from "../errorCode";
import { AppError } from "./appError";

export class BadRequestError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.ValidationError) {
    super(message, 400, code);
  }
}