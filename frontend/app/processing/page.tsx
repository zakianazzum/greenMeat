import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Factory, Search, Filter, MoreHorizontal, Package } from "lucide-react"
import { AddProcessingRecordDialog } from "@/components/add-processing-record-dialog"
import { AddPlantDialog } from "@/components/add-plant-dialog"

// Sample data for processing plants
const plants = [
  {
    id: "P1001",
    name: "Midwest Processing Center",
    zone: "Zone A",
    processSize: "Large",
    recordCount: 28,
    status: "Active",
  },
  {
    id: "P1002",
    name: "Eastern Packaging Facility",
    zone: "Zone B",
    processSize: "Medium",
    recordCount: 15,
    status: "Active",
  },
  {
    id: "P1003",
    name: "Southern Meat Processing",
    zone: "Zone C",
    processSize: "Large",
    recordCount: 32,
    status: "Active",
  },
  {
    id: "P1004",
    name: "Western Distribution Center",
    zone: "Zone A",
    processSize: "Small",
    recordCount: 10,
    status: "Maintenance",
  },
  {
    id: "P1005",
    name: "Central Packaging Plant",
    zone: "Zone B",
    processSize: "Medium",
    recordCount: 18,
    status: "Active",
  },
]

// Sample data for processing records
const records = [
  {
    id: "PR1001",
    plantId: "P1001",
    plantName: "Midwest Processing Center",
    batchId: "B1001",
    packagingStatus: "Completed",
    packageQuantity: 120,
    packagingDate: "2023-07-15",
  },
  {
    id: "PR1002",
    plantId: "P1002",
    plantName: "Eastern Packaging Facility",
    batchId: "B1002",
    packagingStatus: "In Progress",
    packageQuantity: 85,
    packagingDate: "2023-07-16",
  },
  {
    id: "PR1003",
    plantId: "P1003",
    plantName: "Southern Meat Processing",
    batchId: "B1003",
    packagingStatus: "Completed",
    packageQuantity: 150,
    packagingDate: "2023-07-17",
  },
  {
    id: "PR1004",
    plantId: "P1001",
    plantName: "Midwest Processing Center",
    batchId: "B1004",
    packagingStatus: "Scheduled",
    packageQuantity: 0,
    packagingDate: "2023-07-18",
  },
  {
    id: "PR1005",
    plantId: "P1005",
    plantName: "Central Packaging Plant",
    batchId: "B1005",
    packagingStatus: "Completed",
    packageQuantity: 95,
    packagingDate: "2023-07-15",
  },
  {
    id: "PR1006",
    plantId: "P1003",
    plantName: "Southern Meat Processing",
    batchId: "B1006",
    packagingStatus: "In Progress",
    packageQuantity: 60,
    packagingDate: "2023-07-16",
  },
]

export default function ProcessingPage() {
  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">Processing Management</h2>
        <AddProcessingRecordDialog />
      </div>

      <Tabs defaultValue="plants" className="space-y-4">
        <TabsList className="bg-green-100 text-green-800">
          <TabsTrigger value="plants">Processing Plants</TabsTrigger>
          <TabsTrigger value="records">Processing Records</TabsTrigger>
        </TabsList>

        <TabsContent value="plants" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search plants..." className="pl-8 bg-white border-green-200" />
            </div>
            <Button variant="outline" className="border-green-200">
              <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
            </Button>
            <AddPlantDialog />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Plants</CardTitle>
                <Factory className="h-4 w-4 text-green-700" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">5</div>
                <p className="text-xs text-green-600">Processing capacity: 1,200 units/day</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Plants</CardTitle>
                <div className="h-4 w-4 rounded-full bg-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">4</div>
                <p className="text-xs text-green-600">80% operational</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                <Package className="h-4 w-4 text-green-700" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">103</div>
                <p className="text-xs text-green-600">+15 this week</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Processing Plants</CardTitle>
              <CardDescription>Manage meat processing facilities</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-green-50">
                  <TableRow>
                    <TableHead className="w-[80px]">Plant ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plants.map((plant) => (
                    <TableRow key={plant.id} className="hover:bg-green-50">
                      <TableCell className="font-medium">{plant.id}</TableCell>
                      <TableCell>{plant.name}</TableCell>
                      <TableCell>{plant.zone}</TableCell>
                      <TableCell>{plant.processSize}</TableCell>
                      <TableCell>{plant.recordCount}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            plant.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : plant.status === "Maintenance"
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                          }
                        >
                          {plant.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Plant</DropdownMenuItem>
                            <DropdownMenuItem>View Records</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-amber-600">Set Maintenance</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search records..." className="pl-8 bg-white border-green-200" />
            </div>
            <Button variant="outline" className="border-green-200">
              <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <div className="h-4 w-4 rounded-full bg-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">68</div>
                <p className="text-xs text-green-600">66% of records</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <div className="h-4 w-4 rounded-full bg-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">25</div>
                <p className="text-xs text-blue-600">24% of records</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                <div className="h-4 w-4 rounded-full bg-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">10</div>
                <p className="text-xs text-amber-600">10% of records</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Processing Records</CardTitle>
              <CardDescription>Track meat processing and packaging operations</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-green-50">
                  <TableRow>
                    <TableHead className="w-[80px]">Record ID</TableHead>
                    <TableHead>Plant</TableHead>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id} className="hover:bg-green-50">
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{record.plantName}</span>
                          <span className="text-xs text-muted-foreground">{record.plantId}</span>
                        </div>
                      </TableCell>
                      <TableCell>{record.batchId}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            record.packagingStatus === "Completed"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : record.packagingStatus === "In Progress"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          }
                        >
                          {record.packagingStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.packageQuantity}</TableCell>
                      <TableCell>{record.packagingDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Record</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete Record</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
  )
}

