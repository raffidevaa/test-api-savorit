/*
  Warnings:

  - Added the required column `account_id` to the `Recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipes" ADD COLUMN     "account_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
