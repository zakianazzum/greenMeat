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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Beef, Search, Filter, MoreHorizontal, Thermometer } from "lucide-react";
import { AddItemDialog } from "@/components/add-item-dialog";
import { useEffect, useState } from "react";

// Sample data for items

// Sample data for item types
const itemTypeStats = [
  { type: "Beef", count: 15, percentage: 45 },
  { type: "Mutton", count: 8, percentage: 24 },
  { type: "Lamb", count: 5, percentage: 15 },
  { type: "Chicken", count: 6, percentage: 16 },
];

export default function ItemsPage() {
  // This is where you would fetch your data from an API or database
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchTotalItems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/totalItems", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        console.log(response);

        const data = await response.json();

        console.log(data);

        setTotalItems(data.total_item);
      } catch (error) {
        console.error("Error fetching total items:", error);
      }
    };
    fetchTotalItems();
  }, []);

  interface ItemData {
    categoryName: string;
    itemCount: number;
  }

  const [itemCount, setItemCount] = useState<ItemData[]>([]);

  useEffect(() => {
    const fetchItemCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/itemCounts", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        // Map the data to the format required by the chart
        setItemCount(data);
      } catch (error) {
        console.error("Error fetching item count:", error);
      }
    };
    fetchItemCount();
  }, []);

  interface ItemCatalogData {
    id: number;
    itemType: string;
    slaughterHname: string;
    batchCount: number;
  }

  const [itemCatalog, setItemCatalog] = useState<ItemCatalogData[]>([]);

  useEffect(() => {
    const fetchitemCatalog = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/itemCatalog", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        // Map the data to the format required by the chart
        setItemCatalog(data);
      } catch (error) {
        console.error("Error fetching item count:", error);
      }
    };
    fetchitemCatalog();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">Item Management</h2>
        <AddItemDialog />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items..."
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
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Beef className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{totalItems}</div>
            <p className="text-xs text-green-600">+5 new this month</p>
          </CardContent>
        </Card>

        {itemCount.map((item) => (
          <Card key={item.categoryName} className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.categoryName}</CardTitle>
              <Beef className="h-4 w-4 text-green-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{item.itemCount}</div>
              {/* <p className="text-xs text-green-600">{item.percentage}% of items</p> */}
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
          <Table className="table-auto">
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead className="w-[80px]">Item ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Slaughter House</TableHead>
                {/* <TableHead>Category</TableHead> */}
                {/* <TableHead>Ideal Temp</TableHead> */}
                <TableHead>Batches</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itemCatalog.map((item) => (
                <TableRow key={`${item.id}-${item.itemType}`} className="hover:bg-green-50">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.itemType}</TableCell>
                  <TableCell>{item.slaughterHname}</TableCell>
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
                        {/* <DropdownMenuItem>View Details</DropdownMenuItem> */}
                        <DropdownMenuItem>Edit Item</DropdownMenuItem>
                        {/* <DropdownMenuItem>View Batches</DropdownMenuItem> */}
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
  );
}
