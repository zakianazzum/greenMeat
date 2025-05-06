"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AddCriteriaDialog } from "./add-criteria-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Criteria {
  criteriaID: number;
  criteriaName: string;
  description: string;
  maxScore: number;
}

export function QualityCriteriaTable() {
  const [criteria, setCriteria] = useState<Criteria[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [criteriaToDelete, setCriteriaToDelete] = useState<number | null>(null);

  const fetchCriteria = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/criteriaInfo");
      if (!response.ok) {
        throw new Error("Failed to fetch criteria");
      }
      const data = await response.json();
      setCriteria(data);
    } catch (error) {
      console.error("Error fetching criteria:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCriteria();
  }, []);

  const handleDelete = async (criteriaId: number) => {
    setCriteriaToDelete(criteriaId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!criteriaToDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/criteriaInfo/${criteriaToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete criteria");
      }

      // Refresh the criteria list
      fetchCriteria();
    } catch (error) {
      console.error("Error deleting criteria:", error);
    } finally {
      setDeleteDialogOpen(false);
      setCriteriaToDelete(null);
    }
  };

  if (loading) {
    return <div>Loading criteria...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Grading Criteria</h2>
        <AddCriteriaDialog onAdd={fetchCriteria} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Criteria Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Maximum Score</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {criteria.map((item) => (
              <TableRow key={item.criteriaID}>
                <TableCell>{item.criteriaName}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.maxScore}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.criteriaID)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the grading criteria.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
