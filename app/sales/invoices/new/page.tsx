"use client"

import { useState } from "react"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ArrowLeft, CalendarIcon, Plus, Trash2, Building, FileText, DollarSign } from "lucide-react"
import Link from "next/link"

// Mock suppliers data
const mockSuppliers = [
  {
    id: "1",
    name: "Tech Solutions Ltda",
    email: "contato@techsolutions.com.br",
    company: "Tech Solutions Ltda",
    cnpj: "12.345.678/0001-90",
  },
  {
    id: "2",
    name: "Office Supplies Co.",
    email: "vendas@officesupplies.com.br",
    company: "Office Supplies Co.",
    cnpj: "98.765.432/0001-10",
  },
  {
    id: "3",
    name: "Cloud Services Inc.",
    email: "billing@cloudservices.com",
    company: "Cloud Services Inc.",
    cnpj: "11.222.333/0001-44",
  },
  {
    id: "4",
    name: "Marketing Agency",
    email: "financeiro@marketingagency.com.br",
    company: "Marketing Agency",
    cnpj: "55.666.777/0001-88",
  },
  {
    id: "5",
    name: "Equipment Rental",
    email: "locacao@equipmentrental.com.br",
    company: "Equipment Rental",
    cnpj: "99.888.777/0001-66",
  },
]

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export default function NewInvoicePage() {
  const { user } = useUser()
  const [selectedSupplier, setSelectedSupplier] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("INV-" + Date.now().toString().slice(-6))
  const [issueDate, setIssueDate] = useState<Date>(new Date())
  const [dueDate, setDueDate] = useState<Date>()
  const [category, setCategory] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [notes, setNotes] = useState("")

  const [items, setItems] = useState<InvoiceItem[]>([{ id: "1", description: "", quantity: 1, unitPrice: 0, total: 0 }])

  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [discountValue, setDiscountValue] = useState(0)
  const [taxRate, setTaxRate] = useState(0)

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = discountType === "percentage" ? (subtotal * Math.min(discountValue, 100)) / 100 : discountValue
  const taxAmount = ((subtotal - discountAmount) * taxRate) / 100
  const total = subtotal - discountAmount + taxAmount

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const selectedSupplierData = mockSuppliers.find((s) => s.id === selectedSupplier)

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
                  <BreadcrumbLink href="/sales/invoices">Invoices</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>New Invoice</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <HeaderUser user={user} />
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sales/invoices">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Create New Invoice</h1>
                <p className="text-muted-foreground">Register a new supplier invoice for accounts payable</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Invoice Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Invoice Details
                  </CardTitle>
                  <CardDescription>Basic information about the supplier invoice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="invoice-number">Invoice Number</Label>
                      <Input
                        id="invoice-number"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        placeholder="INV-001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="software">Software</SelectItem>
                          <SelectItem value="office-supplies">Office Supplies</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Issue Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !issueDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {issueDate ? format(issueDate, "PPP", { locale: ptBR }) : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={issueDate} onSelect={setIssueDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dueDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dueDate ? format(dueDate, "PPP", { locale: ptBR }) : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Supplier Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Supplier Information
                  </CardTitle>
                  <CardDescription>Select the supplier for this invoice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockSuppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{supplier.name}</span>
                              <span className="text-sm text-muted-foreground">{supplier.email}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedSupplierData && (
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{selectedSupplierData.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedSupplierData.email}</p>
                        <p className="text-sm text-muted-foreground">CNPJ: {selectedSupplierData.cnpj}</p>
                        <p className="text-sm text-muted-foreground">{selectedSupplierData.company}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/suppliers/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Supplier
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Invoice Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Items</CardTitle>
                  <CardDescription>Add items and services from this supplier invoice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="grid gap-4 md:grid-cols-12 items-end p-4 border rounded-lg">
                      <div className="md:col-span-5">
                        <Label htmlFor={`description-${item.id}`}>Description</Label>
                        <Textarea
                          id={`description-${item.id}`}
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          placeholder="Describe the item or service"
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                        <Input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor={`unit-price-${item.id}`}>Unit Price</Label>
                        <Input
                          id={`unit-price-${item.id}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Total</Label>
                        <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center">
                          {formatCurrency(item.total)}
                        </div>
                      </div>
                      <div className="md:col-span-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={addItem} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>Notes and additional details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any additional notes or terms..."
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              {/* Invoice Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Invoice Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>

                    {/* Discount */}
                    <div className="space-y-2">
                      <Label>Discount</Label>
                      <div className="flex gap-2">
                        <Select
                          value={discountType}
                          onValueChange={(value: "percentage" | "fixed") => setDiscountType(value)}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">%</SelectItem>
                            <SelectItem value="fixed">R$</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          min="0"
                          max={discountType === "percentage" ? 100 : undefined}
                          step={discountType === "percentage" ? "1" : "0.01"}
                          value={discountValue}
                          onChange={(e) => {
                            const value = Number.parseFloat(e.target.value) || 0
                            if (discountType === "percentage" && value > 100) {
                              setDiscountValue(100)
                            } else {
                              setDiscountValue(value)
                            }
                          }}
                          placeholder="0"
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Discount Amount:</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                      </div>
                    </div>

                    {/* Tax */}
                    <div className="space-y-2">
                      <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                      <Input
                        id="tax-rate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number.parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                      <div className="flex justify-between text-sm">
                        <span>Tax Amount:</span>
                        <span>+{formatCurrency(taxAmount)}</span>
                      </div>
                    </div>

                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      Create Invoice
                    </Button>
                    <Button variant="outline" className="w-full">
                      Save as Draft
                    </Button>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link href="/sales/invoices">Cancel</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
