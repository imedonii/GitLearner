-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_levelId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "levelId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;
