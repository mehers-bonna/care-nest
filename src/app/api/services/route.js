import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const db = await connectDB();
        const servicesCollection = db.collection('services');
        
        const services = await servicesCollection.find().toArray();
        
        return NextResponse.json(services);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
};