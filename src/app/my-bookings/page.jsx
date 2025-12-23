"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// X ইম্পোর্ট করা হয়েছে মডাল ক্লোজ করার জন্য
import { Calendar, MapPin, Clock, CreditCard, X } from 'lucide-react';

const MyBookingsPage = () => {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (session?.user?.email) {
                try {
                    const res = await fetch(`/api/bookings?email=${session.user.email}`);
                    const data = await res.json();
                    setBookings(data);
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (status === "authenticated") {
            fetchBookings();
        }
    }, [session, status]);

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-600">Please login to see your bookings.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Bookings</h1>
                    <p className="text-gray-600">Track and manage your service requests</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                        <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
                        <p className="text-2xl font-bold text-gray-400">No bookings found!</p>
                        <p className="text-gray-500 mt-2">You haven't booked any services yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {booking.serviceId.replace('-', ' ')}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900">
                                        Booking ID: <span className="text-gray-500 font-mono text-sm">#{booking._id.slice(-8)}</span>
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-blue-500" />
                                            <span>Duration: <strong>{booking.duration} Days</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CreditCard size={16} className="text-blue-500" />
                                            <span>Total: <strong>৳{booking.totalCost}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2 sm:col-span-2">
                                            <MapPin size={16} className="text-blue-500" />
                                            <span>{booking.location.address}, {booking.location.district}, {booking.location.division}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-auto flex flex-col gap-2">
                                    <p className="text-xs text-gray-400 text-right">
                                        Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                                    </p>
                                    <button
                                        onClick={() => setSelectedBooking(booking)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold transition-all text-sm"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* --- Details Modal শুরু --- */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500">Service</span>
                                <span className="font-bold text-blue-600 uppercase">{selectedBooking.serviceId.replace('-', ' ')}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500">Duration</span>
                                <span className="font-bold text-gray-500">{selectedBooking.duration} Days</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500">Total Price</span>
                                <span className="font-bold text-lg text-gray-500">৳{selectedBooking.totalCost}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500">Status</span>
                                <span className="capitalize font-bold text-yellow-600">{selectedBooking.status}</span>
                            </div>
                            <div className="pt-2">
                                <span className="text-gray-500 block mb-1">Detailed Address:</span>
                                <p className="bg-gray-50 p-3 rounded-xl text-sm text-gray-700 border border-gray-100">
                                    {selectedBooking.location.address}, {selectedBooking.location.district}, {selectedBooking.location.division}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {/* --- Details Modal শেষ --- */}
        </div>
    );
};

export default MyBookingsPage;