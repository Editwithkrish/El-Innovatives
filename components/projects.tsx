"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink } from "lucide-react"

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

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

    if (contentRef.current) observer.observe(contentRef.current)
    if (buttonRef.current) observer.observe(buttonRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-20 scroll-mt-16" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 transform translate-y-8">Our Projects</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 transform translate-y-8 animation-delay-200">
            Explore our portfolio of completed projects showcasing our expertise in aluminium and glass solutions.
          </p>
        </div>

        <div
          ref={contentRef}
          className="max-w-4xl mx-auto bg-muted/20 rounded-lg p-8 text-center opacity-0 transform translate-y-8 animation-delay-300"
        >
          <FileText className="h-16 w-16 mx-auto mb-6 text-primary animate-pulse-slow" />
          <h3 className="text-2xl font-bold mb-4">View Our Project Portfolio</h3>
          <p className="text-muted-foreground mb-8">
            Download our comprehensive project portfolio to see our completed works and get inspired for your next
            project.
          </p>
          <div ref={buttonRef} className="opacity-0 transform translate-y-8 animation-delay-400">
            <Button size="lg" className="group relative overflow-hidden" asChild>
              <a href="/documents/ourproject.pdf" target="_blank" rel="noopener noreferrer">
                <span className="relative z-10 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Download Portfolio
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 w-full h-full bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
