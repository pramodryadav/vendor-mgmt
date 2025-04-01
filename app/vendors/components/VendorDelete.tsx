'use client'

import { deleteVendor } from "@/app/vendors/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";


export default function VendorDeleteDialog({
    id,
    open,
    setOpen,
}: {
    id: number; // If vendor exists, it's an edit, otherwise, it's an add
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Vendor</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete this vendor? This action cannot be undone.</p>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>


                    <Button onClick={() => deleteVendor(id)} type="submit" variant="destructive">Delete</Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
