/*
  Warnings:

  - You are about to drop the column `description` on the `liked_playlists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "playlists" ADD COLUMN "description" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_liked_playlists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    CONSTRAINT "liked_playlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "liked_playlists_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "playlists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_liked_playlists" ("id", "playlist_id", "user_id") SELECT "id", "playlist_id", "user_id" FROM "liked_playlists";
DROP TABLE "liked_playlists";
ALTER TABLE "new_liked_playlists" RENAME TO "liked_playlists";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
