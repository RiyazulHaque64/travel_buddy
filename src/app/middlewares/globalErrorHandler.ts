import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleDuplicateError from "../error/handleDuplicateError";
import handlePrismaClientValidationError from "../error/handlePrismaClientValidationError";
import handleZodError from "../error/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong!";
  let errorDetails = error;

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handlePrismaClientValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const simplifiedError = handleDuplicateError(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorDetails = simplifiedError.errorDetails;
    }
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
