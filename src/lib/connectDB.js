import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

export const connectDB = async () => {
  if (cachedDb) return cachedDb;

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    cachedClient = client;

    await client.connect();
    cachedDb = client.db("care-nest"); // URI থেকে DB নিবে

    console.log("✅ MongoDB Connected");
    return cachedDb;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
};
