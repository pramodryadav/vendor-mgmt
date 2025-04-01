import { z } from "zod";

export const vendorSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  criticality: z
    .preprocess((val) => String(val).toLowerCase(), z.enum(["low", "medium", "critical", "high"])),
  status: z
    .preprocess((val) => String(val).toLowerCase(), z.enum(["active", "inactive", "pending"])),
  contact: z.string().email("Invalid email"),
  serviceProvided: z.string().min(1, "Service provided is required"),
});