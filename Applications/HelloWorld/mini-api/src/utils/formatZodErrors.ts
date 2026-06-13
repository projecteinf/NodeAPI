import { ZodError } from "zod";
import { ErrorDetail } from "../types/error/errorDetail";


export function formatZodErrors(error: ZodError): ErrorDetail[] {
  return error.issues.map((issue) => {
    return {
      field: issue.path.join(".") || "request",
      message: issue.message
    };
  });
}