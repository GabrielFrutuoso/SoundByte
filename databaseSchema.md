Table users {
  id UUID [primary key]
  username varchar
  email varchar
  password varchar
  avatar varchar
  provider varchar
  created_at timestamp
  updated_at timestamp
}

Table songs {
  id UUID [primary key]
  title varchar
  artist varchar
  banner_src varchar
  song_URL varchar
  is_private boolean
  created_at timestamp
  updated_at timestamp
  user_UUID varchar
  genre_id id
}

Table playlists {
  id UUID [primary key]
  title varchar
  banner_src varchar
  is_private boolean
  created_at timestamp
  updated_at timestamp
}

table liked_songs {
  id UUID
  user_id UUID
  song_id UUID
}

table liked_playlists {
  id UUID
  user_id UUID
  playlist_id UUID
}

table playlist_songs {
  id UUID
  song_id UUID
  playlist_id UUID
}


table genres {
  id id
  title varchar
}

Ref: "liked_playlists"."user_id" < "users"."id"

Ref: "liked_playlists"."playlist_id" < "playlists"."id"

Ref: "liked_songs"."user_id" < "users"."id"

Ref: "liked_songs"."song_id" < "songs"."id"

Ref: "songs"."user_UUID" < "users"."id"

Ref: "genres"."id" < "songs"."genre_id"

Ref: "songs"."id" < "playlist_songs"."song_id"

Ref: "playlists"."id" < "playlist_songs"."playlist_id"