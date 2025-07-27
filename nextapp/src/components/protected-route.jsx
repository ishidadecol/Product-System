"use client"

import { useAuth } from "@/app/context/authContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function ProtectedRoute({ children }) {
  const { token, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    //TODO: authenticate token
    if (!isLoading && !token) {
      router.push("/login")
    }
  }, [token, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  

  return <>{children}</>
}