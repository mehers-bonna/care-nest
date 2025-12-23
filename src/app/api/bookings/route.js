import { connectDB } from "@/lib/connectDB";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  try {
    const bookingData = await request.json();
    await connectDB();
    const savedBooking = await Booking.create(bookingData);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"CareNest Team" <${process.env.EMAIL_USER}>`,
      to: bookingData.userEmail,
      subject: `Booking Confirmed: ${bookingData.serviceId.toUpperCase()}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px; color: #1a202c;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2563eb; margin: 0;">CareNest</h1>
            <p style="color: #64748b; font-size: 14px;">Compassionate Care for Your Loved Ones</p>
          </div>
          
          <h2 style="font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Booking Invoice</h2>
          
          <p>Hello <strong>${bookingData.userName}</strong>,</p>
          <p>Your booking request has been successfully received and confirmed. Here are your details:</p>
          
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; line-height: 1.6;">
            <p style="margin: 5px 0;"><strong>Service ID:</strong> ${bookingData.serviceId}</p>
            <p style="margin: 5px 0;"><strong>Duration:</strong> ${bookingData.duration} Days</p>
            <p style="margin: 5px 0;"><strong>Location:</strong> ${bookingData.location.address}, ${bookingData.location.district}</p>
            <p style="margin: 5px 0; font-size: 18px; color: #2563eb;"><strong>Total Cost: ৳${bookingData.totalCost}</strong></p>
          </div>
          
          <p style="font-size: 14px; color: #718096;">If you have any questions regarding your booking, please reply to this email or contact our support team.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
            <p>© 2025 CareNest. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed but booking saved:", emailError);
    }

    return NextResponse.json(
      { message: "Booking Successful and Email Sent!", data: savedBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("DATABASE SAVE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to save booking", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    await connectDB();
    const myBookings = await Booking.find({ userEmail: email }).sort({ createdAt: -1 });
    return NextResponse.json(myBookings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
};

export const DELETE = async (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await connectDB();
    const deletedBooking = await Booking.findByIdAndDelete(id);
    
    if (!deletedBooking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking cancelled successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to cancel booking" }, { status: 500 });
  }
};