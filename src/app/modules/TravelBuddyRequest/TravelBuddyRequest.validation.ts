import { z } from "zod";

const sendTravelBuddyRequestValidationScheam = z.object({
  body: z.object({
    userId: z.string({ required_error: "UserId must be required" }),
  }),
});

const respondTravelBuddyRequestValidation = z.object({
  body: z.object({
    tripId: z.string(),
    status: z.enum(["APPROVED"]),
  }),
});

export const TravelBuddyRequestValidations = {
  sendTravelBuddyRequestValidationScheam,
  respondTravelBuddyRequestValidation,
};
