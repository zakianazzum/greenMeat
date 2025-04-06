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

export function AddFarmDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    farmName: "",
    farmerId: "",
    region: "",
    zone: "",
    address: "",
    contactNumber: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New Farm Data:", formData)
    setFormData({
      farmName: "",
      farmerId: "",
      region: "",
      zone: "",
      address: "",
      contactNumber: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Add Farm
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-green-800">Add New Farm</DialogTitle>
            <DialogDescription>Register a new farm in the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="farmName" className="text-green-800">
                Farm Name
              </Label>
              <Input
                id="farmName"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                className="border-green-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmerId" className="text-green-800">
                Farmer ID
              </Label>
              <Input
                id="farmerId"
                name="farmerId"
                value={formData.farmerId}
                onChange={handleChange}
                className="border-green-200"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region" className="text-green-800">
                  Region
                </Label>
                <Select value={formData.region} onValueChange={(value) => handleSelectChange("region", value)} required>
                  <SelectTrigger id="region" className="border-green-200">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midwest">Midwest</SelectItem>
                    <SelectItem value="northeast">Northeast</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone" className="text-green-800">
                  Zone
                </Label>
                <Select value={formData.zone} onValueChange={(value) => handleSelectChange("zone", value)} required>
                  <SelectTrigger id="zone" className="border-green-200">
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zone-a">Zone A</SelectItem>
                    <SelectItem value="zone-b">Zone B</SelectItem>
                    <SelectItem value="zone-c">Zone C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-green-800">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border-green-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-green-800">
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="border-green-200"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-700 hover:bg-green-800">
              Register Farm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

