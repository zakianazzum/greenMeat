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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Tractor, Beef, Package, Plus, ArrowUpDown, Search, Filter } from "lucide-react";
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

// Sample data for charts
const batchData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 15 },
  { name: "Mar", value: 10 },
  { name: "Apr", value: 18 },
  { name: "May", value: 20 },
  { name: "Jun", value: 22 },
  { name: "Jul", value: 25 },
];

const qualityData = [
  { name: "Premium", value: 45 },
  { name: "Standard", value: 35 },
  { name: "Economy", value: 20 },
];

const COLORS = ["#4ade80", "#22c55e", "#16a34a"];

// Sample data for farms
const farms = [
  {
    id: "F1001",
    name: "Green Valley Farm",
    region: "Midwest",
    zone: "Zone A",
    itemCount: 12,
    status: "Active",
  },
  {
    id: "F1002",
    name: "Sunny Meadows",
    region: "Northeast",
    zone: "Zone B",
    itemCount: 8,
    status: "Active",
  },
];

// Sample data for batches
const batches = [
  {
    id: "B1001",
    itemType: "Beef",
    productionDate: "2023-07-15",
    averageWeight: "12.5 kg",
    qualityStatus: "Passed",
    reportId: "R5001",
  },
  {
    id: "B1002",
    itemType: "Pork",
    productionDate: "2023-07-16",
    averageWeight: "11.8 kg",
    qualityStatus: "Pending",
    reportId: "R5002",
  },
  {
    id: "B1003",
    itemType: "Beef",
    productionDate: "2023-07-17",
    averageWeight: "13.2 kg",
    qualityStatus: "Passed",
    reportId: "R5003",
  },
  {
    id: "B1004",
    itemType: "Lamb",
    productionDate: "2023-07-18",
    averageWeight: "12.1 kg",
    qualityStatus: "Failed",
    reportId: "R5004",
  },
];

export default function FarmerDashboard() {
  const [userName, setUserName] = useState("Farmer");

  // Simulate fetching user data
  useEffect(() => {
    // In a real app, you would fetch the user's name from an API
    // For now, we'll just simulate it
    const timer = setTimeout(() => {
      setUserName("John Smith");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Farmer Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {userName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-green-700 hover:bg-green-800">
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Farms</CardTitle>
            <Tractor className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">2</div>
            <p className="text-xs text-green-600">Active farms in your account</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Beef className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">20</div>
            <p className="text-xs text-green-600">Across all your farms</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
            <Package className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">12</div>
            <p className="text-xs text-green-600">+3 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Rating</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">92%</div>
            <p className="text-xs text-green-600">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-green-100 text-green-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="farms">Your Farms</TabsTrigger>
          <TabsTrigger value="batches">Your Batches</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Batch Production</CardTitle>
                <CardDescription>Monthly batch production over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={batchData}>
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
                    <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Quality Distribution</CardTitle>
                <CardDescription>Your batch quality categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={qualityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {qualityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f0fdf4",
                        borderColor: "#bbf7d0",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Recent Activity</CardTitle>
              <CardDescription>Latest updates from your farms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Package className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New batch created</p>
                    <p className="text-xs text-muted-foreground">Batch #B1004 - 2 days ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Beef className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New item added</p>
                    <p className="text-xs text-muted-foreground">Premium Beef - 3 days ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Tractor className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Farm inspection scheduled</p>
                    <p className="text-xs text-muted-foreground">Green Valley Farm - Next Monday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="farms" className="space-y-4">
          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-green-800">Your Farms</CardTitle>
                <CardDescription>Manage your registered farms</CardDescription>
              </div>
              <Button className="bg-green-700 hover:bg-green-800">
                <Plus className="mr-2 h-4 w-4" /> Add Farm
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-green-50">
                  <TableRow>
                    <TableHead className="w-[80px]">Farm ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farms.map((farm) => (
                    <TableRow key={farm.id} className="hover:bg-green-50">
                      <TableCell className="font-medium">{farm.id}</TableCell>
                      <TableCell>{farm.name}</TableCell>
                      <TableCell>{farm.region}</TableCell>
                      <TableCell>{farm.zone}</TableCell>
                      <TableCell>{farm.itemCount}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          {farm.status}
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
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batches" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search batches..."
                className="pl-8 bg-white border-green-200"
              />
            </div>
            <Button variant="outline" className="border-green-200">
              <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
            </Button>
            <Button className="bg-green-700 hover:bg-green-800">
              <Plus className="mr-2 h-4 w-4" /> Add Batch
            </Button>
          </div>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Your Batches</CardTitle>
              <CardDescription>Manage your meat batches</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-green-50">
                  <TableRow>
                    <TableHead className="w-[100px]">Batch ID</TableHead>
                    <TableHead>Item Type</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Production Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Average Weight</TableHead>
                    <TableHead>Quality Status</TableHead>
                    <TableHead>Report ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((batch) => (
                    <TableRow key={batch.id} className="hover:bg-green-50">
                      <TableCell className="font-medium">{batch.id}</TableCell>
                      <TableCell>{batch.itemType}</TableCell>
                      <TableCell>{batch.productionDate}</TableCell>
                      <TableCell>{batch.averageWeight}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            batch.qualityStatus === "Passed"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : batch.qualityStatus === "Pending"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }
                        >
                          {batch.qualityStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{batch.reportId}</TableCell>
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
                          Edit
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
