"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShoppingBag, Heart, Filter, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"

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
  {
    id: 5,
    name: "MSU Notebook",
    price: 199,
    image: "/placeholder.svg?height=400&width=400",
    category: "Stationery",
    isNew: true,
  },
  {
    id: 6,
    name: "MSU Keychain",
    price: 149,
    image: "/placeholder.svg?height=400&width=400",
    category: "Memorabilia",
    isNew: false,
  },
  {
    id: 7,
    name: "MSU T-Shirt",
    price: 599,
    image: "/placeholder.svg?height=400&width=400",
    category: "Apparel",
    isNew: true,
  },
  {
    id: 8,
    name: "MSU Lanyard",
    price: 199,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
    isNew: false,
  },
]

const categories = ["All", "Apparel", "Accessories", "Stationery", "Memorabilia"]

export default function ProductsPage() {
  const router = useRouter()
  const { addItem } = useCart()
  const [wishlist, setWishlist] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
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

  const addToCart = (product: (typeof products)[0], e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
    })
  }

  const handleProductClick = (id: number) => {
    router.push(`/products/${id}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality implemented
    toast({
      title: "Search results",
      description: `Showing results for "${searchQuery}"`,
    })
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "newest") return a.isNew ? -1 : 1
    return 0 // featured
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-primary mb-4">MSU Main Souvenirs</h1>
        <p className="text-muted-foreground text-lg">Browse our collection of MSU Main merchandise and souvenirs.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden mb-4 rounded-full">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter products by category and other criteria</SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-mobile-${category}`}
                      checked={selectedCategory === category}
                      onCheckedChange={() => setSelectedCategory(category)}
                    />
                    <Label htmlFor={`category-mobile-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-20">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategory === category}
                      onCheckedChange={() => setSelectedCategory(category)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <form onSubmit={handleSearch} className="w-full sm:w-auto relative">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm rounded-full pr-10 py-6 h-auto"
              />
              {searchQuery ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </form>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="overflow-hidden group border-0 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
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
                      {hoveredIndex === index && (
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-primary/10 transition-opacity duration-300"></div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full shadow-md z-10 transition-transform duration-300 ${
                        hoveredIndex === index ? "scale-110" : "scale-100"
                      }`}
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
                    <h3 className="font-bold text-xl mb-2 line-clamp-1 text-primary group-hover:text-accent transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="font-bold text-xl text-primary">₱{product.price.toLocaleString()}</div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 h-auto group-hover:bg-accent group-hover:text-primary transition-all duration-300 transform group-hover:translate-y-[-2px]"
                      onClick={(e) => addToCart(product, e)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/20 rounded-xl">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
                className="rounded-full"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

