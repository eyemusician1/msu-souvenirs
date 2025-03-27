"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShoppingBag, Heart } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

// Mock product data
const products = [
  {
    id: 1,
    name: "MSU Varsity Jacket",
    price: 1299,
    image: "/placeholder.svg?height=400&width=400",
    category: "Apparel",
    isNew: true,
  },
  {
    id: 2,
    name: "MSU Embroidered Cap",
    price: 499,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
    isNew: false,
  },
  {
    id: 3,
    name: "MSU Tumbler",
    price: 599,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
    isNew: true,
  },
  {
    id: 4,
    name: "MSU Hoodie",
    price: 999,
    image: "/placeholder.svg?height=400&width=400",
    category: "Apparel",
    isNew: false,
  },
]

export default function FeaturedProducts() {
  const router = useRouter()
  const [wishlist, setWishlist] = useState<number[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((itemId) => itemId !== id))
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      })
    } else {
      setWishlist([...wishlist, id])
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist",
      })
    }
  }

  const addToCart = (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    })
  }

  const handleProductClick = (id: number) => {
    router.push(`/products/${id}`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <Card
          key={product.id}
          className="overflow-hidden group border-0 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => handleProductClick(product.id)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ${hoveredIndex === index ? "scale-110" : "scale-100"}`}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full shadow-md z-10"
              onClick={(e) => toggleWishlist(product.id, e)}
            >
              <Heart
                className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </Button>
            {product.isNew && (
              <Badge className="absolute top-3 left-3 bg-secondary text-primary font-medium px-3 py-1 rounded-full z-10">
                New
              </Badge>
            )}
          </div>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1 font-medium">{product.category}</div>
            <h3 className="font-bold text-xl mb-2 line-clamp-1 text-primary">{product.name}</h3>
            <div className="font-bold text-xl text-primary">₱{product.price.toLocaleString()}</div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 h-auto"
              onClick={(e) => addToCart(product.name, e)}
            >
              <ShoppingBag className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

