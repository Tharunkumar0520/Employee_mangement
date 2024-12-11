/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Employee_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "DOJ" TEXT,
ADD COLUMN     "Department" TEXT,
ADD COLUMN     "Email" TEXT,
ADD COLUMN     "Employee_id" TEXT,
ADD COLUMN     "Name" TEXT,
ADD COLUMN     "Role" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_Employee_id_key" ON "User"("Employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
