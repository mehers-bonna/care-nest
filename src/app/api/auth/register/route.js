import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const db = await connectDB();
        // কানেকশন চেক
        if (!db) {
            console.error("Database connection failed!");
            return NextResponse.json({ message: "DB Connection Error" }, { status: 500 });
        }

        const userCollection = db.collection("users");
        const newUser = await request.json();

        const exists = await userCollection.findOne({ email: newUser.email });
        if (exists) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        const hashedPassword = bcrypt.hashSync(newUser.password, 10);

        await userCollection.insertOne({
            ...newUser,
            password: hashedPassword,
            role: "user"
        });

        return NextResponse.json({ message: "Registered Successfully" }, { status: 200 });
    } catch (error) {
        // এই লাইনটি আপনার VS Code টার্মিনালে আসল সমস্যাটি দেখাবে
        console.error("SERVER ERROR DETAILS:", error.message);
        return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
    }
};