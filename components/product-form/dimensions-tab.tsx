"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function DimensionsTab() {
  return (
    <div className="space-y-6">
      {/* Physical Dimensions */}
      <Card>
        <CardHeader>
          <CardTitle>Physical Dimensions</CardTitle>
          <CardDescription>Product size and physical measurements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input id="length" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input id="width" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input id="height" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimension-unit">Unit</Label>
              <Select defaultValue="cm">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mm">Millimeters (mm)</SelectItem>
                  <SelectItem value="cm">Centimeters (cm)</SelectItem>
                  <SelectItem value="m">Meters (m)</SelectItem>
                  <SelectItem value="in">Inches (in)</SelectItem>
                  <SelectItem value="ft">Feet (ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weight */}
      <Card>
        <CardHeader>
          <CardTitle>Weight</CardTitle>
          <CardDescription>Product weight information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input id="weight" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight-unit">Unit</Label>
              <Select defaultValue="kg">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">Grams (g)</SelectItem>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="oz">Ounces (oz)</SelectItem>
                  <SelectItem value="lb">Pounds (lb)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="volume-weight">Volumetric Weight</Label>
              <Input id="volume-weight" type="number" placeholder="0.00" step="0.01" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Packaging */}
      <Card>
        <CardHeader>
          <CardTitle>Packaging</CardTitle>
          <CardDescription>Packaging dimensions and specifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="custom-packaging" />
            <Label htmlFor="custom-packaging">Use custom packaging dimensions</Label>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="package-length">Package Length</Label>
              <Input id="package-length" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="package-width">Package Width</Label>
              <Input id="package-width" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="package-height">Package Height</Label>
              <Input id="package-height" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="package-unit">Unit</Label>
              <Select defaultValue="cm">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mm">Millimeters (mm)</SelectItem>
                  <SelectItem value="cm">Centimeters (cm)</SelectItem>
                  <SelectItem value="m">Meters (m)</SelectItem>
                  <SelectItem value="in">Inches (in)</SelectItem>
                  <SelectItem value="ft">Feet (ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="package-weight">Package Weight</Label>
              <Input id="package-weight" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="package-material">Package Material</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardboard">Cardboard</SelectItem>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="bubble-wrap">Bubble Wrap</SelectItem>
                  <SelectItem value="foam">Foam</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
          <CardDescription>Shipping-related specifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="requires-shipping" defaultChecked />
            <Label htmlFor="requires-shipping">This product requires shipping</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="fragile" />
            <Label htmlFor="fragile">Fragile item (requires special handling)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="hazardous" />
            <Label htmlFor="hazardous">Hazardous material</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin-country">Country of Origin</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="br">Brazil</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-code">HS Code</Label>
              <Input id="hs-code" placeholder="Harmonized System code" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
