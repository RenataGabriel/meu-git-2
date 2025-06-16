"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  Download,
  Archive,
} from "lucide-react"
import { HeaderUser } from "@/components/header-user"
import Link from "next/link"

// Sample orders data
const orders = [
  {
    id: "#ORD-001",
    customer: "João Silva",
    email: "joao@email.com",
    total: 1999.0,
    status: "completed",
    paymentStatus: "paid",
    items: 3,
    date: "2024-01-15",
    deliveryDate: "2024-01-18",
  },
  {
    id: "#ORD-002",
    customer: "Maria Oliveira",
    email: "maria@email.com",
    total: 799.0,
    status: "processing",
    paymentStatus: "paid",
    items: 2,
    date: "2024-01-14",
    deliveryDate: "2024-01-17",
  },
  {
    id: "#ORD-003",
    customer: "Pedro Santos",
    email: "pedro@email.com",
    total: 3499.0,
    status: "pending",
    paymentStatus: "pending",
    items: 5,
    date: "2024-01-13",
    deliveryDate: "2024-01-16",
  },
  {
    id: "#ORD-004",
    customer: "Ana Sousa",
    email: "ana@email.com",
    total: 599.0,
    status: "completed",
    paymentStatus: "paid",
    items: 1,
    date: "2024-01-12",
    deliveryDate: "2024-01-15",
  },
  {
    id: "#ORD-005",
    customer: "Carlos Ferreira",
    email: "carlos@email.com",
    total: 249.0,
    status: "cancelled",
    paymentStatus: "refunded",
    items: 1,
    date: "2024-01-11",
    deliveryDate: "-",
  },
  {
    id: "#ORD-006",
    customer: "Lucia Costa",
    email: "lucia@email.com",
    total: 1299.0,
    status: "shipped",
    paymentStatus: "paid",
    items: 2,
    date: "2024-01-10",
    deliveryDate: "2024-01-13",
  },
]

const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      )
    case "processing":
      return (
        <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Processing
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      )
    case "shipped":
      return (
        <Badge variant="default" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          Shipped
        </Badge>
      )
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
          Paid
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      )
    case "refunded":
      return <Badge variant="destructive">Refunded</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filteredOrders, setFilteredOrders] = React.useState(orders)
  const [selectedOrders, setSelectedOrders] = React.useState<string[]>([])

  React.useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredOrders(filtered)
  }, [searchTerm])

  const totalOrders = orders.length
  const completedOrders = orders.filter((o) => o.status === "completed").length
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const totalRevenue = orders.filter((o) => o.status === "completed").reduce((sum, order) => sum + order.total, 0)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    }
  }

  const isAllSelected = filteredOrders.length > 0 && selectedOrders.length === filteredOrders.length
  const isIndeterminate = selectedOrders.length > 0 && selectedOrders.length < filteredOrders.length

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Sales</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Orders</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header User Avatar */}
          <HeaderUser user={userData} />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground">+3 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <Package className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedOrders}</div>
                <p className="text-xs text-muted-foreground">
                  {((completedOrders / totalOrders) * 100).toFixed(1)}% completion rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Users className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingOrders}</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">From completed orders</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>
                    Manage your customer orders and track their status
                    {selectedOrders.length > 0 && (
                      <span className="ml-2 text-primary">({selectedOrders.length} selected)</span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {selectedOrders.length > 0 && (
                    <>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </Button>
                    </>
                  )}
                  <Button asChild>
                    <Link href="/sales/orders/new">
                      <Plus className="mr-2 h-4 w-4" />
                      New Order
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all orders"
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        {...(isIndeterminate && { "data-state": "indeterminate" })}
                      />
                    </TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                          aria-label={`Select order ${order.id}`}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-muted-foreground">{order.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit order
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">No orders found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your search terms or create a new order.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
