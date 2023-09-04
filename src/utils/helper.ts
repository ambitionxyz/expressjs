import { Response } from "express";
export function sendError(res: Response, error: string, statusCode = 401) {
  return res.status(statusCode).json({ error });
}
