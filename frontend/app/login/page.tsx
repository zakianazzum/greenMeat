import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Beef } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md border-green-200 shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="bg-green-700 text-white p-2 rounded-full">
              <Beef size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            CHOOSE A NAME (MASUD & ORPA)
          </CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-green-800">
                Password
              </Label>
              <Link href="/forgot-password" className="text-sm text-green-700 hover:text-green-800">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              className="border-green-200 focus-visible:ring-green-500"
            />
          </div>
          <Button className="w-full bg-green-700 hover:bg-green-800">Sign In</Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-700 hover:text-green-800 font-medium">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
