import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Beef,
  Tractor,
  ClipboardCheck,
  Truck,
  Factory,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Package,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-white border-b border-green-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="bg-green-700 text-white p-1.5 rounded">
                <Beef size={28} />
              </div>
              <div className="font-bold text-2xl text-green-800">Green Meat</div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-green-700 hover:text-green-800 font-medium">
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-green-700 hover:text-green-800 font-medium"
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-green-700 hover:text-green-800 font-medium"
              >
                Testimonials
              </Link>
              {/* <Link href="#pricing" className="text-green-700 hover:text-green-800 font-medium">
                Pricing
              </Link> */}
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-green-700 hover:bg-green-800">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-700/90 z-0"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-1">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
              Farm-to-Table Management
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Streamline Your Meat Production from Farm to Table
            </h1>
            <p className="text-xl text-green-50 mb-8">
              A comprehensive solution for tracking, managing, and optimizing your entire meat
              production process with full traceability and quality assurance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-green-800 hover:bg-green-50">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-green-800/20"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-800">500+</p>
              <p className="text-green-700">Farms Connected</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-800">10,000+</p>
              <p className="text-green-700">Batches Tracked</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-800">98%</p>
              <p className="text-green-700">Quality Compliance</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-800">30%</p>
              <p className="text-green-700">Reduced Waste</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Everything You Need to Manage Your Meat Production
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools necessary to track, manage, and
              optimize your entire meat production process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-green-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Tractor className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle className="text-green-800">Farm Management</CardTitle>
                <CardDescription>
                  Track and manage all your farms and farmers in one place.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Detailed farm profiles and metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Regional and zone-based organization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Farm performance analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Beef className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle className="text-green-800">Meat Batch Tracking</CardTitle>
                <CardDescription>
                  Complete traceability from farm to table for every batch.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Batch-level tracking and history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Production date and expiry management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Quality status monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle className="text-green-800">Quality Inspections</CardTitle>
                <CardDescription>
                  Ensure the highest quality standards with thorough inspections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Detailed inspection reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Quality scoring system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Issue tracking and resolution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Factory className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle className="text-green-800">Processing Management</CardTitle>
                <CardDescription>Streamline your meat processing operations.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Processing plant management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Packaging and processing records</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Capacity and efficiency monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle className="text-green-800">Shipment Tracking</CardTitle>
                <CardDescription>
                  Monitor your shipments in real-time from origin to destination.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Real-time shipment tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Temperature monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Delivery status updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle className="text-green-800">Analytics & Reporting</CardTitle>
                <CardDescription>
                  Gain insights with comprehensive analytics and reporting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Production and quality metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Customizable dashboards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Export and share reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              From Farm to Table, We've Got You Covered
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides end-to-end traceability and management for your entire meat
              production process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-green-200 rounded-xl transform rotate-3"></div>
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Dashboard preview"
                  className="relative rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-800 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Register Farms and Items
                  </h3>
                  <p className="text-gray-600">
                    Add your farms, farmers, and meat items to the system with detailed information
                    for complete traceability.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-800 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Track Batches and Quality
                  </h3>
                  <p className="text-gray-600">
                    Create and monitor meat batches, conduct quality inspections, and ensure
                    compliance with standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-800 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Process and Package</h3>
                  <p className="text-gray-600">
                    Manage processing plants, record packaging details, and maintain quality
                    throughout the processing stage.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-800 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Store and Ship</h3>
                  <p className="text-gray-600">
                    Track warehouse storage, monitor inventory levels, and manage shipments to
                    retailers with real-time updates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-800 font-bold">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Analyze and Optimize</h3>
                  <p className="text-gray-600">
                    Gain insights from comprehensive analytics, identify areas for improvement, and
                    optimize your operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See what our customers have to say about how Green Meat has transformed their
              operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center">
                      <Tractor className="h-6 w-6 text-green-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800">SARJIL MIA</h4>
                    <p className="text-sm text-gray-500">Owner, Sarjil Mia Farms</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Green Meat has completely transformed how we manage our meat production. The
                  traceability and quality control features have helped us improve our standards and
                  gain trust from our customers."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center">
                      <ClipboardCheck className="h-6 w-6 text-green-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800"> SHAOLIN ORPA</h4>
                    <p className="text-sm text-gray-500">Quality Inspector, Quality First Inc.</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "As a quality inspector, I need reliable tools to track and document inspections.
                  This platform makes my job so much easier with its intuitive interface and
                  comprehensive reporting features."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-green-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800">MASUD</h4>
                    <p className="text-sm text-gray-500">Operations Manager, Midwest Meats</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The analytics and reporting capabilities have given us insights we never had
                  before. We've been able to optimize our operations and reduce waste by 30% in just
                  six months."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-20 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the plan that's right for your business, from small farms to large enterprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Starter</CardTitle>
                <CardDescription>For small farms just getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-green-800">$99</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Up to 5 farms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Basic batch tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Quality inspections</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-green-700 hover:bg-green-800">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-green-700 shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-green-700 text-white hover:bg-green-800">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-green-800">Professional</CardTitle>
                <CardDescription>For growing meat production businesses</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-green-800">$249</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Up to 20 farms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Advanced batch tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Processing management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Shipment tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Priority email & phone support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-green-700 hover:bg-green-800">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Enterprise</CardTitle>
                <CardDescription>For large-scale meat production operations</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-green-800">$499</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Unlimited farms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Complete traceability system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>24/7 dedicated support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-green-700 hover:bg-green-800">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-800 rounded-2xl p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Meat Production Process?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Join hundreds of farms and meat producers who have streamlined their operations,
              improved quality, and increased profitability with Green Meat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-green-800 hover:bg-green-50">
                  Start Your Free Trial
                </Button>
              </Link>
              <Link href="#demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-green-700"
                >
                  Schedule a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white p-1.5 rounded">
                  <Beef size={24} className="text-green-800" />
                </div>
                <div className="font-bold text-xl">Green Meat</div>
              </div>
              <p className="text-green-200 mb-4">
                Streamlining meat production from farm to table with complete traceability and
                quality assurance.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-green-200">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-green-200">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-green-200">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-green-200">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-green-200 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-200">© 2023 Green Meat. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-green-200 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
