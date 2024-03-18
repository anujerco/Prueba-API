-- CreateTable
CREATE TABLE "requestLog" (
    "id" SERIAL NOT NULL,
    "method" VARCHAR NOT NULL,
    "url" VARCHAR NOT NULL,
    "requestTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requestLog_pkey" PRIMARY KEY ("id")
);
