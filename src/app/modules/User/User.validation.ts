import { z } from "zod";

const userDataValidationSchema = z.object({
  name: z.string({ required_error: "Name field is required" }),
  email: z
    .string({ required_error: "Email field is required" })
    .email({ message: "Email must be a valid email address" }),
  password: z.string({ required_error: "Password is required" }),
  profile: z.object({
    bio: z.string({ required_error: "Profile bio is required" }),
    age: z.number({ required_error: "Age is required" }),
  }),
});

const userDataUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name field is required" }).optional(),
    email: z
      .string({ required_error: "Email field is required" })
      .email({ message: "Email must be a valid email address" })
      .optional(),
    profile: z
      .object({
        bio: z.string({ required_error: "Profile bio is required" }).optional(),
        age: z.number({ required_error: "Age is required" }).optional(),
      })
      .optional(),
  }),
});

export const UserValidations = {
  userDataValidationSchema,
  userDataUpdateValidationSchema,
};
