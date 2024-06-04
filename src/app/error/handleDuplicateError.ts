import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TGenericErrorResponse } from "../interfaces/error";

const handleDuplicateError = (
  err: PrismaClientKnownRequestError
): TGenericErrorResponse => {
  const statusCode = 409;
  const message = "Duplicate Error";
  return {
    statusCode,
    message,
    errorDetails: err,
  };
};

export default handleDuplicateError;
