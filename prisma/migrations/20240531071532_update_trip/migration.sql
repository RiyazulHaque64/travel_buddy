/*
  Warnings:

  - Added the required column `description` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TripType" AS ENUM ('BUSINESS', 'LUXURY', 'STUDY', 'FAMILY');

-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "itinerary" JSONB[],
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "touristPlaceImage" TEXT[],
ADD COLUMN     "type" "TripType" NOT NULL;
