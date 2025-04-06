-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_liked_playlists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    CONSTRAINT "liked_playlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "liked_playlists_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "playlists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_liked_playlists" ("id", "playlist_id", "user_id") SELECT "id", "playlist_id", "user_id" FROM "liked_playlists";
DROP TABLE "liked_playlists";
ALTER TABLE "new_liked_playlists" RENAME TO "liked_playlists";
CREATE TABLE "new_playlist_songs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "song_id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    CONSTRAINT "playlist_songs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "playlist_songs_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "playlists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_playlist_songs" ("id", "playlist_id", "song_id") SELECT "id", "playlist_id", "song_id" FROM "playlist_songs";
DROP TABLE "playlist_songs";
ALTER TABLE "new_playlist_songs" RENAME TO "playlist_songs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
