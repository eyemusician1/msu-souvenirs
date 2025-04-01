"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  category: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number, size?: string) => void
  updateQuantity: (id: number, quantity: number, size?: string) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Calculate total number of items in cart
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const storedCart = localStorage.getItem("msu-cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("msu-cart", JSON.stringify(items))
    }
  }, [items, mounted])

  // Add item to cart
  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      // Check if item already exists with same ID and size
      const existingItemIndex = currentItems.findIndex(
        item => item.id === newItem.id && item.size === newItem.size
      )

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        
        toast({
          title: "Cart updated",
          description: `${newItem.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        })
        
        return updatedItems
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${newItem.name} has been added to your cart`,
        })
        
        return [...currentItems, newItem]
      }
    })
  }

  // Remove item from cart
  const removeItem = (id: number, size?: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(
        item => item.id === id && item.size === size
      )
      
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} has been removed from your cart`,
        })
      }
      
      return currentItems.filter(
        item => !(item.id === id && item.size === size)
      )
    })
  }

  // Update quantity of item in cart
  const updateQuantity = (id: number, quantity: number, size?: string) => {
    setItems(currentItems => {
      return currentItems.map(item => {
        if (item.id === id && item.size === size) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  // Clear cart
  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

