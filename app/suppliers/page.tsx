"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { HeaderUser } from "@/components/header-user"
import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  Filter,
  Download,
  Archive,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Building,
  Users,
  CheckCircle,
  Clock,
  X,
} from "lucide-react"
import Link from "next/link"

// Mock data for suppliers
const mockSuppliers = [
  {
    id: "1",
    name: "Tech Solutions Ltda",
    email: "contato@techsolutions.com.br",
    phone: "(11) 98765-4321",
    cnpj: "12.345.678/0001-90",
    category: "Technology",
    status: "active",
    totalInvoices: 15,
    totalAmount: 45000.0,
    lastInvoice: "2024-01-15",
    address: "São Paulo, SP",
  },
  {
    id: "2",
    name: "Office Supplies Co.",
    email: "vendas@officesupplies.com.br",
    phone: "(11) 97654-3210",
    cnpj: "98.765.432/0001-10",
    category: "Office Supplies",
    status: "active",
    totalInvoices: 8,
    totalAmount: 12000.0,
    lastInvoice: "2024-01-20",
    address: "Rio de Janeiro, RJ",
  },
  {
    id: "3",
    name: "Cloud Services Inc.",
    email: "billing@cloudservices.com",
    phone: "+1 (555) 123-4567",
    cnpj: "11.222.333/0001-44",
    category: "Services",
    status: "inactive",
    totalInvoices: 3,
    totalAmount: 8500.0,
    lastInvoice: "2023-12-10",
    address: "International",
  },
  {
    id: "4",
    name: "Marketing Agency",
    email: "financeiro@marketingagency.com.br",
    phone: "(21) 91234-5678",
    cnpj: "55.666.777/0001-88",
    category: "Marketing",
    status: "active",
    totalInvoices: 12,
    totalAmount: 35000.0,
    lastInvoice: "2024-01-18",
    address: "Belo Horizonte, MG",
  },
  {
    id: "5",
    name: "Equipment Rental",
    email: "locacao@equipmentrental.com.br",
    phone: "(11) 95555-1234",
    cnpj: "99.888.777/0001-66",
    category: "Equipment",
    status: "pending",
    totalInvoices: 5,
    totalAmount: 18000.0,
    lastInvoice: "2024-01-12",
    address: "Campinas, SP",
  },
]

type SortField = "name" | "totalAmount" | "totalInvoices" | "lastInvoice"
type SortDirection = "asc" | "desc"

export default function SuppliersPage() {
  const { user } = useUser()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const categories = ["Technology", "Office Supplies", "Services", "Marketing", "Equipment"]
  const statuses = ["active", "inactive", "pending"]

  // Filter and sort suppliers
  const filteredSuppliers = mockSuppliers
    .filter((supplier) => {
      // Search filter
      const searchFilter =
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.cnpj.includes(searchTerm)

      // Category filter
      const categoryFilter = selectedCategories.length === 0 || selectedCategories.includes(supplier.category)

      // Status filter
      const statusFilter = selectedStatuses.length === 0 || selectedStatuses.includes(supplier.status)

      return searchFilter && categoryFilter && statusFilter
    })
    .sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === "totalAmount" || sortField === "totalInvoices") {
        aValue = a[sortField]
        bValue = b[sortField]
      } else if (sortField === "lastInvoice") {
        aValue = new Date(a[sortField])
        bValue = new Date(b[sortField])
      } else {
        aValue = a[sortField].toLowerCase()
        bValue = b[sortField].toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
    }
    return sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        )
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSuppliers(filteredSuppliers.map((supplier) => supplier.id))
    } else {
      setSelectedSuppliers([])
    }
  }

  const handleSelectSupplier = (supplierId: string, checked: boolean) => {
    if (checked) {
      setSelectedSuppliers([...selectedSuppliers, supplierId])
    } else {
      setSelectedSuppliers(selectedSuppliers.filter((id) => id !== supplierId))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedStatuses([])
    setSearchTerm("")
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedStatuses.length > 0 || searchTerm !== ""

  // Calculate statistics
  const activeSuppliers = mockSuppliers.filter((s) => s.status === "active")
  const totalAmount = mockSuppliers.reduce((sum, s) => sum + s.totalAmount, 0)
  const totalInvoices = mockSuppliers.reduce((sum, s) => sum + s.totalInvoices, 0)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center gap-2 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Suppliers</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <HeaderUser user={user} />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-none">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Suppliers</h1>
              <p className="text-muted-foreground">Manage your suppliers and vendor relationships</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button asChild>
                <Link href="/suppliers/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Supplier
                </Link>
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="relative">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              {hasActiveFilters && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              )}
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="p-4 bg-muted/50">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Categories */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Categories</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category])
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== category))
                            }
                          }}
                        />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <div className="space-y-2">
                    {statuses.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={status}
                          checked={selectedStatuses.includes(status)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedStatuses([...selectedStatuses, status])
                            } else {
                              setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
                            }
                          }}
                        />
                        <label htmlFor={status} className="text-sm capitalize">
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Bulk Actions */}
          {selectedSuppliers.length > 0 && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">{selectedSuppliers.length} supplier(s) selected</span>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Selected
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="mr-2 h-4 w-4" />
                Archive Selected
              </Button>
            </div>
          )}

          {/* Table */}
          <div className="rounded-md border w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedSuppliers.length === filteredSuppliers.length && filteredSuppliers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Supplier
                      {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("totalInvoices")}>
                    <div className="flex items-center">
                      Invoices
                      {getSortIcon("totalInvoices")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("totalAmount")}>
                    <div className="flex items-center">
                      Total Amount
                      {getSortIcon("totalAmount")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("lastInvoice")}>
                    <div className="flex items-center">
                      Last Invoice
                      {getSortIcon("lastInvoice")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Building className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No suppliers found</p>
                        <Button asChild size="sm">
                          <Link href="/suppliers/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Add your first supplier
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedSuppliers.includes(supplier.id)}
                          onCheckedChange={(checked) => handleSelectSupplier(supplier.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{supplier.name}</div>
                          <div className="text-sm text-muted-foreground">{supplier.address}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{supplier.email}</div>
                          <div className="text-sm text-muted-foreground">{supplier.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{supplier.cnpj}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{supplier.category}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                      <TableCell className="text-center">{supplier.totalInvoices}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(supplier.totalAmount)}</TableCell>
                      <TableCell>{formatDate(supplier.lastInvoice)}</TableCell>
                      <TableCell className="text-right">
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
                              Edit Supplier
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Supplier
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

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSuppliers.length}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeSuppliers.length}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((activeSuppliers.length / mockSuppliers.length) * 100)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalInvoices}</div>
                <p className="text-xs text-muted-foreground">Across all suppliers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
                <p className="text-xs text-muted-foreground">All time total</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
