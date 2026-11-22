# Sophina website - Telegram bot (news, photos, staff)

With the bot you update the website from your phone. No coding, no GitHub.

## One-time setup (about 20 minutes)

1. **Create the bot.** In Telegram open **@BotFather** > send `/newbot` > give it a name (e.g. "Sophina Website Admin") > copy the **token** it gives you.
2. **Create the tables.** In Supabase open **SQL Editor** > paste everything from `supabase/sophina_site_setup.sql` > Run.
   (Run it only once. It also lists all current website photos and staff so the bot can manage them.)
3. **Add the keys on Vercel** (Project > Settings > Environment Variables). Use the names in `.env.example`.
   You need: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
   `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET` (make up a long random word) and `ADMIN_TELEGRAM_IDS` (step 5).
4. **Deploy** the website, then connect the bot to it by opening this link once in your browser
   (replace the three parts in capitals):
   `https://api.telegram.org/botYOURTOKEN/setWebhook?url=https://YOURWEBSITE/api/telegram&secret_token=YOURWEBHOOKSECRET`
   It should answer `"ok":true`.
5. **Find your Telegram number.** Send any message to your bot. It replies "not allowed" and shows *Your Telegram ID is ...*.
   Put that number in `ADMIN_TELEGRAM_IDS` (more people: separate with commas, e.g. `111,222`) and **redeploy** on Vercel.

Keep the bot token and the service key private. Only people in `ADMIN_TELEGRAM_IDS` can change the website.

## Everyday use (send /help in the bot any time)

| You want to... | Send |
|---|---|
| Post news with a picture | One photo with caption `Title | message` (the date is added automatically) |
| Post news without a picture | `/news Title | message` |
| See / remove news | `/newslist` then `/deletenews 12` |
| See album names | `/albums` |
| Add many photos to a class or event | `/album jss-1` then send photos (no caption), then `/done` |
| Add one photo | Photo with caption `#jss-1` |
| See the newest photos of an album | `/photos jss-1 5` |
| Remove photos | `/delete 101 102` |
| Remove all photos of an album (e.g. students left) | `/clear jss-1 yes` |
| Add a staff member | Photo with caption `#staff Mrs. Jane D. | Class Teacher` |
| See / remove staff | `/stafflist` then `/deletestaff 7` |

### Change the website's text, logo, video and links

| You want to... | Send |
|---|---|
| See which pages you can edit | `/content` |
| See every text/picture on a page (names shown) | `/content home` (also `about`, `our-school`, `apply`, `menu`, `seo`, `site`) |
| Change a text | `/set welcome-title Your new heading` |
| Change the scrolling message | `/ticker Fees are due on Monday` (hide it: `/ticker off`) |
| Change the welcome video | `/youtube https://youtu.be/xxxxxxxxxxx` |
| Change the school logo or any picture | One photo with caption `#logo` (or `#mission-image`, `#feature1-image`, `#apply-hero-image` ...) |
| Change phone, email, address, social links | `/set phone-1 0803...`, `/set email ...`, `/set address-1 ...`, `/set instagram https://...` |
| Rename a menu item or change a CBT / E-Learning / Results button | `/set nav-admissions Apply Here`, `/set portal1-label Exams`, `/set portal1-link https://...` |
| Change what Google and WhatsApp show | `/set seo-about-title ...`, `/set seo-about-description ...`, photo caption `#seo-share-image` |
| Go back to the original | `/reset logo` (use the same name) |

Texts you have changed are marked with a star `*` in `/content home`. Names are shown in `/content`; they never contain spaces.
Class photos and staff are still managed with the albums and `#staff` commands above.

### One-time step when you add this feature
In Supabase open **SQL Editor** > paste everything from `supabase/site_content.sql` > Run. (Do not run `sophina_site_setup.sql` again.)

Album `home-hero` is the big slideshow on the home page. Send pictures as **Photo**, not as File.
A class with no photos is hidden on the website, and SS 1 - SS 3 appear as soon as you add their first photo.
The website refreshes by itself within a minute.
