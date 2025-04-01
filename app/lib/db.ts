import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error(" MONGO_URI is not defined in .env.local");
}

// Define a proper type for the global cached connection
interface MongooseCache {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

// Use `const` since `cached` is never reassigned
const globalWithMongoose = global as typeof global & { mongoose?: MongooseCache };

const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null };

export const connectDB = async () => {
    if (cached.conn) return cached.conn; // Use cached connection

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {}).then((mongooseInstance) => mongooseInstance.connection);
    }

    cached.conn = await cached.promise;
    
    // Store in global to reuse the connection across hot reloads
    globalWithMongoose.mongoose = cached;
    
    return cached.conn;
};





