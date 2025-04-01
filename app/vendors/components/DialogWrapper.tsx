"use client";
import { Dialog} from "@/app/components/ui/dialog";
import { useState } from "react";


export default function VendorDeleteDialogWrapper({ vendorId,children }: { vendorId: number, children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open>
     
     {children}
    </Dialog>
  );
}
