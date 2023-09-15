-- CreateTable
CREATE TABLE "Spotify" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refreshToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "track" TEXT
);
