import { UserRole } from "@prisma/client";
import { Router } from "express";
import { fileUploader } from "../../helper/fileUploader";
import auth from "../../middlewares/auth";
import { TripControllers } from "./Trip.controller";
import { TripValidations } from "./Trip.validation";

const router = Router();

router.post(
  "/trips",
  auth(UserRole.ADMIN, UserRole.USER),
  fileUploader.multipleUpload,
  (req, res, next) => {
    req.body = TripValidations.createTripValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    next();
  },
  TripControllers.createTrip
);

router.get("/trips", TripControllers.getTrips);

export const TripRoutes = router;
