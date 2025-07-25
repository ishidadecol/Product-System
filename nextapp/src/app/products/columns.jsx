import { formatPrice } from "@/lib/format"

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const cents = row.getValue("price")
      return <span>{formatPrice(cents)}</span>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
]
