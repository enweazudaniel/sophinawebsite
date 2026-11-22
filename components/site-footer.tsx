import { Youtube, Instagram, Music2 } from "lucide-react"
import { getContent } from "@/lib/site-data"
import { telHref, safeLink, menuFrom, DEFAULTS } from "@/lib/content"

export async function SiteFooter() {
  const c = await getContent()
  const menu = menuFrom(c)
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12 text-center">
          <div>
            <h3 className="font-bold text-lg tracking-wide mb-4">SCHOOL ADDRESS</h3>
            <p className="text-primary-foreground/90 text-sm leading-relaxed">
              {c("address-1")}
              <br />
              {c("address-2")}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-wide mb-4">CONTACT US</h3>
            <p className="text-primary-foreground/90 text-sm leading-relaxed">
              Phone:{" "}
              <a href={telHref(c("phone-1"))} className="underline-offset-4 hover:underline">{c("phone-1")}</a>,{" "}
              <a href={telHref(c("phone-2"))} className="underline-offset-4 hover:underline">{c("phone-2")}</a>
              <br />
              Email:{" "}
              <a href={`mailto:${c("email")}`} className="underline-offset-4 hover:underline">{c("email")}</a>
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-wide mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/90">
              {menu.nav.map((item) => (
                <li key={item.href}><a href={item.href} className="hover:underline">{item.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-wide mb-4">STUDENT PORTALS</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/90">
              {menu.portals.map((item) => (
                <li key={item.label}><a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex justify-center gap-6 mb-6">
            <a
              href={safeLink(c("youtube-channel"), DEFAULTS["youtube-channel"])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-red-500 text-primary-foreground transition-all duration-300 hover:scale-110"
              aria-label="Visit our YouTube channel"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href={safeLink(c("instagram"), DEFAULTS["instagram"])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-pink-500 text-primary-foreground transition-all duration-300 hover:scale-110"
              aria-label="Visit our Instagram page"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={safeLink(c("tiktok"), DEFAULTS["tiktok"])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-black text-primary-foreground transition-all duration-300 hover:scale-110"
              aria-label="Visit our TikTok page"
            >
              <Music2 className="w-5 h-5" />
            </a>
          </div>
          <p className="text-center text-primary-foreground/70 text-sm">© {new Date().getFullYear()} Sophina School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
