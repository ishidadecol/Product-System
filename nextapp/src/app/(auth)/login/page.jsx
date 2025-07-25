"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "next/link"

export default function LoginPage() {
  const handleSubmit = async (e) => {
    //TODO: VALIDATE CREDENTIALS IN THE auth/login route
    /* While i dont implement the connection between fornt and back 
    I will just make it go to the next page*/


  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="pb-4">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="password" className="pb-4">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Link href="/products">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
