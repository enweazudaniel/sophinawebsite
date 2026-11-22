import Image from "next/image"
import type { Metadata } from "next"
import { getContent } from "@/lib/site-data"

// Refreshes every minute so changes made from the Telegram bot appear quickly
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent()
  const title = c("seo-about-title")
  const description = c("seo-about-description")
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${c("seo-site-title")}`,
      description,
      images: [{ url: c("seo-page-image"), width: 1200, height: 630, alt: "Sophina School Mission and Vision" }],
    },
  }
}

export default async function AboutPage() {
  const c = await getContent()
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
        <Image
          src={c("about-hero-image")}
          alt="Faculty & Staff"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center px-4 drop-shadow-lg">{c("about-hero-title")}</h1>
        </div>
      </div>

      {/* Mission Section */}
      <section className="section-padding container-premium">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-primary">{c("mission-title")}</h2>
            <p className="text-lg text-muted-foreground leading-8">
              {c("mission-text")}
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl animate-scale-in">
            <Image
              src={c("mission-image")}
              alt="Mission Image"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding bg-muted/40">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl animate-scale-in order-last md:order-first">
              <Image
                src={c("vision-image")}
                alt="Vision Image"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-8 animate-fade-in-up order-first md:order-last">
              <h2 className="text-primary">{c("vision-title")}</h2>
              <p className="text-lg text-muted-foreground leading-8">
                {c("vision-text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding container-premium">
        <div className="text-center mb-16">
          <h2 className="text-primary mb-4">{c("values-title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {c("values-subtitle")}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => ({ title: c(`value${n}-title`), description: c(`value${n}-text`) })).map((value, i) => (
            <div key={i} className="card-elevated hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl text-primary mb-4 font-bold">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
