import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Vendor } from "@/app/types";

export default function VendorView({
  vendor,
  open,
  setOpen,
}: {
  vendor: Vendor; // If vendor exists, it's an edit, otherwise, it's an add
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Vendor Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-300">
          <p className="font-medium">Name:</p>
          <p>{vendor.name}</p>

          <p className="font-medium">Type:</p>
          <p>{vendor.type}</p>

          <p className="font-medium">Criticality:</p>
          <p className="capitalize">{vendor.criticality}</p>

          <p className="font-medium">Status:</p>
          <p className="capitalize">{vendor.status}</p>

          <p className="font-medium">Contact:</p>
          <p>{vendor.contact}</p>

          <p className="font-medium">Service Provided:</p>
          <p>{vendor.serviceProvided}</p>
        </div>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>

  );
}
