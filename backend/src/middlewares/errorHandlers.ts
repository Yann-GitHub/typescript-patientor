import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    console.log("ZodError detected:", error.errors);
    res.status(400).json({ error: "Validation failed", details: error.errors });
  } else if (error instanceof Error) {
    console.log("Standard Error detected:", error.message);
    res.status(500).json({ error: error.message });
  } else {
    console.log("Unknown error type:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default errorMiddleware;
