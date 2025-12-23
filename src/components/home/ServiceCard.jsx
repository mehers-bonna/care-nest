import React from 'react';
import Link from 'next/link';
import { Baby, Heart, Activity, ArrowRight } from 'lucide-react';

const ServiceCard = ({ service }) => {
  const getIcon = (category) => {
    switch (category) {
      case 'Baby Care': return <Baby size={32} className="text-blue-500" />;
      case 'Elderly Service': return <Heart size={32} className="text-red-500" />;
      case 'Sick People Service': return <Activity size={32} className="text-green-500" />;
      default: return <Heart size={32} className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100 transition-all group">
      <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {getIcon(service.category)}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
        {service.description}
      </p>
      <Link 
        href={`/services/${service.id}`} 
        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
      >
        View Details <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default ServiceCard;