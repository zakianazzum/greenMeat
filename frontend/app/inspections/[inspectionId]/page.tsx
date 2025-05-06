"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  ClipboardCheck,
  FileWarning,
  Scale,
  User,
  Printer,
  Download,
  Share2,
  MessageSquareWarning,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This would normally come from an API call
const fetchInspectionReport = async (reportId: string) => {
  // In a real app, this would be a fetch call to the API
  // return fetch(`http://127.0.0.1:8000/inspectionReport/${reportId}`).then(res => res.json())

  // For demo purposes, we'll return the sample data
  return {
    inspectorID: 24,
    batchID: 426,
    productionDate: "2024-09-12",
    averageWeight: 247.08,
    categoryName: "Turkey Chicken",
    gradeName: "Not for Sale",
    description: "Unacceptable quality, significant defects, not for human consumption",
    name: "Zakia Sultana",
  };
};

// Mock data for the inspection criteria
const inspectionCriteria = [
  {
    name: "Visual Appearance",
    status: "Failed",
    notes: "Discoloration and abnormal texture observed",
  },
  { name: "Odor Assessment", status: "Failed", notes: "Strong off-odors detected" },
  {
    name: "Temperature Check",
    status: "Failed",
    notes: "Temperature history shows improper storage",
  },
  {
    name: "Microbial Testing",
    status: "Failed",
    notes: "Exceeds acceptable microbial count limits",
  },
  { name: "Foreign Material", status: "Passed", notes: "No foreign materials detected" },
  {
    name: "Packaging Integrity",
    status: "Passed",
    notes: "Packaging is intact and properly sealed",
  },
];

interface reportDetails {
  status: string;
  remarks: string;
  batchID: number;
  reportID: number;
  gradeName: string;
  inspectorID: number;
  categoryName: string;
  totalScore: number;
  inspectorName: string;
  averageWeight: number;
  productionDate: string;
  gradeDescription: string;
  criteria: Array<{
    criteriaName: string;
    score: number;
    description: string;
  }>;
}

export default function InspectionReportPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.reportId as string;
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const [reportDetails, setReportDetails] = useState<reportDetails | null>(null);

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/inspectionReport/${pathname.split("/").pop()}`,
          {
            method: "GET",
            headers: {
              contenttype: "application/json",
            },
          }
        );

        const data = await response.json();

        // Fetch criteria information
        const criteriaResponse = await fetch(
          `http://127.0.0.1:8000/criteriaInfo/${pathname.split("/").pop()}`,
          {
            method: "GET",
            headers: {
              contenttype: "application/json",
            },
          }
        );

        const criteriaData = await criteriaResponse.json();

        // Combine the data
        const combinedData = {
          ...data,
          criteria: criteriaData,
        };

        console.log(combinedData);

        setLoading(false);
        setReportDetails(combinedData);
      } catch (error) {
        console.error("Error fetching inspection report:", error);
      }
    };

    fetchReportDetails();
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex-1 p-8 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-[80vh] bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (!reportDetails) {
    return (
      <div className="flex-1 p-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load inspection report. Please try again later.
          </AlertDescription>
        </Alert>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/inspections")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inspections
        </Button>
      </div>
    );
  }

  // Determine the severity color based on grade
  const isNotForSale =
    reportDetails.gradeName === "Not for Sale" || reportDetails.gradeName === "Reject";
  const severityColor = isNotForSale
    ? "red"
    : reportDetails.gradeName === "Standard" || reportDetails.gradeName === "Select"
    ? "amber"
    : "green";

  // Format the date
  const formattedDate = new Date(reportDetails.productionDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/inspections")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">
            Inspection Report <span className="text-gray-500">#{reportDetails.reportID}</span>
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      {isNotForSale && (
        <Alert variant="destructive" className="border-red-800 bg-red-50">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle className="text-red-800 font-bold">Critical Quality Issue</AlertTitle>
          <AlertDescription className="text-red-700">
            This batch has been marked as "Not for Sale" and requires immediate attention. The
            product is not suitable for human consumption and must be disposed of according to
            protocol.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 border-green-200">
          <CardHeader className="bg-green-50 border-b border-green-200">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-green-800">Batch Information</CardTitle>
                <CardDescription>Details about the inspected batch</CardDescription>
              </div>
              <Badge
                className={`
                  ${
                    isNotForSale
                      ? "bg-red-100 text-red-800 hover:bg-red-200 border-red-300"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }
                  px-3 py-1 text-sm font-medium
                `}
              >
                {reportDetails.gradeName}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <ClipboardCheck className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Batch ID</p>
                    <p className="font-medium">{reportDetails.batchID}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Production Date</p>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Scale className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average Weight</p>
                    <p className="font-medium">{reportDetails.averageWeight} kg</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FileWarning className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{reportDetails.categoryName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className={`bg-${severityColor}-100 p-2 rounded-full`}>
                    <AlertTriangle className={`h-5 w-5 text-${severityColor}-700`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quality Grade</p>
                    <p className={`font-medium ${isNotForSale ? "text-red-600 font-bold" : ""}`}>
                      {reportDetails.gradeName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Inspector</p>
                    <p className="font-medium">{reportDetails.inspectorName}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="font-semibold mb-2">Quality Assessment</h3>
              <p
                className={`p-3 rounded-md ${
                  isNotForSale ? "bg-red-50 text-red-800 border border-red-200" : "bg-gray-50"
                }`}
              >
                {reportDetails.gradeDescription}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 h-fit">
          <CardHeader className="bg-green-50 border-b border-green-200">
            <CardTitle className="text-green-800">Inspector Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={`/placeholder.svg?height=96&width=96`}
                  alt={reportDetails.inspectorName}
                />
                <AvatarFallback className="text-2xl bg-green-100 text-green-800">
                  {reportDetails.inspectorName
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="text-center">
                <h3 className="font-semibold text-lg">{reportDetails.inspectorName}</h3>
                <p className="text-sm text-gray-500">Quality Inspector</p>
                <p className="text-sm text-gray-500">ID: {reportDetails.inspectorID}</p>
              </div>

              <div className="w-full pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Inspections Completed</span>
                  <span className="font-medium">247</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>

                <div className="flex justify-between text-sm mb-1 mt-4">
                  <span>Accuracy Rating</span>
                  <span className="font-medium">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "96%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="criteria" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="criteria">Inspection Criteria</TabsTrigger>
        </TabsList>

        <TabsContent value="criteria" className="mt-4">
          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Inspection Criteria</CardTitle>
              <CardDescription>Detailed assessment of quality parameters</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-green-800">Criteria</th>
                    <th className="text-left p-4 font-medium text-green-800">Score</th>
                    <th className="text-left p-4 font-medium text-green-800">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {reportDetails?.criteria?.map((criteria, index) => (
                    <tr key={index} className="border-t border-green-100">
                      <td className="p-4">{criteria.criteriaName}</td>
                      <td className="p-4">
                        <Badge>{criteria.score}</Badge>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{criteria.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
