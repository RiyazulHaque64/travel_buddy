import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../error/apiError";
import { jwtHelpers } from "../../shared/jwtHelpers";
import prisma from "../../shared/prisma";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Email or password is invalid");
  }

  const jwtPayload = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  );

  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    accessToken,
    refreshToken,
  };
};

const getAccessToken = async (token: string) => {
  let decoded;
  try {
    decoded = jwtHelpers.verifyToken(
      token,
      config.jwt_refresh_secret as Secret
    );
  } catch (error) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
      status: UserStatus.ACTIVE,
    },
  });

  const jwtPayload = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

const changePasswordIntoDB = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email or password is invalid");
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return userData;
};

export const AuthServices = {
  loginUser,
  getAccessToken,
  changePasswordIntoDB,
};
