"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Lock, Chrome } from 'lucide-react';

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // লগইন লজিক আমরা NextAuth দিয়ে সেটআপ করবো
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login to manage your care services</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <div className="relative flex items-center justify-center py-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm italic">or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700">
            <Chrome className="text-blue-500" size={20} />
            Login with Google
          </button>
        </div>

        <p className="text-center mt-8 text-gray-600">
          New to CareNest? <Link href="/register" className="text-blue-600 font-bold">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;