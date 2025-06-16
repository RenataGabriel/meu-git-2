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
  Package,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Archive,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react"
import { HeaderUser } from "@/components/header-user"
import Link from "next/link"
import { Label } from "@/components/ui/label"

// Sample product data
const products = [
  {
    id: "PROD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    status: "active",
    lastUpdated: "2024-01-15",
    sales: 234,
  },
  {
    id: "PROD-002",
    name: "Smart Watch",
    category: "Electronics",
    price: 299.99,
    stock: 12,
    status: "low-stock",
    lastUpdated: "2024-01-14",
    sales: 156,
  },
  {
    id: "PROD-003",
    name: "Coffee Maker",
    category: "Home & Kitchen",
    price: 89.99,
    stock: 0,
    status: "out-of-stock",
    lastUpdated: "2024-01-13",
    sales: 89,
  },
  {
    id: "PROD-004",
    name: "Yoga Mat",
    category: "Sports & Fitness",
    price: 29.99,
    stock: 78,
    status: "active",
    lastUpdated: "2024-01-12",
    sales: 312,
  },
  {
    id: "PROD-005",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    stock: 23,
    status: "active",
    lastUpdated: "2024-01-11",
    sales: 198,
  },
  {
    id: "PROD-006",
    name: "Desk Lamp",
    category: "Home & Office",
    price: 45.99,
    stock: 5,
    status: "low-stock",
    lastUpdated: "2024-01-10",
    sales: 67,
  },
]

const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

const categories = ["Electronics", "Home & Kitchen", "Sports & Fitness", "Home & Office"]
const statuses = ["active", "low-stock", "out-of-stock"]

export default function ProductsPage() {
  const [showFilters, setShowFilters] = React.useState(false)
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([])
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 1000 })
  const [sortBy, setSortBy] = React.useState<string>("")
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filteredProducts, setFilteredProducts] = React.useState(products)
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        )
      case "low-stock":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Low Stock
          </Badge>
        )
      case "out-of-stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStockIcon = (stock: number) => {
    if (stock === 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    if (stock < 20) return <Minus className="h-4 w-4 text-yellow-500" />
    return <TrendingUp className="h-4 w-4 text-green-500" />
  }

  React.useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Filtro por categoria
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Filtro por status
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((product) => selectedStatuses.includes(product.status))
    }

    // Filtro por preço
    filtered = filtered.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)

    // Ordenação
    if (sortBy) {
      filtered.sort((a, b) => {
        let aValue, bValue
        switch (sortBy) {
          case "name":
            aValue = a.name.toLowerCase()
            bValue = b.name.toLowerCase()
            break
          case "price":
            aValue = a.price
            bValue = b.price
            break
          case "stock":
            aValue = a.stock
            bValue = b.stock
            break
          case "lastUpdated":
            aValue = new Date(a.lastUpdated)
            bValue = new Date(b.lastUpdated)
            break
          default:
            return 0
        }

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
        return 0
      })
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategories, selectedStatuses, priceRange, sortBy, sortOrder])

  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const lowStockProducts = products.filter((p) => p.status === "low-stock").length
  const outOfStockProducts = products.filter((p) => p.status === "out-of-stock").length

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedStatuses([])
    setPriceRange({ min: 0, max: 1000 })
    setSortBy("")
    setSortOrder("asc")
    setSearchTerm("")
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedStatuses.length > 0 ||
    priceRange.min > 0 ||
    priceRange.max < 1000 ||
    sortBy !== ""

  const isAllSelected = filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length
  const isIndeterminate = selectedProducts.length > 0 && selectedProducts.length < filteredProducts.length

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
                  <BreadcrumbPage>All Products</BreadcrumbPage>
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
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProducts}</div>
                <p className="text-xs text-muted-foreground">
                  {((activeProducts / totalProducts) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                <Minus className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lowStockProducts}</div>
                <p className="text-xs text-muted-foreground">Needs attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{outOfStockProducts}</div>
                <p className="text-xs text-muted-foreground">Requires restocking</p>
              </CardContent>
            </Card>
          </div>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your product inventory and details
                    {selectedProducts.length > 0 && (
                      <span className="ml-2 text-primary">({selectedProducts.length} selected)</span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {selectedProducts.length > 0 && (
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
                    <Link href="/products/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? "bg-primary/10" : ""}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2 h-4 w-4 p-0 text-xs flex items-center justify-center">
                      !
                    </Badge>
                  )}
                </Button>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>

              {showFilters && (
                <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Filtro por Categoria */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Categories</Label>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCategories([...selectedCategories, category])
                                } else {
                                  setSelectedCategories(selectedCategories.filter((c) => c !== category))
                                }
                              }}
                            />
                            <Label htmlFor={`category-${category}`} className="text-sm">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Filtro por Status */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="space-y-2">
                        {statuses.map((status) => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                              id={`status-${status}`}
                              checked={selectedStatuses.includes(status)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedStatuses([...selectedStatuses, status])
                                } else {
                                  setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
                                }
                              }}
                            />
                            <Label htmlFor={`status-${status}`} className="text-sm capitalize">
                              {status.replace("-", " ")}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Filtro por Preço */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Price Range</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">to</span>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                            className="w-20"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${priceRange.min} - ${priceRange.max}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all products"
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        {...(isIndeterminate && { "data-state": "indeterminate" })}
                      />
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-medium"
                        onClick={() => {
                          if (sortBy === "name") {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          } else {
                            setSortBy("name")
                            setSortOrder("asc")
                          }
                        }}
                      >
                        Product
                        {sortBy === "name" ? (
                          sortOrder === "asc" ? (
                            <ChevronUp className="ml-1 h-3 w-3" />
                          ) : (
                            <ChevronDown className="ml-1 h-3 w-3" />
                          )
                        ) : (
                          <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-medium"
                        onClick={() => {
                          if (sortBy === "price") {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          } else {
                            setSortBy("price")
                            setSortOrder("asc")
                          }
                        }}
                      >
                        Price
                        {sortBy === "price" ? (
                          sortOrder === "asc" ? (
                            <ChevronUp className="ml-1 h-3 w-3" />
                          ) : (
                            <ChevronDown className="ml-1 h-3 w-3" />
                          )
                        ) : (
                          <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-medium"
                        onClick={() => {
                          if (sortBy === "stock") {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          } else {
                            setSortBy("stock")
                            setSortOrder("asc")
                          }
                        }}
                      >
                        Stock
                        {sortBy === "stock" ? (
                          sortOrder === "asc" ? (
                            <ChevronUp className="ml-1 h-3 w-3" />
                          ) : (
                            <ChevronDown className="ml-1 h-3 w-3" />
                          )
                        ) : (
                          <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-medium"
                        onClick={() => {
                          if (sortBy === "lastUpdated") {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          } else {
                            setSortBy("lastUpdated")
                            setSortOrder("asc")
                          }
                        }}
                      >
                        Last Updated
                        {sortBy === "lastUpdated" ? (
                          sortOrder === "asc" ? (
                            <ChevronUp className="ml-1 h-3 w-3" />
                          ) : (
                            <ChevronDown className="ml-1 h-3 w-3" />
                          )
                        ) : (
                          <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                          aria-label={`Select ${product.name}`}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">{product.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStockIcon(product.stock)}
                          <span>{product.stock}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>{product.lastUpdated}</TableCell>
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
                              Edit product
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">No products found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your search terms or add a new product.
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
