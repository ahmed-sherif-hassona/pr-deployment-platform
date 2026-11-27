import type { RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../errors/AppError.js";

export const validate = (schema: z.ZodType): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      next(new AppError(400, result.error.issues.map((issue) => issue.message).join(", ")));

      return;
    }

    next();
  };
};
