"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Tractor, ClipboardCheck, Truck, Package, Users, AlertTriangle } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { use, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusColors = {
  Delayed: "text-amber-500",
  "In Transit": "text-blue-500",
  Delivered: "text-green-500",
  Scheduled: "text-gray-500",
};
// Sample data for charts
// const batchData = [
//   { name: "Jan", value: 45 },
//   { name: "Feb", value: 52 },
//   { name: "Mar", value: 48 },
//   { name: "Apr", value: 61 },
//   { name: "May", value: 55 },
//   { name: "Jun", value: 67 },
//   { name: "Jul", value: 70 },
// ];

const qualityData = [
  { name: "Premium", value: 35 },
  { name: "Standard", value: 45 },
  { name: "Economy", value: 20 },
];

const COLORS = ["#4ade80", "#22c55e", "#16a34a"];

// const shipmentData = [
//   { name: "Jan", completed: 35, pending: 5 },
//   { name: "Feb", completed: 42, pending: 8 },
//   { name: "Mar", completed: 38, pending: 6 },
//   { name: "Apr", completed: 51, pending: 10 },
//   { name: "May", completed: 45, pending: 8 },
//   { name: "Jun", completed: 57, pending: 10 },
//   { name: "Jul", completed: 60, pending: 10 },
// ];

// Color palette for the failure analytics pie chart
const FAILURE_COLORS = [
  "#ef4444", // red-500
  "#f97316", // orange-500
  "#f59e0b", // amber-500
  "#eab308", // yellow-500
  "#84cc16", // lime-500
  "#22c55e", // green-500
  "#14b8a6", // teal-500
  "#06b6d4", // cyan-500
];

// Define the interface for the criteria data
interface QualityCriteria {
  criteriaName: string;
  description: string;
  maxScore: number;
}

interface Alert {
  status: string;
  trackingID: number;
  temperature: string;
}

function QualityCriteriaTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [criteria, setCriteria] = useState<QualityCriteria[]>([]);

  useEffect(() => {
    const fetchCriteria = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://127.0.0.1:8000/criteriaInfo");

        if (!response.ok) {
          throw new Error(`Failed to fetch criteria data: ${response.status}`);
        }

        const data = await response.json();
        setCriteria(data);
      } catch (err) {
        console.error("Error fetching criteria data:", err);
        setError("Failed to load criteria data. Please try again later.");
        // Set sample data for demonstration
        setCriteria([
          {
            criteriaName: "Marbling",
            description: "Amount and distribution of intramuscular fat",
            maxScore: 10,
          },
          {
            criteriaName: "Color",
            description: "Lean meat color",
            maxScore: 10,
          },
          {
            criteriaName: "Texture",
            description: "Meat firmness and feel",
            maxScore: 10,
          },
          {
            criteriaName: "Maturity",
            description: "Age of the animal",
            maxScore: 10,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCriteria();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full py-8 text-center">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
        <p className="mt-2 text-sm text-green-700">Loading criteria data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-4 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader className="bg-green-50">
        <TableRow>
          <TableHead className="w-[30%]">Criteria</TableHead>
          <TableHead className="w-[50%]">Description</TableHead>
          <TableHead className="w-[20%] text-right">Max Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {criteria.map((item, index) => (
          <TableRow key={index} className="hover:bg-green-50">
            <TableCell className="font-medium">{item.criteriaName}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="text-right">
              <div className="inline-flex items-center justify-center h-8 w-8 bg-green-100 text-green-800 rounded-full font-medium">
                {item.maxScore}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [totalBatches, setTotalBatches] = useState(0);

  // Define the Info interface
  interface Info {
    month: string;
    delivered: number;
    delayed: number;
  }

  const [info, setInfo] = useState<Info[]>([]);
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch("http://localhost:8000/deliveredVsPending");

        if (!response.ok) {
          throw new Error(`Failed to fetch delivered vs pending data: ${response.status}`);
        }

        const data = await response.json();
        setInfo(data);
      } catch (err) {
        console.error("Error fetching alert data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfo();
  }, []);

  const shipmentData = info.map((item) => ({
    name: item.month,
    completed: item.delivered,
    pending: item.delayed,
  }));

  const [alerts, setAlerts] = useState<Alert[]>([]);
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/alertInfo");

        if (!response.ok) {
          throw new Error(`Failed to fetch alert data: ${response.status}`);
        }

        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        console.error("Error fetching alert data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  useEffect(() => {
    const fetchTotalBatches = async () => {
      try {
        const response = await fetch("http://localhost:8000/meatbatch", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });
        const data = await response.json();
        setTotalBatches(data.total_meat_batch);
      } catch (error) {
        console.error("Error fetching total batches:", error);
      }
    };
    fetchTotalBatches();
  }, []);

  const [totalActiveFarms, setTotalActiveFarms] = useState(0);

  useEffect(() => {
    const fetchTotalActiveFarms = async () => {
      try {
        const response = await fetch("http://localhost:8000/activeFarms", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        console.log(response);

        const data = await response.json();

        console.log(data);

        setTotalActiveFarms(data.active_farms);
      } catch (error) {
        console.error("Error fetching total active farms:", error);
      }
    };
    fetchTotalActiveFarms();
  }, []);

  const [pendingInspections, setTotalPendingInspections] = useState(0);

  useEffect(() => {
    const fetchpendingInspections = async () => {
      try {
        const response = await fetch("http://localhost:8000/pendingInspections", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        console.log(response);

        const data = await response.json();

        console.log(data);

        setTotalPendingInspections(data.pending_inspections);
      } catch (error) {
        console.error("Error fetching total active farms:", error);
      }
    };
    fetchpendingInspections();
  }, []);

  const [activeShipment, setActiveShipment] = useState(0);

  useEffect(() => {
    const fetchactiveShipment = async () => {
      try {
        const response = await fetch("http://localhost:8000/activeShipment", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        console.log(response);

        const data = await response.json();

        console.log(data);

        setActiveShipment(data.active_shipment);
      } catch (error) {
        console.error("Error fetching total active farms:", error);
      }
    };
    fetchactiveShipment();
  }, []);

  interface BatchData {
    month: string;
    batch_count: number;
  }

  const [batchCountMonthly, setBatchCountMonthly] = useState<BatchData[]>([]);

  useEffect(() => {
    const fetchbatchCountMonthly = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/batchCounts/monthly", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        // Map the data to the format required by the chart
        const formattedData = data.map((item: BatchData) => ({
          name: item.month,
          value: item.batch_count,
        }));

        setBatchCountMonthly(formattedData);
      } catch (error) {
        console.error("Error fetching monthly batch count:", error);
      }
    };
    fetchbatchCountMonthly();
  }, []);

  interface RegionFailureData {
    zone: string;
    failed_batches: number;
    failure_percentage: number;
  }

  interface Quality {
    name: string;
    value: number;
  }
  const [quality, setquality] = useState<Quality[]>([]);
  useEffect(() => {
    const fetchQuality = async () => {
      try {
        const response = await fetch("http://localhost:8000/qualityDistribution");

        if (!response.ok) {
          throw new Error(`Failed to fetch quality distribution data: ${response.status}`);
        }

        const data = await response.json();
        setquality(data);
      } catch (err) {
        console.error("Error fetching quality data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuality();
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#16a34a"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="medium"
      >
        {`${name}: ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const [failureAnalytics, setFailureAnalytics] = useState<RegionFailureData[]>([]);

  useEffect(() => {
    const fetchFailureAnalytics = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/analytics", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }

        const data = await response.json();
        setFailureAnalytics(data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching failure analytics:", error);
      }
    };
    fetchFailureAnalytics();
  }, []);

  // Prepare data for pie chart - we need name property for the labels
  const pieChartData = failureAnalytics.map((item) => ({
    name: item.zone,
    value: item.failure_percentage,
  }));

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Dashboard</h2>
          <p className="text-black font-bold">Welcome back, {user?.name || "Admin"}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-green-700">Last updated: Today, 10:30 AM</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Package className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{totalBatches}</div>
            {/* <p className="text-xs text-green-600">+12% from last month</p> */}
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Farms</CardTitle>
            <Tractor className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{totalActiveFarms}</div>
            {/* <p className="text-xs text-green-600">+2 new this month</p> */}
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Inspections</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{pendingInspections}</div>
            {/* <p className="text-xs text-green-600">-3 from yesterday</p> */}
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Truck className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{activeShipment}</div>
            {/* <p className="text-xs text-green-600">+5 from yesterday</p> */}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-green-100 text-green-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Grading Criteria Section - Full Width */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Grading Criteria</CardTitle>
              <CardDescription>Standards for meat quality assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <QualityCriteriaTable />
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Meat Batch Production</CardTitle>
                <CardDescription>Monthly batch production over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={batchCountMonthly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip
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
                <CardDescription>Batch quality categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={quality}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {quality.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
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

          {/* Shipment Status Section */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Shipment Status</CardTitle>
              <CardDescription>Completed vs pending shipments</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={shipmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#f0fdf4",
                      borderColor: "#bbf7d0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#16a34a" strokeWidth={2} />
                  <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        {/* 
        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Advanced Analytics</CardTitle>
              <CardDescription>Detailed metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-muted-foreground">
                Advanced analytics content will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent> */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Pie Chart Card */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Regional Failure Distribution</CardTitle>
                <CardDescription>Percentage of failures by farm region</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                {isLoading ? (
                  <div className="text-center py-6 text-muted-foreground">Loading data...</div>
                ) : (
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomizedLabel}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={FAILURE_COLORS[index % FAILURE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        formatter={(value: any) => [`${value}%`, "Failure Rate"]}
                        contentStyle={{
                          backgroundColor: "#f0fdf4",
                          borderColor: "#bbf7d0",
                          borderRadius: "8px",
                        }}
                      />

                      {/* <Legend
                        height={36}
                        margin={{ top: 128 }}
                        verticalAlign="bottom"
                        formatter={(value) => <span style={{ color: "#16a34a" }}>{value}</span>}
                      /> */}

                      <Legend
                        align="right"
                        iconSize={12}
                        layout="vertical"
                        iconType="circle"
                        verticalAlign="middle"
                        wrapperStyle={{ paddingLeft: "20px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Table Card */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Failed Batches by Region</CardTitle>
                <CardDescription>Detailed breakdown of batch failures</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-6 text-muted-foreground">Loading data...</div>
                ) : (
                  <Table>
                    <TableHeader className="bg-green-50">
                      <TableRow>
                        <TableHead className="w-[40%]">Region</TableHead>
                        <TableHead className="w-[30%]">Failed Batches</TableHead>
                        <TableHead className="w-[30%]">Failure Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {failureAnalytics.map((item, index) => (
                        <TableRow key={index} className="hover:bg-green-50">
                          <TableCell className="font-medium">{item.zone}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-semibold text-red-600">
                                {item.failed_batches}
                              </span>
                              <div
                                className="ml-2 h-2 bg-red-200 rounded-full"
                                style={{
                                  width: `${Math.min(item.failed_batches * 2, 100)}px`,
                                  backgroundColor: FAILURE_COLORS[index % FAILURE_COLORS.length],
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell>{item.failure_percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Analytics Card */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Failure Analysis Insights</CardTitle>
              <CardDescription>Key observations and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-semibold text-amber-800 mb-2">Key Observations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-amber-700">
                    {failureAnalytics.length > 0 && (
                      <>
                        <li>
                          {
                            failureAnalytics.sort(
                              (a, b) => b.failure_percentage - a.failure_percentage
                            )[0].zone
                          }{" "}
                          has the highest failure rate at{" "}
                          {
                            failureAnalytics.sort(
                              (a, b) => b.failure_percentage - a.failure_percentage
                            )[0].failure_percentage
                          }
                          %
                        </li>
                        <li>
                          Total of{" "}
                          {failureAnalytics.reduce((sum, item) => sum + item.failed_batches, 0)}{" "}
                          failed batches across all regions
                        </li>
                        <li>
                          Average failure rate:{" "}
                          {(
                            failureAnalytics.reduce(
                              (sum, item) => sum + item.failure_percentage,
                              0
                            ) / failureAnalytics.length
                          ).toFixed(1)}
                          %
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-green-700">
                    {failureAnalytics.length > 0 && (
                      <>
                        <li>
                          Conduct quality audit in{" "}
                          {
                            failureAnalytics.sort(
                              (a, b) => b.failure_percentage - a.failure_percentage
                            )[0].zone
                          }{" "}
                          region
                        </li>
                        <li>
                          Review inspection protocols for regions with {">"} 10% failure rates
                        </li>
                        <li>
                          Implement additional training for farm operators in high-failure regions
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">System Alerts</CardTitle>
              <CardDescription>Important notifications requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    {(alert.status === "Delayed" || alert.temperature > "4") && (
                      <AlertTriangle
                        className={`h-5 w-5 ${
                          alert.temperature > "4" ? "text-red-500" : "text-amber-500"
                        }`}
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium">System Alert for #{alert.trackingID}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.temperature > "4" ? (
                          <span className="text-red-500">
                            Temperature is critical: {alert.temperature}°C
                          </span>
                        ) : (
                          `Temperature is normal: ${alert.temperature}°C`
                        )}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Status:{" "}
                        <span
                          className={`font-semibold ${
                            statusColors[alert.status as keyof typeof statusColors] ||
                            "text-gray-500"
                          }`}
                        >
                          {alert.status}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
