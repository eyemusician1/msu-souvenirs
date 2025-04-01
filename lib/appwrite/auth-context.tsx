"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { Account, Client, ID } from "appwrite"
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "../config"
import { createUserProfile } from "../database"

// Initialize Appwrite client
const client = new Client()

try {
  client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID)
  console.log("Appwrite client initialized with:", {
    endpoint: APPWRITE_ENDPOINT,
    projectId: APPWRITE_PROJECT_ID,
  })
} catch (error) {
  console.error("Failed to initialize Appwrite client:", error)
}

const account = new Account(client)

interface User {
  $id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking for existing session...")
        const currentUser = await account.get()
        console.log("Session found, user:", currentUser)
        setUser({
          $id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
        })
      } catch (error) {
        console.log("No active session or error:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email)
      await account.createEmailSession(email, password)
      const currentUser = await account.get()
      console.log("Sign in successful, user:", currentUser)
      setUser({
        $id: currentUser.$id,
        name: currentUser.name,
        email: currentUser.email,
      })
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    }
  }

  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log("Attempting to create account with email:", email)
      const response = await account.create(ID.unique(), email, password, name)
      console.log("Account created successfully:", response)

      // Create user profile in database
      try {
        await createUserProfile({
          id: response.$id,
          userId: response.$id,
          name: name,
          email: email,
          addresses: [],
        })
        console.log("User profile created in database")
      } catch (profileError) {
        console.error("Failed to create user profile in database:", profileError)
        // Continue with sign in even if profile creation fails
      }

      // Sign in the user
      await signIn(email, password)
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      console.log("Attempting to sign out")
      await account.deleteSession("current")
      console.log("Sign out successful")
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      console.log("Attempting to send password reset email to:", email)
      await account.createRecovery(email, `${window.location.origin}/auth/reset-password`)
      console.log("Password reset email sent")
    } catch (error) {
      console.error("Reset password error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

