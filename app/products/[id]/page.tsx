"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Heart, ChevronLeft, Minus, Plus, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"

// Mock product data
const products = [
  {
    id: 1,
    name: "MSU Varsity Jacket",
    price: 1299,
    description:
      "Show your MSU pride with this premium varsity jacket featuring the university's colors and emblem. Made with high-quality materials for comfort and durability.",
    features: [
      "Premium quality fabric",
      "Embroidered MSU logo",
      "Maroon and gold color scheme",
      "Comfortable fit",
      "Available in multiple sizes",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Apparel",
    isNew: true,
    rating: 4.5,
    reviews: 24,
    inStock: true,
  },
  {
    id: 2,
    name: "MSU Embroidered Cap",
    price: 499,
    description:
      "A stylish cap featuring the embroidered MSU logo. Perfect for sunny days on campus or showing your school spirit anywhere you go.",
    features: [
      "Adjustable strap for perfect fit",
      "Embroidered MSU logo",
      "Breathable cotton material",
      "Curved brim design",
      "One size fits most",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Accessories",
    isNew: false,
    rating: 4.2,
    reviews: 18,
    inStock: true,
  },
  {
    id: 3,
    name: "MSU Tumbler",
    price: 599,
    description:
      "Keep your beverages hot or cold with this high-quality MSU tumbler. Features double-wall insulation and the official MSU logo.",
    features: [
      "Double-wall vacuum insulation",
      "Keeps drinks hot for 6 hours, cold for 12 hours",
      "Stainless steel construction",
      "Leak-proof lid",
      "Fits most cup holders",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Accessories",
    isNew: true,
    rating: 4.8,
    reviews: 32,
    inStock: true,
  },
  {
    id: 4,
    name: "MSU Hoodie",
    price: 999,
    description:
      "Stay warm and comfortable in this cozy MSU hoodie. Features a soft fleece lining and the MSU logo prominently displayed on the front.",
    features: [
      "Soft cotton-polyester blend",
      "Fleece lined for extra warmth",
      "Front kangaroo pocket",
      "Adjustable drawstring hood",
      "Available in multiple sizes",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Apparel",
    isNew: false,
    rating: 4.6,
    reviews: 27,
    inStock: true,
  },
  {
    id: 5,
    name: "MSU Notebook",
    price: 199,
    description:
      "Take notes in style with this premium MSU notebook. Features high-quality paper and a durable cover with the MSU logo.",
    features: [
      "100 sheets of premium lined paper",
      "Hardcover with MSU logo",
      "Bookmark ribbon",
      "Inner pocket for loose papers",
      "Elastic closure band",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Stationery",
    isNew: true,
    rating: 4.3,
    reviews: 15,
    inStock: true,
  },
  {
    id: 6,
    name: "MSU Keychain",
    price: 149,
    description:
      "A stylish and durable keychain featuring the MSU logo. Perfect for keeping your keys organized while showing your school spirit.",
    features: [
      "Metal construction with enamel logo",
      "Split ring for secure key attachment",
      "Compact and lightweight design",
      "Official MSU branding",
      "Makes a great gift",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Memorabilia",
    isNew: false,
    rating: 4.1,
    reviews: 22,
    inStock: true,
  },
  {
    id: 7,
    name: "MSU T-Shirt",
    price: 599,
    description:
      "A comfortable and stylish T-shirt featuring the MSU logo. Made from soft cotton for everyday wear.",
    features: [
      "100% premium cotton",
      "Screen-printed MSU logo",
      "Crew neck design",
      "Comfortable fit",
      "Available in multiple sizes and colors",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Apparel",
    isNew: true,
    rating: 4.7,
    reviews: 36,
    inStock: true,
  },
  {
    id: 8,
    name: "MSU Lanyard",
    price: 199,
    description:
      "Keep your ID, keys, or badge easily accessible with this MSU lanyard. Features the university colors and logo.",
    features: [
      "Durable polyester material",
      "Metal clip and key ring",
      "Breakaway safety feature",
      "MSU colors and logo",
      "Adjustable length",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Accessories",
    isNew: false,
    rating: 4.4,
    reviews: 19,
    inStock: true,
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("m")
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  // Find product by ID
  const productId = parseInt(params.id)
  const product = products.find((p) => p.id === productId)
  
  // If product not found, show error or redirect
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, the product you're looking for doesn't exist.</p>
        <Link href="/products">
          <Button className="bg-primary text-white">Browse All Products</Button>
        </Link>
      </div>
    )
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize,
      category: product.category
    })
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted
        ? `${product.name} has been removed from your wishlist`
        : `${product.name} has been added to your wishlist`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/products" className="text-muted-foreground hover:text-primary flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isNew && <Badge className="absolute top-4 left-4 bg-secondary text-primary">New</Badge>}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer rounded-md overflow-hidden border ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
            <h1 className="text-3xl font-bold text-primary mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-secondary text-secondary"
                        : i < product.rating
                          ? "fill-secondary/50 text-secondary"
                          : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="text-2xl font-bold text-primary mb-4">₱{product.price.toLocaleString()}</div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-medium">Size</label>
                <div className="flex flex-wrap gap-2">
                  {["xs", "s", "m", "l", "xl", "xxl"].map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`h-10 px-4 ${selectedSize === size ? "bg-primary text-white" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Quantity</label>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={increaseQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  size="lg"
                  onClick={addToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleWishlist}
                  className={isWishlisted ? "bg-red-50" : ""}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
              <TabsTrigger value="features" className="flex-1">
                Features
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                Shipping
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <div className="text-muted-foreground">
                <p>
                  This {product.name} is an official MSU Main merchandise item. It features the university's colors and
                  emblem, making it a perfect way to show your school pride.
                </p>
                <p className="mt-2">
                  The product is made with high-quality materials to ensure comfort and durability for everyday use.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="features" className="pt-4">
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="text-muted-foreground">
                <p>Standard shipping: 3-5 business days</p>
                <p className="mt-2">Express shipping: 1-2 business days (additional fee)</p>
                <p className="mt-2">Free shipping on orders over ₱2,000</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

