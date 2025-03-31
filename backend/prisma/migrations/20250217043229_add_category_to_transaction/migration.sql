-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('SALES', 'REFUND', 'INVESTMENT', 'SUPPLIERS', 'OPERATING_COSTS', 'SALARIES', 'MARKETING', 'TAXES', 'EQUIPMENT', 'TRANSPORT', 'OTHER');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "category" "TransactionCategory" NOT NULL DEFAULT 'OTHER';
