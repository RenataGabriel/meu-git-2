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
import { BarChart3, TrendingUp, Package, DollarSign } from "lucide-react"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { HeaderUser } from "@/components/header-user"

const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

// Sample data for charts
const salesData = [
  { month: "Jan", sales: 4500, revenue: 12000, orders: 89 },
  { month: "Feb", sales: 5200, revenue: 14500, orders: 102 },
  { month: "Mar", sales: 4800, revenue: 13200, orders: 95 },
  { month: "Apr", sales: 6100, revenue: 16800, orders: 118 },
  { month: "May", sales: 5900, revenue: 15900, orders: 112 },
  { month: "Jun", sales: 7200, revenue: 19500, orders: 135 },
  { month: "Jul", sales: 6800, revenue: 18200, orders: 128 },
  { month: "Aug", sales: 7500, revenue: 20100, orders: 142 },
  { month: "Sep", sales: 6900, revenue: 18800, orders: 131 },
  { month: "Oct", sales: 8200, revenue: 22000, orders: 156 },
  { month: "Nov", sales: 7800, revenue: 21200, orders: 148 },
  { month: "Dec", sales: 9100, revenue: 24500, orders: 172 },
]

const categoryData = [
  { category: "Electronics", sales: 45231, percentage: 35 },
  { category: "Home & Kitchen", sales: 32145, percentage: 25 },
  { category: "Sports & Fitness", sales: 28976, percentage: 22 },
  { category: "Home & Office", sales: 15432, percentage: 12 },
  { category: "Books", sales: 7890, percentage: 6 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function ProductAnalyticsPage() {
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
                  <BreadcrumbLink href="#">Product</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header User Avatar */}
          <HeaderUser user={userData} />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$89.50</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">+0.5% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Line Chart - Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Monthly sales performance over the year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <LineChart
                    accessibilityLayer
                    data={salesData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value}`} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line
                      dataKey="sales"
                      type="monotone"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{
                        fill: "hsl(var(--primary))",
                      }}
                      activeDot={{
                        r: 6,
                      }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Bar Chart - Revenue by Month */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue breakdown by month</CardDescription>
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
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value}`} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={8} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Additional Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Bar Chart - Sales by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Product category performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart
                    accessibilityLayer
                    data={categoryData}
                    layout="horizontal"
                    margin={{
                      left: 80,
                    }}
                  >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                      dataKey="category"
                      type="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      width={80}
                    />
                    <XAxis
                      dataKey="sales"
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Line Chart - Orders Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Orders Trend</CardTitle>
                <CardDescription>Number of orders over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <LineChart
                    accessibilityLayer
                    data={salesData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line
                      dataKey="orders"
                      type="monotone"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      dot={{
                        fill: "hsl(var(--primary))",
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Products Section */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best performing products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Wireless Headphones</p>
                    <p className="text-sm text-muted-foreground">234 sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$46,566</p>
                    <p className="text-sm text-green-600">+12%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Yoga Mat</p>
                    <p className="text-sm text-muted-foreground">312 sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9,357</p>
                    <p className="text-sm text-green-600">+8%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bluetooth Speaker</p>
                    <p className="text-sm text-muted-foreground">198 sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$15,840</p>
                    <p className="text-sm text-green-600">+5%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
