"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    title: "Saree Stitching",
    description:
      "Expert tailoring of traditional and modern saree blouses with perfect fit and finish.",
    pricing: "Starting from Rs. 1,500",
    image: "/assets/gallery/saree.jpg",
    features: [
      "Custom fitting",
      "Multiple design options",
      "Premium fabric options",
      "3-5 days delivery",
    ],
  },
  {
    title: "Bridal Wear",
    description:
      "Luxurious bridal wear tailoring with intricate details and perfect craftsmanship.",
    pricing: "Starting from Rs. 15,000",
    image: "/assets/gallery/bridal2.jpg",
    features: [
      "Premium materials",
      "Custom embellishments",
      "Multiple fittings",
      "15-20 days delivery",
    ],
  },
  {
    title: "Elegant Suits",
    description:
      "Perfectly stitched suits with premium detailing for all occasions.",
    pricing: "Starting from Rs. 800",
    image: "/assets/gallery/simple.jpg",
    features: [
      "Professional tailoring",
      "Custom fabric options",
      "Modern & traditional cuts",
      "5-7 days delivery",
    ],
  },
  {
    title: "Fancy Abayas",
    description:
      "Beautifully designed abayas blending modesty and elegance with style.",
    pricing: "Starting from Rs. 1,000",
    image: "/assets/gallery/abaya.jpg",
    features: [
      "Multiple styles",
      "Premium fabric choices",
      "Custom embroidery",
      "7-10 days delivery",
    ],
  },
  {
    title: "Trendy Shrugs",
    description:
      "Lightweight and stylish shrugs for casual and semi-formal wear.",
    pricing: "Starting from Rs. 800",
    image: "/assets/gallery/shrugs.jpg",
    features: [
      "Trendy designs",
      "Breathable fabrics",
      "Custom lengths",
      "Quick 2-4 days delivery",
    ],
  },
  {
    title: "Customized Orders",
    description:
      "Get your dream outfit stitched exactly how you want with full customization.",
    pricing: "Rates as per requirement",
    image: "/assets/gallery/cust.jpg",
    features: [
      "Your choice of fabric",
      "Fully custom measurements",
      "Unlimited design flexibility",
      "Timeline as per design",
    ],
  },
  {
    title: "Party Wear",
    description:
      "Stylish party wear stitching to make you stand out at every event.",
    pricing: "Starting from Rs. 2,000",
    image: "/assets/gallery/partywear.jpg",
    features: [
      "Trendy patterns",
      "Embellishment options",
      "Perfect finishing",
      "7-10 days delivery",
    ],
  },

  {
    title: "Kids’ Wear",
    description:
      "Adorable and comfortable kids’ wear stitching for all occasions.",
    pricing: "Starting from Rs. 500",
    image: "/assets/gallery/kidswear.jpg",
    features: [
      "Comfort fabrics",
      "Fun designs",
      "Durable stitching",
      "Quick delivery",
    ],
  },
  {
    title: "Gowns",
    description:
      "Stunning evening gowns tailored for elegance and special occasions.",
    pricing: "Starting from Rs. 5,000",
    image: "/assets/gallery/gown.jpg",
    features: [
      "Luxurious fabrics",
      "Custom designs",
      "Elegant finishes",
      "10-15 days delivery",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/assets/gallery/bgwithoverlay.jpg')",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our Services
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Discover our range of professional stitching services tailored to
              meet your needs with unmatched precision and elegance.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Link href="/order">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              From traditional wear to modern fashion, we provide comprehensive stitching services
              with attention to detail and customer satisfaction.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                {/* Service Image */}
                <div className="relative w-full h-[300px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Service Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-charcoal mb-2">
                    {service.title}
                  </h3>
                  <p className="text-coral-red font-medium mb-4">
                    {service.pricing}
                  </p>

                  <p className="text-charcoal/80 mb-4">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-charcoal/80"
                      >
                        <svg
                          className="w-5 h-5 text-coral-red flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    asChild
                    className="w-full bg-coral-red text-white font-semibold rounded-full hover:bg-coral-red/90 transition-all"
                  >
                    <Link href="/order">Order Now</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
