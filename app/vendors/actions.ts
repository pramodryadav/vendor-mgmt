"use server";

import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import VendorModel from "@/app/lib/models/vendor";
import { connectDB } from "@/app/lib/db";
import { vendorSchema } from "@/app/lib/validation/vendorSchema";



export async function addVendor(formData: FormData) {

  try {
    await connectDB();

    // Validate form data
    const parsedData = vendorSchema.parse({
      name: formData.get("name"),
      type: formData.get("type"),
      criticality: formData.get("criticality"),
      status: formData.get("status"),
      contact: formData.get("contact"),
      serviceProvided: formData.get("serviceProvided"),
    });

    const newVendor = new VendorModel(parsedData);
    await newVendor.save();
    revalidatePath("/vendors"); // Refresh page after adding
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation Error:", error.errors);
      throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
    }


    throw new Error("Failed to add vendor");
  }
}



export async function updateVendor(formData: FormData) {
  try {
    await connectDB();

    // ✅ Validate form data
    const parsedData = vendorSchema.parse({
      id: formData.get("id"),
      name: formData.get("name"),
      type: formData.get("type"),
      criticality: formData.get("criticality"),
      status: formData.get("status"),
      contact: formData.get("contact"),
      serviceProvided: formData.get("serviceProvided"),
    });

    //  Update vendor in MongoDB
    await VendorModel.findByIdAndUpdate(parsedData.id, parsedData);

    // Revalidate vendors list
    revalidatePath("/vendors");
  } catch (error) {
    console.error("Error updating vendor:", error);
    throw new Error("Failed to update vendor");
  }
}



export async function deleteVendor(id: number) {

  if (!id) return;

  try {
    await connectDB();

    // Delete vendor from MongoDB
    await VendorModel.findByIdAndDelete(id);

    // Revalidate vendors list
    revalidatePath("/vendors");
  } catch (error) {
    console.error("Error deleting vendor:", error);
    throw new Error("Failed to delete vendor");
  }
}
