/*
  Warnings:

  - Added the required column `authorizationToken` to the `Spotify` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spotify" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refreshToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "authorizationToken" TEXT NOT NULL,
    "track" TEXT
);
INSERT INTO "new_Spotify" ("accessToken", "id", "refreshToken", "track") SELECT "accessToken", "id", "refreshToken", "track" FROM "Spotify";
DROP TABLE "Spotify";
ALTER TABLE "new_Spotify" RENAME TO "Spotify";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
