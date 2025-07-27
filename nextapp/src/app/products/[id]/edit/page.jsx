"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { productApi } from "@/lib/api"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditProductPage() {
    const params = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productApi.getById(params.id)
                setProduct(response.data)
            } catch (err) {
                setError("failed to fetch prodcut")
                console.error("Error  fetching product:", err)
            } finally {
                setIsLoading(false)
            }
        }

        if (params.id) {
            fetchProduct()
        }
    }, [params.id])

    if (isLoading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                        <p>Loading product...</p>
                    </div>
                </div>
            </ProtectedRoute>
        )
    }
    if (error || !product) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">{error || "Product not found"}</p>
                    </div>
                </div>
            </ProtectedRoute>
        )
    }

    return (
        <ProtectedRoute>
            <ProductForm product={product} />
        </ProtectedRoute>
    )
}