"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, Search, Filter } from "lucide-react";
import { AddInspectionDialog } from "@/components/add-inspection-dialog";
import { useEffect, useState } from "react";

// Sample data for inspection reports
// const inspections = [
//   {
//     id: "R5001",
//     batchId: "B1001",
//     inspectorId: "I101",
//     date: "2023-07-16",
//     score: 92,
//     status: "Completed",
//     remarks: "Meets all quality standards",
//   },
//   {
//     id: "R5002",
//     batchId: "B1002",
//     inspectorId: "I102",
//     date: "2023-07-17",
//     score: 0,
//     status: "Pending",
//     remarks: "Scheduled for tomorrow",
//   },
//   {
//     id: "R5003",
//     batchId: "B1003",
//     inspectorId: "I101",
//     date: "2023-07-18",
//     score: 88,
//     status: "Completed",
//     remarks: "Minor issues with packaging",
//   },
//   {
//     id: "R5004",
//     batchId: "B1004",
//     inspectorId: "I103",
//     date: "2023-07-19",
//     score: 65,
//     status: "Failed",
//     remarks: "Temperature control issues",
//   },
//   {
//     id: "R5005",
//     batchId: "B1005",
//     inspectorId: "I102",
//     date: "2023-07-20",
//     score: 95,
//     status: "Completed",
//     remarks: "Excellent quality",
//   },
//   {
//     id: "R5006",
//     batchId: "B1006",
//     inspectorId: "I101",
//     date: "2023-07-21",
//     score: 0,
//     status: "Pending",
//     remarks: "Awaiting inspector",
//   },
// ]

export default function InspectionsPage() {
  interface inspectionData {
    id: number;
    batchId: number;
    inspectorId: number;
    date: string;
    score: number;
    status: string;
    remarks: string;
  }

  const [inspection, setInspection] = useState<inspectionData[]>([]);

  useEffect(() => {
    const fetchinspection = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/inspectionReport", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        // Map the data to the format required by the chart
        setInspection(data);
      } catch (error) {
        console.error("Error fetching inspection report:", error);
      }
    };
    fetchinspection();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">Quality Inspections</h2>
        <AddInspectionDialog />
      </div>

      <div className="flex items-center space-x-2">
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inspections</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">124</div>
            <p className="text-xs text-green-600">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">98</div>
            <p className="text-xs text-green-600">79% completion rate</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="h-4 w-4 rounded-full bg-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">18</div>
            <p className="text-xs text-amber-600">14% of total</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-red-600">6% failure rate</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-200">
          <CardTitle className="text-green-800">Inspection Reports</CardTitle>
          <CardDescription>View and manage quality inspection reports</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead className="w-[100px]">Report ID</TableHead>
                <TableHead>Batch ID</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Quality Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspection.map((inspection) => (
                <TableRow key={inspection.id} className="hover:bg-green-50">
                  <TableCell className="font-medium">{inspection.id}</TableCell>
                  <TableCell>{inspection.batchId}</TableCell>
                  <TableCell>{inspection.inspectorId}</TableCell>
                  <TableCell>{inspection.date}</TableCell>
                  <TableCell>
                    {inspection.status !== "Pending" ? (
                      <div className="flex items-center gap-2">
                        <Progress
                          value={inspection.score}
                          className="h-2"
                          indicatorClassName={
                            inspection.score >= 1
                              ? "bg-green-600"
                              : inspection.score >= 1
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }
                        />
                        <span className="text-sm">{inspection.score}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        inspection.status === "Pass"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : inspection.status === "Recheck"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
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
    </div>
  );
}
