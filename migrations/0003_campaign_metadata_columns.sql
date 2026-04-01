-- Campaign metadata expansion for D1-backed campaign management.
-- Adds visibility/archive/password fields used by /api/campaigns endpoints.

ALTER TABLE campaigns ADD COLUMN visibility TEXT NOT NULL DEFAULT 'private';
ALTER TABLE campaigns ADD COLUMN archived INTEGER NOT NULL DEFAULT 0;
ALTER TABLE campaigns ADD COLUMN archived_at INTEGER;
ALTER TABLE campaigns ADD COLUMN password_hash TEXT;

CREATE INDEX IF NOT EXISTS idx_campaign_visibility_updated ON campaigns(visibility, updated_at);
CREATE INDEX IF NOT EXISTS idx_campaign_owner_archived ON campaigns(owner_id, archived, updated_at);
