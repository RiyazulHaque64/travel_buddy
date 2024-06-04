import bcrypt from "bcrypt";
import { Request } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../error/apiError";
import { fileUploader } from "../../helper/fileUploader";
import prisma from "../../shared/prisma";
import { IUserInput } from "./User.interface";

const registerUserIntoDB = async (req: Request) => {
  const data = req.body;
  const file = req.file;
  if (file) {
    const cloudinaryResponse = await fileUploader.uploadToCloudinary(file);
    data.profile.profileImg = cloudinaryResponse?.secure_url;
  }
  const { name, email, password, profile } = data;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.salt_rounds)
  );
  const userData = {
    name,
    email,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    const profileData = {
      userId: createdUserData.id,
      bio: profile.bio,
      age: profile.age,
      profileImg: profile.profileImg,
    };
    await transactionClient.userProfile.create({
      data: profileData,
    });
    return {
      id: createdUserData.id,
      name: createdUserData.name,
      email: createdUserData.email,
      createdAt: createdUserData.createdAt,
      updatedAt: createdUserData.updatedAt,
    };
  });
  return result;
};

const getUserProfile = async (user: JwtPayload) => {
  const result = await prisma.userProfile.findUniqueOrThrow({
    where: {
      userId: user.id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  });
  return result;
};

const updateUserProfile = async (
  user: JwtPayload,
  data: Partial<IUserInput>
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    include: {
      userProfile: true,
    },
  });
  const { name, email, password, profile } = data;
  let result = null;
  if (password) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cann't update the password");
  }
  if (name || email) {
    result = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  if (profile) {
    const updatedProfileData = await prisma.userProfile.update({
      where: {
        id: userData.userProfile?.id,
      },
      data: profile,
      include: {
        user: true,
      },
    });
    if (!result) {
      result = {
        id: updatedProfileData.user.id,
        name: updatedProfileData.user.name,
        email: updatedProfileData.user.email,
        createdAt: updatedProfileData.user.createdAt,
        updatedAt: updatedProfileData.user.updatedAt,
      };
    }
  }
  return result;
};

export const UserServices = {
  registerUserIntoDB,
  getUserProfile,
  updateUserProfile,
};
