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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeaderUser } from "@/components/header-user"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"
import { useUser } from "@/contexts/user-context"

const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    icon: Star,
    features: [
      "Up to 100 products",
      "Basic inventory management",
      "Standard support",
      "Basic reports",
      "1 user account",
    ],
    limitations: ["No advanced analytics", "No device management", "Limited integrations"],
    buttonText: "Current Plan",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    period: "per month",
    description: "Great for small businesses",
    icon: Zap,
    features: [
      "Up to 1,000 products",
      "Advanced inventory management",
      "Priority support",
      "Advanced reports & analytics",
      "Up to 3 user accounts",
      "Basic device management",
      "Email integrations",
    ],
    buttonText: "Upgrade to Starter",
    buttonVariant: "default" as const,
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "Most popular for growing businesses",
    icon: Crown,
    features: [
      "Unlimited products",
      "Full inventory management",
      "24/7 priority support",
      "Advanced analytics & insights",
      "Up to 10 user accounts",
      "Full device management",
      "All integrations included",
      "Custom reports",
      "API access",
      "Multi-location support",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    popular: true,
    savings: "Save $118/year",
  },
  {
    id: "business",
    name: "Business",
    price: "$99",
    period: "per month",
    description: "For larger teams and enterprises",
    icon: Rocket,
    features: [
      "Everything in Pro",
      "Unlimited user accounts",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security features",
      "SLA guarantee",
      "Custom training",
      "White-label options",
      "Advanced permissions",
      "Audit logs",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "Tailored solutions for large organizations",
    icon: Crown,
    features: [
      "Everything in Business",
      "Custom development",
      "On-premise deployment",
      "Advanced compliance",
      "Custom SLA",
      "Dedicated infrastructure",
      "24/7 phone support",
      "Custom integrations",
      "Advanced security",
      "Compliance certifications",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
  },
]

export default function PlansPage() {
  const { user } = useUser()

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
                  <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Plans & Pricing</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <HeaderUser user={userData} />
        </header>

        <div className="flex flex-1 flex-col gap-8 p-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Choose Your Plan</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Unlock powerful features to grow your business. Upgrade or downgrade at any time.
              </p>
            </div>

            {/* Current Plan Badge */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Current plan:</span>
              <Badge variant={user.plan === "PRO" ? "default" : "secondary"} className="text-sm">
                {user.plan}
              </Badge>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon
              const isCurrentPlan = user.plan.toLowerCase() === plan.id

              return (
                <Card
                  key={plan.id}
                  className={`relative ${
                    plan.popular ? "border-primary shadow-lg scale-105" : ""
                  } ${isCurrentPlan ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-3 right-4">
                      <Badge variant="secondary" className="bg-green-500 text-white">
                        Current
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`p-3 rounded-full ${
                          plan.popular ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "bg-muted"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold">
                        {plan.price}
                        {plan.price !== "Custom" && (
                          <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                        )}
                      </div>
                      {plan.savings && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          {plan.savings}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <Button
                      className="w-full"
                      variant={isCurrentPlan ? "outline" : plan.buttonVariant}
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? "Current Plan" : plan.buttonText}
                    </Button>

                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Features included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, PayPal, and bank transfers for annual plans.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is there a free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Yes! All paid plans come with a 14-day free trial. No credit card required.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We offer a 30-day money-back guarantee for all paid plans. No questions asked.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center space-y-4 py-8">
            <h3 className="text-xl font-semibold">Need help choosing a plan?</h3>
            <p className="text-muted-foreground">
              Our team is here to help you find the perfect plan for your business.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline">Contact Sales</Button>
              <Button variant="outline">Schedule Demo</Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
