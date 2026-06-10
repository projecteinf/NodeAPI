import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

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
      return res.status(400).json({
        message: "Invalid request data"
      });
    }

    next();
  };
}