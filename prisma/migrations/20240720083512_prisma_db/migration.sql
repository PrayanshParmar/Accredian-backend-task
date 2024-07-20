/*
  Warnings:

  - Added the required column `name` to the `Refer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Refer_email_key";

-- AlterTable
ALTER TABLE "Refer" ADD COLUMN     "name" TEXT NOT NULL;
