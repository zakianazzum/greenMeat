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
import { Truck, Search, Filter, MapPin } from "lucide-react";
import { AddShipmentDialog } from "@/components/add-shipment-dialog";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShipmentsPage() {
  interface shipmentData {
    id: number;
    trackingId: number;
    batchId: number;
    retailerId: number;
    departureTime: string;
    estimatedArrival: string;
    status: string;
    temperature: string;
    longitude: string;
    latitude: string;
  }

  const [shipment, setShipment] = useState<shipmentData[]>([]);

  useEffect(() => {
    const fetchshipment = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/trackingInfo", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        // Map the data to the format required by the chart
        setShipment(data);
      } catch (error) {
        console.error("Error fetching inspection report:", error);
      }
    };
    fetchshipment();
  }, []);

  interface shipmentStats {
    total_shipment: number;
    in_transit: number;
    delivered: number;
    delayed: number;
  }

  const [shipmentStats, setShipmentStats] = useState<shipmentStats>({
    total_shipment: 0,
    in_transit: 0,
    delivered: 0,
    delayed: 0,
  });

  useEffect(() => {
    const fetchshipmentStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/shipmentInfo", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        // Map the data to the format required by the chart
        setShipmentStats(data);
      } catch (error) {
        console.error("Error fetching shipment stats:", error);
      }
    };
    fetchshipmentStats();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">Shipment Tracking</h2>
        <AddShipmentDialog />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search shipments..."
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
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Truck className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{shipmentStats.total_shipment}</div>
            {/* <p className="text-xs text-green-600">+12% from last month</p> */}
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{shipmentStats.in_transit}</div>
            {/* <p className="text-xs text-blue-600">28% of total</p> */}
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{shipmentStats.delivered}</div>
            {/* <p className="text-xs text-green-600">67% of total</p> */}
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed</CardTitle>
            <div className="h-4 w-4 rounded-full bg-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{shipmentStats.delayed}</div>
            {/* <p className="text-xs text-amber-600">6% of total</p> */}
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
              {shipment.map((shipment, i) => (
                <TableRow key={i} className="hover:bg-green-50">
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
                    <Link href={`/shipments/${shipment.trackingId}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-700 hover:text-green-800 hover:bg-green-50"
                      >
                        <MapPin className="mr-1 h-4 w-4" /> Track
                      </Button>
                    </Link>
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
