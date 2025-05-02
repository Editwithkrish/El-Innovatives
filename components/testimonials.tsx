"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Krishna Jagtap",
    role: "Navi Mumbai",
    content:
      "I had a really great experience collaborating with the EL innovative team; each of them is truly dedicated and passionate. Because of their love and passion for creating designs, each of the designs went out unique and finished...",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Suresh Verma",
    role: "Andheri",
    content:
      "Thanks to the EL innovative team for treating us with love and designing an extraordinary Home than we expected.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Lokesh",
    role: "Thane",
    content:
      "Initially we just appreciate your responsible behavior. Because of your 100 percent responsibility, we simply reached the endpoint more than I anticipated.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Rakesh Mittal",
    role: "Kalyan",
    content:
      "We just wanted to say a BIG thank you for all the work you have put into this project to date. We are really pleased with everything going into the house and the finish of the workmanship.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

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
    if (descRef.current) observer.observe(descRef.current)

    return () => observer.disconnect()
  }, [])

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection("right")
    setTimeout(() => {
      setCurrent((current + 1) % testimonials.length)
      setIsAnimating(false)
    }, 500)
  }

  const previous = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection("left")
    setTimeout(() => {
      setCurrent((current - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 500)
  }

  return (
    <section id="testimonials" className="py-20 scroll-mt-16" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-4 opacity-0 transform translate-y-8">
            Testimonials
          </h2>
          <p
            ref={descRef}
            className="text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 transform translate-y-8 animation-delay-200"
          >
            Here is what our clients say -
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div className="relative h-[350px] md:h-[250px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute w-full transition-all duration-500 ease-in-out",
                    current === index
                      ? "opacity-100 translate-x-0 z-10"
                      : index === (current - 1 + testimonials.length) % testimonials.length && direction === "right"
                        ? "opacity-0 -translate-x-full z-0"
                        : index === (current + 1) % testimonials.length && direction === "left"
                          ? "opacity-0 translate-x-full z-0"
                          : "opacity-0 translate-x-full z-0",
                    isAnimating && current === index
                      ? direction === "right"
                        ? "animate-slide-in-right"
                        : "animate-slide-in-left"
                      : "",
                  )}
                >
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/30">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Quote className="h-8 w-8 text-primary/30 mb-4 animate-float" />
                          <p className="text-lg mb-4 italic">{testimonial.content}</p>
                          <div>
                            <h4 className="font-bold">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
            onClick={previous}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (current === index) return
                setDirection(index > current ? "right" : "left")
                setIsAnimating(true)
                setTimeout(() => {
                  setCurrent(index)
                  setIsAnimating(false)
                }, 500)
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                current === index ? "bg-primary w-6" : "bg-muted hover:bg-muted-foreground/50",
                isAnimating ? "scale-90" : "scale-100",
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
