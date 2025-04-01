"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, itemCount, subtotal } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success")
      setIsCheckingOut(false)
    }, 2000)
  }

  const decreaseQuantity = (id: number, quantity: number, size?: string) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1, size)
    } else {
      removeItem(id, size)
    }
  }

  const increaseQuantity = (id: number, quantity: number, size?: string) => {
    updateQuantity(id, quantity + 1, size)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/products" className="text-muted-foreground hover:text-primary flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" /> Continue Shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-primary mb-8">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-muted/20 rounded-xl">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button 
            onClick={() => router.push("/products")}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 h-auto"
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={`${item.id}-${item.size}`} className="overflow-hidden border-0 rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-lg text-primary">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {item.category} {item.size && `• Size: ${item.size.toUpperCase()}`}
                          </p>
                          <div className="font-bold text-primary">₱{item.price.toLocaleString()}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center mt-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => decreaseQuantity(item.id, item.quantity, item.size)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => increaseQuantity(item.id, item.quantity, item.size)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="border-0 rounded-xl shadow-sm sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                    <span>₱{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₱{subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 h-auto"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full mt-4 text-muted-foreground hover:text-destructive"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

