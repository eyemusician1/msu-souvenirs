"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

export type WishlistItem = {
  id: number
  name: string
  price: number
  image: string
  category: string
}

type WishlistContextType = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: number) => void
  clearWishlist: () => void
  itemCount: number
  isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Calculate total number of items in wishlist
  const itemCount = items.length

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const storedWishlist = localStorage.getItem("msu-wishlist")
    if (storedWishlist) {
      try {
        setItems(JSON.parse(storedWishlist))
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e)
      }
    }
  }, [])

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("msu-wishlist", JSON.stringify(items))
    }
  }, [items, mounted])

  // Add item to wishlist
  const addItem = (newItem: WishlistItem) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex > -1) {
        return currentItems
      } else {
        toast({
          title: "Added to wishlist",
          description: `${newItem.name} has been added to your wishlist`,
        })
        return [...currentItems, newItem]
      }
    })
  }

  // Remove item from wishlist
  const removeItem = (id: number) => {
    setItems((currentItems) => {
      const itemToRemove = currentItems.find((item) => item.id === id)

      if (itemToRemove) {
        toast({
          title: "Removed from wishlist",
          description: `${itemToRemove.name} has been removed from your wishlist`,
        })
      }

      return currentItems.filter((item) => item.id !== id)
    })
  }

  // Clear wishlist
  const clearWishlist = () => {
    setItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    })
  }

  const isInWishlist = (id: number) => {
    return items.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearWishlist,
        itemCount,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

