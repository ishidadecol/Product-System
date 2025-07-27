"use client"

import { useState } from "react"
import { useAuth } from "@/app/context/authContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { loginSchema } from "@/lib/validation"

export default function LoginPage() {
  const { login, isLoading, error } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [validationErrors, setValidationErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationErrors({})

    try {
      await loginSchema.validate(formData, { abortEarly: false })
      await login(formData.email, formData.password)
    } catch (err) {
      if (err instanceof Error && err.name === "ValidationError") {
        const errors = {}
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message
          }
        })
        setValidationErrors(errors)
      }
    }
  }
  
  //TODO: CHECK IF HAS TOKEN SAVED AND REDIRECT IF DO

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={validationErrors.email ? "border-red-500" : ""}
              />
              {validationErrors.email && <p className="text-sm text-red-500">{validationErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={validationErrors.password ? "border-red-500" : ""}
              />
              {validationErrors.password && <p className="text-sm text-red-500">{validationErrors.password}</p>}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
