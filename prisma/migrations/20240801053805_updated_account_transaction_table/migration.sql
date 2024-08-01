/*
  Warnings:

  - You are about to drop the column `TransactionDate` on the `paymentTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "paymentTransaction" DROP COLUMN "TransactionDate",
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
