"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Archive,
  UserPlus,
  Shield,
  Mail,
  Phone,
  Calendar,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { HeaderUser } from "@/components/header-user"
import { useUser } from "@/contexts/user-context"

// Sample users data
const users = [
  {
    id: "1",
    name: "John Admin Pro",
    email: "admin.pro@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/avatars/admin-pro.jpg",
    role: "ADMIN",
    plan: "PRO",
    status: "Active",
    lastLogin: "2024-01-15",
    permissions: ["all"],
    department: "IT",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Jane Basic Pro",
    email: "basic.pro@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "/avatars/basic-pro.jpg",
    role: "MANAGER",
    plan: "PRO",
    status: "Active",
    lastLogin: "2024-01-14",
    permissions: ["sales", "inventory", "reports"],
    department: "Sales",
    joinDate: "2023-03-20",
  },
  {
    id: "3",
    name: "Bob Admin Free",
    email: "admin.free@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "/avatars/admin-free.jpg",
    role: "USER",
    plan: "FREE",
    status: "Inactive",
    lastLogin: "2024-01-10",
    permissions: ["products", "orders"],
    department: "Operations",
    joinDate: "2023-06-10",
  },
  {
    id: "4",
    name: "Alice Basic Free",
    email: "basic.free@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "/avatars/basic-free.jpg",
    role: "USER",
    plan: "FREE",
    status: "Pending",
    lastLogin: "Never",
    permissions: ["products"],
    department: "Support",
    joinDate: "2024-01-12",
  },
  {
    id: "5",
    name: "Carlos Silva",
    email: "carlos.silva@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "/avatars/carlos.jpg",
    role: "MANAGER",
    plan: "PRO",
    status: "Active",
    lastLogin: "2024-01-15",
    permissions: ["inventory", "reports", "devices"],
    department: "Warehouse",
    joinDate: "2023-08-05",
  },
]

const statusColors = {
  Active: "bg-green-100 text-green-800 border-green-200",
  Inactive: "bg-gray-100 text-gray-800 border-gray-200",
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Suspended: "bg-red-100 text-red-800 border-red-200",
}

const roleColors = {
  ADMIN: "bg-purple-100 text-purple-800 border-purple-200",
  MANAGER: "bg-blue-100 text-blue-800 border-blue-200",
  USER: "bg-gray-100 text-gray-800 border-gray-200",
}

export default function UsersPage() {
  const { user } = useUser()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId])
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    }
  }

  const activeUsers = users.filter((user) => user.status === "Active").length
  const pendingUsers = users.filter((user) => user.status === "Pending").length
  const totalPermissions = users.reduce((acc, user) => acc + user.permissions.length, 0)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center gap-2 flex-1">
            <h2 className="text-lg font-semibold">Settings</h2>
          </div>
          <HeaderUser user={user} />
        </header>
        <div className="flex-1 space-y-4 p-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Users & Permissions</h1>
              <p className="text-muted-foreground">Manage system users and their access permissions</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link href="/settings/users/new">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {((activeUsers / users.length) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingUsers}</div>
                <p className="text-xs text-muted-foreground">Awaiting activation</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPermissions}</div>
                <p className="text-xs text-muted-foreground">Across all users</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Manage your team members and their permissions</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedUsers.length > 0 && (
                    <>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export ({selectedUsers.length})
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="mr-2 h-4 w-4" />
                        Archive ({selectedUsers.length})
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <UserPlus className="h-8 w-8 text-muted-foreground" />
                            <p className="text-muted-foreground">No users found</p>
                            <Button asChild size="sm">
                              <Link href="/settings/users/new">Add your first user</Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground flex items-center">
                                  <Mail className="mr-1 h-3 w-3" />
                                  {user.email}
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center">
                                  <Phone className="mr-1 h-3 w-3" />
                                  {user.phone}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={roleColors[user.role as keyof typeof roleColors]}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusColors[user.status as keyof typeof statusColors]}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {user.permissions.slice(0, 2).map((permission) => (
                                <Badge key={permission} variant="secondary" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                              {user.permissions.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{user.permissions.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {user.lastLogin === "Never" ? (
                              <span className="text-muted-foreground">Never</span>
                            ) : (
                              new Date(user.lastLogin).toLocaleDateString()
                            )}
                          </TableCell>
                          <TableCell className="text-sm">{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="mr-2 h-4 w-4" />
                                  Manage Permissions
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
