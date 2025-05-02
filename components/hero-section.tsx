"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, MessageCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const heroContent = [
  {
    title: "Dive Into Divine",
    subtitle: "Premium Interior Solutions",
    quote: "Transforming spaces with innovative design and quality craftsmanship.",
    image: "https://ik.imagekit.io/xnx0c7nxo/0d2fb2d0-1ee5-4580-a009-14d856264fae.jpeg?updatedAt=1746113832024",
  },
  {
    title: "Aluminium Interiors",
    subtitle: "Modern Design Solutions",
    quote: "Contemporary aluminium partitions and windows for your space.",
    image: "https://ik.imagekit.io/xnx0c7nxo/CLASSIC%20LIVING%20ROOM.jpeg?updatedAt=1746114040780",
  },
  {
    title: "Glass Partitions",
    subtitle: "Elegant & Functional",
    quote: "Creating bright, open spaces with premium glass solutions.",
    image: "https://ik.imagekit.io/xnx0c7nxo/7ee9038b-8a44-4925-801f-448f5e8060e9.jpeg?updatedAt=1746114529351",
  },
  {
    title: "Professional Installation",
    subtitle: "Quality Guaranteed",
    quote: "Expert installation services with attention to detail.",
    image: "https://ik.imagekit.io/xnx0c7nxo/f2de2e4b-d0c5-4139-9a66-cdc949592224.jpeg?updatedAt=1746114664608",
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const startSlideTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroContent.length)
        setIsAnimating(false)
      }, 1000)
    }, 5000)
  }

  useEffect(() => {
    startSlideTimer()
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current])

  const goToSlide = (index: number) => {
    if (current === index) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-primary/5 blur-3xl animate-pulse-slow animation-delay-500"></div>
      </div>

      {/* Background Images with Ken Burns effect */}
      {heroContent.map((content, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-[2s]",
            current === index ? "opacity-100 scale-100" : "opacity-0 scale-110",
            isAnimating && current === index ? "blur-sm" : "",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 transition-transform duration-[15s] ease-out",
              current === index ? "scale-110" : "scale-100",
            )}
          >
            <Image
              src={content.image || "/placeholder.svg"}
              alt={content.title}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            {heroContent.map((content, index) => (
              <div
                key={index}
                className={cn(
                  "transition-all duration-1000",
                  current === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 absolute",
                  isAnimating && current === index ? "blur-sm" : "",
                )}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 animate-fade-in-up relative inline-block">
                  {content.title}
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 animate-fade-in-up animation-delay-300">
                  {content.subtitle}
                </p>
                <blockquote className="border-l-4 border-primary pl-4 italic mb-6 sm:mb-8 animate-fade-in-up animation-delay-600 text-sm sm:text-base relative">
                  {content.quote}
                  <span className="absolute -bottom-2 left-4 w-1/2 h-0.5 bg-primary/30"></span>
                </blockquote>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 animate-fade-in-up animation-delay-900">
              <Button size="lg" asChild className="group w-full sm:w-auto relative overflow-hidden">
                <a href="/contact">
                  <span className="relative z-10">Get a Free Consultation</span>
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  <span className="absolute inset-0 w-full h-full bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 transition-all hover:scale-105 w-full sm:w-auto group relative overflow-hidden"
              >
                <a href="#services" className="flex items-center">
                  <span className="relative z-10">Explore Our Services</span>
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-green-600 hover:bg-green-700 text-white border-none transition-all hover:scale-105 flex items-center gap-2 w-full sm:w-auto relative overflow-hidden group"
                asChild
              >
                <a href="https://wa.me/919653636599" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 relative z-10" />
                  <span className="sm:inline relative z-10">WhatsApp Us</span>
                  <span className="absolute inset-0 w-full h-full bg-green-700/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-500 relative",
              current === index ? "bg-primary w-8" : "bg-white/50 hover:bg-white/80",
              isAnimating ? "scale-90" : "scale-100",
            )}
            aria-label={`Go to slide ${index + 1}`}
          >
            {current === index && <span className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></span>}
          </button>
        ))}
      </div>
    </section>
  )
}
