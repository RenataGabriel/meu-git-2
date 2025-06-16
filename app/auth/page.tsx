"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Github, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard or handle login
      window.location.href = "/products"
    }, 2000)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle signup success
    }, 2000)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
        {/* Header */}
        <header className="flex items-center justify-between p-4">
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">P</span>
              </div>
              <h1 className="text-2xl font-bold">Welcome to ProductHub</h1>
              <p className="text-muted-foreground">Manage your products with ease</p>
            </div>

            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Get Started</CardTitle>
                <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  {/* Login Tab */}
                  <TabsContent value="login" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" />
                          <Label htmlFor="remember" className="text-sm">
                            Remember me
                          </Label>
                        </div>
                        <Button variant="link" className="px-0 text-sm">
                          Forgot password?
                        </Button>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Signup Tab */}
                  <TabsContent value="signup" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupEmail">Email</Label>
                        <Input id="signupEmail" type="email" placeholder="m@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupPassword">Password</Label>
                        <div className="relative">
                          <Input
                            id="signupPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Button variant="link" className="px-0 text-sm h-auto">
                            Terms of Service
                          </Button>{" "}
                          and{" "}
                          <Button variant="link" className="px-0 text-sm h-auto">
                            Privacy Policy
                          </Button>
                        </Label>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-muted-foreground">
              <p>
                Need help?{" "}
                <Button variant="link" className="px-0 text-sm h-auto">
                  Contact Support
                </Button>
              </p>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </div>
    </ThemeProvider>
  )
}
