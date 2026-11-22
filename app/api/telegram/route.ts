import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { ALBUMS } from "@/lib/albums"

export const runtime = "nodejs"
export const maxDuration = 30

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || ""
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || ""
const ADMINS = (process.env.ADMIN_TELEGRAM_IDS || "").split(",").map((s) => s.trim()).filter(Boolean)
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const BUCKET = "site-media"

const HELP = `Sophina website bot

NEWS
• Send ONE photo with a caption:  Title | message
  (the date is added automatically)
• Text only:  /news Title | message
• /newslist  – last 5 news with numbers
• /deletenews 12  – remove news number 12

PHOTO ALBUMS
• /albums  – see all album names
• /album jss-1  – then send as many photos as you like (no caption)
• /done  – stop adding to that album
• One photo only: put #jss-1 as its caption
• /photos jss-1 5  – show the last 5 photos with their numbers
• /delete 101 102  – remove photos by number
• /clear jss-1 yes  – remove ALL photos of an album

STAFF
• Send a photo with caption:  #staff Mrs. Jane D. | Class Teacher
• /stafflist  – staff with numbers
• /deletestaff 7  – remove a staff member

Tip: send pictures as "Photo", not as "File".`

const albumLabel = (slug: string) => ALBUMS.find((a) => a.slug === slug)?.label

async function tg(method: string, body: Record<string, unknown>) {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return res.json()
}
const say = (chat_id: number, text: string) => tg("sendMessage", { chat_id, text: text.slice(0, 4000) })

async function sb(path: string, init: RequestInit = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`Database error: ${text.slice(0, 200)}`)
  return text ? JSON.parse(text) : []
}

// Copies the picture from Telegram into Supabase Storage and returns its public link.
async function savePhoto(file_id: string, folder: string) {
  const info = await tg("getFile", { file_id })
  const file_path: string | undefined = info?.result?.file_path
  if (!file_path) throw new Error("Telegram would not give me the picture. Please send it again.")
  const dl = await fetch(`https://api.telegram.org/file/bot${TOKEN}/${file_path}`)
  if (!dl.ok) throw new Error("Could not download the picture from Telegram.")
  const bytes = await dl.arrayBuffer()
  const ext = (file_path.split(".").pop() || "jpg").toLowerCase()
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const up = await fetch(`${SB_URL}/storage/v1/object/${BUCKET}/${name}`, {
    method: "POST",
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": ext === "png" ? "image/png" : "image/jpeg",
      "x-upsert": "true",
    },
    body: bytes,
  })
  if (!up.ok) throw new Error(`Could not store the picture: ${(await up.text()).slice(0, 150)}`)
  return `${SB_URL}/storage/v1/object/public/${BUCKET}/${name}`
}

async function removeStored(urls: string[]) {
  const prefix = `${SB_URL}/storage/v1/object/public/${BUCKET}/`
  const names = urls.filter((u) => u.startsWith(prefix)).map((u) => u.slice(prefix.length))
  if (names.length === 0) return
  await fetch(`${SB_URL}/storage/v1/object/${BUCKET}`, {
    method: "DELETE",
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prefixes: names }),
  })
}

function refreshSite() {
  try {
    revalidatePath("/")
    revalidatePath("/our-school")
  } catch {}
}

function parseNews(caption: string) {
  const text = caption.trim()
  if (text.includes("|")) {
    const i = text.indexOf("|")
    return { title: text.slice(0, i).trim(), body: text.slice(i + 1).trim() }
  }
  const lines = text.split("\n")
  return { title: lines[0].trim(), body: lines.slice(1).join("\n").trim() }
}

const nums = (s: string) => s.split(/[\s,]+/).map((x) => Number(x)).filter((n) => Number.isInteger(n) && n > 0)

async function handle(msg: any) {
  const chat = msg.chat.id as number
  const userId = String(msg.from?.id ?? "")
  if (!ADMINS.includes(userId)) {
    return say(chat, `Sorry, you are not allowed to use this bot.\nYour Telegram ID is ${userId}. Give it to the school ICT person to be added.`)
  }

  const raw: string = (msg.text ?? msg.caption ?? "").trim()
  const photo = msg.photo?.length ? msg.photo[msg.photo.length - 1] : null
  const when = new Date((msg.date ?? Date.now() / 1000) * 1000).toISOString()
  const lower = raw.toLowerCase()
  const [cmdRaw, ...restParts] = raw.split(/\s+/)
  const cmd = cmdRaw.toLowerCase().replace(/@\w+$/, "")
  const rest = raw.slice(cmdRaw.length).trim()
  void restParts

  // ---------- photo messages ----------
  if (photo) {
    // staff
    if (lower.startsWith("#staff")) {
      const { title: name, body: position } = parseNews(raw.replace(/^#staff/i, ""))
      if (!name) return say(chat, "Please write the caption like:  #staff Mrs. Jane D. | Class Teacher")
      const url = await savePhoto(photo.file_id, "staff")
      const [row] = await sb("site_staff", { method: "POST", body: JSON.stringify({ name, position, image_url: url }) })
      refreshSite()
      return say(chat, `Staff added (number ${row.id}): ${name}${position ? " - " + position : ""}\nTo remove: /deletestaff ${row.id}`)
    }
    // album with #slug caption
    const tag = raw.match(/^#([a-z0-9-]+)/i)
    if (tag) {
      const slug = tag[1].toLowerCase()
      if (!albumLabel(slug)) return say(chat, `I do not know the album "${slug}". Send /albums to see the names.`)
      const url = await savePhoto(photo.file_id, slug)
      const caption = raw.replace(/^#[a-z0-9-]+/i, "").trim() || null
      const [row] = await sb("site_photos", { method: "POST", body: JSON.stringify({ album: slug, image_url: url, caption }) })
      refreshSite()
      return say(chat, `Added to ${albumLabel(slug)} (photo number ${row.id}).`)
    }
    // news
    if (raw) {
      const { title, body } = parseNews(raw)
      const url = await savePhoto(photo.file_id, "news")
      const [row] = await sb("site_news", { method: "POST", body: JSON.stringify({ title, body, image_url: url, posted_at: when }) })
      refreshSite()
      return say(chat, `News posted (number ${row.id}): ${title}\nTo remove: /deletenews ${row.id}`)
    }
    // album mode (photos without caption)
    const state = await sb(`site_bot_state?chat_id=eq.${chat}&select=album`)
    const album: string | undefined = state[0]?.album
    if (!album) {
      return say(chat, "I received a picture but do not know where to put it.\nFirst send /album jss-1 (or another album name), or add a caption. Send /help for more.")
    }
    const url = await savePhoto(photo.file_id, album)
    const [row] = await sb("site_photos", { method: "POST", body: JSON.stringify({ album, image_url: url }) })
    refreshSite()
    return say(chat, `Added to ${albumLabel(album)} (photo number ${row.id}).`)
  }

  // ---------- text commands ----------
  switch (cmd) {
    case "/start":
    case "/help":
      return say(chat, HELP)

    case "/albums":
      return say(chat, "Album names (use the part before the dash):\n" + ALBUMS.map((a) => `${a.slug} - ${a.label}`).join("\n"))

    case "/album": {
      const slug = rest.toLowerCase()
      if (!albumLabel(slug)) return say(chat, "Please write the album name, e.g.  /album jss-1\nSend /albums to see all names.")
      await sb("site_bot_state?on_conflict=chat_id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify({ chat_id: chat, album: slug, updated_at: new Date().toISOString() }),
      })
      return say(chat, `OK. Photos you send now (without caption) go to: ${albumLabel(slug)}.\nSend /done when finished.`)
    }

    case "/done":
      await sb("site_bot_state?on_conflict=chat_id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify({ chat_id: chat, album: null, updated_at: new Date().toISOString() }),
      })
      return say(chat, "Done. I am no longer adding photos to an album.")

    case "/news": {
      if (!rest) return say(chat, "Write it like:  /news Title | message")
      const { title, body } = parseNews(rest)
      const [row] = await sb("site_news", { method: "POST", body: JSON.stringify({ title, body, posted_at: when }) })
      refreshSite()
      return say(chat, `News posted (number ${row.id}): ${title}\nTo remove: /deletenews ${row.id}`)
    }

    case "/newslist": {
      const rows = await sb("site_news?select=id,title,posted_at&active=eq.true&order=posted_at.desc&limit=5")
      if (!rows.length) return say(chat, "No news saved yet.")
      return say(chat, rows.map((r: any) => `${r.id}. ${r.title} (${r.posted_at.slice(0, 10)})`).join("\n"))
    }

    case "/deletenews": {
      const ids = nums(rest)
      if (!ids.length) return say(chat, "Write the number, e.g.  /deletenews 12")
      const rows = await sb(`site_news?id=in.(${ids.join(",")})`, { method: "DELETE" })
      await removeStored(rows.map((r: any) => r.image_url).filter(Boolean))
      refreshSite()
      return say(chat, rows.length ? `Removed ${rows.length} news item(s).` : "I could not find that number.")
    }

    case "/photos": {
      const [slug, n] = rest.toLowerCase().split(/\s+/)
      if (!albumLabel(slug)) return say(chat, "Write it like:  /photos jss-1 5")
      const count = Math.min(Math.max(Number(n) || 5, 1), 10)
      const rows = await sb(`site_photos?album=eq.${slug}&active=eq.true&select=id,image_url&order=created_at.desc,id.asc&limit=${count}`)
      if (!rows.length) return say(chat, `${albumLabel(slug)} has no photos.`)
      await say(chat, `Last ${rows.length} photos in ${albumLabel(slug)}. To remove: /delete <number>`)
      for (const r of rows) await tg("sendPhoto", { chat_id: chat, photo: r.image_url, caption: `Number ${r.id}` })
      return
    }

    case "/delete": {
      const ids = nums(rest)
      if (!ids.length) return say(chat, "Write the photo numbers, e.g.  /delete 101 102")
      const rows = await sb(`site_photos?id=in.(${ids.join(",")})`, { method: "DELETE" })
      await removeStored(rows.map((r: any) => r.image_url))
      refreshSite()
      return say(chat, rows.length ? `Removed ${rows.length} photo(s).` : "I could not find those numbers.")
    }

    case "/clear": {
      const [slug, confirm] = rest.toLowerCase().split(/\s+/)
      if (!albumLabel(slug)) return say(chat, "Write it like:  /clear jss-1 yes")
      const found = await sb(`site_photos?album=eq.${slug}&select=id`)
      if (confirm !== "yes") return say(chat, `${albumLabel(slug)} has ${found.length} photos. To delete ALL of them send:\n/clear ${slug} yes`)
      const rows = await sb(`site_photos?album=eq.${slug}`, { method: "DELETE" })
      await removeStored(rows.map((r: any) => r.image_url))
      refreshSite()
      return say(chat, `Removed all ${rows.length} photos from ${albumLabel(slug)}.`)
    }

    case "/stafflist": {
      const rows = await sb("site_staff?select=id,name,position&active=eq.true&order=sort_order.asc,id.asc")
      if (!rows.length) return say(chat, "No staff saved in the database yet (the website is showing its built-in list).")
      return say(chat, rows.map((r: any) => `${r.id}. ${r.name} - ${r.position}`).join("\n"))
    }

    case "/deletestaff": {
      const ids = nums(rest)
      if (!ids.length) return say(chat, "Write the number, e.g.  /deletestaff 7")
      const rows = await sb(`site_staff?id=in.(${ids.join(",")})`, { method: "DELETE" })
      await removeStored(rows.map((r: any) => r.image_url).filter(Boolean))
      refreshSite()
      return say(chat, rows.length ? `Removed ${rows.length} staff member(s).` : "I could not find that number.")
    }

    default:
      return say(chat, "I did not understand that. Send /help to see what I can do.")
  }
}

export async function POST(req: NextRequest) {
  if (!TOKEN || !SECRET || !SB_URL || !SB_KEY) {
    return NextResponse.json({ error: "Bot is not set up" }, { status: 500 })
  }
  if (req.headers.get("x-telegram-bot-api-secret-token") !== SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  let update: any
  try {
    update = await req.json()
  } catch {
    return NextResponse.json({ ok: true })
  }
  const msg = update.message // edited messages are ignored, so editing a caption never posts twice
  if (msg?.chat?.id) {
    try {
      await handle(msg)
    } catch (err: any) {
      try {
        await say(msg.chat.id, `Sorry, something went wrong: ${err?.message ?? "unknown error"}`)
      } catch {}
    }
  }
  // Always answer 200 so Telegram does not send the same message again
  return NextResponse.json({ ok: true })
}
