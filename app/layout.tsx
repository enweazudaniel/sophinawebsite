import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getContent } from "@/lib/site-data"
import { menuFrom } from "@/lib/content"
import type { Metadata } from "next"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent()
  const name = c("seo-site-title")
  const shareText = c("seo-share-text")
  const shareImage = c("seo-share-image")
  return {
    title: {
      default: name,
      template: `%s | ${name}`,
    },
    description: c("seo-site-description"),
    keywords: ["school", "education", "nursery", "primary school", "secondary school", "Ogwashi-Uku", "Delta State", "Nigeria"],
    authors: [{ name: "Sophina School" }],
    creator: "Sophina School",
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: "https://sophina.vercel.app",
      title: name,
      description: shareText,
      siteName: "Sophina School",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: "Sophina School Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: shareText,
      images: [shareImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const c = await getContent()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader logo={c("logo")} menu={menuFrom(c)} />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"
