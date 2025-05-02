"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const partners = [
  { name: "Tata Group", logo: "https://ik.imagekit.io/xnx0c7nxo/Tata-Group-logo-3840x2160.png?updatedAt=1746124348470" },
  { name: "Mercedes Benz", logo: "https://ik.imagekit.io/xnx0c7nxo/mercedes-benz-9-logo-png-transparent.png?updatedAt=1746124348440" },
  { name: "Hettich", logo: "https://ik.imagekit.io/xnx0c7nxo/hettich-logo-png-transparent.png?updatedAt=1746124348069" },
  { name: "Godrej", logo: "https://ik.imagekit.io/xnx0c7nxo/go8779g321-godrej-logo-godrej-expert.png?updatedAt=1746124347738" },
  { name: "Häfele", logo: "https://ik.imagekit.io/xnx0c7nxo/Logo-H%C3%A4fele.jpg?updatedAt=1746124347932" },
  { name: "Aditya Birla Group", logo: "https://ik.imagekit.io/xnx0c7nxo/Aditya-Birla-Group-Logo-Vector-scaled.jpg?updatedAt=1746124347684" },
  { name: "L&T", logo: "https://ik.imagekit.io/xnx0c7nxo/lnt-letter-logo-design-in-illustration-logo-calligraphy-designs-for-logo-poster-invitation-etc-vector.jpg?updatedAt=1746124347838" },
]

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const partnersRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (headingRef.current) observer.observe(headingRef.current)

    partnersRef.current.forEach((partner) => {
      if (partner) observer.observe(partner)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 bg-muted/20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2
          ref={headingRef}
          className="text-2xl md:text-3xl font-bold text-center mb-12 opacity-0 transform translate-y-8"
        >
          EL Innovative Trusted Brand Partners
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              ref={(el) => (partnersRef.current[index] = el)}
              className={cn(
                "w-32 md:w-40 h-20 relative grayscale hover:grayscale-0 transition-all duration-500 opacity-0 transform translate-y-8",
                `animation-delay-${(index + 1) * 100}`,
              )}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 rounded-md transition-opacity duration-300"></div>
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                fill
                className="object-contain transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
