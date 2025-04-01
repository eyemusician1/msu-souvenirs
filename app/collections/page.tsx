"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Collection categories
const collections = [
  {
    id: 1,
    name: "Apparel",
    description: "T-shirts, hoodies, jackets, and more featuring the MSU logo and colors.",
    image: "/placeholder.svg?height=600&width=800",
    itemCount: 24,
    featured: true,
  },
  {
    id: 2,
    name: "Accessories",
    description: "Caps, bags, lanyards, and other accessories to show your MSU pride.",
    image: "/placeholder.svg?height=600&width=800",
    itemCount: 18,
    featured: true,
  },
  {
    id: 3,
    name: "Stationery",
    description: "Notebooks, pens, and other school supplies with the MSU branding.",
    image: "/placeholder.svg?height=600&width=800",
    itemCount: 12,
    featured: false,
  },
  {
    id: 4,
    name: "Memorabilia",
    description: "Collectible items and keepsakes to commemorate your time at MSU.",
    image: "/placeholder.svg?height=600&width=800",
    itemCount: 15,
    featured: false,
  },
  {
    id: 5,
    name: "Gifts",
    description: "Perfect presents for MSU students, alumni, family, and friends.",
    image: "/placeholder.svg?height=600&width=800",
    itemCount: 20,
    featured: true,
  },
  {
    id: 6,
    name: "Limited Edition",
    description: "Special items available for a limited time only.",
    image: "/placeholder.svg?height=600&width=800",
    itemCount: 8,
    featured: false,
  },
]

export default function CollectionsPage() {
  const router = useRouter()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const featuredCollections = collections.filter((collection) => collection.featured)
  const otherCollections = collections.filter((collection) => !collection.featured)

  const handleCollectionClick = (id: number) => {
    router.push(`/products?category=${collections.find((c) => c.id === id)?.name}`)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-primary mb-4">Collections</h1>
        <p className="text-muted-foreground text-lg">
          Browse our curated collections of MSU merchandise and souvenirs.
        </p>
      </div>

      {/* Featured Collections */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-primary mb-8">Featured Collections</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCollections.map((collection, index) => (
            <Card
              key={collection.id}
              className="overflow-hidden border-0 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleCollectionClick(collection.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${hoveredIndex === index ? "scale-110" : "scale-100"}`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-80"}`}
                ></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{collection.name}</h3>
                  <p className="text-sm text-white/80">{collection.itemCount} items</p>
                </div>
                <Button
                  className={`absolute bottom-6 right-6 bg-secondary hover:bg-secondary/90 text-primary rounded-full transition-transform duration-300 ${hoveredIndex === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                >
                  View Collection <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground">{collection.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Collections */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-8">More Collections</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherCollections.map((collection, index) => (
            <Card
              key={collection.id}
              className="overflow-hidden border-0 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleCollectionClick(collection.id)}
              onMouseEnter={() => setHoveredIndex(index + featuredCollections.length)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${hoveredIndex === index + featuredCollections.length ? "scale-110" : "scale-100"}`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${hoveredIndex === index + featuredCollections.length ? "opacity-100" : "opacity-80"}`}
                ></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{collection.name}</h3>
                  <p className="text-sm text-white/80">{collection.itemCount} items</p>
                </div>
                <Button
                  className={`absolute bottom-6 right-6 bg-secondary hover:bg-secondary/90 text-primary rounded-full transition-transform duration-300 ${hoveredIndex === index + featuredCollections.length ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                >
                  View Collection <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground">{collection.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Shop All Banner */}
      <div className="mt-16 bg-muted/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Can't find what you're looking for?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Browse our complete catalog of MSU merchandise and souvenirs to find the perfect item.
        </p>
        <Link href="/products">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 h-auto">
            <ShoppingBag className="h-5 w-5 mr-2" /> Shop All Products
          </Button>
        </Link>
      </div>
    </div>
  )
}

