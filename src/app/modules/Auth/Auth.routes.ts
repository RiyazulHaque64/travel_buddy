import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./Auth.controller";
import { AuthValidations } from "./AuthValidation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser
);
router.post("/access-token", AuthControllers.getAccessToken);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword
);

export const AuthRoutes = router;
