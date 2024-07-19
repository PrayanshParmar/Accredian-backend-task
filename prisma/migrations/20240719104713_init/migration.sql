-- CreateEnum
CREATE TYPE "Programs" AS ENUM ('program_in_product_managment', 'program_in_computer_science', 'program_in_data_science');

-- CreateTable
CREATE TABLE "Refer" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "program" "Programs" NOT NULL DEFAULT 'program_in_product_managment',

    CONSTRAINT "Refer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Refer_email_key" ON "Refer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Refer" ADD CONSTRAINT "Refer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
