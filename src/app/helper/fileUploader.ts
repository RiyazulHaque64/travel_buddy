import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import path from "path";
import { TCloudinaryResponse, TFile } from "../interfaces/file";

// cloudinary configuration
cloudinary.config({
  cloud_name: "db2nfoquk",
  api_key: "569376137322245",
  api_secret: "fLh0BNcJaxhHd1GUzhijTxtk8-E",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multipleUpload = multer({ storage: storage }).fields([
  {
    name: "thumbnail",
    maxCount: 10,
  },
  {
    name: "touristPlaceImage",
    maxCount: 10,
  },
]);

const singleUpload = multer({ storage: storage });

// Cloudinary
const uploadToCloudinary = async (
  file: TFile
): Promise<TCloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: TCloudinaryResponse) => {
        fs.unlink(file.path, () => {});
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  multipleUpload,
  singleUpload,
  uploadToCloudinary,
};
