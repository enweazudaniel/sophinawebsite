"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, BookOpen, PenTool, Award } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { DEFAULT_MENU, type Menu as SiteMenu } from "@/lib/content"

export function SiteHeader({ logo, menu }: { logo?: string; menu?: SiteMenu }) {
  const m = menu ?? DEFAULT_MENU
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = m.nav

  const icons = [<PenTool key="p" className="h-4 w-4 mr-1" />, <BookOpen key="b" className="h-4 w-4 mr-1" />, <Award key="a" className="h-4 w-4 mr-1" />]
  const platformLinks = m.portals.map((p, i) => ({ href: p.href, label: p.label, icon: icons[i], description: p.text }))

  return (
    <header className="sticky top-0 border-b border-border/50 bg-background/95 z-50 backdrop-blur shadow-sm">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo || "https://i.ibb.co/Kv2kM0c/photo-2023-08-07-14-24-24.jpg"}
            alt="Sophina School Logo"
            width={70}
            height={70}
            className="h-16 w-16"
          />
        </Link>

        {/* Main Navigation - Desktop */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300 relative group">
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Platform Links - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {platformLinks.map((item) => (
            <Link key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="group relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent transition-all duration-300 font-medium text-sm"
              >
                {item.icon}
                {item.label}
              </Button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 p-3 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {item.description}
              </div>
            </Link>
          ))}

          <ThemeToggle />

          <Link href="/apply" className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg">{m.apply}</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t z-50">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-border my-2 pt-2">
              <p className="text-sm text-muted-foreground mb-2">Student Platforms:</p>
              {platformLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center py-2 text-primary hover:text-primary/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">- {item.description}</span>
                </Link>
              ))}
            </div>

            <Link href="/apply" className="mt-4" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90">{m.apply}</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
