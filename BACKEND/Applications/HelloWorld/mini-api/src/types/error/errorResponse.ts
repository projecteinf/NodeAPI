import { ErrorCode } from "./errorCode";
import { ErrorDetail } from "./errorDetail";

export interface ErrorResponse {
  message: string;
  code: ErrorCode;
  errors?: ErrorDetail[];
}

export { ErrorCode };
