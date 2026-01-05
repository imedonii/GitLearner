/*
  Warnings:

  - Added the required column `levelId` to the `UserLeasonProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserLeasonProgress" ADD COLUMN     "levelId" TEXT NOT NULL,
ALTER COLUMN "isCompleted" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "UserLeasonProgress" ADD CONSTRAINT "UserLeasonProgress_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
