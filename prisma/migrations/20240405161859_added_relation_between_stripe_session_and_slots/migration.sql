/*
  Warnings:

  - You are about to drop the column `slotIds` on the `stripeSessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "slots" ADD COLUMN     "stripeSessionId" TEXT;

-- AlterTable
ALTER TABLE "stripeSessions" DROP COLUMN "slotIds";

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_stripeSessionId_fkey" FOREIGN KEY ("stripeSessionId") REFERENCES "stripeSessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
