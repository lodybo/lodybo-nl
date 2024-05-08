/*
  Warnings:

  - You are about to drop the `Spotify` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Spotify";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SpotifySettings" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SpotifySettings_key_key" ON "SpotifySettings"("key");
