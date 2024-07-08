import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
import { ZodError } from "zod";

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  if (error instanceof ZodError) {
    const errorMessages = error.issues.map((issue) => issue.message);
    const uniqueMessages = [...new Set(errorMessages)];
    errorMessage = uniqueMessages.join(", ");
    statusCode = 400;
  }
  res.status(statusCode).json({ message: errorMessage });
};

export default errorHandler;
