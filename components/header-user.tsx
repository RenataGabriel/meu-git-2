"use client"

import { BadgeCheck, Bell, CreditCard, LogOut, Moon, Sparkles, Sun } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"

export function HeaderUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { theme, setTheme, accentColor, setAccentColor } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as any)}>
          <DropdownMenuRadioItem value="light">
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <div className="mr-2 h-4 w-4 flex items-center justify-center">
              <Sun className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            System
          </DropdownMenuRadioItem>
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
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/auth">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
