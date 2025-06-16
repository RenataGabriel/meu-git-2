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
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductInfoTab } from "@/components/product-form/product-info-tab"
import { DimensionsTab } from "@/components/product-form/dimensions-tab"
import { FiscalTab } from "@/components/product-form/fiscal-tab"
import { IntegrationsTab } from "@/components/product-form/integrations-tab"
import { HeaderUser } from "@/components/header-user"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export default function NewProductPage() {
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
                  <BreadcrumbLink href="/products">Product</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>New Product</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header User Avatar */}
          <HeaderUser user={userData} />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Product</CardTitle>
              <CardDescription>
                Add a new product to your inventory. Fill in the information across the different tabs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info">Product Info</TabsTrigger>
                  <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                  <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-6">
                  <ProductInfoTab />
                </TabsContent>

                <TabsContent value="dimensions" className="mt-6">
                  <DimensionsTab />
                </TabsContent>

                <TabsContent value="fiscal" className="mt-6">
                  <FiscalTab />
                </TabsContent>

                <TabsContent value="integrations" className="mt-6">
                  <IntegrationsTab />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons - Moved to bottom */}
          <div className="flex items-center justify-between gap-4 p-4 border-t bg-background">
            <Button variant="outline" asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Product
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
