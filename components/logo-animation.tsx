"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function LogoAnimation() {
  const [isLoading, setIsLoading] = useState(true)
  const [animationStage, setAnimationStage] = useState(0)

  useEffect(() => {
    // Stage 1: Initial logo appearance
    const timer1 = setTimeout(() => {
      setAnimationStage(1)
    }, 500)

    // Stage 2: Logo pulse and glow
    const timer2 = setTimeout(() => {
      setAnimationStage(2)
    }, 1500)

    // Stage 3: Text appears
    const timer3 = setTimeout(() => {
      setAnimationStage(3)
    }, 2000)

    // Stage 4: Final animation and fade out
    const timer4 = setTimeout(() => {
      setAnimationStage(4)
    }, 2500)

    // Complete animation and hide
    const timer5 = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700",
        animationStage === 4 ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo with animations */}
        <div
          className={cn(
            "relative w-64 h-64 transition-all duration-700",
            animationStage === 0 ? "opacity-0 scale-50" : "opacity-100 scale-100",
            animationStage >= 2 ? "animate-pulse" : "",
          )}
        >
          <Image
            src="/images/logo.png"
            alt="EL Innovate Logo"
            fill
            className={cn("object-contain transition-all duration-700", animationStage >= 2 ? "animate-bounce" : "")}
          />

          {/* Glow effects */}
          <div
            className={cn(
              "absolute inset-0 bg-primary/10 rounded-full blur-xl transition-all duration-700",
              animationStage >= 2 ? "animate-ping opacity-70" : "opacity-0",
            )}
          ></div>

          <div
            className={cn(
              "absolute inset-0 bg-primary/20 rounded-full blur-3xl transition-all duration-700",
              animationStage >= 2 ? "animate-pulse opacity-50" : "opacity-0",
            )}
          ></div>
        </div>

        {/* Text animation */}
        <div
          className={cn(
            "mt-6 text-4xl font-bold text-primary tracking-wider transition-all duration-700 flex items-center",
            animationStage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <span className="animate-pulse">innovatives</span>
        </div>

        {/* Animated lines */}
        <div
          className={cn(
            "absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent top-1/2 -translate-y-1/2 transition-all duration-700",
            animationStage >= 3 ? "opacity-50 scale-x-100" : "opacity-0 scale-x-0",
          )}
        ></div>
      </div>

      {/* Loading text */}
      <p
        className={cn(
          "text-sm text-muted-foreground mt-12 transition-all duration-500",
          animationStage >= 3 ? "opacity-100" : "opacity-0",
        )}
      >
        Loading amazing experiences...
      </p>
    </div>
  )
}
