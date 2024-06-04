import { UserRole } from "@prisma/client";
import { Router } from "express";
import { fileUploader } from "../../helper/fileUploader";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./User.controller";
import { UserValidations } from "./User.validation";

const router = Router();

router.post(
  "/register",
  fileUploader.singleUpload.single("file"),
  (req, res, next) => {
    req.body = UserValidations.userDataValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    next();
  },
  UserControllers.registerUser
);

router.get(
  "/profile",
  auth(UserRole.ADMIN, UserRole.USER),
  UserControllers.getUserProfile
);
router.put(
  "/profile",
  auth(),
  validateRequest(UserValidations.userDataUpdateValidationSchema),
  UserControllers.updateUserProfile
);

export const UserRoutes = router;
