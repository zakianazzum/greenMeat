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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export function AddProcessingRecordDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    plantId: "",
    batchId: "",
    packagingDate: "",
    packageQuantity: "",
    packagingStatus: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, packagingStatus: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New Processing Record Data:", formData)
    setFormData({
      plantId: "",
      batchId: "",
      packagingDate: "",
      packageQuantity: "",
      packagingStatus: "",
      notes: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Add Processing Record
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-green-800">Add Processing Record</DialogTitle>
            <DialogDescription>Create a new meat processing record.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plantId" className="text-green-800">
                  Plant ID
                </Label>
                <Input
                  id="plantId"
                  name="plantId"
                  value={formData.plantId}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchId" className="text-green-800">
                  Batch ID
                </Label>
                <Input
                  id="batchId"
                  name="batchId"
                  value={formData.batchId}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="packagingDate" className="text-green-800">
                  Packaging Date
                </Label>
                <Input
                  id="packagingDate"
                  name="packagingDate"
                  type="date"
                  value={formData.packagingDate}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packageQuantity" className="text-green-800">
                  Package Quantity
                </Label>
                <Input
                  id="packageQuantity"
                  name="packageQuantity"
                  type="number"
                  value={formData.packageQuantity}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="packagingStatus" className="text-green-800">
                Status
              </Label>
              <Select value={formData.packagingStatus} onValueChange={handleSelectChange} required>
                <SelectTrigger id="packagingStatus" className="border-green-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
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
              Create Record
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

