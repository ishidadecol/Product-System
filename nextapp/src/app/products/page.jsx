"use client"
import { Card, CardHeader, CardContent, CardTitle} from "@/components/ui/card"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Table, TableHeader,TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/authContext"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Edit, Trash2, LogOut } from "lucide-react"
import { productApi } from "@/lib/api"
import {formatPrice} from "@/lib/format"
import Link from "next/link"
import { ProductsTable } from "@/components/product-table"

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <ProductsList />
    </ProtectedRoute>
  )
}

function ProductsList() {
  const { logout } = useAuth()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await productApi.getAll()
      setProducts(response.data)
    } catch (err) {
      setError("Failed to fetch products. Please try again.")
      console.error("Error fetching products:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true)
      await productApi.delete(id)
      setProducts((prev) => prev.filter((product) => product.id !== id))
      setDeleteId(null)
    } catch (err) {
      setError("Failed to delete product. Please try again.")
      console.error("Error deleting product:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-600">Welcome back</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ProductsTable products={products} onProductDeleted={handleDelete} onError={setError}/>
      </div>
    </div>
  )
}
