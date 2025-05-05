"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Truck,
  ThermometerSnowflake,
  Clock,
  Calendar,
  MapPin,
  Package,
  Building,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import the Map component with no SSR to avoid hydration issues
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-blue-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
    </div>
  ),
});

interface ShipmentData {
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
  origin: string;
  destination: string;
}

export default function ShipmentTrackingPage() {
  const params = useParams();
  const trackingId = params.trackingId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shipmentsByLocation, setShipmentsByLocation] = useState([]);
  const [shipment, setShipment] = useState<ShipmentData | null>(null);

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/trackingInfo");

        if (!response.ok) {
          throw new Error("Failed to fetch shipment data");
        }

        const data = await response.json();

        // Find the shipment with the matching tracking ID
        const shipmentData = data.find(
          (item: ShipmentData) => item.trackingId.toString() === trackingId
        );

        if (shipmentData) {
          // Add some mock data for origin and destination
          setShipment(shipmentData);
        } else {
          setError("Shipment not found");
        }
      } catch (err) {
        console.error("Error fetching shipment details:", err);
        setError("Failed to load shipment details");
      } finally {
        setLoading(false);
      }
    };

    fetchShipmentDetails();
  }, [trackingId]);

  useEffect(() => {
    const fetchShipmentsByLocation = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/shipmentByLocation", {
          method: "GET",
          headers: {
            contenttype: "application/json",
          },
        });

        const data = await response.json();
        setShipmentsByLocation(data);
      } catch (error) {
        console.error("Error fetching shipments by location:", error);
      }
    };

    fetchShipmentsByLocation();
  }, [trackingId]);

  // Calculate the progress percentage based on status
  const getProgressPercentage = () => {
    if (!shipment) return 0;

    switch (shipment.status) {
      case "Scheduled":
        return 10;
      case "In Transit":
        return 50;
      case "Delayed":
        return 40;
      case "Delivered":
        return 100;
      default:
        return 0;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="flex-1 p-8">
        <Link href="/shipments">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shipments
          </Button>
        </Link>
        <Card className="border-red-200">
          <CardHeader className="bg-red-50 border-b border-red-200">
            <CardTitle className="text-red-800">Error</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p>{error || "Shipment not found"}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/shipments">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shipments
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">
            Tracking #{shipment.trackingId}
          </h2>
        </div>
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
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Shipment Location</CardTitle>
              <CardDescription>Current location of your shipment</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Interactive Map Component */}
              <div className="w-full h-[400px]">
                <MapComponent
                  latitude={Number.parseFloat(shipment.latitude) || 35.9606}
                  longitude={Number.parseFloat(shipment.longitude) || -83.9207}
                  status={shipment.status}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Delivery Progress</CardTitle>
              <CardDescription>Current status of your shipment</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Progress bar */}
                <div className="relative pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">Scheduled</span>
                    <span className="text-xs text-gray-500">In Transit</span>
                    <span className="text-xs text-gray-500">Delivered</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${getProgressPercentage()}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        shipment.status === "Delayed" ? "bg-amber-500" : "bg-green-500"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Timeline visualization similar to the second image */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Order No: #{shipment.id}</div>
                    <div className="text-sm text-gray-500">
                      {shipment.status === "Delivered" ? (
                        <span className="text-green-500">Delivered</span>
                      ) : shipment.status === "In Transit" ? (
                        <span className="text-indigo-500">On Time</span>
                      ) : (
                        <span className="text-red-500">Not Ended Yet</span>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                      <div
                        className={`absolute top-0 left-0 h-1 ${
                          shipment.status === "Delayed" ? "bg-amber-500" : "bg-green-500"
                        }`}
                        style={{ width: `${getProgressPercentage()}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            getProgressPercentage() >= 10 ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="text-xs mt-1">Scheduled</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            getProgressPercentage() >= 30 ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="text-xs mt-1">Departed</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            shipment.status === "In Transit"
                              ? "bg-blue-500"
                              : shipment.status === "Delayed"
                              ? "bg-amber-500"
                              : getProgressPercentage() >= 50
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="text-xs mt-1">In Transit</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            getProgressPercentage() >= 80 ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="text-xs mt-1">Arriving</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            getProgressPercentage() >= 100 ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="text-xs mt-1">Delivered</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="text-xl font-bold text-green-800">{shipment.status}</div>
                    <div className="text-sm text-gray-600">to {shipment.destination}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Shipment Details</CardTitle>
              <CardDescription>Information about this shipment</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-green-700 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Shipment ID</div>
                    <div className="text-sm text-gray-500">#{shipment.id}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-green-700 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Tracking Number</div>
                    <div className="text-sm text-gray-500">#{shipment.trackingId}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-green-700 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Batch ID</div>
                    <div className="text-sm text-gray-500">#{shipment.batchId}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-green-700 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Retailer ID</div>
                    <div className="text-sm text-gray-500">#{shipment.retailerId}</div>
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="flex items-start gap-3">
                  <ThermometerSnowflake className="h-5 w-5 text-green-700 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Temperature</div>
                    <div className="text-sm text-gray-500">{shipment.temperature}</div>
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-700 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Origin</div>
                    <div className="text-sm text-gray-500">{shipment.origin}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-700 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Destination</div>
                    <div className="text-sm text-gray-500">{shipment.destination}</div>
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-green-700 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Departure Time</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(shipment.departureTime)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-700 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Estimated Arrival</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(shipment.estimatedArrival)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-800">Shipments by Location</CardTitle>
              <CardDescription>Distribution of shipments</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="font-medium">Bangladesh</div>

                {shipmentsByLocation.map((location: any, index: number) => (
                  <>
                    <div key={index} className="flex justify-between text-sm">
                      <span>{Object.keys(location)[0]}</span>
                      <span>
                        {Number(Object.values(location)[0]) > 0
                          ? `${Number(Object.values(location)[0])}%`
                          : "0%"}
                      </span>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${Object.values(location)[0]}%` }}
                      ></div>
                    </div>
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
