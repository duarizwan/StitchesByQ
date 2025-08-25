"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const testimonials = [
  {
    text: "Stitches by Q exceeded my expectations! The quality and attention to detail are incredible. Highly recommended!",
    name: "Nabiha Abid",
    image: "/assets/gallery/testimonial.jpg",
  },
  {
    text: "Their work is simply outstanding. I’ll definitely come back for more orders!",
    name: "Ayesha Khan",
    image: "/assets/gallery/testimonial2.jpg",
  },
  {
    text: "Amazing customer service and the fitting was perfect. I love my outfit!",
    name: "Hira Sheikh",
    image: "/assets/gallery/testimonial3.jpg",
  },
  {
    text: "I ordered for my wedding, and the team delivered exactly what I had envisioned. Truly professional!",
    name: "Sara Malik",
    image: "/assets/gallery/testimonial4.jpg",
  },
  {
    text: "Great experience! Affordable prices without compromising on quality. Will recommend to friends.",
    name: "Mariam Khan",
    image: "/assets/gallery/testimonial5.jpg",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prevTestimonial = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Dynamic Image */}
          <Image
            key={testimonials[current].image} // ensures re-render on change
            src={testimonials[current].image}
            alt={testimonials[current].name}
            width={700}
            height={500}
            className="rounded-xl shadow-xl object-cover w-full h-[500px] transition-all duration-500 ease-in-out"
          />

          {/* Text Content */}
          <div className="text-center lg:text-left relative">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>

            {/* Quote Icon */}
            <div className="text-8xl text-gray-300 leading-none mb-4">
              &quot;
            </div>

            {/* Testimonial Text */}
            <p
              key={current}
              className="text-xl font-medium text-black mb-6 leading-relaxed transition-opacity duration-500 ease-in-out"
            >
              {testimonials[current].text}
            </p>

            {/* Client Name */}
            <p className="text-lg font-bold text-gray-800 mb-6">
              — {testimonials[current].name}
            </p>

            {/* Navigation Buttons */}
            <div className="flex justify-center lg:justify-start gap-4">
              <button
                onClick={prevTestimonial}
                className="bg-white text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-white text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
