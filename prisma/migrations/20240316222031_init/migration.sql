-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "author" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);
