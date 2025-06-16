"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function FiscalTab() {
  return (
    <div className="space-y-6">
      {/* Tax Information */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Information</CardTitle>
          <CardDescription>Configure tax settings for this product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="taxable" defaultChecked />
            <Label htmlFor="taxable">This product is taxable</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tax-class">Tax Class</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tax class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Rate</SelectItem>
                  <SelectItem value="reduced">Reduced Rate</SelectItem>
                  <SelectItem value="zero">Zero Rate</SelectItem>
                  <SelectItem value="exempt">Tax Exempt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Input id="tax-rate" type="number" placeholder="0.00" step="0.01" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brazilian Fiscal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Brazilian Fiscal Information</CardTitle>
          <CardDescription>NCM, CEST and other Brazilian tax codes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ncm">NCM Code</Label>
              <Input id="ncm" placeholder="0000.00.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cest">CEST Code</Label>
              <Input id="cest" placeholder="00.000.00" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cfop">CFOP</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select CFOP" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5101">5101 - Venda de produção do estabelecimento</SelectItem>
                  <SelectItem value="5102">5102 - Venda de mercadoria adquirida ou recebida de terceiros</SelectItem>
                  <SelectItem value="5405">5405 - Venda de bem do ativo imobilizado</SelectItem>
                  <SelectItem value="6101">6101 - Venda de produção do estabelecimento</SelectItem>
                  <SelectItem value="6102">6102 - Venda de mercadoria adquirida ou recebida de terceiros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cst-icms">CST ICMS</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select CST" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="00">00 - Tributada integralmente</SelectItem>
                  <SelectItem value="10">10 - Tributada e com cobrança do ICMS por substituição tributária</SelectItem>
                  <SelectItem value="20">20 - Com redução de base de cálculo</SelectItem>
                  <SelectItem value="30">
                    30 - Isenta ou não tributada e com cobrança do ICMS por substituição tributária
                  </SelectItem>
                  <SelectItem value="40">40 - Isenta</SelectItem>
                  <SelectItem value="41">41 - Não tributada</SelectItem>
                  <SelectItem value="50">50 - Suspensão</SelectItem>
                  <SelectItem value="51">51 - Diferimento</SelectItem>
                  <SelectItem value="60">60 - ICMS cobrado anteriormente por substituição tributária</SelectItem>
                  <SelectItem value="70">
                    70 - Com redução de base de cálculo e cobrança do ICMS por substituição tributária
                  </SelectItem>
                  <SelectItem value="90">90 - Outras</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cst-pis">CST PIS</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select CST PIS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">01 - Operação Tributável com Alíquota Básica</SelectItem>
                  <SelectItem value="02">02 - Operação Tributável com Alíquota Diferenciada</SelectItem>
                  <SelectItem value="03">
                    03 - Operação Tributável com Alíquota por Unidade de Medida de Produto
                  </SelectItem>
                  <SelectItem value="04">04 - Operação Tributável Monofásica - Revenda a Alíquota Zero</SelectItem>
                  <SelectItem value="05">05 - Operação Tributável por Substituição Tributária</SelectItem>
                  <SelectItem value="06">06 - Operação Tributável a Alíquota Zero</SelectItem>
                  <SelectItem value="07">07 - Operação Isenta da Contribuição</SelectItem>
                  <SelectItem value="08">08 - Operação sem Incidência da Contribuição</SelectItem>
                  <SelectItem value="09">09 - Operação com Suspensão da Contribuição</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icms-rate">ICMS Rate (%)</Label>
              <Input id="icms-rate" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ipi-rate">IPI Rate (%)</Label>
              <Input id="ipi-rate" type="number" placeholder="0.00" step="0.01" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* International Trade */}
      <Card>
        <CardHeader>
          <CardTitle>International Trade</CardTitle>
          <CardDescription>Import/export and customs information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customs-value">Customs Value</Label>
              <Input id="customs-value" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customs-description">Customs Description</Label>
              <Input id="customs-description" placeholder="Product description for customs" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="export-notes">Export Notes</Label>
            <Textarea id="export-notes" placeholder="Additional notes for export documentation" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Certifications</CardTitle>
          <CardDescription>Product compliance and certification information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="ce-marking" />
              <Label htmlFor="ce-marking">CE Marking</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="fcc-approved" />
              <Label htmlFor="fcc-approved">FCC Approved</Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="rohs-compliant" />
              <Label htmlFor="rohs-compliant">RoHS Compliant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="energy-star" />
              <Label htmlFor="energy-star">Energy Star Certified</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications">Additional Certifications</Label>
            <Textarea
              id="certifications"
              placeholder="List any additional certifications or compliance standards"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
