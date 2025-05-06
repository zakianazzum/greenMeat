"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

interface EditShipmentDialogProps {
  shipment: {
    transportationId: number;
    trackingId: number;
    packageId: number;
    retailerId: number;
    departureTime: string;
    estimatedArrival: string;
    status: string;
  };
  onShipmentUpdated: () => void;
}

export function EditShipmentDialog({ shipment, onShipmentUpdated }: EditShipmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    packageId: shipment.packageId,
    retailerId: shipment.retailerId,
    transportationId: shipment.transportationId?.toString(),
    departureDate: shipment.departureTime?.split("T")[0],
    arrivalDate: shipment.estimatedArrival?.split("T")[0],
    status: shipment.status,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/trackingInfo/${shipment.trackingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          packageId: parseInt(formData.packageId.toString()),
          retailerId: parseInt(formData.retailerId.toString()),
          transportationId: parseInt(formData.transportationId),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update shipment");
      }

      setOpen(false);
      onShipmentUpdated();
    } catch (error) {
      console.error("Error updating shipment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-green-700 hover:text-green-800 hover:bg-green-50"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Shipment</DialogTitle>
          <DialogDescription>Update shipment details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="packageId">Package ID</Label>
              <Input
                id="packageId"
                name="packageId"
                value={formData.packageId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retailerId">Retailer ID</Label>
              <Input
                id="retailerId"
                name="retailerId"
                value={formData.retailerId}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="transportationId">Transportation</Label>
            <select
              id="transportationId"
              name="transportationId"
              value={formData.transportationId}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            >
              <option value="1">Transportation 1</option>
              <option value="2">Transportation 2</option>
              <option value="3">Transportation 3</option>
              <option value="4">Transportation 4</option>
              <option value="5">Transportation 5</option>
              <option value="6">Transportation 6</option>
              <option value="7">Transportation 7</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrivalDate">Arrival Date</Label>
              <Input
                id="arrivalDate"
                name="arrivalDate"
                type="date"
                value={formData.arrivalDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            >
              <option value="Scheduled">Scheduled</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Shipment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
