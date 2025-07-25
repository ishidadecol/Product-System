"use client"

import Product from "@/types/product"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductPage() {
  const products = [
    new Product("1", "Wireless Mouse", 9999, "Ergonomic wireless mouse with USB receiver."),
    new Product("2", "Mechanical Keyboard", 19950, "RGB keyboard with clicky switches."),
    new Product("3", "USB-C Hub", 4999, "7-in-1 USB-C hub with HDMI, SD card reader."),
    new Product("4", "4K Monitor", 100000, "27-inch 4K UHD display for professionals."),
  ]

  return (
    <div className="p-10">
      <Card >
        <CardHeader>
          <CardTitle className="text-2xl">Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={products} searchKey="name" />
        </CardContent>
      </Card>
    </div>
  )
}
