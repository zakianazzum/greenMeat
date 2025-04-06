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

export function AddWarehouseDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    currentUsage: "",
    status: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New Warehouse Data:", formData)
    setFormData({
      name: "",
      location: "",
      capacity: "",
      currentUsage: "",
      status: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Add Warehouse
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-green-800">Add New Warehouse</DialogTitle>
            <DialogDescription>Register a new storage facility in the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-green-800">
                Warehouse Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-green-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-green-800">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border-green-200"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-green-800">
                  Total Capacity
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentUsage" className="text-green-800">
                  Current Usage
                </Label>
                <Input
                  id="currentUsage"
                  name="currentUsage"
                  type="number"
                  value={formData.currentUsage}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-green-800">
                Status
              </Label>
              <Select value={formData.status} onValueChange={handleSelectChange} required>
                <SelectTrigger id="status" className="border-green-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="near-capacity">Near Capacity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-700 hover:bg-green-800">
              Add Warehouse
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

