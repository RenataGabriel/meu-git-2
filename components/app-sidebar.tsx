"use client"

import type * as React from "react"
import {
  AudioWaveform,
  BarChart3,
  Command,
  DollarSign,
  GalleryVerticalEnd,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Smartphone,
  Users,
  FileText,
  FolderOpen,
  TrendingUp,
  UserCog,
  Shield,
  Import,
} from "lucide-react"

import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useUser } from "@/contexts/user-context"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { hasAccess } = useUser()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* Main */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Sales */}
        <SidebarGroup>
          <SidebarGroupLabel>Sales</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/sales/orders">
                  <ShoppingCart />
                  <span>Orders</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/sales/customers">
                  <Users />
                  <span>Customers</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/sales/invoices">
                  <FileText />
                  <span>Invoices</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Inventory */}
        <SidebarGroup>
          <SidebarGroupLabel>Inventory</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/products">
                  <Package />
                  <span>Products</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/products/new">
                  <Import />
                  <span>Import Products</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/inventory/categories">
                  <FolderOpen />
                  <span>Categories</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Finance */}
        <SidebarGroup>
          <SidebarGroupLabel>Finance</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/reports/financial">
                  <DollarSign />
                  <span>Financial</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Reports - Only for ADMIN + PRO */}
        {hasAccess("ADMIN", "PRO") && (
          <SidebarGroup>
            <SidebarGroupLabel>Reports</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/products/analytics">
                    <BarChart3 />
                    <span>Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/reports/financial">
                    <TrendingUp />
                    <span>Financial</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}

        {/* Reports - Show with PRO badge for FREE users */}
        {!hasAccess(undefined, "PRO") && (
          <SidebarGroup>
            <SidebarGroupLabel>Reports</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/plans" className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <BarChart3 />
                      <span>Analytics</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-0.5"
                    >
                      PRO
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/plans" className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <TrendingUp />
                      <span>Financial</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-0.5"
                    >
                      PRO
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}

        {/* Devices - Only for ADMIN + PRO */}
        {hasAccess("ADMIN", "PRO") && (
          <SidebarGroup>
            <SidebarGroupLabel>Devices</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/devices/list">
                    <Smartphone />
                    <span>Devices & Connections</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}

        {/* Devices - Show with PRO badge for FREE users */}
        {!hasAccess(undefined, "PRO") && (
          <SidebarGroup>
            <SidebarGroupLabel>Devices</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/plans" className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Smartphone />
                      <span>Devices & Connections</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-0.5"
                    >
                      PRO
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}

        {/* Settings - Only for ADMIN */}
        {hasAccess("ADMIN") && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/settings/profiles">
                      <UserCog />
                      <span>Profiles</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/settings/users">
                      <Users />
                      <span>Users & Permissions</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/settings/roles">
                      <Shield />
                      <span>Roles</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
