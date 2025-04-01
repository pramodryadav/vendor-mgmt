"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { Info, Pencil, Trash } from "lucide-react";
import { Vendor } from "@/app/types";
import VendorViewDialog from "./VendorView";
import VendorFormDialog from "./VendorForm";
import VendorDeleteDialog from "./VendorDelete";

export default function VendorActions({ vendor }: { vendor: Vendor }) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                onClick={() => setIsViewOpen(true)}
              >
                <Info className="h-4 w-4 mr-1" />
                Details
              </Button>
            </TooltipTrigger>
            <TooltipContent>View vendor details</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800"
                onClick={() => setIsEditOpen(true)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit vendor details</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
                onClick={() => setIsDeleteOpen(true)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete vendor</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* View Dialog */}
      <VendorViewDialog vendor={vendor} open={isViewOpen} setOpen={setIsViewOpen} />

      {/* Edit Dialog */}
      <VendorFormDialog vendor={vendor} open={isEditOpen} setOpen={setIsEditOpen} />

      {/* Delete Dialog */}
      <VendorDeleteDialog id={vendor._id} open={isDeleteOpen} setOpen={setIsDeleteOpen} />
    </>
  );
}
