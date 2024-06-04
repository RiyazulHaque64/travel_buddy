import { z } from "zod";

const createTripValidationSchema = z.object({
  destination: z.string({ required_error: "Destination is required" }),
  startDate: z.string({ required_error: "Start Date is required" }),
  endDate: z.string({ required_error: "End Date is required" }),
  budget: z.number({
    invalid_type_error: "Budget amount must be a number",
    required_error: "Budget amount is required",
  }),
  activities: z.array(z.string({ required_error: "Activities is required" })),
  itinerary: z
    .array(
      z.object({
        date: z.string().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        activity: z.string().optional(),
      })
    )
    .optional(),
  description: z.string({ required_error: "Description is required" }),
  type: z.enum(["BUSINESS", "LUXURY", "STUDY", "FAMILY"]),
});

export const TripValidations = {
  createTripValidationSchema,
};
