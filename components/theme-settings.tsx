"use client"
import { Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ThemeSettings() {
  const { theme, setTheme, accentColor, setAccentColor } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Theme settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as any)}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Accent Color</DropdownMenuLabel>
        <div className="grid grid-cols-3 gap-1 p-1">
          {[
            { name: "Purple", value: "purple", bg: "bg-purple-500" },
            { name: "Blue", value: "blue", bg: "bg-blue-500" },
            { name: "Green", value: "green", bg: "bg-green-500" },
            { name: "Orange", value: "orange", bg: "bg-orange-500" },
            { name: "Pink", value: "pink", bg: "bg-pink-500" },
            { name: "Amber", value: "amber", bg: "bg-amber-500" },
          ].map((color) => (
            <Button
              key={color.value}
              variant="ghost"
              className={`h-8 w-full rounded-md p-0 flex items-center justify-center ${
                accentColor === color.value ? "border-2 border-muted-foreground" : ""
              }`}
              onClick={() => setAccentColor(color.value as any)}
            >
              <span className={`h-6 w-6 rounded-md ${color.bg}`} />
              <span className="sr-only">{color.name}</span>
            </Button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
