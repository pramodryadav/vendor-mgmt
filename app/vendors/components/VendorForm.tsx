"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { addVendor, updateVendor } from "@/app/vendors/actions";
import { Vendor } from "@/app/types";

export default function VendorFormDialog({
  vendor,
  open,
  setOpen,
}: {
  vendor?: Vendor;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);

  // Formik form management
  const formik = useFormik({
    initialValues: {
      id: vendor?._id || "",
      name: vendor?.name || "",
      type: vendor?.type || "",
      criticality: vendor?.criticality || "",
      status: vendor?.status || "",
      contact: vendor?.contact || "",
      serviceProvided: vendor?.serviceProvided || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Enter a valid name") // Allows only letters & spaces
        .required("Vendor name is required"),

      type: Yup.string().required("Vendor type is required"),

      criticality: Yup.string()
        .transform((val) => val?.toLowerCase()) // Convert to lowercase before validation
        .oneOf(["low", "medium", "high", "critical"], "Invalid criticality value")
        .required("Criticality is required"),

      status: Yup.string()
        .transform((val) => val?.toLowerCase()) // Convert to lowercase before validation
        .oneOf(["active", "inactive", "pending"], "Invalid status value")
        .required("Status is required"),

      contact: Yup.string()
        .email("Invalid email address") // Ensure valid email
        .required("Contact is required"),
      serviceProvided: Yup.string().required("Service provided is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // Convert values to FormData
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, String(value ?? ""));
        });

        // Call the appropriate action
        if (vendor) {
          await updateVendor(formData);
        } else {
          await addVendor(formData);
        }
        formik.resetForm();
        setOpen(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error", error)
      }

    },
  });

  return (
    <Dialog open={open} onOpenChange={() => {
      setOpen(false);
      formik.resetForm();
    }}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{vendor ? "Edit Vendor" : "Add Vendor"}</DialogTitle>

        </DialogHeader>

        {/* Formik Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            placeholder="Vendor Name" />
          {formik.touched.name && formik.errors.name &&
            <p className="text-red-500">{formik.errors.name}</p>
          }

          <Input
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="type"
            placeholder="Vendor Type"
          />
          {formik.touched.type && formik.errors.type &&
            <p className="text-red-500">
              {formik.errors.type}
            </p>
          }

          <Input
            value={formik.values.criticality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="criticality"
            placeholder="Criticality" />
          {formik.touched.criticality && formik.errors.criticality &&
            <p className="text-red-500">
              {formik.errors.criticality}
            </p>
          }

          <Input
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="status"
            placeholder="Status"
          />
          {formik.touched.status && formik.errors.status && <p className="text-red-500">
            {formik.errors.status}
          </p>
          }

          <Input
            type="email"
            value={formik.values.contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="contact"
            placeholder="Contact"
          />
          {formik.touched.contact && formik.errors.contact &&
            <p className="text-red-500">
              {formik.errors.contact}
            </p>
          }

          <Input
            value={formik.values.serviceProvided}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="serviceProvided"
            placeholder="Service Provided" />
          {formik.touched.serviceProvided && formik.errors.serviceProvided &&
            <p className="text-red-500">{formik.errors.serviceProvided}
            </p>
          }

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
