// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Plus, Loader2 } from "lucide-react";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// export function AddInspectionDialog() {
//   const [open, setOpen] = useState(false);
//   const [date, setDate] = useState<Date>();
//   const [batchIds, setBatchIds] = useState<number[]>([]);
//   const [inspectorIds, setInspectorIds] = useState<number[]>([]);
//   const [isLoadingBatches, setIsLoadingBatches] = useState(false);
//   const [isLoadingInspectors, setIsLoadingInspectors] = useState(false);
//   const [formData, setFormData] = useState({
//     batchId: "",
//     inspectorId: "",
//     date: "",
//     score: "",
//     status: "",
//     remarks: "",
//   });

//   useEffect(() => {
//     if (open) {
//       fetchBatchIds();
//       fetchInspectorIds();
//     }
//   }, [open]);

//   useEffect(() => {
//     if (date) {
//       setFormData((prev) => ({ ...prev, date: format(date, "yyyy-MM-dd") }));
//     }
//   }, [date]);

//   const fetchBatchIds = async () => {
//     setIsLoadingBatches(true);
//     try {
//       const response = await fetch("http://127.0.0.1:8000/getBatchID");
//       if (!response.ok) {
//         throw new Error("Failed to fetch batch IDs");
//       }
//       const data = await response.json();
//       setBatchIds(data);
//     } catch (error) {
//       console.error("Error fetching batch IDs:", error);
//       // Fallback sample data in case of error
//       setBatchIds([32, 78, 392, 408, 200]);
//     } finally {
//       setIsLoadingBatches(false);
//     }
//   };

//   const fetchInspectorIds = async () => {
//     setIsLoadingInspectors(true);
//     try {
//       const response = await fetch("http://127.0.0.1:8000/inspectorID");
//       if (!response.ok) {
//         throw new Error("Failed to fetch inspector IDs");
//       }
//       const data = await response.json();
//       setInspectorIds(data);
//     } catch (error) {
//       console.error("Error fetching inspector IDs:", error);
//       // Fallback sample data in case of error
//       setInspectorIds([24, 56, 89, 102, 145]);
//     } finally {
//       setIsLoadingInspectors(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("New Inspection Data:", formData);
//     setFormData({
//       batchId: "",
//       inspectorId: "",
//       date: "",
//       score: "",
//       status: "",
//       remarks: "",
//     });
//     setDate(undefined);
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="bg-green-700 hover:bg-green-800">
//           <Plus className="mr-2 h-4 w-4" /> New Inspection
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <form onSubmit={handleSubmit}>
//           <DialogHeader>
//             <DialogTitle className="text-green-800">Create New Inspection</DialogTitle>
//             <DialogDescription>Add a new quality inspection report.</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="batchId" className="text-green-800">
//                   Batch ID
//                 </Label>
//                 <Select
//                   value={formData.batchId}
//                   onValueChange={(value) => handleSelectChange("batchId", value)}
//                   required
//                 >
//                   <SelectTrigger id="batchId" className="border-green-200">
//                     {isLoadingBatches ? (
//                       <div className="flex items-center">
//                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                         Loading...
//                       </div>
//                     ) : (
//                       <SelectValue placeholder="Select batch ID" />
//                     )}
//                   </SelectTrigger>
//                   <SelectContent>
//                     {batchIds.map((id) => (
//                       <SelectItem key={id} value={id.toString()}>
//                         {id}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="inspectorId" className="text-green-800">
//                   Inspector ID
//                 </Label>
//                 <Select
//                   value={formData.inspectorId}
//                   onValueChange={(value) => handleSelectChange("inspectorId", value)}
//                   required
//                 >
//                   <SelectTrigger id="inspectorId" className="border-green-200">
//                     {isLoadingInspectors ? (
//                       <div className="flex items-center">
//                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                         Loading...
//                       </div>
//                     ) : (
//                       <SelectValue placeholder="Select inspector ID" />
//                     )}
//                   </SelectTrigger>
//                   <SelectContent>
//                     {inspectorIds.map((id) => (
//                       <SelectItem key={id} value={id.toString()}>
//                         {id}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="date" className="text-green-800">
//                   Inspection Date
//                 </Label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant={"outline"}
//                       className={cn(
//                         "w-full justify-start text-left font-normal border-green-200",
//                         !date && "text-muted-foreground"
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {date ? format(date, "MM/dd/yyyy") : <span>mm/dd/yyyy</span>}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0">
//                     <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
//                   </PopoverContent>
//                 </Popover>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="score" className="text-green-800">
//                   Quality Score (%)
//                 </Label>
//                 <Input
//                   id="score"
//                   name="score"
//                   type="number"
//                   min="0"
//                   max="100"
//                   value={formData.score}
//                   onChange={handleInputChange}
//                   className="border-green-200"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="status" className="text-green-800">
//                 Status
//               </Label>
//               <Select
//                 value={formData.status}
//                 onValueChange={(value) => handleSelectChange("status", value)}
//                 required
//               >
//                 <SelectTrigger id="status" className="border-green-200">
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Pass">Pass</SelectItem>
//                   <SelectItem value="Recheck">Recheck</SelectItem>
//                   <SelectItem value="Fail">Fail</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="remarks" className="text-green-800">
//                 Remarks
//               </Label>
//               <Textarea
//                 id="remarks"
//                 name="remarks"
//                 value={formData.remarks}
//                 onChange={handleInputChange}
//                 className="border-green-200 min-h-[80px]"
//                 required
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="submit" className="bg-green-700 hover:bg-green-800">
//               Submit Inspection
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

export function AddInspectionDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [batchIds, setBatchIds] = useState<number[]>([]);
  const [inspectorIds, setInspectorIds] = useState<number[]>([]);
  const [isLoadingBatches, setIsLoadingBatches] = useState(false);
  const [isLoadingInspectors, setIsLoadingInspectors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    batchId: "",
    inspectorId: "",
    date: "",
    score: "",
    status: "",
    remarks: "",
  });

  useEffect(() => {
    if (open) {
      fetchBatchIds();
      fetchInspectorIds();
    }
  }, [open]);

  useEffect(() => {
    if (date) {
      setFormData((prev) => ({ ...prev, date: format(date, "yyyy-MM-dd") }));
    }
  }, [date]);

  const fetchBatchIds = async () => {
    setIsLoadingBatches(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/getBatchID");
      if (!response.ok) {
        throw new Error("Failed to fetch batch IDs");
      }
      const data = await response.json();
      setBatchIds(data);
    } catch (error) {
      console.error("Error fetching batch IDs:", error);
      // Fallback sample data in case of error
      setBatchIds([32, 78, 392, 408, 200]);
      toast({
        title: "Warning",
        description: "Could not load batch IDs. Using sample data instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingBatches(false);
    }
  };

  const fetchInspectorIds = async () => {
    setIsLoadingInspectors(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/inspectorID");
      if (!response.ok) {
        throw new Error("Failed to fetch inspector IDs");
      }
      const data = await response.json();
      setInspectorIds(data);
    } catch (error) {
      console.error("Error fetching inspector IDs:", error);
      // Fallback sample data in case of error
      setInspectorIds([24, 56, 89, 102, 145]);
      toast({
        title: "Warning",
        description: "Could not load inspector IDs. Using sample data instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingInspectors(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format data according to API requirements
      const payload = {
        batchID: Number.parseInt(formData.batchId),
        inspectorID: Number.parseInt(formData.inspectorId),
        inspectionDate: formData.date,
        gradingScore: Number.parseInt(formData.score),
        status: formData.status,
        remarks: formData.remarks,
      };

      // Send data to API
      const response = await fetch("http://127.0.0.1:8000/newInspectionReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create inspection report");
      }

      const result = await response.json();

      // Show success message
      toast({
        title: "Success",
        description: "Inspection report created successfully",
        variant: "default",
      });

      // Reset form
      setFormData({
        batchId: "",
        inspectorId: "",
        date: "",
        score: "",
        status: "",
        remarks: "",
      });
      setDate(undefined);
      setOpen(false);
    } catch (error) {
      console.error("Error submitting inspection report:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create inspection report",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <Select
                  value={formData.batchId}
                  onValueChange={(value) => handleSelectChange("batchId", value)}
                  required
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="batchId" className="border-green-200">
                    {isLoadingBatches ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </div>
                    ) : (
                      <SelectValue placeholder="Select batch ID" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {batchIds.map((id) => (
                      <SelectItem key={id} value={id.toString()}>
                        {id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspectorId" className="text-green-800">
                  Inspector ID
                </Label>
                <Select
                  value={formData.inspectorId}
                  onValueChange={(value) => handleSelectChange("inspectorId", value)}
                  required
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="inspectorId" className="border-green-200">
                    {isLoadingInspectors ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </div>
                    ) : (
                      <SelectValue placeholder="Select inspector ID" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {inspectorIds.map((id) => (
                      <SelectItem key={id} value={id.toString()}>
                        {id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-green-800">
                  Inspection Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border-green-200",
                        !date && "text-muted-foreground"
                      )}
                      disabled={isSubmitting}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "MM/dd/yyyy") : <span>mm/dd/yyyy</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
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
                  onChange={handleInputChange}
                  className="border-green-200"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-green-800">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
                required
                disabled={isSubmitting}
              >
                <SelectTrigger id="status" className="border-green-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pass">Pass</SelectItem>
                  <SelectItem value="Recheck">Recheck</SelectItem>
                  <SelectItem value="Fail">Fail</SelectItem>
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
                onChange={handleInputChange}
                className="border-green-200 min-h-[80px]"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Inspection"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
