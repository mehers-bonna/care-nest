"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { locationData } from "@/constants/locationData";
import { toast } from 'react-toastify';

const BookingPage = ({ params }) => {
const router = useRouter();
  const { id } = useParams();
  const { data: session, status } = useSession();
  
  const [days, setDays] = useState(1);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [address, setAddress] = useState("");

  // ১. সেশন লোড হওয়া পর্যন্ত ওয়েট করা (সাদা ব্যাকগ্রাউন্ডে টেক্সট দেখাবে)
  if (status === "loading") {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <h2 className="text-2xl text-blue-600 font-bold animate-pulse">Loading Session...</h2>
      </div>
    );
  }

  // ২. ইউজার লগইন না থাকলে মেসেজ দেখানো
  if (!session) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl text-red-500 font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600">Please login to continue booking.</p>
        </div>
      </div>
    );
  }

  const servicePrices = { "baby-care": 500, "elderly-care": 800, "sick-care": 1000 };
  const unitPrice = servicePrices[id] || 0;
  const totalCost = unitPrice * days;

 const handleSubmit = async (e) => {
  e.preventDefault();

  // নিশ্চিত করুন সব ভ্যালু আছে
  if (!selectedDivision || !selectedDistrict || !address) {
    return toast.error("Please fill all fields!");
  }

  const bookingInfo = {
    userEmail: session?.user?.email,
    userName: session?.user?.name,
    serviceId: id,
    duration: Number(days), // Number এ কনভার্ট করুন
    location: {
      division: selectedDivision,
      district: selectedDistrict,
      address: address,
    },
    totalCost: Number(totalCost), // Number এ কনভার্ট করুন
    status: "pending",
  };

  try {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingInfo),
    });

    const data = await res.json();

    if (res.ok) {
        toast.success("Booking Request Sent Successfully!");
        
        // ৩. সাকসেস মেসেজ দেখানোর ২ সেকেন্ড পর রিডাইরেক্ট করুন
        setTimeout(() => {
          router.push("/my-bookings");
        }, 2000);
      } else {
        toast.error("Failed to book service.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
};

  return (
    // bg-white এবং text-black ফোর্সহফুলি দেওয়া হয়েছে
    <div className="min-h-screen w-full bg-white text-black relative z-[999]">
      <div className="pt-32 pb-12 px-4 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] p-8 border border-gray-100">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Complete Your Booking
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Duration */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Duration (Days)</label>
              <input 
                type="number" min="1" value={days} 
                onChange={(e) => setDays(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                required
              />
            </div>

            {/* Division & District */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Division</label>
                <select 
                  onChange={(e) => { setSelectedDivision(e.target.value); setSelectedDistrict(""); }}
                  className="w-full p-4 border border-gray-300 rounded-xl outline-none text-black bg-white" 
                  required
                >
                  <option value="">Select Division</option>
                  {locationData && Object.keys(locationData).map(div => (
                    <option key={div} value={div}>{div}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">District</label>
                <select 
                  disabled={!selectedDivision}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl outline-none text-black bg-white disabled:bg-gray-100" 
                  required
                >
                  <option value="">Select District</option>
                  {selectedDivision && locationData[selectedDivision].map(dis => (
                    <option key={dis} value={dis}>{dis}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Detailed Address</label>
              <textarea 
                placeholder="House No, Road Name, Area..."
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl outline-none text-black bg-white h-24" 
                required
              ></textarea>
            </div>

            {/* Calculation Box */}
            <div className="bg-blue-600 p-6 rounded-2xl text-white flex justify-between items-center shadow-lg">
              <div>
                <p className="text-blue-100 font-medium">Total Price Calculation</p>
                <p className="text-sm opacity-80">৳{unitPrice} x {days} Days</p>
              </div>
              <p className="text-3xl font-bold font-mono">৳{totalCost}</p>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all transform hover:scale-[1.01] active:scale-95 shadow-xl"
            >
              Confirm Booking Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;