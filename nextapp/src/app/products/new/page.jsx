"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { ProductForm } from "@/components/product-form"

export default function NewProductPage() {
  return (
    <ProtectedRoute>
      <ProductForm />
    </ProtectedRoute>
  )
}
