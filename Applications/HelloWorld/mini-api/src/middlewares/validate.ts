import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { ErrorCode, ErrorResponse } from "../types/error/errorResponse";
import { formatZodErrors } from "../utils/formatZodErrors";

type RequestSource = "body" | "params" | "query";

export function validate(
  schema: ZodType,
  source: RequestSource
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const validationResult = schema.safeParse(req[source]);

    if (!validationResult.success) {
      const response: ErrorResponse = {
        message: "Invalid request data",
        code: ErrorCode.ValidationError,
        errors: formatZodErrors(validationResult.error)
      };

      return res.status(400).json(response);
    }

    if (source === "body") {
      req.body = validationResult.data;
    }

    if (source === "params") {
      req.params = validationResult.data  as Request["params"];
    }

    if (source === "query") {
      req.query = validationResult.data  as Request["query"];
    }

    next();
  };
}