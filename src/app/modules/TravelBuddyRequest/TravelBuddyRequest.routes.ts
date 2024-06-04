import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { TravelBuddyRequestControllers } from "./TravelBuddyRequest.controller";
import { TravelBuddyRequestValidations } from "./TravelBuddyRequest.validation";

const router = Router();

router.post(
  "/trip/:tripId/request",
  auth(),
  validateRequest(
    TravelBuddyRequestValidations.sendTravelBuddyRequestValidationScheam
  ),
  TravelBuddyRequestControllers.sendTravelBuddyRequest
);

router.get(
  "/travel-buddies/:tripId",
  auth(),
  TravelBuddyRequestControllers.getPotentialTravelBuddiesForSpecificTrip
);

router.put(
  "/travel-buddies/:buddyId/respond",
  auth(),
  validateRequest(
    TravelBuddyRequestValidations.respondTravelBuddyRequestValidation
  ),
  TravelBuddyRequestControllers.respondTravelBuddyRequest
);

export const TravelBuddyRequestRoutes = router;
