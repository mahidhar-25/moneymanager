-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateTable
CREATE TABLE "LendingUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "LendingUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LendUserAccount" (
    "id" SERIAL NOT NULL,
    "principal" DOUBLE PRECISION NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "compounded" BOOLEAN NOT NULL,
    "noOfTimesAnnually" INTEGER NOT NULL,

    CONSTRAINT "LendUserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentTransaction" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    "principal" DOUBLE PRECISION NOT NULL,
    "interest" DOUBLE PRECISION NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LendingUser_username_key" ON "LendingUser"("username");

-- AddForeignKey
ALTER TABLE "LendingUser" ADD CONSTRAINT "LendingUser_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendUserAccount" ADD CONSTRAINT "LendUserAccount_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentTransaction" ADD CONSTRAINT "paymentTransaction_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentTransaction" ADD CONSTRAINT "paymentTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "LendUserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
