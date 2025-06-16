"use client"
import { Check, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const colors = [
  {
    name: "Purple",
    value: "purple",
    className: "bg-purple-500",
  },
  {
    name: "Blue",
    value: "blue",
    className: "bg-blue-500",
  },
  {
    name: "Green",
    value: "green",
    className: "bg-green-500",
  },
  {
    name: "Orange",
    value: "orange",
    className: "bg-orange-500",
  },
  {
    name: "Pink",
    value: "pink",
    className: "bg-pink-500",
  },
  {
    name: "Amber",
    value: "amber",
    className: "bg-amber-500",
  },
]

export function AccentColorPicker() {
  const { accentColor, setAccentColor } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change accent color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="grid grid-cols-3 gap-1 p-1">
          {colors.map((color) => (
            <Button
              key={color.value}
              variant="ghost"
              className={cn(
                "h-8 w-8 rounded-md p-0 flex items-center justify-center",
                accentColor === color.value && "border-2 border-muted-foreground",
              )}
              onClick={() => setAccentColor(color.value as any)}
            >
              <span className={cn("h-6 w-6 rounded-md", color.className)}>
                {accentColor === color.value && <Check className="h-4 w-4 text-white" />}
              </span>
              <span className="sr-only">{color.name}</span>
            </Button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
