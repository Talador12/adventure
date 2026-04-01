-- User preferences — synced UI settings per authenticated user.
-- Keep this normalized so settings survive device changes and tab conflicts.

CREATE TABLE IF NOT EXISTS user_preferences (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  theme TEXT,
  active_theme TEXT,
  low_fx INTEGER,
  accent_color TEXT,
  locale TEXT,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

CREATE INDEX IF NOT EXISTS idx_user_preferences_updated_at ON user_preferences(updated_at);
