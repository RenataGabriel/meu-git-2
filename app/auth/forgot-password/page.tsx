"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
        {/* Header */}
        <header className="flex items-center justify-between p-4">
          <Link href="/auth" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
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
              <h1 className="text-2xl font-bold">Reset Your Password</h1>
              <p className="text-muted-foreground">
                {isEmailSent
                  ? "Check your email for reset instructions"
                  : "Enter your email to receive reset instructions"}
              </p>
            </div>

            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-center">{isEmailSent ? "Email Sent!" : "Forgot Password"}</CardTitle>
                <CardDescription className="text-center">
                  {isEmailSent
                    ? "We've sent password reset instructions to your email address."
                    : "No worries, we'll send you reset instructions."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEmailSent ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">We sent a password reset link to:</p>
                      <p className="font-medium">{email}</p>
                    </div>
                    <div className="space-y-2">
                      <Button asChild className="w-full">
                        <Link href="/auth">Back to Sign In</Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setIsEmailSent(false)
                          setEmail("")
                        }}
                      >
                        Try Different Email
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send Reset Instructions"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {!isEmailSent && (
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link href="/auth" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            )}
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
