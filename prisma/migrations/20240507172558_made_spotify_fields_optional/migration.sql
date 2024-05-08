-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spotify" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "authorizationToken" TEXT,
    "track" TEXT
);
INSERT INTO "new_Spotify" ("accessToken", "authorizationToken", "id", "refreshToken", "track") SELECT "accessToken", "authorizationToken", "id", "refreshToken", "track" FROM "Spotify";
DROP TABLE "Spotify";
ALTER TABLE "new_Spotify" RENAME TO "Spotify";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
