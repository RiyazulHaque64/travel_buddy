import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserServices } from "./User.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const getUserProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await UserServices.getUserProfile(req.user);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User profile retrieved successfully",
      data: result,
    });
  }
);

const updateUserProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await UserServices.updateUserProfile(req.user, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

export const UserControllers = {
  registerUser,
  getUserProfile,
  updateUserProfile,
};
