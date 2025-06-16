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
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Save,
  User,
  Package,
  Truck,
  CreditCard,
  ShoppingCart,
} from "lucide-react"
import { HeaderUser } from "@/components/header-user"
import Link from "next/link"

// Sample data
const customers = [
  { id: "1", name: "João Silva", email: "joao@email.com", phone: "(11) 99999-9999" },
  { id: "2", name: "Maria Oliveira", email: "maria@email.com", phone: "(11) 88888-8888" },
  { id: "3", name: "Pedro Santos", email: "pedro@email.com", phone: "(11) 77777-7777" },
  { id: "4", name: "Ana Sousa", email: "ana@email.com", phone: "(11) 66666-6666" },
]

const availableProducts = [
  { id: "1", name: "Wireless Headphones", code: "WH-001", price: 199.99, stock: 45, category: "Electronics" },
  { id: "2", name: "Smart Watch", code: "SW-002", price: 299.99, stock: 12, category: "Electronics" },
  { id: "3", name: "Coffee Maker", code: "CM-003", price: 89.99, stock: 23, category: "Home & Kitchen" },
  { id: "4", name: "Yoga Mat", code: "YM-004", price: 29.99, stock: 78, category: "Sports & Fitness" },
  { id: "5", name: "Bluetooth Speaker", code: "BS-005", price: 79.99, stock: 34, category: "Electronics" },
  { id: "6", name: "Desk Lamp", code: "DL-006", price: 45.99, stock: 56, category: "Home & Office" },
]

const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

interface OrderItem {
  id: string
  name: string
  code: string
  price: number
  quantity: number
}

interface PaymentMethod {
  id: string
  method: string
  amount: number
}

export default function NewOrderPage() {
  const [selectedCustomer, setSelectedCustomer] = React.useState<string>("")
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([])
  const [productSearch, setProductSearch] = React.useState("")
  const [discountType, setDiscountType] = React.useState<"percentage" | "fixed">("percentage")
  const [discountValue, setDiscountValue] = React.useState<number>(0)
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([])
  const [newPaymentMethod, setNewPaymentMethod] = React.useState("")
  const [newPaymentAmount, setNewPaymentAmount] = React.useState<number>(0)

  const filteredProducts = availableProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.code.toLowerCase().includes(productSearch.toLowerCase()),
  )

  const addProductToOrder = (product: (typeof availableProducts)[0]) => {
    const existingItem = orderItems.find((item) => item.id === product.id)
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setOrderItems([
        ...orderItems,
        {
          id: product.id,
          name: product.name,
          code: product.code,
          price: product.price,
          quantity: 1,
        },
      ])
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setOrderItems(orderItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id))
  }

  const addPaymentMethod = () => {
    if (newPaymentMethod && newPaymentAmount > 0) {
      const newPayment: PaymentMethod = {
        id: Date.now().toString(),
        method: newPaymentMethod,
        amount: newPaymentAmount,
      }
      setPaymentMethods([...paymentMethods, newPayment])
      setNewPaymentMethod("")
      setNewPaymentAmount(0)
    }
  }

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id))
  }

  const updatePaymentAmount = (id: string, amount: number) => {
    setPaymentMethods(paymentMethods.map((pm) => (pm.id === id ? { ...pm, amount } : pm)))
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = discountType === "percentage" ? (subtotal * discountValue) / 100 : discountValue
  const total = subtotal - discountAmount

  const totalPaid = paymentMethods.reduce((sum, pm) => sum + pm.amount, 0)
  const remainingAmount = total - totalPaid

  const selectedCustomerData = customers.find((c) => c.id === selectedCustomer)

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
                  <BreadcrumbLink href="/sales/orders">Sales</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/sales/orders">Orders</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>New Order</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <HeaderUser user={userData} />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/sales/orders">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Create New Order</h1>
                <p className="text-muted-foreground">Add a new order for your customers</p>
              </div>
            </div>
          </div>

          {/* Customer Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
              <CardDescription>Select or add a customer for this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Select Customer</Label>
                  <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{customer.name}</span>
                            <span className="text-sm text-muted-foreground">{customer.email}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Customer
                  </Button>
                </div>
              </div>

              {selectedCustomerData && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Selected Customer:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p className="font-medium">{selectedCustomerData.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{selectedCustomerData.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="font-medium">{selectedCustomerData.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Configure the order products, delivery, and payment information</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="products" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="products" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="delivery" className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Delivery
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment
                  </TabsTrigger>
                </TabsList>

                {/* Products Tab */}
                <TabsContent value="products" className="space-y-4">
                  {/* Product Search */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search products to add..."
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>

                    {/* Available Products */}
                    {productSearch && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Available Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2 max-h-60 overflow-y-auto">
                            {filteredProducts.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                                onClick={() => addProductToOrder(product)}
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">{product.name}</h4>
                                    <Badge variant="outline">{product.code}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {product.category} • Stock: {product.stock}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">R$ {product.price.toFixed(2)}</p>
                                  <Button size="sm" variant="outline">
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Order Items */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Order Items</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {orderItems.length === 0 ? (
                          <div className="text-center py-8">
                            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-sm font-semibold">No items added</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Search and add products to this order.</p>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {orderItems.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell className="font-medium">{item.name}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{item.code}</Badge>
                                  </TableCell>
                                  <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      >
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 0)}
                                        className="w-16 text-center"
                                        min="1"
                                      />
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                  <TableCell>R$ {(item.price * item.quantity).toFixed(2)}</TableCell>
                                  <TableCell className="text-right">
                                    <Button size="sm" variant="outline" onClick={() => removeItem(item.id)}>
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </CardContent>
                    </Card>

                    {/* Order Summary */}
                    {orderItems.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>R$ {subtotal.toFixed(2)}</span>
                            </div>

                            <div className="space-y-2">
                              <Label>Discount</Label>
                              <div className="flex gap-2">
                                <Select
                                  value={discountType}
                                  onValueChange={(value: "percentage" | "fixed") => setDiscountType(value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="percentage">%</SelectItem>
                                    <SelectItem value="fixed">R$</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  type="number"
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
                                  min="0"
                                  step={discountType === "percentage" ? "1" : "0.01"}
                                  max={discountType === "percentage" ? "100" : undefined}
                                />
                              </div>
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Discount amount:</span>
                                <span>- R$ {discountAmount.toFixed(2)}</span>
                              </div>
                            </div>

                            <Separator />
                            <div className="flex justify-between text-lg font-semibold">
                              <span>Total:</span>
                              <span>R$ {total.toFixed(2)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                {/* Delivery Tab */}
                <TabsContent value="delivery" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="delivery-method">Delivery Method</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select delivery method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard Delivery (5-7 days)</SelectItem>
                              <SelectItem value="express">Express Delivery (2-3 days)</SelectItem>
                              <SelectItem value="overnight">Overnight Delivery</SelectItem>
                              <SelectItem value="pickup">Store Pickup</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="delivery-date">Expected Delivery Date</Label>
                          <Input type="date" id="delivery-date" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="delivery-address">Delivery Address</Label>
                        <Textarea id="delivery-address" placeholder="Enter the complete delivery address" rows={3} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="delivery-notes">Delivery Notes</Label>
                        <Textarea id="delivery-notes" placeholder="Special instructions for delivery" rows={2} />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="signature-required" />
                        <Label htmlFor="signature-required">Signature required on delivery</Label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Payment Tab */}
                <TabsContent value="payment" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Add Payment Method */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Add Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Payment Method</Label>
                              <Select value={newPaymentMethod} onValueChange={setNewPaymentMethod}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="credit-card">Credit Card</SelectItem>
                                  <SelectItem value="debit-card">Debit Card</SelectItem>
                                  <SelectItem value="pix">PIX</SelectItem>
                                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                  <SelectItem value="cash">Cash</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Amount</Label>
                              <Input
                                type="number"
                                value={newPaymentAmount}
                                onChange={(e) => setNewPaymentAmount(Number.parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                              />
                            </div>
                            <div className="flex items-end">
                              <Button onClick={addPaymentMethod} className="w-full">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Payment
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Payment Methods Summary */}
                      {paymentMethods.length > 0 && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Payment Methods</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Method</TableHead>
                                  <TableHead>Amount</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {paymentMethods.map((payment) => (
                                  <TableRow key={payment.id}>
                                    <TableCell>
                                      <Badge variant="outline">
                                        {payment.method === "credit-card" && "Credit Card"}
                                        {payment.method === "debit-card" && "Debit Card"}
                                        {payment.method === "pix" && "PIX"}
                                        {payment.method === "bank-transfer" && "Bank Transfer"}
                                        {payment.method === "cash" && "Cash"}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        value={payment.amount}
                                        onChange={(e) =>
                                          updatePaymentAmount(payment.id, Number.parseFloat(e.target.value) || 0)
                                        }
                                        className="w-32"
                                        min="0"
                                        step="0.01"
                                      />
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => removePaymentMethod(payment.id)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      )}

                      {/* Payment Summary */}
                      {orderItems.length > 0 && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Payment Summary</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Order Total:</span>
                                <span>R$ {total.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Paid:</span>
                                <span className="text-green-600">R$ {totalPaid.toFixed(2)}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between text-lg font-semibold">
                                <span>Remaining:</span>
                                <span
                                  className={
                                    remainingAmount > 0
                                      ? "text-red-600"
                                      : remainingAmount < 0
                                        ? "text-orange-600"
                                        : "text-green-600"
                                  }
                                >
                                  R$ {remainingAmount.toFixed(2)}
                                  {remainingAmount > 0 && " (Pending)"}
                                  {remainingAmount < 0 && " (Overpaid)"}
                                  {remainingAmount === 0 && " (Fully Paid)"}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="payment-status">Payment Status</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="partial">Partially Paid</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="payment-terms">Payment Terms</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment terms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate</SelectItem>
                              <SelectItem value="net-15">Net 15 days</SelectItem>
                              <SelectItem value="net-30">Net 30 days</SelectItem>
                              <SelectItem value="net-60">Net 60 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="payment-notes">Payment Notes</Label>
                        <Textarea
                          id="payment-notes"
                          placeholder="Additional payment information or instructions"
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 p-4 border-t bg-background">
            <Button variant="outline" asChild>
              <Link href="/sales/orders">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Create Order
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
