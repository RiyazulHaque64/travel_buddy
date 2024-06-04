export type TZodErrorIssue = {
  field: string | number;
  message: string;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorDetails: any;
};
