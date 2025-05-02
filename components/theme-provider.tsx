"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Add a class to the body when the theme changes to enable CSS transitions
  React.useEffect(() => {
    document.body.classList.add("theme-transition")

    const handleThemeChange = () => {
      document.body.classList.add("theme-changing")
      setTimeout(() => {
        document.body.classList.remove("theme-changing")
      }, 300)
    }

    window.addEventListener("themechange", handleThemeChange)

    return () => {
      window.removeEventListener("themechange", handleThemeChange)
    }
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
