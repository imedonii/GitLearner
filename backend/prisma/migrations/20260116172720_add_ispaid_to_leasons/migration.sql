-- CreateEnum
CREATE TYPE "TipType" AS ENUM ('warning', 'pro', 'do', 'dont');

-- AlterTable
ALTER TABLE "Leasons" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "GitCommandCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GitCommandCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitCommand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "syntax" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "whenToUse" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "isCommon" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GitCommand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tip" (
    "id" TEXT NOT NULL,
    "type" "TipType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GitCommandCategory_name_key" ON "GitCommandCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GitCommand_name_key" ON "GitCommand"("name");

-- AddForeignKey
ALTER TABLE "GitCommand" ADD CONSTRAINT "GitCommand_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GitCommandCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
