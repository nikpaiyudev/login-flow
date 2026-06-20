-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "User"("emailId");
