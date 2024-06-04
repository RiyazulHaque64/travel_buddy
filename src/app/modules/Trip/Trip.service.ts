import { Prisma } from "@prisma/client";
import { addHours, addMinutes, format } from "date-fns";
import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import pagination from "../../helper/pagination";
import { TCloudinaryResponse, TFiles } from "../../interfaces/file";
import prisma from "../../shared/prisma";
import { tripSearchableFields } from "./Trip.constant";

const createTripIntoDB = async (req: Request & { user?: any }) => {
  const user = req.user;
  const files = req.files as unknown as TFiles;
  const data = req.body;

  const { startDate, endDate, itinerary, ...remainingData } = data;
  console.log(itinerary);

  const modifiedItinerary = itinerary?.map(
    (item: {
      date: string;
      startTime: string;
      endTime: string;
      activity: string;
    }) => {
      const date = new Date(item.date);
      let startDateTime = new Date(
        addMinutes(
          addHours(
            format(date, "yyyy-MM-dd"),
            Number(item.startTime.split(":")[0])
          ),
          Number(item.startTime.split(":")[1])
        )
      );
      let endDateTime = new Date(
        addMinutes(
          addHours(
            format(date, "yyyy-MM-dd"),
            Number(item.endTime.split(":")[0])
          ),
          Number(item.endTime.split(":")[1])
        )
      );
      return {
        startDateTime,
        endDateTime,
        activity: item.activity,
      };
    }
  );
  console.log(modifiedItinerary);

  const thumbnailImageUrl: Object[] = [];
  const touristPlaceImageUrls: Object[] = [];

  if (files?.thumbnail) {
    for (let i = 0; i < files?.thumbnail?.length; i++) {
      const file = files?.thumbnail[i];
      const cloudinaryResponse = (await fileUploader.uploadToCloudinary(
        file
      )) as TCloudinaryResponse;
      thumbnailImageUrl.push(cloudinaryResponse.secure_url);
    }
  }
  if (files?.touristPlaceImage) {
    for (let i = 0; i < files?.touristPlaceImage?.length; i++) {
      const file = files?.touristPlaceImage[i];
      const cloudinaryResponse = (await fileUploader.uploadToCloudinary(
        file
      )) as TCloudinaryResponse;
      touristPlaceImageUrls.push(cloudinaryResponse.secure_url);
    }
  }
  const tripData = {
    ...remainingData,
    userId: user.id,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    thumbnail: thumbnailImageUrl[0],
    touristPlaceImage: touristPlaceImageUrls,
    itinerary: modifiedItinerary,
  };

  const result = await prisma.trip.create({
    data: tripData,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return result;
};

const getTripsFromDB = async (query: any) => {
  const {
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
    minBudget,
    maxBudget,
    ...remainingQuery
  } = query;

  const { pageNumber, limitNumber, skip, sortWith, orderBy } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.TripWhereInput[] = [];
  const whereConditions = { AND: andConditions };

  if (searchTerm) {
    andConditions.push({
      OR: tripSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (minBudget) {
    andConditions.push({
      budget: {
        gte: Number(minBudget),
      },
    });
  }

  if (maxBudget) {
    andConditions.push({
      budget: {
        lte: Number(maxBudget),
      },
    });
  }

  if (remainingQuery && Object.keys(remainingQuery).length) {
    Object.keys(remainingQuery).forEach((key) => {
      andConditions.push({
        [key]: remainingQuery[key],
      });
    });
  }

  const result = await prisma.trip.findMany({
    where: whereConditions,
    skip: skip,
    take: limitNumber,
    orderBy: {
      [sortWith]: orderBy,
    },
  });

  const total = await prisma.trip.count({
    where: whereConditions,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

export const TripServices = {
  createTripIntoDB,
  getTripsFromDB,
};
