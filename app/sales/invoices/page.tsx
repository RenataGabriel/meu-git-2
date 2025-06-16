"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
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
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  List,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileSpreadsheet,
  FileCode,
} from "lucide-react"
import Link from "next/link"
import { mockInvoices } from "@/data/mock-invoices"

type SortField = "supplier" | "amount" | "dueDate" | "issueDate"
type SortDirection = "asc" | "desc"
type DateFilter = "all" | "current-month" | "annual" | "custom"

export default function InvoicesPage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>("dueDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [showImportPopover, setShowImportPopover] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([])
  const [amountRange, setAmountRange] = useState({ min: "", max: "" })

  // Date filter states
  const [dateFilter, setDateFilter] = useState<DateFilter>("all")
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  const categories = [
    "Software",
    "Office Supplies",
    "Services",
    "Marketing",
    "Equipment",
    "Utilities",
    "Security",
    "Logistics",
    "Maintenance",
    "Training",
  ]
  const paymentMethods = ["Bank Transfer", "PIX", "Credit Card", "Cash"]

  // Date filter logic
  const getDateFilterRange = () => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    switch (dateFilter) {
      case "all":
        return { from: undefined, to: undefined } // Mostra todos
      case "current-month":
        return {
          from: new Date(currentYear, currentMonth, 1),
          to: new Date(currentYear, currentMonth + 1, 0),
        }
      case "annual":
        return {
          from: new Date(currentYear, 0, 1),
          to: new Date(currentYear, 11, 31),
        }
      case "custom":
        return customDateRange
      default:
        return { from: undefined, to: undefined }
    }
  }

  // Filter and sort invoices
  const filteredInvoices = useMemo(() => {
    const dateRange = getDateFilterRange()

    return mockInvoices
      .filter((invoice) => {
        // Tab filter
        let tabFilter = true
        if (activeTab === "pending") {
          tabFilter = invoice.status === "pending" || invoice.status === "overdue"
        } else if (activeTab === "paid") {
          tabFilter = invoice.status === "paid"
        }

        // Search filter
        const searchFilter =
          invoice.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.id.toLowerCase().includes(searchTerm.toLowerCase())

        // Category filter
        const categoryFilter = selectedCategories.length === 0 || selectedCategories.includes(invoice.category)

        // Payment method filter
        const paymentFilter =
          selectedPaymentMethods.length === 0 || selectedPaymentMethods.includes(invoice.paymentMethod)

        // Amount range filter
        const minAmount = amountRange.min ? Number.parseFloat(amountRange.min) : 0
        const maxAmount = amountRange.max ? Number.parseFloat(amountRange.max) : Number.POSITIVE_INFINITY
        const amountFilter = invoice.amount >= minAmount && invoice.amount <= maxAmount

        // Date filter
        let dateFilterResult = true
        if (dateRange.from || dateRange.to) {
          const invoiceDueDate = new Date(invoice.dueDate)
          if (dateRange.from && invoiceDueDate < dateRange.from) {
            dateFilterResult = false
          }
          if (dateRange.to && invoiceDueDate > dateRange.to) {
            dateFilterResult = false
          }
        }

        return tabFilter && searchFilter && categoryFilter && paymentFilter && amountFilter && dateFilterResult
      })
      .sort((a, b) => {
        let aValue: any = a[sortField]
        let bValue: any = b[sortField]

        if (sortField === "amount") {
          aValue = a.amount
          bValue = b.amount
        } else if (sortField === "dueDate" || sortField === "issueDate") {
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
  }, [
    activeTab,
    searchTerm,
    selectedCategories,
    selectedPaymentMethods,
    amountRange,
    dateFilter,
    customDateRange,
    sortField,
    sortDirection,
  ])

  // Pagination logic
  const totalPages = Math.ceil(filteredInvoices.length / (itemsPerPage === -1 ? filteredInvoices.length : itemsPerPage))
  const paginatedInvoices =
    itemsPerPage === -1
      ? filteredInvoices
      : filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
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
      setSelectedInvoices(paginatedInvoices.map((invoice) => invoice.id))
    } else {
      setSelectedInvoices([])
    }
  }

  const handleSelectInvoice = (invoiceId: string, checked: boolean) => {
    if (checked) {
      setSelectedInvoices([...selectedInvoices, invoiceId])
    } else {
      setSelectedInvoices(selectedInvoices.filter((id) => id !== invoiceId))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedPaymentMethods([])
    setAmountRange({ min: "", max: "" })
    setSearchTerm("")
    setDateFilter("all")
    setCustomDateRange({ from: undefined, to: undefined })
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPaymentMethods.length > 0 ||
    amountRange.min !== "" ||
    amountRange.max !== "" ||
    searchTerm !== "" ||
    dateFilter !== "all" ||
    customDateRange.from ||
    customDateRange.to

  // Calculate statistics
  const allInvoices = mockInvoices
  const pendingInvoices = mockInvoices.filter((inv) => inv.status === "pending" || inv.status === "overdue")
  const paidInvoices = mockInvoices.filter((inv) => inv.status === "paid")
  const overdueInvoices = mockInvoices.filter((inv) => inv.status === "overdue")

  // Calculate filtered statistics
  const filteredStats = useMemo(() => {
    const pending = filteredInvoices.filter((inv) => inv.status === "pending" || inv.status === "overdue")
    const paid = filteredInvoices.filter((inv) => inv.status === "paid")
    const overdue = filteredInvoices.filter((inv) => inv.status === "overdue")

    return {
      totalFiltered: filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0),
      pendingFiltered: pending.reduce((sum, inv) => sum + inv.amount, 0),
      paidFiltered: paid.reduce((sum, inv) => sum + inv.amount, 0),
      overdueCount: overdue.length,
    }
  }, [filteredInvoices])

  const totalPending = pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalPaid = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalRevenue = totalPaid + totalPending

  const getDateFilterLabel = () => {
    switch (dateFilter) {
      case "all":
        return "Todos"
      case "current-month":
        return "Mês Atual"
      case "annual":
        return "Anual"
      case "custom":
        if (customDateRange.from && customDateRange.to) {
          return `${format(customDateRange.from, "dd/MM/yyyy")} - ${format(customDateRange.to, "dd/MM/yyyy")}`
        }
        return "Personalizado"
      default:
        return "Filtro de Data"
    }
  }

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    // Handle file upload logic here
    console.log("Files uploaded:", files)
    setShowImportPopover(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Sales</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Invoices</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <HeaderUser user={user} />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Invoices</h1>
              <p className="text-muted-foreground">Manage your supplier invoices and accounts payable</p>
            </div>
            <div className="flex items-center gap-2">
              <Popover open={showImportPopover} onOpenChange={setShowImportPopover}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Import Invoices</h4>
                      <p className="text-sm text-muted-foreground">Choose a file format to import your invoices</p>
                    </div>

                    <div className="grid gap-2">
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => document.getElementById("xml-file-input")?.click()}
                      >
                        <FileCode className="mr-2 h-4 w-4" />
                        Import XML
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => document.getElementById("excel-file-input")?.click()}
                      >
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Import Excel
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Or drag and drop files here</p>
                      <div
                        className={cn(
                          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                          dragActive
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-muted-foreground/50",
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Drop your XML or Excel files here</p>
                      </div>
                    </div>

                    {/* Hidden file inputs */}
                    <input
                      id="xml-file-input"
                      type="file"
                      accept=".xml"
                      multiple
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    <input
                      id="excel-file-input"
                      type="file"
                      accept=".xlsx,.xls"
                      multiple
                      className="hidden"
                      onChange={handleFileInput}
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button asChild>
                <Link href="/sales/invoices/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Invoice
                </Link>
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                All ({allInvoices.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />A Pagar ({pendingInvoices.length})
              </TabsTrigger>
              <TabsTrigger value="paid" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Pagas ({paidInvoices.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {/* Search and Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
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
                  <div className="grid gap-4 md:grid-cols-4">
                    {/* Date Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Filtro Vencimento</label>
                      <Select value={dateFilter} onValueChange={(value: DateFilter) => setDateFilter(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="current-month">Mês Atual</SelectItem>
                          <SelectItem value="annual">Anual</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>

                      {dateFilter === "custom" && (
                        <div className="mt-2 space-y-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !customDateRange.from && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {customDateRange.from ? format(customDateRange.from, "dd/MM/yyyy") : "Data início"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={customDateRange.from}
                                onSelect={(date) => setCustomDateRange({ ...customDateRange, from: date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !customDateRange.to && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {customDateRange.to ? format(customDateRange.to, "dd/MM/yyyy") : "Data fim"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={customDateRange.to}
                                onSelect={(date) => setCustomDateRange({ ...customDateRange, to: date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                    </div>

                    {/* Categories */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Categories</label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
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

                    {/* Amount Range */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount Range</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Min"
                          type="number"
                          value={amountRange.min}
                          onChange={(e) => setAmountRange({ ...amountRange, min: e.target.value })}
                        />
                        <Input
                          placeholder="Max"
                          type="number"
                          value={amountRange.max}
                          onChange={(e) => setAmountRange({ ...amountRange, max: e.target.value })}
                        />
                      </div>
                      {(amountRange.min || amountRange.max) && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {amountRange.min && `Min: ${formatCurrency(Number.parseFloat(amountRange.min))}`}
                          {amountRange.min && amountRange.max && " - "}
                          {amountRange.max && `Max: ${formatCurrency(Number.parseFloat(amountRange.max))}`}
                        </p>
                      )}
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Payment Methods</label>
                      <div className="space-y-2">
                        {paymentMethods.map((method) => (
                          <div key={method} className="flex items-center space-x-2">
                            <Checkbox
                              id={method}
                              checked={selectedPaymentMethods.includes(method)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedPaymentMethods([...selectedPaymentMethods, method])
                                } else {
                                  setSelectedPaymentMethods(selectedPaymentMethods.filter((m) => m !== method))
                                }
                              }}
                            />
                            <label htmlFor={method} className="text-sm">
                              {method}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Bulk Actions */}
              {selectedInvoices.length > 0 && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">{selectedInvoices.length} invoice(s) selected</span>
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

              {/* Items per page selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show:</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(value === "all" ? -1 : Number.parseInt(value))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">of {filteredInvoices.length} results</span>
                </div>

                {hasActiveFilters && (
                  <div className="text-sm text-muted-foreground">Filtro: {getDateFilterLabel()}</div>
                )}
              </div>

              {/* Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedInvoices.length === paginatedInvoices.length && paginatedInvoices.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("supplier")}>
                        <div className="flex items-center">
                          Supplier
                          {getSortIcon("supplier")}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("amount")}>
                        <div className="flex items-center">
                          Amount
                          {getSortIcon("amount")}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("dueDate")}>
                        <div className="flex items-center">
                          Due Date
                          {getSortIcon("dueDate")}
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("issueDate")}>
                        <div className="flex items-center">
                          Issue Date
                          {getSortIcon("issueDate")}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedInvoices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <p className="text-muted-foreground">No invoices found</p>
                            <Button asChild size="sm">
                              <Link href="/sales/invoices/new">
                                <Plus className="mr-2 h-4 w-4" />
                                Create your first invoice
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedInvoices.includes(invoice.id)}
                              onCheckedChange={(checked) => handleSelectInvoice(invoice.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{invoice.supplier}</div>
                              <div className="text-sm text-muted-foreground">{invoice.supplierEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{formatCurrency(invoice.amount)}</TableCell>
                          <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{invoice.paymentMethod}</Badge>
                          </TableCell>
                          <TableCell>{formatDate(invoice.issueDate)}</TableCell>
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
                                  Edit Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Invoice
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

              {/* Pagination */}
              {itemsPerPage !== -1 && totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredInvoices.length)} of {filteredInvoices.length} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {hasActiveFilters ? "Total Filtered" : "Total Payable"}
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(hasActiveFilters ? filteredStats.totalFiltered : totalRevenue)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {hasActiveFilters ? `${filteredInvoices.length} invoices` : "+12.5% from last month"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {hasActiveFilters ? "Pending Filtered" : "Pending Amount"}
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(hasActiveFilters ? filteredStats.pendingFiltered : totalPending)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {hasActiveFilters
                    ? `${filteredInvoices.filter((inv) => inv.status === "pending" || inv.status === "overdue").length} filtered pending`
                    : `${pendingInvoices.length} invoices pending`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {hasActiveFilters ? "Paid Filtered" : "Paid This Month"}
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(hasActiveFilters ? filteredStats.paidFiltered : totalPaid)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {hasActiveFilters
                    ? `${filteredInvoices.filter((inv) => inv.status === "paid").length} filtered paid`
                    : `${paidInvoices.length} invoices paid`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {hasActiveFilters ? filteredStats.overdueCount : overdueInvoices.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {hasActiveFilters ? "In filtered results" : "Require immediate attention"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
