"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type UserRole = "ADMIN" | "BASIC"
type UserPlan = "PRO" | "FREE"

type User = {
  id: string
  name: string
  email: string
  avatar: string
  role: UserRole
  plan: UserPlan
}

type UserContextType = {
  user: User
  setUser: (user: User) => void
  hasAccess: (requiredRole?: UserRole, requiredPlan?: UserPlan) => boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Sample users
const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Admin Pro",
    email: "admin.pro@example.com",
    avatar: "/avatars/admin-pro.jpg",
    role: "ADMIN",
    plan: "PRO",
  },
  {
    id: "2",
    name: "Jane Basic Pro",
    email: "basic.pro@example.com",
    avatar: "/avatars/basic-pro.jpg",
    role: "BASIC",
    plan: "PRO",
  },
  {
    id: "3",
    name: "Bob Admin Free",
    email: "admin.free@example.com",
    avatar: "/avatars/admin-free.jpg",
    role: "ADMIN",
    plan: "FREE",
  },
  {
    id: "4",
    name: "Alice Basic Free",
    email: "basic.free@example.com",
    avatar: "/avatars/basic-free.jpg",
    role: "BASIC",
    plan: "FREE",
  },
]

export function UserProvider({ children }: { children: React.ReactNode }) {
  // Default to PRO ADMIN for demo
  const [user, setUser] = useState<User>(sampleUsers[0])

  const hasAccess = (requiredRole?: UserRole, requiredPlan?: UserPlan) => {
    if (requiredRole && user.role !== requiredRole) {
      return false
    }
    if (requiredPlan && user.plan !== requiredPlan) {
      return false
    }
    return true
  }

  return <UserContext.Provider value={{ user, setUser, hasAccess }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export { sampleUsers }
