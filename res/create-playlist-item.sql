
CREATE TABLE IF NOT EXISTS playlist_item (
    id TEXT PRIMARY KEY,
    video_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    published_at TEXT NOT NULL
);
