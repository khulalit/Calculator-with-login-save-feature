/*
  Warnings:

  - Added the required column `result` to the `Calculation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calculation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "result" DECIMAL NOT NULL,
    CONSTRAINT "Calculation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calculation" ("expression", "id", "name", "userId") SELECT "expression", "id", "name", "userId" FROM "Calculation";
DROP TABLE "Calculation";
ALTER TABLE "new_Calculation" RENAME TO "Calculation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
