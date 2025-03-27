"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    role: "Alumni, Class of 2018",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The quality of MSU merchandise exceeded my expectations. The varsity jacket I purchased is not only stylish but also durable. It's a great way to show my university pride!",
    rating: 5,
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    role: "Student",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "I love my MSU hoodie! The fabric is comfortable and the design is exactly what I wanted. Fast shipping and great customer service too.",
    rating: 4,
  },
  {
    id: 3,
    name: "Ahmed Khan",
    role: "Faculty Member",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The MSU souvenirs make perfect gifts for colleagues and visitors. The items are high quality and represent our university beautifully.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">What Our Customers Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from students, alumni, and faculty who have purchased from our collection.
        </p>
      </div>

      <div className="relative">
        <div className="hidden md:flex">
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-md rounded-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "fill-secondary text-secondary" : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <Card className="border-0 shadow-md rounded-xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonials[currentIndex].rating
                        ? "fill-secondary text-secondary"
                        : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonials[currentIndex].content}"</p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-primary">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6 gap-4">
            <Button variant="outline" size="icon" className="rounded-full" onClick={handlePrev}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={handleNext}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

