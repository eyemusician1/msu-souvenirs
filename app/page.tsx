import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"
import HeroSection from "@/components/hero-section"
import CategorySection from "@/components/category-section"
import Testimonials from "@/components/testimonials"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-4">MSU Main Souvenirs</h2>
          <p className="text-muted-foreground text-lg">
            Celebrate your university pride with our exclusive collection of MSU Main merchandise and souvenirs.
          </p>
        </div>

        <CategorySection />

        <div className="my-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-primary">Featured Products</h2>
            <Link href="/products" className="text-secondary flex items-center hover:underline font-medium">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <FeaturedProducts />
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-10 my-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">MSU Alumni Special Collection</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Exclusive merchandise designed specifically for MSU alumni. Show your pride with our limited edition
                collection featuring premium materials and designs.
              </p>
              <Button className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-8 py-6 h-auto text-lg font-medium">
                Shop Alumni Collection
              </Button>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="MSU Alumni Collection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <Testimonials />
      </div>
    </main>
  )
}

