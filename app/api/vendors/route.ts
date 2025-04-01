import { NextResponse } from "next/server";
import VendorModel from "@/app/lib/models/vendor";
import { connectDB } from "@/app/lib/db";



// GET Vendors (with search)
export async function GET(req: Request) {

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.toLowerCase() || "";
    // ✅ Fetch vendors based on the query (case-insensitive search)
    const vendors = await VendorModel.find(
      query
        ? {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { type: { $regex: query, $options: "i" } },
            { serviceProvided: { $regex: query, $options: "i" } },
          ],
        }
        : {} // If no query, return all vendors
    );


    return NextResponse.json(vendors);

  } catch (error) {
    return NextResponse.json(
      { error: error || "Failed to fetch vendors" },
      { status: 500 }
    );
  }

}
