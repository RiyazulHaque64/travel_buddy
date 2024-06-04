import { ZodError } from "zod";
import { TGenericErrorResponse, TZodErrorIssue } from "../interfaces/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const zodErrorIssues: TZodErrorIssue[] = err.issues.map((issue) => ({
    field: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  const statusCode = 400;
  const message = err.issues.map((issue) => issue.message).join(". ");
  return {
    statusCode,
    message,
    errorDetails: {
      issue: zodErrorIssues,
    },
  };
};

export default handleZodError;
