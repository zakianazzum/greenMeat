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

export function AddItemDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    itemType: "",
    farmId: "",
    category: "",
    idealTemperature: "",
    description: "",
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
    console.log("New Item Data:", formData)
    setFormData({
      itemType: "",
      farmId: "",
      category: "",
      idealTemperature: "",
      description: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-green-800">Add New Item</DialogTitle>
            <DialogDescription>Add a new meat item to the catalog.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="itemType" className="text-green-800">
                Item Type
              </Label>
              <Select
                value={formData.itemType}
                onValueChange={(value) => handleSelectChange("itemType", value)}
                required
              >
                <SelectTrigger id="itemType" className="border-green-200">
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beef">Beef</SelectItem>
                  <SelectItem value="pork">Pork</SelectItem>
                  <SelectItem value="lamb">Lamb</SelectItem>
                  <SelectItem value="chicken">Chicken</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmId" className="text-green-800">
                Farm ID
              </Label>
              <Input
                id="farmId"
                name="farmId"
                value={formData.farmId}
                onChange={handleChange}
                className="border-green-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-green-800">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
                required
              >
                <SelectTrigger id="category" className="border-green-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="idealTemperature" className="text-green-800">
                Ideal Temperature (°C)
              </Label>
              <Input
                id="idealTemperature"
                name="idealTemperature"
                type="number"
                step="0.1"
                value={formData.idealTemperature}
                onChange={handleChange}
                className="border-green-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-green-800">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border-green-200"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-700 hover:bg-green-800">
              Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

