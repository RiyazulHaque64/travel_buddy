import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Type a valid email address" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password must be required" }),
    newPassword: z.string({ required_error: "New password must be required" }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
