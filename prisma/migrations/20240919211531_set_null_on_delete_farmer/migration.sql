-- DropForeignKey
ALTER TABLE "Farm" DROP CONSTRAINT "Farm_farmerId_fkey";

-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "farmerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE SET NULL ON UPDATE SET NULL;
