import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageSlider } from "@/components/image-slider"
import { ScrollingAnnouncement } from "@/components/scrolling-announcement"
import { PenTool, BookOpen, Award } from "lucide-react"
import { SchoolMap } from "@/components/school-map"
import { getAlbums, getNews, getContent, formatPostDate } from "@/lib/site-data"
import { menuFrom } from "@/lib/content"

// The page refreshes itself every minute, so news and photos posted by the Telegram bot appear quickly
export const revalidate = 60

const slides = [
  { url: "https://i.ibb.co/4ZvHJcL1/PXL-20260624-130856164-PORTRAIT.jpg", alt: "Student at Sophina School" },
  { url: "https://i.ibb.co/p9vC3Hj/PXL-20250319-095044592-PORTRAIT.jpg", alt: "Students at Sophina School" },
  { url: "https://i.ibb.co/xKR8G410/photo-2025-12-03-23-15-02.jpg", alt: "Art and music programmes" },
  { url: "https://i.ibb.co/Jw2jqkNx/PXL-20260401-110344914.jpg", alt: "Art activities at Sophina School" },
  { url: "https://i.ibb.co/39y8k00P/photo-1-2026-02-17-10-24-24.jpg", alt: "School facilities" },
  { url: "https://i.ibb.co/LdYBY3qB/PXL-20260325-124322457-EFFECTS.jpg", alt: "Pupils at Sophina School" },
  { url: "https://i.ibb.co/HZ1ppXM/IMG-9120.avif", alt: "Classroom activities" },
  { url: "https://i.ibb.co/NGxx2pB/PXL-20251201-123313920-1.jpg", alt: "Sports events" },
  { url: "https://i.ibb.co/DHmGBPKX/PXL-20260128-102733820.jpg", alt: "Classroom activities" },
]

const staticNews: { title: string; date: string; image?: string; description: string }[] = [
            {
              title: "Annual Colour Day",
              date: "April 4, 2025",
              image: "/images/colour-day.jpeg",
              description:
                "Students showcased their team spirit and sportsmanship during our vibrant Annual Colour Day, with teams competing in various sporting activities while dressed in their house colors of blue, yellow, and green.",
            },
            {
              title: "Second Term Mid-term Break",
              date: "February 14, 2024",
              image: "https://i.ibb.co/9QvdnNY/PXL-20250213-084232933-1-1-1.png",
              description: "Students recharged and reconnected during our Second Term Mid-term Break",
            },
            {
              title: "End of Year Party",
              date: "December 9, 2025",
              description:
                "Our Year End Students celebrated their achievements and camaraderie at our festive End of Year Party",
            },
            {
              title: "New Session Begins 2025/2026",
              date: "September 8, 2025",
              image: "https://i.ibb.co/Bdm6Y3V/PXL-20250310-082559334.jpg",
              description:
                "We're excited to welcome new and returning students as we kick off another year of learning and growth at Sophina School",
            },
          ]

const portalIcons = [PenTool, BookOpen, Award]

export default async function HomePage() {
  const [liveNews, albums, c] = await Promise.all([getNews(6), getAlbums(), getContent()])
  const portals = menuFrom(c).portals.map((p, i) => ({ ...p, Icon: portalIcons[i] }))
  const newsItems = liveNews
    ? liveNews.map((n) => ({
        title: n.title,
        date: formatPostDate(n.posted_at),
        image: n.image_url || undefined,
        description: n.body,
      }))
    : staticNews
  const heroSlides = albums?.["home-hero"]?.length
    ? albums["home-hero"].map((url) => ({ url, alt: "Sophina School" }))
    : slides
  return (
    <div className="min-h-screen bg-background">
      {/* Scrolling Announcement */}
      {c("ticker").trim().toLowerCase() !== "off" && <ScrollingAnnouncement text={c("ticker")} />}

      {/* Hero Section */}
      <ImageSlider
        slides={heroSlides}
        title={c("home-title")}
        subtitle={c("home-subtitle")}
      />

      {/* Welcome Section */}
      <section className="section-padding container-premium">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-primary mb-6">{c("welcome-title")}</h2>
              <p className="text-lg text-muted-foreground leading-8">
                {c("welcome-text")}
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <Link href="/apply">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg">
                  Apply Now
                </Button>
              </Link>
              <Link href="/our-school">
                <Button variant="outline" className="font-semibold px-8 py-6 text-lg transition-all duration-300 hover:border-primary hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-muted shadow-xl animate-scale-in">
            <iframe
              src={c("youtube")}
              title="Welcome to Sophina School"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="section-padding bg-muted/40">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">{c("apart-title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {c("apart-subtitle")}
            </p>
          </div>
          <div className="section-spacing">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={c("feature1-image")}
                  alt="Students learning"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
                />
              </div>
              <div className="card-elevated">
                <h3 className="text-3xl text-primary mb-4">{c("feature1-title")}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {c("feature1-text")}
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="card-elevated md:order-first">
                <h3 className="text-3xl text-primary mb-4">{c("feature2-title")}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {c("feature2-text")}
                </p>
              </div>
              <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={c("feature2-image")}
                  alt="Innovative curriculum"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
                />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={c("feature3-image")}
                  alt="Holistic development"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
                />
              </div>
              <div className="card-elevated">
                <h3 className="text-3xl text-primary mb-4">{c("feature3-title")}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {c("feature3-text")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section-padding container-premium">
        <div className="text-center mb-16">
          <h2 className="text-primary mb-4">{c("news-title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {c("news-subtitle")}
          </p>
        </div>
        <div className="grid gap-6 max-w-4xl mx-auto">
          {newsItems.map((news, i) => (
            <div key={i} className="card-premium flex gap-6 items-start hover:shadow-xl transition-all duration-300">
              {news.image && (
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image src={news.image} alt={news.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-semibold text-lg text-foreground">{news.title}</h3>
                  <span className="text-xs font-medium text-primary whitespace-nowrap ml-4">{news.date}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{news.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning with Technology */}
      <section className="section-padding container-premium">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={c("tech-image")}
              alt="A student working in the Sophina School computer lab"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-primary">{c("tech-title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {c("tech-text")}
            </p>
            <div className="grid gap-4">
              {portals.map(({ href, label, text, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-premium flex items-center gap-4 hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-semibold text-foreground">{label}</span>
                    <span className="block text-sm text-muted-foreground">{text}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <SchoolMap address1={c("address-1")} address2={c("address-2")} phone1={c("phone-1")} phone2={c("phone-2")} />

      {/* Application CTA */}
      <section className="section-padding bg-muted/40">
        <div className="container-premium text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-primary">{c("cta-title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {c("cta-text")}
            </p>
          </div>
          <Link href="/apply">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 py-7 text-lg transition-all duration-300 hover:shadow-lg">
              Start Your Application
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
