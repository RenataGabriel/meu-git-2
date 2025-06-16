"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Shield, Save, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { HeaderUser } from "@/components/header-user"
import { useUser } from "@/contexts/user-context"

// Permission categories and their specific permissions
const permissionCategories = {
  Dashboard: {
    permissions: ["view_dashboard", "view_analytics", "export_reports"],
    description: "Access to main dashboard and analytics",
  },
  Products: {
    permissions: ["view_products", "create_products", "edit_products", "delete_products", "manage_categories"],
    description: "Product catalog management",
  },
  Sales: {
    permissions: [
      "view_orders",
      "create_orders",
      "edit_orders",
      "cancel_orders",
      "view_customers",
      "manage_customers",
      "view_invoices",
      "create_invoices",
    ],
    description: "Sales and order management",
  },
  Inventory: {
    permissions: ["view_inventory", "manage_stock", "view_categories", "manage_categories", "inventory_reports"],
    description: "Inventory and stock management",
  },
  Reports: {
    permissions: [
      "view_financial_reports",
      "view_sales_reports",
      "view_inventory_reports",
      "export_reports",
      "schedule_reports",
    ],
    description: "Reporting and analytics",
  },
  Devices: {
    permissions: ["view_devices", "manage_devices", "device_connections", "device_settings"],
    description: "Device management and connections",
  },
  Settings: {
    permissions: ["view_settings", "manage_users", "manage_roles", "system_settings", "billing_settings"],
    description: "System configuration and user management",
  },
}

export default function NewUserPage() {
  const { user } = useUser()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "active",
    sendWelcomeEmail: true,
    requirePasswordChange: true,
    notes: "",
  })

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [avatar, setAvatar] = useState<string>("")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePermissionToggle = (permission: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions((prev) => [...prev, permission])
    } else {
      setSelectedPermissions((prev) => prev.filter((p) => p !== permission))
    }
  }

  const handleCategoryToggle = (category: string, checked: boolean) => {
    const categoryPermissions = permissionCategories[category as keyof typeof permissionCategories].permissions

    if (checked) {
      setSelectedPermissions((prev) => [
        ...prev.filter((p) => !categoryPermissions.includes(p)),
        ...categoryPermissions,
      ])
    } else {
      setSelectedPermissions((prev) => prev.filter((p) => !categoryPermissions.includes(p)))
    }
  }

  const isCategorySelected = (category: string) => {
    const categoryPermissions = permissionCategories[category as keyof typeof permissionCategories].permissions
    return categoryPermissions.every((permission) => selectedPermissions.includes(permission))
  }

  const isCategoryPartiallySelected = (category: string) => {
    const categoryPermissions = permissionCategories[category as keyof typeof permissionCategories].permissions
    const selectedCount = categoryPermissions.filter((permission) => selectedPermissions.includes(permission)).length
    return selectedCount > 0 && selectedCount < categoryPermissions.length
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    console.log("Selected Permissions:", selectedPermissions)
    // Here you would typically send the data to your API
  }

  const fullName = `${formData.firstName} ${formData.lastName}`.trim()

  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center gap-2 flex-1">
            <h2 className="text-lg font-semibold">Settings</h2>
          </div>
          <HeaderUser user={user} />
        </header> */}

      <SidebarInset>
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Users</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Users and Permissions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header User Avatar */}
        <HeaderUser user={user} />
      </header>

        <div className="flex-1 space-y-4 p-4 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings/users">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Create New User</h1>
                <p className="text-muted-foreground">Add a new team member and configure their permissions</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* User Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      User Information
                    </CardTitle>
                    <CardDescription>Basic information about the new user</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john.doe@company.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => handleInputChange("department", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="it">IT</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="warehouse">Warehouse</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role *</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => handleInputChange("role", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        placeholder="Additional notes about this user..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Permissions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Permissions
                    </CardTitle>
                    <CardDescription>Configure what this user can access and do in the system</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(permissionCategories).map(([category, { permissions, description }]) => (
                      <div key={category} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={isCategorySelected(category)}
                              onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                              className={
                                isCategoryPartiallySelected(category) ? "data-[state=checked]:bg-orange-500" : ""
                              }
                            />
                            <div>
                              <Label className="text-sm font-medium">{category}</Label>
                              <p className="text-xs text-muted-foreground">{description}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {permissions.filter((p) => selectedPermissions.includes(p)).length}/{permissions.length}
                          </Badge>
                        </div>

                        <div className="ml-6 grid gap-2 md:grid-cols-2">
                          {permissions.map((permission) => (
                            <div key={permission} className="flex items-center space-x-2">
                              <Checkbox
                                checked={selectedPermissions.includes(permission)}
                                onCheckedChange={(checked) => handlePermissionToggle(permission, checked as boolean)}
                              />
                              <Label className="text-sm text-muted-foreground">
                                {permission.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                              </Label>
                            </div>
                          ))}
                        </div>

                        {category !== "Settings" && <Separator />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* User Preview & Settings */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Preview</CardTitle>
                    <CardDescription>How this user will appear in the system</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={avatar || "/placeholder.svg"} alt={fullName} />
                        <AvatarFallback>
                          {fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{fullName || "New User"}</div>
                        <div className="text-sm text-muted-foreground">{formData.email || "email@example.com"}</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Role:</span>
                        <Badge variant="outline">{formData.role || "Not selected"}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Department:</span>
                        <span>{formData.department || "Not assigned"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Permissions:</span>
                        <span>{selectedPermissions.length} selected</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Configure initial account settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Account Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Send Welcome Email</Label>
                          <p className="text-xs text-muted-foreground">Send login instructions to user</p>
                        </div>
                        <Switch
                          checked={formData.sendWelcomeEmail}
                          onCheckedChange={(checked) => handleInputChange("sendWelcomeEmail", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Require Password Change</Label>
                          <p className="text-xs text-muted-foreground">Force password change on first login</p>
                        </div>
                        <Switch
                          checked={formData.requirePasswordChange}
                          onCheckedChange={(checked) => handleInputChange("requirePasswordChange", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-2">
              <Button variant="outline" asChild>
                <Link href="/settings/users">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Link>
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Create User
              </Button>
            </div>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
