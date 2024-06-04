import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { TGenericErrorResponse } from "../interfaces/error";

const handlePrismaClientValidationError = (
  err: PrismaClientValidationError
): TGenericErrorResponse => {
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorDetails: {
      issue: err,
    },
  };
};

export default handlePrismaClientValidationError;
