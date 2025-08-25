"use client";

import { CheckCircle, Ruler, Star, Tags } from "lucide-react";
import { Container } from "@/components/ui/container";

const usps = [
  {
    icon: <CheckCircle className="w-10 h-10 text-coral-red" />,
    title: "Experienced Tailors",
    description:
      "Our team consists of skilled tailors with years of experience in the art of stitching.",
  },
  {
    icon: <Ruler className="w-10 h-10 text-coral-red" />,
    title: "Custom Fitting",
    description:
      "Each garment is tailored to fit you perfectly, ensuring comfort and style.",
  },
  {
    icon: <Star className="w-10 h-10 text-coral-red" />,
    title: "High-Quality Fabrics",
    description:
      "We use only premium fabrics, ensuring durability and elegance in every piece.",
  },
  {
    icon: <Tags className="w-10 h-10 text-coral-red" />,
    title: "Affordable Pricing",
    description:
      "We offer high-quality services at prices that fit your budget.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50" id="why-choose-us">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="text-lg text-charcoal/70 mt-4">
            We bring experience, quality, and dedication to every stitch.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">{usp.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {usp.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
