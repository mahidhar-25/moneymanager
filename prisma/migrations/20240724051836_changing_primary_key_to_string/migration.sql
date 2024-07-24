/*
  Warnings:

  - You are about to drop the column `noOfTimesAnnually` on the `LendUserAccount` table. All the data in the column will be lost.
  - Added the required column `forNoOfYears` to the `LendUserAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LendUserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LendUserAccount" DROP COLUMN "noOfTimesAnnually",
ADD COLUMN     "forNoOfYears" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LendUserAccount" ADD CONSTRAINT "LendUserAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "LendingUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
