"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID,
} from "@/lib/appwrite/config"

export default function DebugEnv() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button variant="outline" size="sm" onClick={() => setIsVisible(!isVisible)} className="bg-background shadow-md">
        {isVisible ? "Hide Debug" : "Debug Env"}
      </Button>

      {isVisible && (
        <Card className="absolute bottom-12 right-0 w-80 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Environment Variables</CardTitle>
            <CardDescription className="text-xs">Debug information</CardDescription>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div>
              <div className="font-medium">ENDPOINT:</div>
              <div className="truncate">{APPWRITE_ENDPOINT || "Not set"}</div>
            </div>
            <div>
              <div className="font-medium">PROJECT_ID:</div>
              <div>{APPWRITE_PROJECT_ID ? "Set" : "Not set"}</div>
            </div>
            <div>
              <div className="font-medium">DATABASE_ID:</div>
              <div>{APPWRITE_DATABASE_ID ? "Set" : "Not set"}</div>
            </div>
            <div>
              <div className="font-medium">USERS_COLLECTION_ID:</div>
              <div>{APPWRITE_USERS_COLLECTION_ID ? "Set" : "Not set"}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

