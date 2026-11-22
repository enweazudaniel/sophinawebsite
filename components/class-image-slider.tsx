"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface ClassImageSliderProps {
  className: string
  customImages?: string[] // Add support for custom images
}

export function ClassImageSlider({ className, customImages }: ClassImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Use custom images if provided, otherwise generate placeholders
  const slides = customImages
    ? customImages.map((url, i) => ({
        url,
        alt: `${className} Image ${i + 1}`,
      }))
    : []

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide])

  if (slides.length === 0) return null

  // Load only the previous, current and next picture (some albums have over 100 photos)
  const visible = new Set([
    currentSlide,
    (currentSlide + 1) % slides.length,
    (currentSlide - 1 + slides.length) % slides.length,
  ])

  return (
    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
      {slides.map((slide, index) =>
        visible.has(index) ? (
          <Image
            key={index}
            src={slide.url}
            alt={slide.alt}
            fill
            className={`object-cover transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : null,
      )}
      {slides.length > 1 && (
        <span className="absolute bottom-2 right-3 z-10 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
          {currentSlide + 1} / {slides.length}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 z-10"
        aria-label="Previous photo"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 z-10"
        aria-label="Next photo"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </Button>
    </div>
  )
}
