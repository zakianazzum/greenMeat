import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Beef } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md border-green-200 shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="bg-green-700 text-white p-2 rounded-full">
              <Beef size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Create an Account</CardTitle>
          <CardDescription>Enter your information to register</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-green-800">
                First Name
              </Label>
              <Input id="firstName" placeholder="John" className="border-green-200 focus-visible:ring-green-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-green-800">
                Last Name
              </Label>
              <Input id="lastName" placeholder="Doe" className="border-green-200 focus-visible:ring-green-500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-green-800">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="border-green-200 focus-visible:ring-green-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userType" className="text-green-800">
              User Type
            </Label>
            <Select>
              <SelectTrigger id="userType" className="border-green-200 focus:ring-green-500">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="inspector">Quality Inspector</SelectItem>
                <SelectItem value="retailer">Retailer</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-green-800">
              Password
            </Label>
            <Input id="password" type="password" className="border-green-200 focus-visible:ring-green-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-green-800">
              Confirm Password
            </Label>
            <Input id="confirmPassword" type="password" className="border-green-200 focus-visible:ring-green-500" />
          </div>
          <Button className="w-full bg-green-700 hover:bg-green-800">Create Account</Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-green-700 hover:text-green-800 font-medium">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

