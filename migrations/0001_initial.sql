-- Adventure D1 Schema — persistent relational storage for users, campaigns, parties, and chat.
-- KV remains for large blobs (characters, campaign game state). R2 for binary assets (maps, portraits).

-- Users — persistent identity, decoupled from auth provider
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,              -- UUID
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Auth providers — links Discord/Google/etc to a user (many-to-one)
CREATE TABLE IF NOT EXISTS auth_providers (
  provider TEXT NOT NULL,           -- 'discord', 'google'
  provider_user_id TEXT NOT NULL,   -- provider's user ID
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_username TEXT,
  provider_email TEXT,
  provider_avatar TEXT,             -- provider-specific avatar URL
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (provider, provider_user_id)
);
CREATE INDEX IF NOT EXISTS idx_auth_user ON auth_providers(user_id);

-- Campaigns — metadata only; game state (units, terrain, combat) stays in KV
CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,              -- room code (8-char UUID slug)
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  owner_id TEXT NOT NULL REFERENCES users(id),
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_campaign_owner ON campaigns(owner_id);

-- Party members — who is in each campaign, which character, and their role
CREATE TABLE IF NOT EXISTS party_members (
  campaign_id TEXT NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  character_id TEXT,                -- which character they're playing (nullable until selected)
  role TEXT NOT NULL DEFAULT 'player',  -- 'dm' or 'player'
  joined_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (campaign_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_party_user ON party_members(user_id);

-- Chat messages — persistent per campaign, loaded on page mount
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,              -- UUID
  campaign_id TEXT NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id TEXT,                     -- nullable for system messages
  username TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'chat', -- chat, roll, system, join, leave, dm_narrate, dm_npc, dm_action
  text TEXT NOT NULL,
  avatar_url TEXT,
  metadata TEXT,                    -- JSON for extra data (roll values, character names, NPC info, etc.)
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_chat_campaign ON chat_messages(campaign_id, created_at);
