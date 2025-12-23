"use client";
import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="text-center">
                <div className="relative flex justify-center mb-8">
                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 scale-150 animate-pulse"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-xl border border-blue-50">
                        <AlertCircle size={80} className="text-blue-600 animate-bounce" />
                    </div>
                </div>

                <h1 className="text-9xl font-black text-gray-200 leading-none mb-4">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, 
                    or is temporarily unavailable. Let's get you back on track!
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        href="/"
                        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 group"
                    >
                        <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                        Return to Home
                    </Link>
                    
                    <Link 
                        href="/contact"
                        className="text-gray-600 font-semibold px-8 py-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}