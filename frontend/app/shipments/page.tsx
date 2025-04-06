import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Truck, Search, Filter, MapPin } from "lucide-react"
import { AddShipmentDialog } from "@/components/add-shipment-dialog"

// Sample data for shipments
const shipments = [
  {
    id: "SH1001",
    trackingId: "T5001",
    batchId: "B1001",
    retailerId: "R201",
    departureTime: "2023-07-16 08:30",
    estimatedArrival: "2023-07-17 14:00",
    status: "In Transit",
    temperature: "2.5°C",
    location: "35.6895, 139.6917",
  },
  {
    id: "SH1002",
    trackingId: "T5002",
    batchId: "B1003",
    retailerId: "R202",
    departureTime: "2023-07-17 09:15",
    estimatedArrival: "2023-07-18 15:30",
    status: "Delivered",
    temperature: "2.2°C",
    location: "34.0522, -118.2437",
  },
  {
    id: "SH1003",
    trackingId: "T5003",
    batchId: "B1005",
    retailerId: "R203",
    departureTime: "2023-07-18 07:45",
    estimatedArrival: "2023-07-19 12:15",
    status: "In Transit",
    temperature: "2.8°C",
    location: "51.5074, -0.1278",
  },
  {
    id: "SH1004",
    trackingId: "T5004",
    batchId: "B1002",
    retailerId: "R201",
    departureTime: "2023-07-19 10:00",
    estimatedArrival: "2023-07-20 16:45",
    status: "Scheduled",
    temperature: "N/A",
    location: "N/A",
  },
  {
    id: "SH1005",
    trackingId: "T5005",
    batchId: "B1004",
    retailerId: "R204",
    departureTime: "2023-07-20 08:30",
    estimatedArrival: "2023-07-21 14:00",
    status: "Delayed",
    temperature: "2.4°C",
    location: "40.7128, -74.0060",
  },
]

export default function ShipmentsPage() {
  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">Shipment Tracking</h2>
        <AddShipmentDialog />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search shipments..." className="pl-8 bg-white border-green-200" />
        </div>
        <Button variant="outline" className="border-green-200">
          <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Truck className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">87</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">24</div>
            <p className="text-xs text-blue-600">28% of total</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">58</div>
            <p className="text-xs text-green-600">67% of total</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed</CardTitle>
            <div className="h-4 w-4 rounded-full bg-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">5</div>
            <p className="text-xs text-amber-600">6% of total</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-200">
          <CardTitle className="text-green-800">Shipment Management</CardTitle>
          <CardDescription>Track and manage meat product shipments</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead className="w-[100px]">Shipment ID</TableHead>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Batch ID</TableHead>
                <TableHead>Retailer</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id} className="hover:bg-green-50">
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.trackingId}</TableCell>
                  <TableCell>{shipment.batchId}</TableCell>
                  <TableCell>{shipment.retailerId}</TableCell>
                  <TableCell>{shipment.departureTime}</TableCell>
                  <TableCell>{shipment.estimatedArrival}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        shipment.status === "Delivered"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : shipment.status === "In Transit"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : shipment.status === "Scheduled"
                              ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      }
                    >
                      {shipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{shipment.temperature}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-50">
                      <MapPin className="mr-1 h-4 w-4" /> Track
                    </Button>
                    <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-50">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

