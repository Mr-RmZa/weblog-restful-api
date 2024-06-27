/*
  Warnings:

  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `expiresAt`,
    DROP COLUMN `otp`,
    ADD COLUMN `password` VARCHAR(191) NULL;
