import React from 'react';
import { Target, ShieldCheck, Zap } from 'lucide-react';

const AboutSection = () => {
  const missions = [
    {
      icon: <Target className="text-blue-600" size={24} />,
      title: "Our Mission",
      desc: "To make caregiving easy, secure, and accessible for everyone regardless of location."
    },
    {
      icon: <ShieldCheck className="text-green-600" size={24} />,
      title: "Trusted Service",
      desc: "Every caregiver is verified with NID and background checks to ensure family safety."
    },
    {
      icon: <Zap className="text-yellow-600" size={24} />,
      title: "Quick Booking",
      desc: "Easily find and hire a caretaker within minutes through our dynamic platform."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Content */}
          <div className="lg:w-1/2">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase mb-3">About CareNest</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              We Are Committed To Provide <br /> The Best Care For You
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              CareNest provides reliable and trusted care services for children, elderly, and other family members. 
              Users can easily book services through the platform for babysitting, elderly care, or special sick care at home.
            </p>
            
            <div className="space-y-6">
              {missions.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image/Card Placeholder */}
          <div className="lg:w-1/2 relative">
            <div className="bg-blue-600 rounded-3xl w-full h-[400px] relative overflow-hidden shadow-2xl">
                {/* এখানে আপনি একটি ভালো কেয়ারগিভিং ইমেজ ব্যবহার করতে পারেন */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731522-7455051462c1?q=80&w=800')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <p className="text-white text-2xl font-medium italic">
                        "Taking care of your family is our greatest responsibility."
                    </p>
                </div>
            </div>
            {/* Success Metrics Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-gray-600 text-sm font-medium">Verified Caregivers</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;