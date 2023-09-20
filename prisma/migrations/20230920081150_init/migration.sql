/*
  Warnings:

  - You are about to drop the column `userId` on the `Calculation` table. All the data in the column will be lost.
  - Added the required column `email` to the `Calculation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calculation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "result" DECIMAL NOT NULL,
    CONSTRAINT "Calculation_email_fkey" FOREIGN KEY ("email") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calculation" ("expression", "id", "name", "result") SELECT "expression", "id", "name", "result" FROM "Calculation";
DROP TABLE "Calculation";
ALTER TABLE "new_Calculation" RENAME TO "Calculation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
