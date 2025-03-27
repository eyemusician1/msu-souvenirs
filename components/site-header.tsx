"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingBag, User, Heart, Menu, X, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cartCount, setCartCount] = useState(3)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <nav className="flex flex-col gap-6 mt-8 px-7">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`justify-start text-lg ${
                    pathname === item.href ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => handleNavigation(item.href)}
                >
                  {item.name}
                </Button>
              ))}
              <Button
                variant="ghost"
                className="justify-start text-lg text-muted-foreground hover:text-primary"
                onClick={() => handleNavigation("/auth/signin")}
              >
                Sign In
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-6 font-bold text-xl text-primary p-0"
            onClick={() => handleNavigation("/")}
          >
            MSU Souvenirs
          </Button>

          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={
                  pathname === item.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground transition-colors hover:text-primary"
                }
                onClick={() => handleNavigation(item.href)}
              >
                {item.name}
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="relative flex-1 max-w-sm mr-4">
              <Input
                placeholder="Search products..."
                className="pr-8 rounded-full"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="hidden sm:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={() => handleNavigation("/wishlist")}>
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative" onClick={() => handleNavigation("/cart")}>
            <ShoppingBag className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary text-primary text-xs">
              {cartCount}
            </Badge>
            <span className="sr-only">Cart</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            onClick={() => handleNavigation("/auth/signin")}
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

