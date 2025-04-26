"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  latitude: number;
  longitude: number;
  status: string;
}

export default function MapComponent({ latitude, longitude, status }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map if it doesn't exist
    if (!mapInstanceRef.current) {
      // Default to Knoxville, TN if coordinates are invalid
      const validLat = isNaN(latitude) ? 35.9606 : latitude;
      const validLng = isNaN(longitude) ? -83.9207 : longitude;

      // Create the map instance
      mapInstanceRef.current = L.map(mapRef.current).setView([validLat, validLng], 5);

      // Add the OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Add sample locations for North America distribution centers
      const locations = [
        { name: "Raleigh", lat: 35.7796, lng: -78.6382 },
        { name: "Knoxville", lat: 35.9606, lng: -83.9207 },
        { name: "Wausau", lat: 44.9591, lng: -89.6301 },
        { name: "Manaus", lat: -3.119, lng: -60.0217 },
        { name: "Milwaukee", lat: 43.0389, lng: -87.9065 },
      ];

      // Create a custom icon for distribution centers
      const warehouseIcon = L.icon({
        iconUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png",
        shadowSize: [41, 41],
      });

      // Add markers for each location
      locations.forEach((location) => {
        L.marker([location.lat, location.lng], { icon: warehouseIcon })
          .addTo(mapInstanceRef.current!)
          .bindPopup(`<b>${location.name} Distribution Center</b>`);
      });

      // Create a custom icon for the shipment based on status
      const getShipmentIcon = (status: string) => {
        // Base icon properties
        const iconProps: {
          iconSize: L.PointTuple;
          iconAnchor: L.PointTuple;
          popupAnchor: L.PointTuple;
        } = {
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -15],
        };

        // Different icons based on status
        if (status === "In Transit") {
          return L.divIcon({
            ...iconProps,
            className: "bg-transparent",
            html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-lg animate-pulse">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					  <path d="M13 16V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1m8-1a1 1 0 0 1-1 1H9m4 0a1 1 0 0 1-1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1m8-1a1 1 0 0 1-1 1H9m4 0a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1m0-3h14" />
					</svg>
				  </div>`,
          });
        } else if (status === "Delayed") {
          return L.divIcon({
            ...iconProps,
            className: "bg-transparent",
            html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 border-2 border-white shadow-lg animate-pulse">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					  <path d="M13 16V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1m8-1a1 1 0 0 1-1 1H9m4 0a1 1 0 0 1-1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1m8-1a1 1 0 0 1-1 1H9m4 0a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1m0-3h14" />
					</svg>
				  </div>`,
          });
        } else if (status === "Delivered") {
          return L.divIcon({
            ...iconProps,
            className: "bg-transparent",
            html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 border-2 border-white shadow-lg">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					  <path d="M5 13l4 4L19 7" />
					</svg>
				  </div>`,
          });
        } else {
          // Scheduled
          return L.divIcon({
            ...iconProps,
            className: "bg-transparent",
            html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 border-2 border-white shadow-lg">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					  <circle cx="12" cy="12" r="10" />
					  <path d="M12 6v6l4 2" />
					</svg>
				  </div>`,
          });
        }
      };

      // Add the shipment marker
      const shipmentMarker = L.marker([validLat, validLng], { icon: getShipmentIcon(status) })
        .addTo(mapInstanceRef.current)
        .bindPopup(
          `<b>Shipment #${Math.floor(
            Math.random() * 10000
          )}</b><br>Status: ${status}<br>Location: [${validLat.toFixed(4)}, ${validLng.toFixed(4)}]`
        )
        .openPopup();

      // If in transit, add a path from origin to destination
      if (status === "In Transit" || status === "Delayed") {
        // Sample origin and destination
        const origin = [44.9591, -89.6301]; // Wausau
        const destination = [35.9606, -83.9207]; // Knoxville

        // Create a polyline between origin and current location
        const pathTraveled = L.polyline(
          [origin as L.LatLngTuple, [validLat, validLng] as L.LatLngTuple],
          {
            color: status === "Delayed" ? "#f59e0b" : "#3b82f6",
            weight: 3,
            opacity: 0.7,
            dashArray: "5, 10",
          }
        ).addTo(mapInstanceRef.current);

        // Create a polyline for remaining path (current location to destination)
        const remainingPath = L.polyline(
          [[validLat, validLng] as L.LatLngTuple, destination as L.LatLngTuple],
          {
            color: "#9ca3af",
            weight: 3,
            opacity: 0.5,
            dashArray: "5, 10",
          }
        ).addTo(mapInstanceRef.current);
      }
    } else {
      // Update the map if it already exists
      const validLat = isNaN(latitude) ? 35.9606 : latitude;
      const validLng = isNaN(longitude) ? -83.9207 : longitude;

      mapInstanceRef.current.setView([validLat, validLng], 5);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, status]);

  return <div ref={mapRef} className="w-full h-full" />;
}
