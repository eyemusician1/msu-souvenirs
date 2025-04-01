import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About MSU Souvenirs</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Your official source for Mindanao State University merchandise and souvenirs.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image src="/placeholder.svg?height=800&width=800" alt="MSU Campus" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              MSU Souvenirs was established in 2010 as the official merchandise store for Mindanao State University. Our
              mission is to provide high-quality products that allow students, alumni, faculty, and supporters to show
              their school pride.
            </p>
            <p>
              What started as a small campus shop has grown into a beloved institution, serving the MSU community both
              in-person and online. We take pride in offering products that capture the spirit and tradition of MSU.
            </p>
            <p>
              Every purchase from MSU Souvenirs supports the university, with a portion of proceeds going directly to
              student programs and campus initiatives.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-primary mb-10 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <div className="h-2 bg-primary w-full"></div>
            <CardContent className="p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We are committed to providing high-quality products that meet our customers' expectations and stand the
                test of time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <div className="h-2 bg-secondary w-full"></div>
            <CardContent className="p-6">
              <div className="bg-secondary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Service</h3>
              <p className="text-muted-foreground">
                We strive to provide excellent customer service and a seamless shopping experience for all our
                customers.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <div className="h-2 bg-accent w-full"></div>
            <CardContent className="p-6">
              <div className="bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-muted-foreground">
                We are dedicated to supporting the MSU community and fostering school spirit through our products.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Visit Us Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-primary mb-10 text-center">Visit Our Store</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=800"
              alt="MSU Souvenirs Store"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Store Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">MSU Main Campus, Marawi City, Lanao del Sur, Philippines</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+63 (123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">info@msusouvenirs.edu.ph</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Store Hours</p>
                  <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 9:00 AM - 3:00 PM</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full">
                  Contact Us <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-primary mb-10 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Do you ship internationally?</h3>
              <p className="text-muted-foreground">
                Yes, we ship to select international destinations. Shipping rates and delivery times vary by location.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">What is your return policy?</h3>
              <p className="text-muted-foreground">
                We accept returns within 30 days of purchase. Items must be unused and in original packaging.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Do you offer bulk discounts?</h3>
              <p className="text-muted-foreground">
                Yes, we offer discounts for bulk orders. Please contact us for more information.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Can I customize my order?</h3>
              <p className="text-muted-foreground">
                We offer customization for certain products. Please contact us with your requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Ready to Shop?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Browse our collection of MSU merchandise and souvenirs to find the perfect item to show your school pride.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 h-auto">
              Shop Now
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="rounded-full px-8 py-6 h-auto">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

