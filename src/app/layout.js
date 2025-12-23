import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/context/AuthProvider";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            
            {children}
          </main>
          
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            theme="light"
          />
          
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}