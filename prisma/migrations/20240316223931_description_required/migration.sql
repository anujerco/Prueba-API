/*
  Warnings:

  - Made the column `description` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "book" ALTER COLUMN "description" SET NOT NULL;
