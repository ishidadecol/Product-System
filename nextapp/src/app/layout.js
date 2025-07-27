import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/app/context/authContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Product Management System",
  description: "A complete product management system with authentication",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
