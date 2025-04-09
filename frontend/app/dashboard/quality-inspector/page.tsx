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
import { ClipboardCheck, Search, Filter, Plus, AlertTriangle } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

// Sample data for charts
const inspectionTrendData = [
  { name: "Jan", passed: 18, failed: 2 },
  { name: "Feb", passed: 20, failed: 3 },
  { name: "Mar", passed: 25, failed: 1 },
  { name: "Apr", passed: 22, failed: 4 },
  { name: "May", passed: 28, failed: 2 },
  { name: "Jun", passed: 30, failed: 3 },
  { name: "Jul", passed: 32, failed: 1 },
];

const qualityScoreData = [
  { name: "Beef", score: 92 },
  { name: "Pork", score: 88 },
  { name: "Lamb", score: 95 },
  { name: "Chicken", score: 90 },
];

// Sample data for pending inspections
const pendingInspections = [
  {
    id: "I1001",
    batchId: "B1001",
    farmName: "Green Valley Farm",
    itemType: "Beef",
    scheduledDate: "2023-07-25",
    priority: "High",
  },
  {
    id: "I1002",
    batchId: "B1002",
    farmName: "Sunny Meadows",
    itemType: "Pork",
    scheduledDate: "2023-07-26",
    priority: "Medium",
  },
  {
    id: "I1003",
    batchId: "B1003",
    farmName: "Mountain Range Farm",
    itemType: "Lamb",
    scheduledDate: "2023-07-27",
    priority: "Low",
  },
];

// Sample data for completed inspections
const completedInspections = [
  {
    id: "R5001",
    batchId: "B1001",
    date: "2023-07-16",
    score: 92,
    status: "Passed",
    remarks: "Meets all quality standards",
  },
  {
    id: "R5003",
    batchId: "B1003",
    date: "2023-07-18",
    score: 88,
    status: "Passed",
    remarks: "Minor issues with packaging",
  },
  {
    id: "R5004",
    batchId: "B1004",
    date: "2023-07-19",
    score: 65,
    status: "Failed",
    remarks: "Temperature control issues",
  },
  {
    id: "R5005",
    batchId: "B1005",
    date: "2023-07-20",
    score: 95,
    status: "Passed",
    remarks: "Excellent quality",
  },
];

export default function InspectorDashboard() {
  const [userName, setUserName] = useState("Inspector");

  // Simulate fetching user data
  useEffect(() => {
    // In a real app, you would fetch the user's name from an API
    // For now, we'll just simulate it
    const timer = setTimeout(() => {
      setUserName("Sarah Johnson");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">
            Quality Inspector Dashboard
          </h2>
          <p className="text-muted-foreground">Welcome back, {userName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-green-700 hover:bg-green-800">
            <Plus className="mr-2 h-4 w-4" /> New Inspection
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Inspections</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">3</div>
            <p className="text-xs text-amber-600">Scheduled for this week</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">124</div>
            <p className="text-xs text-green-600">Total inspections completed</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">92%</div>
            <p className="text-xs text-green-600">+3% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-red-600">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-green-100 text-green-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pending">Pending Inspections</TabsTrigger>
          <TabsTrigger value="completed">Completed Inspections</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Inspection Trends</CardTitle>
                <CardDescription>Monthly inspection results</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={inspectionTrendData}>
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
                    <Line type="monotone" dataKey="passed" stroke="#16a34a" strokeWidth={2} />
                    <Line type="monotone" dataKey="failed" stroke="#dc2626" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Quality Scores by Type</CardTitle>
                <CardDescription>Average quality scores by meat type</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={qualityScoreData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f0fdf4",
                        borderColor: "#bbf7d0",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="score"
                      fill="#16a34a"
                      radius={[0, 4, 4, 0]}
                      label={{ position: "right", fill: "#16a34a", fontSize: 12 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Upcoming Inspections</CardTitle>
              <CardDescription>Inspections scheduled for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingInspections.map((inspection) => (
                  <div
                    key={inspection.id}
                    className="flex items-center justify-between border-b border-green-100 pb-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <ClipboardCheck className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium">{inspection.farmName}</p>
                        <p className="text-sm text-muted-foreground">
                          Batch {inspection.batchId} • {inspection.itemType}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm">{inspection.scheduledDate}</p>
                        <Badge
                          className={
                            inspection.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : inspection.priority === "Medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {inspection.priority} Priority
                        </Badge>
                      </div>
                      <Button size="sm" className="bg-green-700 hover:bg-green-800">
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inspections..."
                className="pl-8 bg-white border-green-200"
              />
            </div>
            <Button variant="outline" className="border-green-200">
              <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
            </Button>
            <Button className="bg-green-700 hover:bg-green-800">
              <Plus className="mr-2 h-4 w-4" /> New Inspection
            </Button>
          </div>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Pending Inspections</CardTitle>
              <CardDescription>Inspections scheduled for upcoming days</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-green-50">
                  <TableRow>
                    <TableHead className="w-[100px]">Inspection ID</TableHead>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Farm</TableHead>
                    <TableHead>Item Type</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingInspections.map((inspection) => (
                    <TableRow key={inspection.id} className="hover:bg-green-50">
                      <TableCell className="font-medium">{inspection.id}</TableCell>
                      <TableCell>{inspection.batchId}</TableCell>
                      <TableCell>{inspection.farmName}</TableCell>
                      <TableCell>{inspection.itemType}</TableCell>
                      <TableCell>{inspection.scheduledDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            inspection.priority === "High"
                              ? "bg-red-100 text-red-800 hover:bg-red-200"
                              : inspection.priority === "Medium"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          }
                        >
                          {inspection.priority}
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
                        <Button size="sm" className="bg-green-700 hover:bg-green-800">
                          Start
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search completed inspections..."
                className="pl-8 bg-white border-green-200"
              />
            </div>
            <Button variant="outline" className="border-green-200">
              <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
            </Button>
          </div>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Completed Inspections</CardTitle>
              <CardDescription>History of your inspection reports</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-green-50">
                  <TableRow>
                    <TableHead className="w-[100px]">Report ID</TableHead>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Quality Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedInspections.map((inspection) => (
                    <TableRow key={inspection.id} className="hover:bg-green-50">
                      <TableCell className="font-medium">{inspection.id}</TableCell>
                      <TableCell>{inspection.batchId}</TableCell>
                      <TableCell>{inspection.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={inspection.score}
                            className="h-2"
                            // indicatorClassName={
                            //   inspection.score >= 80
                            //     ? "bg-green-600"
                            //     : inspection.score >= 70
                            //     ? "bg-amber-500"
                            //     : "bg-red-500"
                            // }
                          />
                          <span className="text-sm">{inspection.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            inspection.status === "Passed"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }
                        >
                          {inspection.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={inspection.remarks}>
                        {inspection.remarks}
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
      </Tabs>
    </div>
  );
}
