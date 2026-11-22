import type { Metadata } from "next"
import ApplyPageClient from "./ApplyPageClient"
import { getContent } from "@/lib/site-data"

// Refreshes every minute so changes made from the Telegram bot appear quickly
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent()
  const title = c("seo-apply-title")
  const description = c("seo-apply-description")
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${c("seo-site-title")}`,
      description,
      images: [{ url: c("seo-page-image"), width: 1200, height: 630, alt: "Apply to Sophina School" }],
    },
  }
}

export default async function ApplyPage() {
  const c = await getContent()
  return (
    <ApplyPageClient
      content={{
        heroImage: c("apply-hero-image"),
        heroTitle: c("apply-hero-title"),
        heading: c("apply-heading"),
        text: c("apply-text"),
        helpTitle: c("apply-help-title"),
        helpText: c("apply-help-text"),
        success: c("apply-success"),
        phone1: c("phone-1"),
        phone2: c("phone-2"),
        address1: c("address-1"),
        address2: c("address-2"),
      }}
    />
  )
}
