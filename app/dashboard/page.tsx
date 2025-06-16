"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { HeaderUser } from "@/components/header-user"
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"

const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

// Sample data for charts
const salesData = [
  { month: "Jan", revenue: 45231, orders: 234 },
  { month: "Feb", revenue: 52100, orders: 267 },
  { month: "Mar", revenue: 48900, orders: 251 },
  { month: "Apr", revenue: 61200, orders: 312 },
  { month: "May", revenue: 59800, orders: 298 },
  { month: "Jun", revenue: 72400, orders: 356 },
  { month: "Jul", revenue: 68900, orders: 334 },
  { month: "Aug", revenue: 75200, orders: 378 },
  { month: "Sep", revenue: 69800, orders: 342 },
  { month: "Oct", revenue: 82100, orders: 401 },
  { month: "Nov", revenue: 78600, orders: 389 },
  { month: "Dec", revenue: 91200, orders: 445 },
]

const recentOrders = [
  { id: "#8721", customer: "João Silva", amount: 1999.0, status: "completed" },
  { id: "#8720", customer: "Maria Oliveira", amount: 799.0, status: "processing" },
  { id: "#8719", customer: "Pedro Santos", amount: 3499.0, status: "pending" },
  { id: "#8718", customer: "Ana Sousa", amount: 599.0, status: "completed" },
  { id: "#8717", customer: "Carlos Ferreira", amount: 249.0, status: "cancelled" },
]

const topProducts = [
  { name: "Smartphone X Pro", category: "Electronics", sales: 234, revenue: 46800 },
  { name: "Wireless Headphones", category: "Electronics", sales: 187, revenue: 37400 },
  { name: "Office Chair Ergonomic", category: "Furniture", sales: 142, revenue: 28400 },
  { name: "Notebook Ultra Slim", category: "Electronics", sales: 98, revenue: 49000 },
  { name: "Coffee Maker Premium", category: "Home & Kitchen", sales: 156, revenue: 14040 },
]

const orderStatusData = [
  { name: "Completed", value: 45, color: "#22c55e" },
  { name: "Processing", value: 30, color: "#3b82f6" },
  { name: "Pending", value: 15, color: "#f59e0b" },
  { name: "Cancelled", value: 10, color: "#ef4444" },
]

const performanceMetrics = [
  { name: "Conversion Rate", value: 3.6, change: 0.8, trend: "up" },
  { name: "Avg. Order Value", value: 789, change: 12.3, trend: "up" },
  { name: "Cart Abandonment", value: 21.4, change: -3.2, trend: "down" },
  { name: "Return Rate", value: 4.7, change: 0.5, trend: "up" },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
    case "processing":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function DashboardPage() {
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
                  <BreadcrumbLink href="#">Main</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <HeaderUser user={userData} />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 45,231.89</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+20.1%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+201</span>
                  <span className="ml-1">since last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+180</span>
                  <span className="ml-1">new customers</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inventory Status</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,234</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <AlertTriangle className="mr-1 h-3 w-3 text-yellow-500" />
                  <span className="text-yellow-600">23 items</span>
                  <span className="ml-1">low in stock</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Sales Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={salesData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `R$${value}`} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={8} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest 5 orders received</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div>
                          <p className="text-sm font-medium">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">R$ {order.amount.toFixed(2)}</p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <CardDescription>Distribution of current orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orderStatusData.map((status) => (
                    <div key={status.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                        <span className="text-sm">{status.name}</span>
                      </div>
                      <span className="text-sm font-medium">{status.value}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {orderStatusData.map((status) => (
                    <div key={status.name}>
                      <Progress value={status.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Selling Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Products with highest sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.slice(0, 4).map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                          <span className="text-xs font-medium">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{product.sales} units</p>
                        <p className="text-xs text-muted-foreground">R$ {product.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Indicators */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Indicators</CardTitle>
                <CardDescription>Key metrics for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric) => (
                    <div key={metric.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{metric.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {metric.name.includes("Rate") || metric.name.includes("Abandonment")
                            ? `${metric.value}%`
                            : metric.name.includes("Value")
                              ? `R$ ${metric.value}`
                              : metric.value}
                        </span>
                        <div
                          className={`flex items-center text-xs ${
                            metric.trend === "up"
                              ? metric.name === "Return Rate" || metric.name === "Cart Abandonment"
                                ? "text-red-500"
                                : "text-green-500"
                              : metric.name === "Cart Abandonment"
                                ? "text-green-500"
                                : "text-red-500"
                          }`}
                        >
                          {metric.trend === "up" ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {Math.abs(metric.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
