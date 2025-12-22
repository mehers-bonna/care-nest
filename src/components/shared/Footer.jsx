import Link from 'next/link';
import { HeartPulse, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-xl">
                <HeartPulse className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold text-white">
                CareNest
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Providing reliable and trusted care services for children, elderly, and your loved ones. We make caregiving easy, secure, and accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-blue-500 transition-colors">Our Services</Link></li>
              <li><Link href="/login" className="hover:text-blue-500 transition-colors">Join as Caregiver</Link></li>
              <li><Link href="/my-bookings" className="hover:text-blue-500 transition-colors">My Bookings</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500" />
                <span>support@carenest.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <MapPin size={24} className="text-blue-500" />
                <span>Dhanmondi, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-all">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-all">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-all">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} CareNest. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;