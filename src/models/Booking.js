import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    serviceId: { type: String, required: true },
    duration: { type: Number, required: true },
    location: {
      division: { type: String, required: true },
      district: { type: String, required: true },
      address: { type: String, required: true },
    },
    totalCost: { type: Number, required: true },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Booking = models.Booking || model("Booking", BookingSchema);
export default Booking;