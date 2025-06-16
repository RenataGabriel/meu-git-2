"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"
type AccentColor = "purple" | "blue" | "green" | "orange" | "pink" | "amber"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultAccentColor?: AccentColor
}

type ThemeProviderState = {
  theme: Theme
  accentColor: AccentColor
  setTheme: (theme: Theme) => void
  setAccentColor: (color: AccentColor) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  accentColor: "purple",
  setTheme: () => null,
  setAccentColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultAccentColor = "purple",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [accentColor, setAccentColor] = useState<AccentColor>(defaultAccentColor)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all accent color classes
    root.classList.remove(
      "accent-purple",
      "accent-blue",
      "accent-green",
      "accent-orange",
      "accent-pink",
      "accent-amber",
    )

    // Add the selected accent color class
    root.classList.add(`accent-${accentColor}`)

    // Store the preference
    localStorage.setItem("accent-color", accentColor)
  }, [accentColor])

  // Initialize from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const savedAccentColor = localStorage.getItem("accent-color") as AccentColor | null

    if (savedTheme) {
      setTheme(savedTheme)
    }

    if (savedAccentColor) {
      setAccentColor(savedAccentColor)
    }
  }, [])

  const value = {
    theme,
    accentColor,
    setTheme: (theme: Theme) => {
      localStorage.setItem("theme", theme)
      setTheme(theme)
    },
    setAccentColor: (color: AccentColor) => {
      localStorage.setItem("accent-color", color)
      setAccentColor(color)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
