import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Rahat Chowdhury",
            role: "Parent",
            comment: "Found an amazing babysitter for my 2-year-old daughter. The process was so easy and secure!",
            rating: 5
        },
        {
            name: "Mrs. Shamim",
            role: "Daughter",
            comment: "The elderly care service is top-notch. The caregiver is very professional and caring towards my father.",
            rating: 5
        },
        {
            name: "Asif Iqbal",
            role: "Businessman",
            comment: "Quick booking and verified caretakers. CareNest is exactly what we needed for home-based care.",
            rating: 4
        }
    ];

    return (
        <section className="py-24 bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Success Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center">
                    <div>
                        <h4 className="text-4xl font-bold text-white mb-2">10K+</h4>
                        <p className="text-blue-100 text-sm">Happy Families</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-white mb-2">500+</h4>
                        <p className="text-blue-100 text-sm">Verified Caregivers</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-white mb-2">24/7</h4>
                        <p className="text-blue-100 text-sm">Support Available</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-white mb-2">4.9/5</h4>
                        <p className="text-blue-100 text-sm">Average Rating</p>
                    </div>
                </div>

                {/* Testimonial Header */}
                <div className="text-center mb-16">
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
                    <div className="w-20 h-1 bg-white/30 mx-auto"></div>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((rev, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative group hover:bg-white transition-all duration-500">
                            <Quote className="text-blue-200 absolute top-6 right-8 group-hover:text-blue-600 transition-colors" size={40} />

                            <div className="flex gap-1 mb-4">
                                {[...Array(rev.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-blue-50 group-hover:text-gray-700 mb-6 italic transition-colors">
                                "{rev.comment}"
                            </p>

                            <div>
                                <h5 className="text-white group-hover:text-gray-900 font-bold transition-colors">{rev.name}</h5>
                                <p className="text-blue-200 group-hover:text-blue-600 text-sm transition-colors">{rev.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;