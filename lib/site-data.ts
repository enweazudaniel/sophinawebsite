// Reads the live content (news, photo albums, staff) that the Telegram bot saves in Supabase.
// If Supabase is not set up yet, every function returns null and the pages use their built-in content.
import { DEFAULTS } from "./content"
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function rest<T>(path: string): Promise<T | null> {
  if (!URL || !KEY) return null
  try {
    const res = await fetch(`${URL}/rest/v1/${path}`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export type NewsItem = { id: number; title: string; body: string; image_url: string | null; posted_at: string }
export type StaffItem = { id: number; name: string; position: string; image_url: string | null }

export async function getNews(limit = 6) {
  const rows = await rest<NewsItem[]>(
    `site_news?select=id,title,body,image_url,posted_at&active=eq.true&order=posted_at.desc&limit=${limit}`,
  )
  return rows && rows.length > 0 ? rows : null
}

export async function getAlbums() {
  const rows = await rest<{ album: string; image_url: string }[]>(
    "site_photos?select=album,image_url&active=eq.true&order=created_at.desc,id.asc&limit=3000",
  )
  if (!rows || rows.length === 0) return null
  const map: Record<string, string[]> = {}
  for (const r of rows) (map[r.album] ||= []).push(r.image_url)
  return map
}

export async function getStaff() {
  const rows = await rest<StaffItem[]>(
    "site_staff?select=id,name,position,image_url&active=eq.true&order=sort_order.asc,id.asc",
  )
  return rows && rows.length > 0 ? rows : null
}

export function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  })
}

// Texts, pictures and links edited from the bot (/set, /ticker, /youtube, #photo captions).
// c("key") gives the changed value, or the built-in text if it was never changed (or the database is unreachable).
export type Content = (key: string) => string

export async function getContent(): Promise<Content> {
  const rows = await rest<{ key: string; value: string }[]>("site_content?select=key,value")
  const changed = new Map((rows ?? []).map((r) => [r.key, r.value]))
  return (key) => {
    const v = changed.get(key)
    return v !== undefined && v.trim() !== "" ? v : (DEFAULTS[key] ?? "")
  }
}
