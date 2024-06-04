import { TravelBuddyRequestStatus } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../error/apiError";
import prisma from "../../shared/prisma";

const sendTravelBuddyRequest = async (tripId: string, userId: string) => {
  await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
  });
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
  const result = await prisma.travelBuddyRequest.create({
    data: {
      tripId,
      userId,
    },
  });
  return result;
};

const getPotentialTravelBuddiesForSpecificTrip = async (tripId: string) => {
  await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
  });

  const result = await prisma.travelBuddyRequest.findMany({
    where: {
      tripId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return result;
};

const respondTravelBuddyRequest = async (
  user: JwtPayload,
  buddyId: string,
  payload: { tripId: string; status: TravelBuddyRequestStatus }
) => {
  if (user.id === buddyId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You cann't respond to your own request"
    );
  }
  const travelBuddyRequest = await prisma.travelBuddyRequest.findFirst({
    where: {
      userId: buddyId,
      tripId: payload.tripId,
      status: TravelBuddyRequestStatus.PENDING,
    },
  });
  if (!travelBuddyRequest) {
    throw new ApiError(httpStatus.NOT_FOUND, "Buddy has no request available");
  }
  const result = await prisma.travelBuddyRequest.update({
    where: {
      id: travelBuddyRequest.id,
    },
    data: {
      status: TravelBuddyRequestStatus.APPROVED,
    },
  });
  return result;
};

export const TravelBuddyRequestServices = {
  sendTravelBuddyRequest,
  getPotentialTravelBuddiesForSpecificTrip,
  respondTravelBuddyRequest,
};
