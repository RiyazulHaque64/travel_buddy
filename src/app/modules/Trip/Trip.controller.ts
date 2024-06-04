import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { TripServices } from "./Trip.service";

const createTrip = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await TripServices.createTripIntoDB(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Trip created successfully",
      data: result,
    });
  }
);

const getTrips = catchAsync(async (req, res) => {
  const result = await TripServices.getTripsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Trips retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const TripControllers = {
  createTrip,
  getTrips,
};
