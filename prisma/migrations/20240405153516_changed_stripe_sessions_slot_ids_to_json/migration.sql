/*
  Warnings:

  - Changed the type of `slotIds` on the `stripeSessions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "stripeSessions" DROP COLUMN "slotIds",
ADD COLUMN     "slotIds" JSONB NOT NULL;
