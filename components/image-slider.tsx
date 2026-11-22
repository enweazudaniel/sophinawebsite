"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface Slide {
  url: string
  alt: string
}

interface ImageSliderProps {
  slides: Slide[]
  title?: string
  subtitle?: string
}

export function ImageSlider({ slides, title, subtitle }: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (paused) return
    const timer = setInterval(nextSlide, 7000)
    return () => clearInterval(timer)
  }, [nextSlide, paused])

  // Only the previous, current and next pictures are loaded, so the page opens fast
  const visible = new Set([
    currentSlide,
    (currentSlide + 1) % slides.length,
    (currentSlide - 1 + slides.length) % slides.length,
  ])

  return (
    <section
      className="relative h-[70vh] min-h-[420px] max-h-[720px] overflow-hidden bg-muted"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Photos of Sophina School"
    >
      {slides.map((slide, index) =>
        visible.has(index) ? (
          <Image
            key={slide.url}
            src={slide.url}
            alt={slide.alt}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
            sizes="100vw"
            quality={80}
          />
        ) : null,
      )}

      {/* Dark gradient so the words are easy to read on any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      {(title || subtitle) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          {title && <h1 className="max-w-4xl text-4xl font-bold drop-shadow-lg md:text-6xl">{title}</h1>}
          {subtitle && <p className="mt-4 max-w-2xl text-lg drop-shadow-md md:text-xl">{subtitle}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/apply">
              <Button size="lg" className="bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground hover:bg-primary/90">
                Apply Now
              </Button>
            </Link>
            <Link href="/our-school">
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent px-8 py-6 text-lg font-semibold text-white hover:bg-white hover:text-black"
              >
                Explore Our School
              </Button>
            </Link>
          </div>
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8 text-white" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Next photo"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8 text-white" />
      </Button>

      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.url}
            type="button"
            aria-label={`Show photo ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2.5 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  )
}
