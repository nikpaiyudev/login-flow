/*
  Warnings:

  - A unique constraint covering the columns `[emailId]` on the table `EmailVerification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailId` to the `EmailVerification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailVerification" ADD COLUMN     "emailId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerification_emailId_key" ON "EmailVerification"("emailId");
