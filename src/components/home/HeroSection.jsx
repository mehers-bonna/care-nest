import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Heart, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Motivation Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-blue-600 text-sm font-medium mb-8 animate-bounce">
          <Heart size={16} />
          <span>Your Family's Trust, Our Priority</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Reliable Care for Your <br />
          <span className="text-blue-600 italic">Loved Ones</span> at Home
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed">
          Find and hire trusted caretakers for babysitting, elderly support, or special medical needs. 
          We make caregiving <span className="font-semibold">easy, secure, and accessible</span> for everyone.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <Link 
            href="/services" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all group"
          >
            Explore Services
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/register" 
            className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            Join as Caregiver
          </Link>
        </div>

        {/* Trust Markers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto pt-10 border-t border-gray-100">
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <ShieldCheck className="text-green-500" size={24} />
            <span className="font-medium">100% Secure & Verified</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <Users className="text-blue-500" size={24} />
            <span>Expert Caregivers</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <Heart className="text-red-500" size={24} />
            <span>Personalized Care</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;