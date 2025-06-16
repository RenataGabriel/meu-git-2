"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, Settings, FolderSyncIcon as Sync } from "lucide-react"

export function IntegrationsTab() {
  return (
    <div className="space-y-6">
      {/* Marketplace Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Marketplace Integrations</CardTitle>
          <CardDescription>Configure product listings for various marketplaces</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mercado Livre */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">ML</span>
                </div>
                <div>
                  <h4 className="font-medium">Mercado Livre</h4>
                  <p className="text-sm text-muted-foreground">Brazilian marketplace</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Connected</Badge>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ml-title">Mercado Livre Title</Label>
                <Input id="ml-title" placeholder="Product title for Mercado Livre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ml-category">ML Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Eletrônicos</SelectItem>
                    <SelectItem value="home">Casa e Jardim</SelectItem>
                    <SelectItem value="sports">Esportes e Fitness</SelectItem>
                    <SelectItem value="fashion">Moda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ml-description">ML Description</Label>
              <Textarea id="ml-description" placeholder="Product description for Mercado Livre" rows={3} />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                <Sync className="mr-2 h-4 w-4" />
                Sync Now
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Listing
              </Button>
            </div>
          </div>

          {/* Shopee */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">S</span>
                </div>
                <div>
                  <h4 className="font-medium">Shopee</h4>
                  <p className="text-sm text-muted-foreground">Southeast Asian marketplace</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Not Connected</Badge>
                <Switch />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shopee-title">Shopee Title</Label>
                <Input id="shopee-title" placeholder="Product title for Shopee" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shopee-category">Shopee Category</Label>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="home">Home & Living</SelectItem>
                    <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                Connect Account
              </Button>
            </div>
          </div>

          {/* Amazon */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">A</span>
                </div>
                <div>
                  <h4 className="font-medium">Amazon</h4>
                  <p className="text-sm text-muted-foreground">Global marketplace</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Not Connected</Badge>
                <Switch />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amazon-asin">ASIN</Label>
                <Input id="amazon-asin" placeholder="Amazon Standard Identification Number" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amazon-category">Amazon Category</Label>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="home">Home & Kitchen</SelectItem>
                    <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    <SelectItem value="fashion">Clothing & Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                Connect Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* E-commerce Platforms */}
      <Card>
        <CardHeader>
          <CardTitle>E-commerce Platforms</CardTitle>
          <CardDescription>Sync with your online stores and platforms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* WooCommerce */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">W</span>
                </div>
                <div>
                  <h4 className="font-medium">WooCommerce</h4>
                  <p className="text-sm text-muted-foreground">WordPress e-commerce plugin</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Connected</Badge>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="woo-sku">WooCommerce SKU</Label>
                <Input id="woo-sku" placeholder="Product SKU in WooCommerce" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="woo-status">Product Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="publish">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Sync className="mr-2 h-4 w-4" />
                Sync Now
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View in Store
              </Button>
            </div>
          </div>

          {/* Shopify */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">S</span>
                </div>
                <div>
                  <h4 className="font-medium">Shopify</h4>
                  <p className="text-sm text-muted-foreground">E-commerce platform</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Not Connected</Badge>
                <Switch />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Connect Store
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API & Webhooks */}
      <Card>
        <CardHeader>
          <CardTitle>API & Webhooks</CardTitle>
          <CardDescription>Configure API endpoints and webhook notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" placeholder="https://your-api.com/webhook" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" type="password" placeholder="Your API key" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="webhook-create" />
              <Label htmlFor="webhook-create">Product Created</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="webhook-update" />
              <Label htmlFor="webhook-update">Product Updated</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="webhook-stock" />
              <Label htmlFor="webhook-stock">Stock Changes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="webhook-price" />
              <Label htmlFor="webhook-price">Price Changes</Label>
            </div>
          </div>

          <Button variant="outline">Test Webhook</Button>
        </CardContent>
      </Card>
    </div>
  )
}
