/*
  Warnings:

  - The primary key for the `LendUserAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LendingUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `paymentTransaction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "paymentTransaction" DROP CONSTRAINT "paymentTransaction_accountId_fkey";

-- AlterTable
ALTER TABLE "LendUserAccount" DROP CONSTRAINT "LendUserAccount_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "LendUserAccount_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LendUserAccount_id_seq";

-- AlterTable
ALTER TABLE "LendingUser" DROP CONSTRAINT "LendingUser_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "LendingUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LendingUser_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "paymentTransaction" DROP CONSTRAINT "paymentTransaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "accountId" SET DATA TYPE TEXT,
ADD CONSTRAINT "paymentTransaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "paymentTransaction_id_seq";

-- AddForeignKey
ALTER TABLE "paymentTransaction" ADD CONSTRAINT "paymentTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "LendUserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
