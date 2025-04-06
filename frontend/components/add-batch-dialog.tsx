"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

export function AddBatchDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    itemId: "",
    productionDate: "",
    expiryDate: "",
    quantity: "",
    averageWeight: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New Batch Data:", formData)
    setFormData({
      itemId: "",
      productionDate: "",
      expiryDate: "",
      quantity: "",
      averageWeight: "",
      notes: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Add Batch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-green-800">Add New Batch</DialogTitle>
            <DialogDescription>Create a new meat batch in the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="itemId" className="text-green-800">
                Item ID
              </Label>
              <Input
                id="itemId"
                name="itemId"
                value={formData.itemId}
                onChange={handleChange}
                className="border-green-200"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productionDate" className="text-green-800">
                  Production Date
                </Label>
                <Input
                  id="productionDate"
                  name="productionDate"
                  type="date"
                  value={formData.productionDate}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-green-800">
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-green-800">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="averageWeight" className="text-green-800">
                  Average Weight (kg)
                </Label>
                <Input
                  id="averageWeight"
                  name="averageWeight"
                  type="number"
                  step="0.1"
                  value={formData.averageWeight}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-green-800">
                Notes
              </Label>
              <Input
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="border-green-200"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-700 hover:bg-green-800">
              Create Batch
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

