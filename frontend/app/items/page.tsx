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
import { Beef, Search, Filter, MoreHorizontal, Thermometer } from "lucide-react"
import { AddItemDialog } from "@/components/add-item-dialog"

// Sample data for items
const items = [
  {
    id: "I1001",
    itemType: "Beef",
    farmId: "F1001",
    farmName: "Smith Family Farm",
    category: "Premium",
    idealTemperature: "2°C",
    batchCount: 5,
  },
  {
    id: "I1002",
    itemType: "Pork",
    farmId: "F1002",
    farmName: "Wilson Ranch",
    category: "Standard",
    idealTemperature: "1.5°C",
    batchCount: 3,
  },
  {
    id: "I1003",
    itemType: "Lamb",
    farmId: "F1003",
    farmName: "Anderson Pastures",
    category: "Premium",
    idealTemperature: "1°C",
    batchCount: 2,
  },
  {
    id: "I1004",
    itemType: "Beef",
    farmId: "F1001",
    farmName: "Smith Family Farm",
    category: "Standard",
    idealTemperature: "2°C",
    batchCount: 4,
  },
  {
    id: "I1005",
    itemType: "Chicken",
    farmId: "F1005",
    farmName: "Brown Poultry",
    category: "Premium",
    idealTemperature: "0.5°C",
    batchCount: 6,
  },
  {
    id: "I1006",
    itemType: "Pork",
    farmId: "F1006",
    farmName: "Davis Farms",
    category: "Economy",
    idealTemperature: "1.5°C",
    batchCount: 2,
  },
  {
    id: "I1007",
    itemType: "Beef",
    farmId: "F1007",
    farmName: "Miller Meadows",
    category: "Premium",
    idealTemperature: "2°C",
    batchCount: 3,
  },
]

// Sample data for item types
const itemTypeStats = [
  { type: "Beef", count: 15, percentage: 45 },
  { type: "Pork", count: 8, percentage: 24 },
  { type: "Lamb", count: 5, percentage: 15 },
  { type: "Chicken", count: 6, percentage: 16 },
]

export default function ItemsPage() {
  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">Item Management</h2>
        <AddItemDialog />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search items..." className="pl-8 bg-white border-green-200" />
        </div>
        <Button variant="outline" className="border-green-200">
          <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Beef className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">34</div>
            <p className="text-xs text-green-600">+5 new this month</p>
          </CardContent>
        </Card>

        {itemTypeStats.map((item) => (
          <Card key={item.type} className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.type}</CardTitle>
              <Beef className="h-4 w-4 text-green-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{item.count}</div>
              <p className="text-xs text-green-600">{item.percentage}% of items</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-200">
          <CardTitle className="text-green-800">Item Catalog</CardTitle>
          <CardDescription>Manage meat items and their specifications</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead className="w-[80px]">Item ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Farm</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Ideal Temp</TableHead>
                <TableHead>Batches</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="hover:bg-green-50">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.itemType}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{item.farmName}</span>
                      <span className="text-xs text-muted-foreground">{item.farmId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        item.category === "Premium"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : item.category === "Standard"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      }
                    >
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-3 w-3 text-green-700" />
                      {item.idealTemperature}
                    </div>
                  </TableCell>
                  <TableCell>{item.batchCount}</TableCell>
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
                        <DropdownMenuItem>Edit Item</DropdownMenuItem>
                        <DropdownMenuItem>View Batches</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete Item</DropdownMenuItem>
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

