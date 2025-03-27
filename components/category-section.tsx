"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

const categories = [
  {
    name: "Apparel",
    image: "/placeholder.svg?height=300&width=300",
    link: "/products/category/apparel",
  },
  {
    name: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
    link: "/products/category/accessories",
  },
  {
    name: "Stationery",
    image: "/placeholder.svg?height=300&width=300",
    link: "/products/category/stationery",
  },
  {
    name: "Memorabilia",
    image: "/placeholder.svg?height=300&width=300",
    link: "/products/category/memorabilia",
  },
]

export default function CategorySection() {
  const router = useRouter()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleCategoryClick = (link: string) => {
    router.push(link)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {categories.map((category, index) => (
        <div
          key={category.name}
          className="cursor-pointer"
          onClick={() => handleCategoryClick(category.link)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 rounded-xl">
            <div className="relative aspect-square">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className={`object-cover transition-transform duration-500 ${hoveredIndex === index ? "scale-110" : "scale-100"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-bold text-xl text-white">{category.name}</h3>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}

