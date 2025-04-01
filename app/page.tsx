import FeaturedProducts from "@/components/featured-products"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Welcome to MSU Souvenirs</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover official merchandise and souvenirs from Mindanao State University. Show your school pride with our
          quality products.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 h-auto">
              Shop Now
            </Button>
          </Link>
          <Link href="/collections">
            <Button variant="outline" className="rounded-full px-8 py-6 h-auto">
              View Collections
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Featured Products</h2>
          <Link href="/products">
            <Button variant="link" className="text-primary">
              View All
            </Button>
          </Link>
        </div>
        <FeaturedProducts />
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted/20 rounded-2xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">About MSU Souvenirs</h2>
          <p className="text-lg text-muted-foreground mb-6">
            MSU Souvenirs is the official merchandise store for Mindanao State University. We offer a wide range of
            high-quality products featuring the university's colors and emblems.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            From apparel to accessories, our products are designed to help you show your school pride and create lasting
            memories of your time at MSU.
          </p>
          <Link href="/about">
            <Button variant="outline" className="rounded-full px-8 py-6 h-auto">
              Learn More
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}

