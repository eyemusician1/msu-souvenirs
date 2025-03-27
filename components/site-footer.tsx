import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SiteFooter() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h2 className="font-bold text-2xl mb-4">MSU Souvenirs</h2>
            <p className="text-white/80 mb-6">Official merchandise and souvenirs for Mindanao State University.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="text-white/80 hover:text-secondary p-0 h-auto font-normal">
                  All Products
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-secondary p-0 h-auto font-normal">
                  Apparel
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-secondary p-0 h-auto font-normal">
                  Accessories
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-secondary p-0 h-auto font-normal">
                  Stationery
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-secondary p-0 h-auto font-normal">
                  Memorabilia
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Information</h3>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="text-white/80 hover:text-secondary p-0 h-auto font-normal">
                  About Us
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-secondary p-0 h-auto font-normal">
                  Contact Us
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-secondary p-0 h-auto font-normal">
                  Shipping & Returns
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-secondary p-0 h-auto font-normal">
                  FAQ
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <address className="not-italic text-white/80 space-y-2">
              <p>MSU Main Campus</p>
              <p>Marawi City, Lanao del Sur</p>
              <p>Philippines</p>
              <p className="pt-2">Email: info@msusouvenirs.edu.ph</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-6 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} MSU Main Souvenirs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

