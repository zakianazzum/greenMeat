"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Truck, Search, Filter, Package, MapPin, Warehouse, ShoppingCart } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";

// Sample data for charts
const inventoryTrendData = [
  { name: "Jan", beef: 120, pork: 85, lamb: 45 },
  { name: "Feb", beef: 150, pork: 90, lamb: 50 },
  { name: "Mar", beef: 130, pork: 100, lamb: 55 },
  { name: "Apr", beef: 170, pork: 110, lamb: 60 },
  { name: "May", beef: 190, pork: 120, lamb: 65 },
  { name: "Jun", beef: 210, pork: 130, lamb: 70 },
  { name: "Jul", beef: 230, pork: 140, lamb: 75 },
];

const salesData = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 15000 },
  { name: "Mar", value: 13000 },
  { name: "Apr", value: 17000 },
  { name: "May", value: 19000 },
  { name: "Jun", value: 21000 },
  { name: "Jul", value: 23000 },
];

// Sample data for incoming shipments
const incomingShipments = [
  {
    id: "SH1001",
    trackingId: "T5001",
    origin: "Green Valley Farm",
    contents: "Premium Beef",
    quantity: 120,
    estimatedArrival: "2023-07-25",
    status: "In Transit",
  },
  {
    id: "SH1002",
    trackingId: "T5002",
    origin: "Sunny Meadows",
    contents: "Standard Pork",
    quantity: 85,
    estimatedArrival: "2023-07-26",
    status: "In Transit",
  },
  {
    id: "SH1003",
    trackingId: "T5003",
    origin: "Mountain Range Farm",
    contents: "Premium Lamb",
    quantity: 45,
    estimatedArrival: "2023-07-27",
    status: "Scheduled",
  },
];

// Sample data for inventory
const inventory = [
  {
    id: "I1001",
    itemType: "Premium Beef",
    farm: "Green Valley Farm",
    quantity: 250,
    expiryDate: "2023-09-15",
    location: "Warehouse A",
    status: "In Stock",
  },
  {
    id: "I1002",
    itemType: "Standard Pork",
    farm: "Sunny Meadows",
    quantity: 180,
    expiryDate: "2023-09-10",
    location: "Warehouse B",
    status: "In Stock",
  },
  {
    id: "I1003",
    itemType: "Premium Lamb",
    farm: "Mountain Range Farm",
    quantity: 120,
    expiryDate: "2023-09-05",
    location: "Warehouse A",
    status: "Low Stock",
  },
  {
    id: "I1004",
    itemType: "Organic Chicken",
    farm: "Feather Valley",
    quantity: 200,
    expiryDate: "2023-08-25",
    location: "Warehouse C",
    status: "In Stock",
  },
];

export default function RetailerDashboard() {
  const { user } = useAuth();
  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Retailer Dashboard</h2>
          <p className="text-black font-bold">Welcome back, {user?.name || "Retailer"}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-green-700 hover:bg-green-800">
            <ShoppingCart className="mr-2 h-4 w-4" /> Place Order
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incoming Shipments</CardTitle>
            <Truck className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">3</div>
            <p className="text-xs text-green-600">Expected this week</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">750</div>
            <p className="text-xs text-green-600">Units in stock</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <div className="h-4 w-4 rounded-full bg-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">1</div>
            <p className="text-xs text-amber-600">Need reordering</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">$23,000</div>
            <p className="text-xs text-green-600">+10% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-green-100 text-green-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shipments">Incoming Shipments</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Inventory Trends</CardTitle>
                <CardDescription>Monthly inventory levels by product type</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={inventoryTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f0fdf4",
                        borderColor: "#bbf7d0",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="beef" stroke="#16a34a" strokeWidth={2} />
                    <Line type="monotone" dataKey="pork" stroke="#0284c7" strokeWidth={2} />
                    <Line type="monotone" dataKey="lamb" stroke="#9333ea" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Monthly Sales</CardTitle>
                <CardDescription>Revenue from meat products</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f0fdf4",
                        borderColor: "#bbf7d0",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`$${value}`, "Sales"]}
                    />
                    <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Upcoming Deliveries</CardTitle>
              <CardDescription>Shipments arriving this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomingShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="flex items-center justify-between border-b border-green-100 pb-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Truck className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium">{shipment.contents}</p>
                        <p className="text-sm text-muted-foreground">
                          From {shipment.origin} • {shipment.quantity} units
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm">ETA: {shipment.estimatedArrival}</p>
                        <Badge
                          className={
                            shipment.status === "In Transit"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }
                        >
                          {shipment.status}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="border-green-200">
                        <MapPin className="mr-2 h-4 w-4 text-green-700" /> Track
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search shipments..."
                className="pl-8 bg-white border-green-200"
              />
            </div>
            <Button variant="outline" className="border-green-200">
              <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
            </Button>
          </div>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Incoming Shipments</CardTitle>
              <CardDescription>Track your incoming meat product shipments</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-green-50">
                  <TableRow>
                    <TableHead className="w-[100px]">Shipment ID</TableHead>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Contents</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomingShipments.map((shipment) => (
                    <TableRow key={shipment.id} className="hover:bg-green-50">
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>{shipment.trackingId}</TableCell>
                      <TableCell>{shipment.origin}</TableCell>
                      <TableCell>{shipment.contents}</TableCell>
                      <TableCell>{shipment.quantity}</TableCell>
                      <TableCell>{shipment.estimatedArrival}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            shipment.status === "In Transit"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          }
                        >
                          {shipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-700 hover:text-green-800 hover:bg-green-50"
                        >
                          <MapPin className="mr-2 h-4 w-4" /> Track
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-700 hover:text-green-800 hover:bg-green-50"
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="pl-8 bg-white border-green-200"
              />
            </div>
            <Button variant="outline" className="border-green-200">
              <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
            </Button>
            <Button className="bg-green-700 hover:bg-green-800">
              <ShoppingCart className="mr-2 h-4 w-4" /> Place Order
            </Button>
          </div>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Current Inventory</CardTitle>
              <CardDescription>Manage your meat product inventory</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-green-50">
                  <TableRow>
                    <TableHead className="w-[100px]">Item ID</TableHead>
                    <TableHead>Item Type</TableHead>
                    <TableHead>Farm</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id} className="hover:bg-green-50">
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.itemType}</TableCell>
                      <TableCell>{item.farm}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Warehouse className="h-3 w-3 text-green-700" />
                          {item.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.status === "In Stock"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-700 hover:text-green-800 hover:bg-green-50"
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-700 hover:text-green-800 hover:bg-green-50"
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
