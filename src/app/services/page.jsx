"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Tag, HeartPulse } from 'lucide-react';

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                const data = await res.json();
                setServices(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
                        <HeartPulse size={18} />
                        PREMIUM CARE
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                        Compassionate Care for <br /> <span className="text-blue-600">Your Loved Ones</span>
                    </h1>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service._id} className="group bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
                            <div className="relative h-80 w-full overflow-hidden rounded-[2rem] mb-6">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Price Tag Overlay */}
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border border-white/20">
                                    <p className="text-gray-900 font-black text-lg tracking-tight">
                                        ৳{service.price} <span className="text-sm font-medium text-gray-500">/day</span>
                                    </p>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="px-4 pb-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-blue-600 font-bold text-xs uppercase tracking-tighter mb-1">
                                            {service.category}
                                        </p>
                                        <h3 className="text-2xl font-extrabold text-gray-900 leading-snug">
                                            {service.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                                    {service.description}
                                </p>

                                <Link
                                    href={`/booking/${service.service_id}`} 
                                    className="w-full inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4.5 rounded-[1.5rem] font-bold text-lg hover:bg-blue-600 transition-all active:scale-95 group-hover:shadow-xl group-hover:shadow-blue-200"
                                >
                                    Book Service
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;