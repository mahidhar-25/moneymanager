/*
  Warnings:

  - You are about to drop the column `interest` on the `paymentTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `paidDate` on the `paymentTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `principal` on the `paymentTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `paymentTransaction` table. All the data in the column will be lost.
  - Added the required column `accountStatus` to the `LendUserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('OPEN', 'CLOSE');

-- AlterTable
ALTER TABLE "LendUserAccount" ADD COLUMN     "accountStatus" "AccountStatus" NOT NULL;

-- AlterTable
ALTER TABLE "paymentTransaction" DROP COLUMN "interest",
DROP COLUMN "paidDate",
DROP COLUMN "principal",
DROP COLUMN "startDate",
ADD COLUMN     "TransactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
