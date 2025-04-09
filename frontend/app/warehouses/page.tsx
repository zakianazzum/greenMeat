import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Warehouse, Search, Filter, MoreHorizontal, Package } from "lucide-react"
import { AddWarehouseDialog } from "@/components/add-warehouse-dialog"

// Sample data for warehouses
const warehouses = [
  {
    id: "W1001",
    name: "Midwest Distribution Center",
    location: "Chicago, IL",
    capacity: 5000,
    currentUsage: 3250,
    batchCount: 28,
    status: "Active",
  },
  {
    id: "W1002",
    name: "Eastern Storage Facility",
    location: "Philadelphia, PA",
    capacity: 3500,
    currentUsage: 2800,
    batchCount: 22,
    status: "Active",
  },
  {
    id: "W1003",
    name: "Southern Cold Storage",
    location: "Atlanta, GA",
    capacity: 4200,
    currentUsage: 2100,
    batchCount: 18,
    status: "Active",
  },
  {
    id: "W1004",
    name: "Western Distribution Hub",
    location: "Denver, CO",
    capacity: 3800,
    currentUsage: 3600,
    batchCount: 32,
    status: "Near Capacity",
  },
  {
    id: "W1005",
    name: "Central Refrigeration Warehouse",
    location: "Kansas City, MO",
    capacity: 4500,
    currentUsage: 2250,
    batchCount: 20,
    status: "Active",
  },
  {
    id: "W1006",
    name: "Northern Storage Center",
    location: "Minneapolis, MN",
    capacity: 3000,
    currentUsage: 900,
    batchCount: 8,
    status: "Maintenance",
  },
]

export default function WarehousesPage() {
  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">Warehouse Management</h2>
        <AddWarehouseDialog />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search warehouses..." className="pl-8 bg-white border-green-200" />
        </div>
        <Button variant="outline" className="border-green-200">
          <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Warehouses</CardTitle>
            <Warehouse className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">6</div>
            <p className="text-xs text-green-600">Total capacity: 24,000 units</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Storage Used</CardTitle>
            <Package className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">14,900</div>
            <p className="text-xs text-green-600">62% of total capacity</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Warehouses</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">5</div>
            <p className="text-xs text-green-600">83% operational</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches Stored</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">128</div>
            <p className="text-xs text-blue-600">+15 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-200">
          <CardTitle className="text-green-800">Warehouse Directory</CardTitle>
          <CardDescription>Manage storage facilities and monitor capacity</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead className="w-[80px]">Warehouse ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity Usage</TableHead>
                <TableHead>Batches</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.map((warehouse) => {
                const usagePercentage = Math.round((warehouse.currentUsage / warehouse.capacity) * 100)
                return (
                  <TableRow key={warehouse.id} className="hover:bg-green-50">
                    <TableCell className="font-medium">{warehouse.id}</TableCell>
                    <TableCell>{warehouse.name}</TableCell>
                    <TableCell>{warehouse.location}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{usagePercentage}%</span>
                          <span className="text-xs text-muted-foreground">
                            {warehouse.currentUsage} / {warehouse.capacity}
                          </span>
                        </div>
                        <Progress
                          value={usagePercentage}
                          className="h-2"
                          indicatorClassName={
                            usagePercentage < 50 ? "bg-green-600" : usagePercentage < 80 ? "bg-amber-500" : "bg-red-500"
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>{warehouse.batchCount}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          warehouse.status === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : warehouse.status === "Near Capacity"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                        }
                      >
                        {warehouse.status}
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
                          <DropdownMenuItem>Edit Warehouse</DropdownMenuItem>
                          <DropdownMenuItem>View Inventory</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-amber-600">Set Maintenance</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

