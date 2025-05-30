"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowLeft, LogIn, User, Mail, Lock, ShoppingBag, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/appwrite/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SignInPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState<"student" | "alumni" | "guest">("student")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await signIn(email, password)
      toast({
        title: "Signed in successfully",
        description: "Welcome back to MSU Souvenirs!",
      })
      router.push("/")
    } catch (error: any) {
      console.error("Sign in error:", error)

      let errorMessage = "Please check your credentials and try again."
      if (error.message) {
        if (error.message.includes("Invalid credentials")) {
          errorMessage = "Invalid email or password. Please try again."
        }
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Animation for background elements
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        style={{
          transform: `translate(${position.x * 20}px, ${position.y * 20}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"
        style={{
          transform: `translate(${-position.x * 20}px, ${-position.y * 20}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Welcome message */}
        <div className="hidden md:flex flex-col p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Welcome Back!</h1>
            <p className="text-lg text-muted-foreground">
              Sign in to access your MSU Souvenirs account and continue your shopping experience.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Track Your Orders</h3>
                <p className="text-muted-foreground">View and manage your order history</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-secondary/20 p-3 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Personalized Experience</h3>
                <p className="text-muted-foreground">Get recommendations based on your preferences</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-accent/20 p-3 rounded-full">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Save Your Favorites</h3>
                <p className="text-muted-foreground">Access your wishlist from any device</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Sign in form */}
        <div className="w-full">
          <Button variant="ghost" className="mb-6 pl-0 text-muted-foreground" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to home
          </Button>

          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <div className="bg-primary h-2 w-full"></div>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-primary">Welcome Back</CardTitle>
              <CardDescription className="text-center text-base">Sign in to your MSU Souvenirs account</CardDescription>

              {/* User type tabs */}
              <div className="flex rounded-lg border mt-4 p-1">
                <button
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "student" ? "bg-primary text-white" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveTab("student")}
                >
                  Student
                </button>
                <button
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "alumni" ? "bg-primary text-white" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveTab("alumni")}
                >
                  Alumni
                </button>
                <button
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "guest" ? "bg-primary text-white" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveTab("guest")}
                >
                  Guest
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    Email
                  </Label>
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
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="rounded-lg py-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <Link href="/auth/forgot-password" className="text-sm text-secondary font-medium hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-6 h-auto text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" /> Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="rounded-lg py-6 h-auto">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="rounded-lg py-6 h-auto">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-secondary font-medium hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

