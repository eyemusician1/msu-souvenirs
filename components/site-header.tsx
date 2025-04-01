"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { User, Heart, Menu, X, Search, ShoppingCart, LogOut } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useAuth } from "@/lib/appwrite/auth-context"
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
const { itemCount: cartItemCount } = useCart()
const { itemCount: wishlistItemCount } = useWishlist()
const { user, signOut } = useAuth()
const [isSearchOpen, setIsSearchOpen] = useState(false)
const [searchQuery, setSearchQuery] = useState("")
const [isScrolled, setIsScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10)
  }

  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault()
  if (searchQuery.trim()) {
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    setIsSearchOpen(false)
    toast({
      title: "Search results",
      description: `Showing results for "${searchQuery}"`,
    })
  }
}

const handleNavigation = (href: string) => {
  router.push(href)
}

const handleSignOut = async () => {
  try {
    await signOut()
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    })
    router.push("/")
  } catch (error) {
    console.error("Sign out error:", error)
    toast({
      title: "Sign out failed",
      description: "There was a problem signing out. Please try again.",
      variant: "destructive",
    })
  }
}

return (
  <header
    className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
      isScrolled
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
        : "bg-background"
    }`}
  >
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
              <SheetClose asChild key={item.name}>
                <Button
                  variant="ghost"
                  className={`justify-start text-lg ${
                    pathname === item.href ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => handleNavigation(item.href)}
                >
                  {item.name}
                </Button>
              </SheetClose>
            ))}
            {!user ? (
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="justify-start text-lg text-muted-foreground hover:text-primary"
                  onClick={() => handleNavigation("/auth/signin")}
                >
                  Sign In
                </Button>
              </SheetClose>
            ) : (
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="justify-start text-lg text-muted-foreground hover:text-primary"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </SheetClose>
            )}
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

        <Button variant="ghost" size="icon" className="relative" onClick={() => handleNavigation("/wishlist")}>
          <Heart className="h-5 w-5" />
          {wishlistItemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary text-primary text-xs">
              {wishlistItemCount}
            </Badge>
          )}
          <span className="sr-only">Wishlist</span>
        </Button>

        <Button variant="ghost" size="icon" className="relative" onClick={() => handleNavigation("/cart")}>
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary text-primary text-xs">
              {cartItemCount}
            </Badge>
          )}
          <span className="sr-only">Cart</span>
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigation("/account/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation("/account/orders")}>Orders</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation("/account/addresses")}>Addresses</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                <LogOut className="h-4 w-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            onClick={() => handleNavigation("/auth/signin")}
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        )}
      </div>
    </div>
  </header>
)
}

