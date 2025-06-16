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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Printer,
  CreditCard,
  Settings,
  Wifi,
  WifiOff,
  Activity,
} from "lucide-react"
import { HeaderUser } from "@/components/header-user"

// Sample devices data
const devices = [
  {
    id: "1",
    name: "Reception Printer",
    model: "Epson TM-T20X",
    ipAddress: "192.168.1.101",
    port: "9100",
    type: "Thermal",
    status: "online",
    isDefault: true,
    lastUsed: "2023-11-15 14:32",
  },
  {
    id: "2",
    name: "Kitchen Printer",
    model: "Epson TM-T88VI",
    ipAddress: "192.168.1.102",
    port: "9100",
    type: "Thermal",
    status: "online",
    isDefault: false,
    lastUsed: "2023-11-15 14:30",
  },
  {
    id: "3",
    name: "Bar Printer",
    model: "Epson TM-T20III",
    ipAddress: "192.168.1.103",
    port: "9100",
    type: "Thermal",
    status: "offline",
    isDefault: false,
    lastUsed: "2023-11-14 21:45",
  },
  {
    id: "4",
    name: "Office Printer",
    model: "HP LaserJet Pro M404dn",
    ipAddress: "192.168.1.104",
    port: "9100",
    type: "Laser",
    status: "online",
    isDefault: false,
    lastUsed: "2023-11-15 10:15",
  },
]

const paymentTerminals = [
  {
    id: "1",
    name: "Front Desk Terminal",
    model: "Square Terminal",
    ipAddress: "192.168.1.201",
    port: "443",
    type: "Payment",
    status: "online",
    isDefault: true,
    lastUsed: "2023-11-15 14:35",
  },
  {
    id: "2",
    name: "Mobile Terminal",
    model: "Square Reader",
    ipAddress: "Bluetooth",
    port: "-",
    type: "Payment",
    status: "offline",
    isDefault: false,
    lastUsed: "2023-11-14 18:22",
  },
]

const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "online":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
          <Wifi className="mr-1 h-3 w-3" />
          Online
        </Badge>
      )
    case "offline":
      return (
        <Badge variant="destructive">
          <WifiOff className="mr-1 h-3 w-3" />
          Offline
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("printers")

  const currentDevices = activeTab === "printers" ? devices : paymentTerminals
  const filteredDevices = currentDevices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalDevices = devices.length + paymentTerminals.length
  const onlineDevices = [...devices, ...paymentTerminals].filter((d) => d.status === "online").length
  const onlinePercentage = Math.round((onlineDevices / totalDevices) * 100)

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
                  <BreadcrumbLink href="#">Devices</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Devices & Connections</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header User Avatar */}
          <HeaderUser user={userData} />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Devices & Connections</h1>
              <p className="text-muted-foreground">Manage your printers, payment terminals, and other devices</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Printer
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="printers" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Printers
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Terminals
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="printers" className="space-y-4">
              {/* Search and Filter */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search printers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      All Statuses
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Statuses</DropdownMenuItem>
                    <DropdownMenuItem>Online</DropdownMenuItem>
                    <DropdownMenuItem>Offline</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Devices Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Port</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDevices.map((device) => (
                        <TableRow key={device.id}>
                          <TableCell className="font-medium">{device.name}</TableCell>
                          <TableCell>{device.model}</TableCell>
                          <TableCell>{device.ipAddress}</TableCell>
                          <TableCell>{device.port}</TableCell>
                          <TableCell>{device.type}</TableCell>
                          <TableCell>{getStatusBadge(device.status)}</TableCell>
                          <TableCell>
                            <Switch checked={device.isDefault} />
                          </TableCell>
                          <TableCell>{device.lastUsed}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Test Print</DropdownMenuItem>
                                <DropdownMenuItem>Configure</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              {/* Search and Filter */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payment terminals..."
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

              {/* Payment Terminals Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Connection</TableHead>
                        <TableHead>Port</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentTerminals.map((device) => (
                        <TableRow key={device.id}>
                          <TableCell className="font-medium">{device.name}</TableCell>
                          <TableCell>{device.model}</TableCell>
                          <TableCell>{device.ipAddress}</TableCell>
                          <TableCell>{device.port}</TableCell>
                          <TableCell>{device.type}</TableCell>
                          <TableCell>{getStatusBadge(device.status)}</TableCell>
                          <TableCell>
                            <Switch checked={device.isDefault} />
                          </TableCell>
                          <TableCell>{device.lastUsed}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Test Connection</DropdownMenuItem>
                                <DropdownMenuItem>Configure</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Device Settings</CardTitle>
                  <CardDescription>Configure global device settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Auto-discovery</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically discover new devices on the network
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Health monitoring</div>
                      <div className="text-sm text-muted-foreground">Monitor device health and send alerts</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Automatic updates</div>
                      <div className="text-sm text-muted-foreground">Automatically update device firmware</div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalDevices}</div>
                <p className="text-xs text-muted-foreground">4 printers, 4 payment terminals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Online Devices</CardTitle>
                <Wifi className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{onlineDevices}</div>
                <p className="text-xs text-muted-foreground">{onlinePercentage}% of total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Connection</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5 min ago</div>
                <p className="text-xs text-muted-foreground">Front Desk Terminal</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Network Status</CardTitle>
                <Wifi className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Stable</div>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
