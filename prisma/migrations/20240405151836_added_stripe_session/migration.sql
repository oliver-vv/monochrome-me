-- CreateTable
CREATE TABLE "stripeSessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "slotIds" TEXT[],
    "processed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "stripeSessions_pkey" PRIMARY KEY ("id")
);
