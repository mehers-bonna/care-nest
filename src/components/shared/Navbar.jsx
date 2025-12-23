"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HeartPulse, Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { useSession, signOut } from "next-auth/react"; // সেশন হুক ইম্পোর্ট

const Navbar = () => {
  const { data: session, status } = useSession(); // লগইন স্ট্যাটাস চেক
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'My Bookings', href: '/my-bookings' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <HeartPulse className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CareNest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* সেশন অনুযায়ী বাটন পরিবর্তন */}
            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                  Hi, {session?.user?.name.split(' ')[0]} {/* শুধু প্রথম নাম দেখাবে */}
                </span>
                <button 
                  onClick={() => signOut()} 
                  className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {status === "authenticated" ? (
              <div className="pt-4 border-t border-gray-100">
                <p className="px-3 mb-2 text-sm text-gray-500">Logged in as: {session?.user?.name}</p>
                <button
                  onClick={() => signOut()}
                  className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-3 rounded-lg"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg mt-4"
                onClick={() => setIsOpen(false)}
              >
                <User size={18} /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;