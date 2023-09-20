/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calculation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "result" DECIMAL NOT NULL,
    CONSTRAINT "Calculation_email_fkey" FOREIGN KEY ("email") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calculation" ("email", "expression", "id", "name", "result") SELECT "email", "expression", "id", "name", "result" FROM "Calculation";
DROP TABLE "Calculation";
ALTER TABLE "new_Calculation" RENAME TO "Calculation";
CREATE TABLE "new_User" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "password") SELECT "createdAt", "email", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
