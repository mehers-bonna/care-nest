import { connectDB } from "@/lib/connectDB";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const bookingData = await request.json();
    console.log("Received Booking Data:", bookingData); //

    await connectDB(); //

    // সরাসরি ডাটাবেসে অবজেক্ট তৈরি এবং সেভ করার জন্য এটি ব্যবহার করুন
    const savedBooking = await Booking.create(bookingData); 
    
    console.log("Saved to DB:", savedBooking); //

    return NextResponse.json(
      { message: "Booking Successful!", data: savedBooking },
      { status: 201 } //
    );
  } catch (error) {
    console.error("DATABASE SAVE ERROR:", error); //
    return NextResponse.json(
      { message: "Failed to save booking", error: error.message },
      { status: 500 } //
    );
  }
};

// আগের POST মেথডটির নিচেই এটি লিখুন
export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email"); // ইউজারের ইমেইল দিয়ে ডাটা ফিল্টার করবো

  try {
    await connectDB();
    const myBookings = await Booking.find({ userEmail: email }).sort({ createdAt: -1 });

    return NextResponse.json(myBookings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
};