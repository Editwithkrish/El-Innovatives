"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const groupCompanies = [
  {
    number: "01",
    title: "Import",
    description: "Global sourcing of premium materials and components",
  },
  {
    number: "02",
    title: "Custom Design",
    description: "Bespoke design solutions tailored to your specific needs",
  },
  {
    number: "03",
    title: "Extrusion",
    description: "High-precision extrusion services for various applications",
  },
  {
    number: "04",
    title: "Glass",
    description: "Premium glass solutions for architectural and interior applications",
  },
  {
    number: "05",
    title: "Anodizing",
    description: "State-of-the-art anodizing treatments for superior finish and durability",
  },
  {
    number: "06",
    title: "Installation",
    description: "Expert installation services ensuring perfect execution of your project",
  },
]

export default function GroupCompanies() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

    if (sectionRef.current) {
      const headingEl = sectionRef.current.querySelector("h2")
      if (headingEl) observer.observe(headingEl)
    }

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="group-companies" className="py-20 bg-muted/30 scroll-mt-16" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 transform translate-y-8">Group Companies</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupCompanies.map((company, index) => (
            <Card
              key={index}
              className={cn(
                "border-none shadow-sm hover:shadow-md transition-all duration-300 opacity-0 transform translate-y-8 hover:translate-y-[-5px]",
                `animation-delay-${(index + 1) * 100}`,
              )}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary/30 mb-4">{company.number}</div>
                <h3 className="text-xl font-bold mb-2">{company.title}</h3>
                <p className="text-muted-foreground">{company.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
