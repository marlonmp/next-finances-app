/*
  Warnings:

  - You are about to drop the column `frecuancy` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `frecuency_type` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `type` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "transactiontype" AS ENUM ('income', 'expense');

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "frecuancy",
DROP COLUMN "frecuency_type",
ADD COLUMN     "type" "transactiontype" NOT NULL;

-- DropEnum
DROP TYPE "frecuency";

-- DropEnum
DROP TYPE "frecuencytype";
