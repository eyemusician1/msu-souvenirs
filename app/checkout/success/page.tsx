"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle, ArrowRight } from 'lucide-react'

import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  
  // Redirect to home if accessed directly without checkout
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/")
    }, 10000)
    
    return () => clearTimeout(timer)
  }, [router])
  
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
      <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
      
      <h1 className="text-3xl font-bold text-primary mb-4">Order Placed Successfully!</h1>
      
      <p className="text-muted-foreground mb-8">
        Thank you for your purchase! We've received your order and will process it right away.
        You'll receive a confirmation email shortly with your order details.
      </p>
      
      <div className="bg-muted/20 rounded-xl p-6 mb-8">
        <h2 className="font-medium mb-2">Order Information</h2>
        <p className="text-muted-foreground mb-4">
          Order #MSU-{Math.floor(100000 + Math.random() * 900000)}
        </p>
        <p className="text-sm text-muted-foreground">
          A detailed receipt has been sent to your email address.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 h-auto">
            Return to Home
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" className="rounded-full px-8 py-6 h-auto">
            Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

