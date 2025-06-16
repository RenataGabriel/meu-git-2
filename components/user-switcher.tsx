"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useUser, sampleUsers } from "@/contexts/user-context"

export function UserSwitcher() {
  const { user, setUser } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{user.name}</span>
              <div className="flex gap-1">
                <Badge variant={user.plan === "PRO" ? "default" : "secondary"} className="text-xs">
                  {user.plan}
                </Badge>
                <Badge variant={user.role === "ADMIN" ? "destructive" : "outline"} className="text-xs">
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start">
        <DropdownMenuLabel>Switch User (Demo)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sampleUsers.map((sampleUser) => (
          <DropdownMenuItem
            key={sampleUser.id}
            onClick={() => setUser(sampleUser)}
            className="flex items-center gap-2 p-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={sampleUser.avatar || "/placeholder.svg"} alt={sampleUser.name} />
              <AvatarFallback>{sampleUser.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium">{sampleUser.name}</span>
              <span className="text-xs text-muted-foreground">{sampleUser.email}</span>
              <div className="flex gap-1 mt-1">
                <Badge variant={sampleUser.plan === "PRO" ? "default" : "secondary"} className="text-xs">
                  {sampleUser.plan}
                </Badge>
                <Badge variant={sampleUser.role === "ADMIN" ? "destructive" : "outline"} className="text-xs">
                  {sampleUser.role}
                </Badge>
              </div>
            </div>
            {user.id === sampleUser.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
