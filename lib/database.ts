import { Client, Databases, ID, Query } from "appwrite"
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_PRODUCTS_COLLECTION_ID,
  APPWRITE_ORDERS_COLLECTION_ID,
  APPWRITE_USERS_COLLECTION_ID,
} from "./config"

// Initialize Appwrite client
const client = new Client()

try {
  client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID)
  console.log("Database client initialized with:", {
    endpoint: APPWRITE_ENDPOINT,
    projectId: APPWRITE_PROJECT_ID,
    databaseId: APPWRITE_DATABASE_ID,
  })
} catch (error) {
  console.error("Failed to initialize Appwrite database client:", error)
}

const databases = new Databases(client)

// Product types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  isNew: boolean
  features: string[]
  rating: number
  reviews: number
  inStock: boolean
}

// Order types
export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  size?: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
    phone: string
  }
  createdAt: Date
  updatedAt: Date
}

// User profile type
export interface UserProfile {
  id: string
  userId: string
  name: string
  email: string
  phone?: string
  addresses: {
    id: string
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
    phone: string
    isDefault: boolean
  }[]
}

// Mock data for preview mode
const mockProducts: Product[] = [
  {
    id: "1",
    name: "MSU Varsity Jacket",
    description:
      "Show your MSU pride with this premium varsity jacket featuring the university's colors and emblem. Made with high-quality materials for comfort and durability.",
    price: 1299,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Apparel",
    isNew: true,
    features: [
      "Premium quality fabric",
      "Embroidered MSU logo",
      "Maroon and gold color scheme",
      "Comfortable fit",
      "Available in multiple sizes",
    ],
    rating: 4.5,
    reviews: 24,
    inStock: true,
  },
  {
    id: "2",
    name: "MSU Embroidered Cap",
    description:
      "A stylish cap featuring the embroidered MSU logo. Perfect for sunny days on campus or showing your school spirit anywhere you go.",
    price: 499,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Accessories",
    isNew: false,
    features: [
      "Adjustable strap for perfect fit",
      "Embroidered MSU logo",
      "Breathable cotton material",
      "Curved brim design",
      "One size fits most",
    ],
    rating: 4.2,
    reviews: 18,
    inStock: true,
  },
]

// Check if we're in preview mode (no database ID)
const isPreviewMode = !APPWRITE_DATABASE_ID || !APPWRITE_USERS_COLLECTION_ID

// Product functions
export async function getProducts(category?: string, limit = 10, offset = 0): Promise<Product[]> {
  if (isPreviewMode) {
    console.log("Preview mode: Returning mock products")
    return mockProducts.filter((p) => !category || category === "All" || p.category === category)
  }

  try {
    console.log("Fetching products with params:", { category, limit, offset })
    const queries = [Query.limit(limit), Query.offset(offset)]

    if (category && category !== "All") {
      queries.push(Query.equal("category", category))
    }

    const response = await databases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_PRODUCTS_COLLECTION_ID, queries)

    console.log(`Found ${response.documents.length} products`)
    return response.documents as unknown as Product[]
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isPreviewMode) {
    console.log("Preview mode: Returning mock product")
    const product = mockProducts.find((p) => p.id === id)
    return product || null
  }

  try {
    console.log("Fetching product with ID:", id)
    const response = await databases.getDocument(APPWRITE_DATABASE_ID, APPWRITE_PRODUCTS_COLLECTION_ID, id)

    console.log("Product found:", response.$id)
    return response as unknown as Product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (isPreviewMode) {
    console.log("Preview mode: Searching mock products")
    return mockProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
  }

  try {
    console.log("Searching products with query:", query)
    const response = await databases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_PRODUCTS_COLLECTION_ID, [
      Query.search("name", query),
    ])

    console.log(`Found ${response.documents.length} products matching query`)
    return response.documents as unknown as Product[]
  } catch (error) {
    console.error("Error searching products:", error)
    return []
  }
}

// Order functions
export async function createOrder(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order | null> {
  if (isPreviewMode) {
    console.log("Preview mode: Creating mock order")
    return {
      id: ID.unique(),
      ...order,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  try {
    console.log("Creating order for user:", order.userId)
    const now = new Date()

    const response = await databases.createDocument(APPWRITE_DATABASE_ID, APPWRITE_ORDERS_COLLECTION_ID, ID.unique(), {
      ...order,
      createdAt: now,
      updatedAt: now,
    })

    console.log("Order created with ID:", response.$id)
    return response as unknown as Order
  } catch (error) {
    console.error("Error creating order:", error)
    return null
  }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  if (isPreviewMode) {
    console.log("Preview mode: Returning mock orders")
    return []
  }

  try {
    console.log("Fetching orders for user:", userId)
    const response = await databases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_ORDERS_COLLECTION_ID, [
      Query.equal("userId", userId),
    ])

    console.log(`Found ${response.documents.length} orders for user`)
    return response.documents as unknown as Order[]
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return []
  }
}

// User profile functions
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (isPreviewMode) {
    console.log("Preview mode: Returning mock user profile")
    return null
  }

  try {
    console.log("Fetching profile for user:", userId)
    console.log("Using database ID:", APPWRITE_DATABASE_ID)
    console.log("Using collection ID:", APPWRITE_USERS_COLLECTION_ID)

    const response = await databases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_USERS_COLLECTION_ID, [
      Query.equal("userId", userId),
    ])

    if (response.documents.length > 0) {
      console.log("User profile found")
      return response.documents[0] as unknown as UserProfile
    }

    console.log("No user profile found")
    return null
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

export async function createUserProfile(profile: Omit<UserProfile, "id">): Promise<UserProfile | null> {
  if (isPreviewMode) {
    console.log("Preview mode: Creating mock user profile")
    return {
      id: ID.unique(),
      ...profile,
    } as UserProfile
  }

  try {
    console.log("Creating user profile for:", profile.email)
    console.log("Using database ID:", APPWRITE_DATABASE_ID)
    console.log("Using collection ID:", APPWRITE_USERS_COLLECTION_ID)

    if (!APPWRITE_DATABASE_ID || !APPWRITE_USERS_COLLECTION_ID) {
      console.error("Missing database or collection ID")
      throw new Error("Missing database or collection ID")
    }

    const response = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_USERS_COLLECTION_ID,
      ID.unique(),
      profile,
    )

    console.log("User profile created with ID:", response.$id)
    return response as unknown as UserProfile
  } catch (error) {
    console.error("Error creating user profile:", error)
    return null
  }
}

export async function updateUserProfile(id: string, profile: Partial<UserProfile>): Promise<UserProfile | null> {
  if (isPreviewMode) {
    console.log("Preview mode: Updating mock user profile")
    return null
  }

  try {
    console.log("Updating user profile:", id)
    const response = await databases.updateDocument(APPWRITE_DATABASE_ID, APPWRITE_USERS_COLLECTION_ID, id, profile)

    console.log("User profile updated")
    return response as unknown as UserProfile
  } catch (error) {
    console.error("Error updating user profile:", error)
    return null
  }
}

