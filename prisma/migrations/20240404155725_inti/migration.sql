-- CreateEnum
CREATE TYPE "Room" AS ENUM ('BLACK', 'WHITE');

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "room" "Room" NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);
