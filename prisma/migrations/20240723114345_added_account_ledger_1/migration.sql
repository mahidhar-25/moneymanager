/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `LendingUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LendingUser_name_key" ON "LendingUser"("name");
