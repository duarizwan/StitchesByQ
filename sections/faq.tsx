"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We provide custom tailoring services, including stitching for gowns, sarees, lehengas, abayas, frocks, and both casual and formal wear. Bulk and individual orders are accepted.",
  },
  {
    question: "Do you provide design consultations?",
    answer:
      "Yes! You can share your ideas or inspirations, and our team will help refine them into a final design. We also guide you with fabric choices that best suit your vision.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Orders can be placed via our website, social media, or WhatsApp. Share your measurements, fabric (if available), and design preference to get started.",
  },
  {
    question: "Can I order in bulk for weddings or events?",
    answer:
      "Absolutely! We specialize in bulk orders for weddings, corporate events, and boutique partnerships. Discounts are available on large orders.",
  },
  {
    question: "Do you provide pickup or delivery services?",
    answer:
      "Yes, we offer doorstep pickup and delivery within Karachi. For customers outside Karachi, we provide reliable courier services.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>

        <p className="text-lg text-center mb-12">
          Here are the answers to some of the most common questions we get.
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg shadow-sm transition-colors",
                openIndex === index ? "bg-gray-100" : "bg-white"
              )}
            >
              <button
                className={cn(
                  "w-full flex items-center justify-between p-6 text-left transition-colors",
                  openIndex === index
                    ? "bg-gray-200"
                    : "bg-neutral-900 text-white"
                )}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <Plus
                  className={cn(
                    "h-5 w-5 transition-transform",
                    openIndex === index && "rotate-45"
                  )}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
