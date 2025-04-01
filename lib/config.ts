export const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
export const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ""
export const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ""
export const APPWRITE_USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || ""
export const APPWRITE_PRODUCTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID || ""
export const APPWRITE_ORDERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID || ""

// Log environment variables to help with debugging
console.log("Appwrite Config:", {
  endpoint: APPWRITE_ENDPOINT,
  projectId: APPWRITE_PROJECT_ID ? "Set" : "Not set",
  databaseId: APPWRITE_DATABASE_ID ? "Set" : "Not set",
  usersCollectionId: APPWRITE_USERS_COLLECTION_ID ? "Set" : "Not set",
  productsCollectionId: APPWRITE_PRODUCTS_COLLECTION_ID ? "Set" : "Not set",
  ordersCollectionId: APPWRITE_ORDERS_COLLECTION_ID ? "Set" : "Not set",
})

