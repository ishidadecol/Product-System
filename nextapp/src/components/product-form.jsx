"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2 } from "lucide-react"
import { productApi } from "@/lib/api"
import { productSchema } from "@/lib/validation"
import Link from "next/link"

export function ProductForm({ product }) {
  const router = useRouter()
  const isEditing = !!product

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
  })

  const [validationErrors, setValidationErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationErrors({})
    setError(null)

    try {
      await productSchema.validate(formData, { abortEarly: false })
      setIsLoading(true)

      if (isEditing) {
        await productApi.update(product.id, formData)
      } else {
        await productApi.create(formData)
      }

      router.push("/products")
    } catch (err) {
      if (err instanceof Error && err.name === "ValidationError") {
        const errors = {}
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message
          }
        })
        setValidationErrors(errors)
      } else {
        setError(`Failed to ${isEditing ? "update" : "create"} product. Please try again.`)
        console.error("Error saving product:", err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const processedValue = name === "price" ? Number.parseFloat(value) || 0 : value

    setFormData((prev) => ({ ...prev, [name]: processedValue }))

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{isEditing ? "Edit Product" : "Create New Product"}</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Update Product Details" : "Product Information"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleChange}
                    className={validationErrors.name ? "border-red-500" : ""}
                  />
                  {validationErrors.name && <p className="text-sm text-red-500">{validationErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={validationErrors.description ? "border-red-500" : ""}
                  />
                  {validationErrors.description && (
                    <p className="text-sm text-red-500">{validationErrors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className={validationErrors.price ? "border-red-500" : ""}
                  />
                  {validationErrors.price && <p className="text-sm text-red-500">{validationErrors.price}</p>}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isEditing ? "Updating..." : "Creating..."}
                      </>
                    ) : isEditing ? (
                      "Update Product"
                    ) : (
                      "Create Product"
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/products">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
