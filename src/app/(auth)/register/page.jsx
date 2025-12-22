"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, idCard, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nid: '',
    contact: '',
    password: ''
  });

  const validatePassword = (pass) => {
    return pass.length >= 6 && /[a-z]/.test(pass) && /[A-Z]/.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // পাসওয়ার্ড ভ্যালিডেশন চেক
    if (!validatePassword(formData.password)) {
      toast.error("Password must be 6+ chars with 1 uppercase & 1 lowercase!");
      return;
    }

    // এখানে আপনার API Call হবে (পরবর্তীতে আমরা এটা সেটআপ করবো)
    console.log("Registering User:", formData);
    toast.success("Registration Successful!");
    router.push('/booking'); // রেজিস্ট্রেশন সফল হলে বুকিং পেজে রিডাইরেক্ট
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Join CareNest to find the best care</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-800" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* NID Field */}
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="NID Number"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
              onChange={(e) => setFormData({...formData, nid: e.target.value})}
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Contact Field */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Contact Number"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password (6+ char, A-Z, a-z)"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            Register Now
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-600 font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;