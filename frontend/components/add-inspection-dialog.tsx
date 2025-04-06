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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export function AddInspectionDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    batchId: "",
    inspectorId: "",
    date: "",
    score: "",
    status: "",
    remarks: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New Inspection Data:", formData)
    setFormData({
      batchId: "",
      inspectorId: "",
      date: "",
      score: "",
      status: "",
      remarks: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> New Inspection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-green-800">Create New Inspection</DialogTitle>
            <DialogDescription>Add a new quality inspection report.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="inspectorId" className="text-green-800">
                  Inspector ID
                </Label>
                <Input
                  id="inspectorId"
                  name="inspectorId"
                  value={formData.inspectorId}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-green-800">
                  Inspection Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="score" className="text-green-800">
                  Quality Score (%)
                </Label>
                <Input
                  id="score"
                  name="score"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.score}
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="remarks" className="text-green-800">
                Remarks
              </Label>
              <Textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="border-green-200 min-h-[80px]"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-700 hover:bg-green-800">
              Submit Inspection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

