import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import ServiceCard from "@/components/home/ServiceCard";
import Testimonials from "@/components/home/Testimonials";

export const metadata = {
  title: "CareNest | Best Home Care Services",
  description: "CareNest provides professional baby care, elderly care, and sick care services. Trusted professionals at your doorstep.",
  keywords: ["Home Care", "Baby Care", "Elderly Care", "Caregiving Services"],
};

export default function Home() {
  const services = [
    {
      id: "baby-care",
      title: "Baby Care",
      category: "Baby Care",
      description: "Reliable babysitting and care for your little ones with trusted professionals."
    },
    {
      id: "elderly-care",
      title: "Elderly Service",
      category: "Elderly Service",
      description: "Compassionate support and medical attention for the elderly members of your family."
    },
    {
      id: "sick-care",
      title: "Sick People Service",
      category: "Sick People Service",
      description: "Specialized care at home for patients recovering from illness or surgery."
    }
  ];

  return (
    <main>
      <HeroSection />

      {/* Services Overview Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Professional Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of caregiving services tailored to meet the unique needs of your family members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <AboutSection />
      {/* testimonials section */}
      <Testimonials />
    </main>
  );
}