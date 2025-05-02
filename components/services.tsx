"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "aluminium-partitions",
    title: "Aluminium Partitions",
    description: "Professional installation of durable and stylish aluminium partitions for efficient space division.",
    image: "https://ik.imagekit.io/xnx0c7nxo/Aluminium_glass%20partition.jpeg?updatedAt=1746114977843",
    videoUrl: "https://ik.imagekit.io/xnx0c7nxo/8ea4d180c6d6f1054197d62af6b396e7.mp4?updatedAt=1746115631096",
  },
  {
    id: "aluminium-windows",
    title: "Aluminium Windows",
    description: "Custom designed and expertly installed aluminium windows combining elegance with functionality.",
    image: "https://ik.imagekit.io/xnx0c7nxo/cd6d9b1d-da46-4ca7-a822-6c45120d2c11.jpeg?updatedAt=1746121140428",
    videoUrl: "https://ik.imagekit.io/xnx0c7nxo/dbcaa2560be1b2491179af53099fbe4b.mp4?updatedAt=1746120883623",
  },
  {
    id: "glass-partitions",
    title: "Glass Partitions",
    description:
      "Modern glass partition solutions that create sophisticated and bright spaces while maintaining privacy.",
    image: "https://ik.imagekit.io/xnx0c7nxo/7ee9038b-8a44-4925-801f-448f5e8060e9.jpeg?updatedAt=1746114529351",
    videoUrl: "https://ik.imagekit.io/xnx0c7nxo/9fa87a7a3033c8e521606827f1917e49.mp4/ik-video.mp4?updatedAt=1746121349449",
  },
  {
    id: "Residential Interiors",
    title: "Residential Interiors",
    description: "High-quality Residential Interiors that offer security, durability, and contemporary aesthetics.",
    image: "https://ik.imagekit.io/xnx0c7nxo/abbc61d9-85e3-4fd5-a516-62e954380874.jpeg?updatedAt=1746123783038",
    videoUrl: "https://ik.imagekit.io/xnx0c7nxo/74b7f1338570c6d8d599d645d2d0f3ea.mp4?updatedAt=1746121718573",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const buttonRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<string>("gallery")

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
      const descEl = sectionRef.current.querySelector("p")

      if (headingEl) observer.observe(headingEl)
      if (descEl) observer.observe(descEl)
    }

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    if (buttonRef.current) observer.observe(buttonRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-20 bg-muted/50 scroll-mt-16" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 transform translate-y-8">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 transform translate-y-8 animation-delay-200">
            We offer a comprehensive range of aluminium and glass interior solutions tailored to your specific needs.
          </p>
        </div>

        <Tabs defaultValue="gallery" className="w-full mb-12" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="gallery" className="text-xs sm:text-sm md:text-base px-2 py-1 sm:px-4 sm:py-2">
              Gallery View
            </TabsTrigger>
            <TabsTrigger value="videos" className="text-xs sm:text-sm md:text-base px-2 py-1 sm:px-4 sm:py-2">
              Video Showcase
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-0">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className={cn(
                    "overflow-hidden opacity-0 transform",
                    index % 2 === 0 ? "translate-x-[-50px]" : "translate-x-[50px]",
                    `animation-delay-${(index + 3) * 100}`,
                    "hover:shadow-lg dark:hover:shadow-custom-dark transition-all duration-300",
                  )}
                  ref={(el) => (cardsRef.current[index] = el)}
                >
                  <div className="aspect-video relative overflow-hidden group">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <h3 className="absolute bottom-0 left-0 text-xl font-bold text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/80 text-white hover:bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => {
                        setActiveTab("videos")
                        document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-xl font-bold mb-2 sm:mb-3 md:hidden">{service.title}</h3>
                    <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">{service.description}</p>
                    <Button variant="outline" size="sm" className="relative overflow-hidden group text-xs sm:text-sm">
                      <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                        Learn More
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-0 space-y-12">
            {services.map((service, index) => (
              <div
                key={index}
                id={service.id}
                className="max-w-4xl mx-auto bg-background rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src={service.videoUrl}
                    title={service.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12 opacity-0 transform translate-y-8 animation-delay-700" ref={buttonRef}>
          <Button size="lg" asChild className="relative overflow-hidden group">
            <a href="/contact">
              <span className="relative z-10">Request a Service</span>
              <span className="absolute inset-0 w-full h-full bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
