-- Sophina website: editable texts, pictures and links (changed from the Telegram bot).
-- Run this ONCE in the Supabase SQL editor. It is safe to run again.
-- (Do NOT run sophina_site_setup.sql again - it would list every photo twice.)

create table if not exists site_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;
drop policy if exists "public read content" on site_content;
create policy "public read content" on site_content for select using (true);
-- Only the bot (using the service key) can change it.
