import type { RequestHandler } from "express";
import { AppError } from "./AppError.js";

export const notFound: RequestHandler = (req, _res, next) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
};