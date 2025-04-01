"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleShopNow = () => {
    router.push("/products")
  }

  const handleViewCollections = () => {
    router.push("/collections")
  }

  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/80 min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="MSU Campus"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>
      <div className="container mx-auto px-4 z-10 py-20">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Carry Your University Pride
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our exclusive collection of MSU Main merchandise. From premium apparel to unique accessories, find
            the perfect souvenir to celebrate your alma mater.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-8 py-7 h-auto text-lg font-medium"
              onClick={handleShopNow}
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 border-2 border-white rounded-full px-8 py-7 h-auto text-lg font-medium"
              onClick={handleViewCollections}
            >
              View Collections
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

