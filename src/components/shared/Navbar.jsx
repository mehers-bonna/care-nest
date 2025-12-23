"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { HeartPulse, Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname(); 
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
            {navLinks.map((link) => {
              const isActive = pathname === link.href; 
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative font-medium transition-all duration-300 pb-1 ${
                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                  {/* Active Underline Animation */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full transition-all duration-300"></span>
                  )}
                </Link>
              );
            })}

            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-semibold bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                  Hi, {session?.user?.name?.split(' ')[0]}
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
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                    isActive 
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {status === "authenticated" ? (
              <div className="pt-4 mt-2 border-t border-gray-100">
                <div className="px-4 py-2 mb-2 bg-gray-50 rounded-lg">
                   <p className="text-sm text-gray-500">Logged in as</p>
                   <p className="font-bold text-gray-800">{session?.user?.name}</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-3.5 rounded-xl font-bold active:scale-95 transition-transform"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold mt-4 shadow-lg shadow-blue-100"
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