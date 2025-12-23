"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

const ServiceDetails = () => {
  const { id } = useParams();

  const servicesData = {
    "baby-care": {
      title: "Baby Care Service",
      price: 500,
      description: "Providing professional and warm care for your infants and toddlers. Our caregivers are trained in first aid and early childhood development.",
      features: ["Verified Caregivers", "Flexible Schedule", "First Aid Trained", "Home Environment"]
    },
    "elderly-care": {
      title: "Elderly Service",
      price: 800,
      description: "Compassionate companionship and daily support for the elderly members of your family to ensure they live with dignity.",
      features: ["Medication Management", "Companionship", "Daily Monitoring", "Doctor Visit Support"]
    },
    "sick-care": {
      title: "Sick People Service",
      price: 1000,
      description: "Dedicated nursing and support for patients recovering from illness or surgery in the comfort of their own home.",
      features: ["Professional Nursing", "Vital Monitoring", "Proper Diet Support", "24/7 Availability"]
    }
  };

  const service = servicesData[id];

  if (!service) {
    return <div className="pt-32 text-center text-red-500">Service not found!</div>;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Content */}
            <div>
              <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                Professional Care
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-6">
                {service.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {service.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-green-500" size={20} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Pricing Card */}
            <div className="bg-blue-600 rounded-3xl p-10 text-white shadow-2xl shadow-blue-200">
              <div className="mb-8">
                <p className="text-blue-100 mb-2">Service Starting From</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black">৳{service.price}</span>
                  <span className="text-blue-100">/day</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 text-blue-50">
                <div className="flex items-center gap-3">
                  <Clock size={20} /> <span>Instant Response in 30 Mins</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} /> <span>100% Satisfaction Guaranteed</span>
                </div>
              </div>

              <Link 
                href={`/booking/${id}`}
                className="block w-full text-center bg-white text-blue-600 py-4 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;