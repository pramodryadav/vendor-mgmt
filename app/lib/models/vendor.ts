import mongoose, { Schema, Document } from "mongoose";

export interface IVendor extends Document {
    name: string;
    type: string;
    serviceProvided: string;
    contact: string;
    criticality: "low" | "medium" | "high" | "critical";
    status: "active" | "inactive" | "pending";
}

const VendorSchema = new Schema<IVendor>(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        serviceProvided: { type: String, required: true },
        contact: { type: String, required: true },
        criticality: { type: String, enum: ["low", "medium", "critical", "high"], required: true },
        status: { type: String, enum: ["active", "inactive", "pending"], required: true },

    },

    { timestamps: true },

);

const Vendor = mongoose.models.Vendor || mongoose.model<IVendor>("Vendor", VendorSchema);
export default Vendor;
