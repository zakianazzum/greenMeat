"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Category {
  categoryID: number;
}

interface SlaughterHouse {
  slaughterHouseId: number;
}

export function AddItemDialog() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [slaughterhouses, setSlaughterhouses] = useState<SlaughterHouse[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSlaughterhouses, setLoadingSlaughterhouses] = useState(false);

  const [formData, setFormData] = useState({
    categoryID: "",
    slaughterhouseID: "",
    productionDate: "",
    averageWeight: "",
  });

  useEffect(() => {
    if (open) {
      fetchCategories();
      fetchSlaughterhouses();
    }
  }, [open]);

  useEffect(() => {
    if (date) {
      setFormData((prev) => ({ ...prev, productionDate: format(date, "yyyy-MM-dd") }));
    }
  }, [date]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch("http://localhost:8000/meatCategories", {
        method: "GET",
        headers: {
          contenttype: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Fallback data
 
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchSlaughterhouses = async () => {
    setLoadingSlaughterhouses(true);
    try {
      const response = await fetch("http://localhost:8000/slaughterhouses", {
        method: "GET",
        headers: {
          contenttype: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch slaughterhouses");
      }

      const data = await response.json();
      setSlaughterhouses(data);
    } catch (error) {
      console.error("Error fetching slaughterhouses:", error);
      // Fallback data
      setSlaughterhouses([{ slaughterHouseId: 1 }, { slaughterHouseId: 2 }]);
    } finally {
      setLoadingSlaughterhouses(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Item Data:", formData);
    setFormData({
      categoryID: "",
      slaughterhouseID: "",
      productionDate: "",
      averageWeight: "",
    });
    setDate(undefined);
    setOpen(false);
  };

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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoryID" className="text-green-800">
                  Category ID
                </Label>
                <Select
                  value={formData.categoryID}
                  onValueChange={(value) => handleSelectChange("categoryID", value)}
                  required
                >
                  <SelectTrigger id="categoryID" className="border-green-200">
                    {loadingCategories ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </div>
                    ) : (
                      <SelectValue placeholder="Select category ID" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.categoryID} value={category.categoryID.toString()}>
                        {category.categoryID}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slaughterhouseID" className="text-green-800">
                  Slaughterhouse ID
                </Label>
                <Select
                  value={formData.slaughterhouseID}
                  onValueChange={(value) => handleSelectChange("slaughterhouseID", value)}
                  required
                >
                  <SelectTrigger id="slaughterhouseID" className="border-green-200">
                    {loadingSlaughterhouses ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </div>
                    ) : (
                      <SelectValue placeholder="Select slaughterhouse ID" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {slaughterhouses.map((slaughterhouse) => (
                      <SelectItem
                        key={slaughterhouse.slaughterHouseId}
                        value={slaughterhouse.slaughterHouseId.toString()}
                      >
                        {slaughterhouse.slaughterHouseId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productionDate" className="text-green-800">
                  Production Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border-green-200",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "yyyy-MM-dd") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="averageWeight" className="text-green-800">
                  Average Weight (kg)
                </Label>
                <Input
                  id="averageWeight"
                  name="averageWeight"
                  type="number"
                  step="0.01"
                  value={formData.averageWeight}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>
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
  );
}
