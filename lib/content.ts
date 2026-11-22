// Every piece of the website that can be changed from the Telegram bot.
// "default" is what the website shows until you change it. /reset <name> brings the default back.
export type FieldType = "text" | "image" | "youtube" | "link"
export type Field = { key: string; label: string; page: string; type: FieldType; default: string }

export const PAGES: { slug: string; label: string }[] = [
  { slug: "site", label: "Whole website (logo, phone, email, address, social links)" },
  { slug: "home", label: "Home page" },
  { slug: "about", label: "Mission & Vision page" },
  { slug: "our-school", label: "Our School page" },
  { slug: "apply", label: "Admissions / Apply page" },
  { slug: "menu", label: "Menu names and the CBT / E-Learning / Results buttons" },
  { slug: "seo", label: "Google and sharing (page titles, descriptions, share picture)" },
]

const f = (page: string, key: string, type: FieldType, label: string, def: string): Field => ({
  key,
  label,
  page,
  type,
  default: def,
})

export const FIELDS: Field[] = [
  // ---------- whole website ----------
  f("site", "logo", "image", "School logo (top of every page)", "https://i.ibb.co/Kv2kM0c/photo-2023-08-07-14-24-24.jpg"),
  f("site", "phone-1", "text", "Phone number 1", "07038046878"),
  f("site", "phone-2", "text", "Phone number 2", "08027446756"),
  f("site", "email", "text", "Email address", "sophina4christ@gmail.com"),
  f("site", "address-1", "text", "Address line 1", "Off Polytechnic Road"),
  f("site", "address-2", "text", "Address line 2", "Ogwashi-Uku, Delta State, 320109"),
  f("site", "youtube-channel", "link", "YouTube channel link (footer)", "https://youtube.com/@sophinaschool?si=mzLE2jOaDnTWtgKJ"),
  f("site", "instagram", "link", "Instagram link (footer)", "https://www.instagram.com/sophinaschool"),
  f("site", "tiktok", "link", "TikTok link (footer)", "https://www.tiktok.com/@sophinaschool1"),

  // ---------- home page ----------
  f("home", "ticker", "text", "Scrolling text at the top (send /ticker off to hide it)", "Now accepting applications for the 2026-27 School Year"),
  f("home", "home-title", "text", "Big title on the slideshow", "Welcome to Sophina School"),
  f("home", "home-subtitle", "text", "Small text under the slideshow title", "Nurturing a love for learning and building strong character, in Ogwashi-Uku, Delta State."),
  f("home", "youtube", "youtube", "Welcome video (YouTube link)", "https://www.youtube.com/embed/0WXhVtbvBLE?si=B0MsC1KCWDFjSceQ"),
  f("home", "welcome-title", "text", "Welcome heading", "Welcome to Sophina School"),
  f("home", "welcome-text", "text", "Welcome paragraph", "We foster a culture of excellence, nurturing a love for learning in a supportive environment. Our approach encourages curiosity, creativity, and builds a strong foundation in academics and character development."),
  f("home", "apart-title", "text", "'What sets us apart' heading", "What Sets Us Apart?"),
  f("home", "apart-subtitle", "text", "'What sets us apart' sub-text", "Discover what makes Sophina School a premier educational institution dedicated to excellence"),
  f("home", "feature1-image", "image", "Feature 1 picture", "https://i.ibb.co/5hBwY4Tf/photo-2025-12-03-22-33-03.jpg"),
  f("home", "feature1-title", "text", "Feature 1 heading", "Learner-Centered"),
  f("home", "feature1-text", "text", "Feature 1 text", "At Sophina School, students take charge of their learning journey with our innovative approach to education. Our distinctive environment fosters independence, curiosity, and a lifelong love for learning."),
  f("home", "feature2-image", "image", "Feature 2 picture", "https://i.ibb.co/RGt3spWN/PXL-20241022-093659790-1-1-1.png"),
  f("home", "feature2-title", "text", "Feature 2 heading", "Innovative Curriculum"),
  f("home", "feature2-text", "text", "Feature 2 text", "Our curriculum is designed to challenge and inspire, integrating traditional subjects with modern skills. We emphasize critical thinking, problem-solving, and creativity to prepare students for future success."),
  f("home", "feature3-image", "image", "Feature 3 picture", "https://i.ibb.co/xKR8G410/photo-2025-12-03-23-15-02.jpg"),
  f("home", "feature3-title", "text", "Feature 3 heading", "Holistic Development"),
  f("home", "feature3-text", "text", "Feature 3 text", "We believe in nurturing the whole child. Our programs focus on academic excellence while also developing social skills, emotional intelligence, and physical well-being."),
  f("home", "news-title", "text", "News section heading", "Latest News & Updates"),
  f("home", "news-subtitle", "text", "News section sub-text", "Stay informed with the latest happenings at Sophina School"),
  f("home", "tech-image", "image", "'Learning with Technology' picture", "/images/basic8/image2.jpeg"),
  f("home", "tech-title", "text", "'Learning with Technology' heading", "Learning with Technology"),
  f("home", "tech-text", "text", "'Learning with Technology' text", "Our students learn on computers in our ICT lab and use our own online portals to take tests, study and check their results."),
  f("home", "cta-title", "text", "Bottom 'Join us' heading", "Ready to Join Sophina School?"),
  f("home", "cta-text", "text", "Bottom 'Join us' text", "Sophina School is dedicated to providing a nurturing and innovative learning environment. Our focus is on building a strong foundation for lifelong learning through creativity, curiosity, and academic excellence."),

  // ---------- Mission & Vision page ----------
  f("about", "about-hero-image", "image", "Top banner picture", "https://i.ibb.co/35SLFPTL/PXL-20240326-114354119.jpg"),
  f("about", "about-hero-title", "text", "Top banner title", "Mission & Vision"),
  f("about", "mission-title", "text", "Mission heading", "Our Mission"),
  f("about", "mission-text", "text", "Mission text", "Our mission at Sophina School is to provide a high-quality, inclusive education that fosters the holistic development of each child. We are committed to giving our students a competitive edge through an extensive curriculum and dynamic teaching methodologies, and to creating a positive and supportive learning environment that promotes creativity, critical thinking, and collaboration. Our goal is to prepare our students for success in their future academic and personal endeavors and to help them reach their full potential."),
  f("about", "mission-image", "image", "Mission picture", "https://i.ibb.co/k29pVq6B/PXL-20260401-112327042.jpg"),
  f("about", "vision-title", "text", "Vision heading", "Our Vision"),
  f("about", "vision-text", "text", "Vision text", "At Sophina School, we envision a future where all our students are confident, compassionate, and curious learners who are well-equipped to thrive in a rapidly changing world. Through a dynamic and inclusive learning environment, we empower our students to reach their full potential and become responsible global citizens who make a positive impact on their communities and the world."),
  f("about", "vision-image", "image", "Vision picture", "https://i.ibb.co/kVpmQhK5/PXL-20241021-131450129-1-1-1.png"),
  f("about", "values-title", "text", "Core values heading", "Our Core Values"),
  f("about", "values-subtitle", "text", "Core values sub-text", "These principles guide everything we do at Sophina School"),
  f("about", "value1-title", "text", "Core value 1 title", "Excellence"),
  f("about", "value1-text", "text", "Core value 1 text", "We strive for excellence in everything we do, setting high standards and encouraging our students to reach their full potential."),
  f("about", "value2-title", "text", "Core value 2 title", "Innovation"),
  f("about", "value2-text", "text", "Core value 2 text", "We embrace innovative teaching methods and technologies to provide our students with the best possible learning experience."),
  f("about", "value3-title", "text", "Core value 3 title", "Character"),
  f("about", "value3-text", "text", "Core value 3 text", "We believe in developing strong character and values in our students, preparing them to be responsible and ethical leaders."),

  // ---------- Our School page (class photos and staff use /albums and #staff) ----------
  f("our-school", "school-hero-image", "image", "Top banner picture", "https://i.ibb.co/V0MpQTHv/photo-2025-02-13-08-28-22.jpg"),
  f("our-school", "school-hero-title", "text", "Top banner title", "Our School"),
  f("our-school", "school-intro-title", "text", "Introduction heading", "We believe that everyone's a student and everyone's a teacher."),
  f("our-school", "school-intro-text", "text", "Introduction text", "Our students and staff work together to foster a collaborative learning environment where curiosity thrives and excellence flourishes."),
  f("our-school", "team-title", "text", "Staff section heading", "Meet Our Team"),
  f("our-school", "team-subtitle", "text", "Staff section sub-text", "Dedicated educators and staff committed to your child's success"),

  // ---------- Apply page ----------
  f("apply", "apply-hero-image", "image", "Top banner picture", "https://i.ibb.co/yFD8y6Hf/PXL-20250326-094408031.jpg"),
  f("apply", "apply-hero-title", "text", "Top banner title", "Apply Now"),
  f("apply", "apply-heading", "text", "Main heading", "Applications for the 2026-27 School Year are now open!"),
  f("apply", "apply-text", "text", "Main paragraph", "At Sophina School, we believe in providing a rigorous and inclusive educational environment for every learner. We welcome students from all backgrounds and look forward to reviewing your application."),
  f("apply", "apply-help-title", "text", "'Have Questions?' heading", "Have Questions?"),
  f("apply", "apply-help-text", "text", "'Have Questions?' text (phone numbers are added after it)", "Contact our admissions office:"),
  f("apply", "apply-success", "text", "Message shown after a parent submits the form", "Thank you! We have received your application and will contact you soon."),

  // ---------- menu and portal buttons (top menu, footer and home page) ----------
  f("menu", "nav-home", "text", "Menu: Home", "Home"),
  f("menu", "nav-admissions", "text", "Menu: Admissions", "Admissions"),
  f("menu", "nav-school", "text", "Menu: Our School", "Our School"),
  f("menu", "nav-about", "text", "Menu: Mission & Vision", "Mission & Vision"),
  f("menu", "nav-apply", "text", "Menu: the Apply button", "Apply"),
  f("menu", "portal1-label", "text", "Portal button 1 name", "CBT Portal"),
  f("menu", "portal1-text", "text", "Portal button 1 short description", "Take tests and exams online"),
  f("menu", "portal1-link", "link", "Portal button 1 link", "https://sophinacbt.vercel.app/"),
  f("menu", "portal2-label", "text", "Portal button 2 name", "E-Learning"),
  f("menu", "portal2-text", "text", "Portal button 2 short description", "Access online classroom resources"),
  f("menu", "portal2-link", "link", "Portal button 2 link", "https://sophinaedu.vercel.app"),
  f("menu", "portal3-label", "text", "Portal button 3 name", "Results"),
  f("menu", "portal3-text", "text", "Portal button 3 short description", "Check your exam results"),
  f("menu", "portal3-link", "link", "Portal button 3 link", "https://sophinarslt.vercel.app"),

  // ---------- Google and sharing (what shows in search results, browser tabs and WhatsApp/Facebook previews) ----------
  f("seo", "seo-site-title", "text", "School name in Google and browser tabs (home page, and after the | on other pages)", "Sophina School"),
  f("seo", "seo-site-description", "text", "Google description of the home page", "Sophina School provides high-quality education fostering holistic development of each child through innovative teaching methods and a supportive learning environment."),
  f("seo", "seo-share-text", "text", "Short text in link previews of the home page (WhatsApp, Facebook)", "Quality education for nursery, primary and secondary school students in Ogwashi-Uku, Delta State."),
  f("seo", "seo-share-image", "image", "Picture in link previews of the home page", "https://i.ibb.co/Kv2kM0c/photo-2023-08-07-14-24-24.jpg"),
  f("seo", "seo-page-image", "image", "Picture in link previews of the other pages", "https://i.ibb.co/V0MpQTHv/photo-2025-02-13-08-28-22.jpg"),
  f("seo", "seo-about-title", "text", "Mission & Vision page title in Google", "Mission & Vision"),
  f("seo", "seo-about-description", "text", "Mission & Vision page description in Google", "Discover our mission and vision at Sophina School. We provide high-quality, inclusive education fostering holistic development of each child."),
  f("seo", "seo-school-title", "text", "Our School page title in Google", "Our School"),
  f("seo", "seo-school-description", "text", "Our School page description in Google", "Explore our school facilities, classes, and dedicated staff at Sophina School. From Creche to Senior Secondary, we offer comprehensive education."),
  f("seo", "seo-apply-title", "text", "Apply page title in Google", "Apply Now"),
  f("seo", "seo-apply-description", "text", "Apply page description in Google", "Apply to Sophina School for the 2026-27 school year. Join our inclusive educational environment focused on academic excellence."),
]

export const DEFAULTS: Record<string, string> = Object.fromEntries(FIELDS.map((x) => [x.key, x.default]))
export const fieldOf = (key: string) => FIELDS.find((x) => x.key === key.trim().toLowerCase())

// Accepts any normal YouTube link (watch, youtu.be, shorts, live, embed) and returns the embed link, or null.
export function youtubeEmbed(input: string): string | null {
  const s = input.trim()
  const m =
    s.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/))([A-Za-z0-9_-]{11})/) ||
    s.match(/^([A-Za-z0-9_-]{11})$/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : null
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`
export const safeLink = (url: string, fallback: string) => (/^https?:\/\//i.test(url) ? url : fallback)

// The menu names and the three portal buttons. Used by the header, the footer and the home page.
export type Menu = {
  nav: { href: string; label: string }[]
  apply: string
  portals: { label: string; text: string; href: string }[]
}

export function menuFrom(c: (key: string) => string): Menu {
  return {
    nav: [
      { href: "/", label: c("nav-home") },
      { href: "/apply", label: c("nav-admissions") },
      { href: "/our-school", label: c("nav-school") },
      { href: "/about", label: c("nav-about") },
    ],
    apply: c("nav-apply"),
    portals: [1, 2, 3].map((n) => ({
      label: c(`portal${n}-label`),
      text: c(`portal${n}-text`),
      href: safeLink(c(`portal${n}-link`), DEFAULTS[`portal${n}-link`]),
    })),
  }
}

export const DEFAULT_MENU: Menu = menuFrom((key) => DEFAULTS[key] ?? "")
