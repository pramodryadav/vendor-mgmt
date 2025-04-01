"use client"; // This is a Client Component

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import VendorFormDialog from "./VendorForm";

export default function AddVendorButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="self-end bg-green-600 hover:bg-green-700 text-white">
        + Add Vendor
      </Button>

      {/* Dialog for Adding a Vendor */}
      <VendorFormDialog open={open} setOpen={setOpen} />
    </>
  );
}
