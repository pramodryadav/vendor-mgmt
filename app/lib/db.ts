import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("⚠️ MONGO_URI is not defined in .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
    if (cached.conn) return cached.conn; // ✅ Use cached connection

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

