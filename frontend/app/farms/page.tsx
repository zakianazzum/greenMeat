import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tractor, Search, Filter, MoreHorizontal, MapPin } from "lucide-react"
import { AddFarmDialog } from "@/components/add-farm-dialog"

// Sample data for farms
const farms = [
  {
    id: "F1001",
    farmerId: "U1002",
    farmerName: "Jane Smith",
    region: "Midwest",
    zone: "Zone A",
    itemCount: 12,
    status: "Active",
  },
  {
    id: "F1002",
    farmerId: "U1005",
    farmerName: "Michael Wilson",
    region: "Northeast",
    zone: "Zone B",
    itemCount: 8,
    status: "Active",
  },
  {
    id: "F1003",
    farmerId: "U1008",
    farmerName: "Thomas Anderson",
    region: "South",
    zone: "Zone C",
    itemCount: 15,
    status: "Active",
  },
  {
    id: "F1004",
    farmerId: "U1010",
    farmerName: "Lisa Johnson",
    region: "West",
    zone: "Zone A",
    itemCount: 6,
    status: "Inactive",
  },
  {
    id: "F1005",
    farmerId: "U1012",
    farmerName: "Kevin Brown",
    region: "Midwest",
    zone: "Zone B",
    itemCount: 10,
    status: "Active",
  },
  {
    id: "F1006",
    farmerId: "U1015",
    farmerName: "Amanda Davis",
    region: "Northeast",
    zone: "Zone C",
    itemCount: 9,
    status: "Active",
  },
  {
    id: "F1007",
    farmerId: "U1018",
    farmerName: "Ryan Miller",
    region: "South",
    zone: "Zone A",
    itemCount: 7,
    status: "Pending",
  },
]

// Sample data for regions
const regionStats = [
  { name: "Midwest", count: 8, percentage: 33 },
  { name: "Northeast", count: 6, percentage: 25 },
  { name: "South", count: 5, percentage: 21 },
  { name: "West", count: 5, percentage: 21 },
]

export default function FarmsPage() {
  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">Farm Management</h2>
        <AddFarmDialog />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search farms..." className="pl-8 bg-white border-green-200" />
        </div>
        <Button variant="outline" className="border-green-200">
          <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
            <Tractor className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">24</div>
            <p className="text-xs text-green-600">+2 new this month</p>
          </CardContent>
        </Card>

        {regionStats.map((region) => (
          <Card key={region.name} className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{region.name}</CardTitle>
              <MapPin className="h-4 w-4 text-green-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{region.count}</div>
              <p className="text-xs text-green-600">{region.percentage}% of farms</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-200">
          <CardTitle className="text-green-800">Farm Directory</CardTitle>
          <CardDescription>Manage farms and their associated farmers</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead className="w-[80px]">Farm ID</TableHead>
                <TableHead>Farmer</TableHead>
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
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{farm.farmerName}</span>
                      <span className="text-xs text-muted-foreground">{farm.farmerId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{farm.region}</TableCell>
                  <TableCell>{farm.zone}</TableCell>
                  <TableCell>{farm.itemCount}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        farm.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : farm.status === "Inactive"
                            ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      }
                    >
                      {farm.status}
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
                        <DropdownMenuItem>Edit Farm</DropdownMenuItem>
                        <DropdownMenuItem>View Items</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

