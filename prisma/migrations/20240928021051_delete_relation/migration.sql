/*
  Warnings:

  - You are about to drop the column `account_id` on the `Recipes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipes" DROP CONSTRAINT "Recipes_account_id_fkey";

-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "account_id";
