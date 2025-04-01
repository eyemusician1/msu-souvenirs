"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/appwrite/auth-context"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { resetPassword } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await resetPassword(email)
      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
      })
    } catch (error) {
      console.error("Password reset error:", error)
      toast({
        title: "Reset request failed",
        description: "There was a problem sending the reset link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToSignIn = () => {
    router.push("/auth/signin")
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md">
        <Button variant="ghost" className="mb-6 pl-0 text-muted-foreground" onClick={handleBackToSignIn}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to sign in
        </Button>

        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-accent h-2 w-full"></div>
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="text-lg font-medium mb-2">Check your email</div>
                <p className="text-muted-foreground mb-4">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <Button className="mt-2" variant="outline" onClick={() => setIsSubmitted(false)}>
                  Try another email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="rounded-lg py-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 rounded-lg py-6 h-auto text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link href="/auth/signin" className="text-secondary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

