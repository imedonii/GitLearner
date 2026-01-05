-- CreateTable
CREATE TABLE "UserLeasonProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "leasonId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCompleted" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserLeasonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLeasonProgress_userId_leasonId_key" ON "UserLeasonProgress"("userId", "leasonId");

-- AddForeignKey
ALTER TABLE "UserLeasonProgress" ADD CONSTRAINT "UserLeasonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLeasonProgress" ADD CONSTRAINT "UserLeasonProgress_leasonId_fkey" FOREIGN KEY ("leasonId") REFERENCES "Leasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
