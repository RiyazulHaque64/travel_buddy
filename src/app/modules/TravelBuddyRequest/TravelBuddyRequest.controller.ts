import { Request } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { TravelBuddyRequestServices } from "./TravelBuddyRequest.service";

const sendTravelBuddyRequest = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const result = await TravelBuddyRequestServices.sendTravelBuddyRequest(
      req.params.tripId,
      req.body.userId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Travel buddy request sent successfully",
      data: result,
    });
  }
);

const getPotentialTravelBuddiesForSpecificTrip = catchAsync(
  async (req, res) => {
    const result =
      await TravelBuddyRequestServices.getPotentialTravelBuddiesForSpecificTrip(
        req.params.tripId
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Potential travel buddies retrieved successfully",
      data: result,
    });
  }
);

const respondTravelBuddyRequest = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const result = await TravelBuddyRequestServices.respondTravelBuddyRequest(
      req.user,
      req.params.buddyId,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Travel buddy request responded successfully",
      data: result,
    });
  }
);

export const TravelBuddyRequestControllers = {
  sendTravelBuddyRequest,
  getPotentialTravelBuddiesForSpecificTrip,
  respondTravelBuddyRequest,
};
