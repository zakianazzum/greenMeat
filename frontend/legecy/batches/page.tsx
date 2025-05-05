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
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { AddBatchDialog } from "@/components/add-batch-dialog";

// Sample data for meat batches
const batches = [
  {
    id: "B1001",
    productionDate: "2023-07-15",
    averageWeight: "12.5 kg",
    qualityStatus: "Passed",
    reportId: "R5001",
  },
  {
    id: "B1002",
    productionDate: "2023-07-16",
    averageWeight: "11.8 kg",
    qualityStatus: "Pending",
    reportId: "R5002",
  },
  {
    id: "B1003",
    productionDate: "2023-07-17",
    averageWeight: "13.2 kg",
    qualityStatus: "Passed",
    reportId: "R5003",
  },
  {
    id: "B1004",
    productionDate: "2023-07-18",
    averageWeight: "12.1 kg",
    qualityStatus: "Failed",
    reportId: "R5004",
  },
  {
    id: "B1005",
    productionDate: "2023-07-19",
    averageWeight: "12.7 kg",
    qualityStatus: "Passed",
    reportId: "R5005",
  },
  {
    id: "B1006",
    productionDate: "2023-07-20",
    averageWeight: "11.5 kg",
    qualityStatus: "Pending",
    reportId: "R5006",
  },
  {
    id: "B1007",
    productionDate: "2023-07-21",
    averageWeight: "12.9 kg",
    qualityStatus: "Passed",
    reportId: "R5007",
  },
];

export default function BatchesPage() {
  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">Meat Batches</h2>
        <AddBatchDialog />
      </div>

      <div className="flex items-center space-x-2">
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
      </div>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-200">
          <CardTitle className="text-green-800">Meat Batch Management</CardTitle>
          <CardDescription>View and manage all meat batches in the system</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead className="w-[100px]">Batch ID</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Production Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Average Weight</TableHead>
                <TableHead>Quality Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch.id} className="hover:bg-green-50">
                  <TableCell className="font-medium">{batch.id}</TableCell>
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
