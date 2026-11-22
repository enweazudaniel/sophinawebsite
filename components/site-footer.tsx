import { Youtube, Instagram, Music2 } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12 text-center">
          <div>
            <h3 className="font-bold text-lg tracking-wide mb-4">SCHOOL ADDRESS</h3>
            <p className="text-primary-foreground/90 text-sm leading-relaxed">
              Off Polytechnic Road
              <br />
              Ogwashi-Uku,Delta State, 320109
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-wide mb-4">CONTACT US</h3>
            <p className="text-primary-foreground/90 text-sm leading-relaxed">
              Phone:{" "}
              <a href="tel:07038046878" className="underline-offset-4 hover:underline">07038046878</a>,{" "}
              <a href="tel:08027446756" className="underline-offset-4 hover:underline">08027446756</a>
              <br />
              Email:{" "}
              <a href="mailto:sophina4christ@gmail.com" className="underline-offset-4 hover:underline">sophina4christ@gmail.com</a>
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-wide mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/90">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/apply" className="hover:underline">Admissions</a></li>
              <li><a href="/our-school" className="hover:underline">Our School</a></li>
              <li><a href="/about" className="hover:underline">Mission &amp; Vision</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-wide mb-4">STUDENT PORTALS</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/90">
              <li><a href="https://sophinacbt.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">CBT Portal</a></li>
              <li><a href="https://sophinaedu.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:underline">E-Learning</a></li>
              <li><a href="https://sophinarslt.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:underline">Results</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://youtube.com/@sophinaschool?si=mzLE2jOaDnTWtgKJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-red-500 text-primary-foreground transition-all duration-300 hover:scale-110"
              aria-label="Visit our YouTube channel"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/sophinaschool"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-pink-500 text-primary-foreground transition-all duration-300 hover:scale-110"
              aria-label="Visit our Instagram page"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.tiktok.com/@sophinaschool1"
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
