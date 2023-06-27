/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Thread` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_CategoryToThread" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryToThread_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToThread_B_fkey" FOREIGN KEY ("B") REFERENCES "Thread" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Thread" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "postCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Thread_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Thread" ("createdAt", "creatorId", "id", "postCount", "title", "updatedAt") SELECT "createdAt", "creatorId", "id", "postCount", "title", "updatedAt" FROM "Thread";
DROP TABLE "Thread";
ALTER TABLE "new_Thread" RENAME TO "Thread";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToThread_AB_unique" ON "_CategoryToThread"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToThread_B_index" ON "_CategoryToThread"("B");
