"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Contact Us</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Get in touch with our team.
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <div className="h-2 bg-primary w-full"></div>
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <p className="text-muted-foreground">
              MSU Main Campus, Marawi City,
              <br />
              Lanao del Sur, Philippines
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <div className="h-2 bg-secondary w-full"></div>
          <CardContent className="p-6 text-center">
            <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-muted-foreground">
              +63 (123) 456-7890
              <br />
              Monday - Friday: 8:00 AM - 5:00 PM
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <div className="h-2 bg-accent w-full"></div>
          <CardContent className="p-6 text-center">
            <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-muted-foreground">
              info@msusouvenirs.edu.ph
              <br />
              support@msusouvenirs.edu.ph
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form and Map */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
          {isSubmitted ? (
            <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We've received your message and will get back to you as soon as possible.
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: "", email: "", subject: "", message: "" })
                  }}
                  className="bg-primary hover:bg-primary/90 text-white rounded-full"
                >
                  Send Another Message
                </Button>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="rounded-lg py-6"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="rounded-lg py-6"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  required
                  className="rounded-lg py-6"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  required
                  className="min-h-[150px] rounded-lg"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white rounded-full py-6 h-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" /> Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Find Us</h2>
          <div className="relative h-[400px] rounded-xl overflow-hidden border">
            <Image
              src="/placeholder.svg?height=800&width=800&text=Map"
              alt="MSU Souvenirs Store Location"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg font-medium bg-white/80 px-4 py-2 rounded-lg">
                Interactive map would be displayed here
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>MSU Main Campus, Marawi City, Lanao del Sur, Philippines</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">What are your store hours?</h3>
              <p className="text-muted-foreground">
                Our store is open Monday through Friday from 8:00 AM to 5:00 PM, and Saturday from 9:00 AM to 3:00 PM.
                We are closed on Sundays.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">How long does shipping take?</h3>
              <p className="text-muted-foreground">
                Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days
                depending on the destination.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Do you offer bulk discounts?</h3>
              <p className="text-muted-foreground">
                Yes, we offer discounts for bulk orders. Please contact our sales team for more information and pricing.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Can I track my order?</h3>
              <p className="text-muted-foreground">
                Yes, once your order ships, you will receive a tracking number via email that you can use to track your
                package.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

