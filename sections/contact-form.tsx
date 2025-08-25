"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-20 bg-charcoal">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-off-white mb-4">Contact Us</h2>
          <p className="text-off-white/80 mb-8">
            Have questions or ready to start your custom order? We would love to
            hear from you!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <Input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <Input
              type="text"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />

            <textarea
              placeholder="Your Message"
              required
              className={`
                w-full min-h-[150px] rounded-md border border-charcoal/20 bg-white px-3 py-2
                text-sm ring-offset-white placeholder:text-charcoal/50 
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-coral-red focus-visible:ring-offset-2
              `}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />

            <Button type="submit" variant="coral" size="lg" className="w-full">
              Send Message
            </Button>
          </form>

          <p className="mt-6 text-off-white/60">
            Or visit our{" "}
            <a href="/contact" className="text-coral-red hover:underline">
              Contact Us
            </a>{" "}
            page for more details.
          </p>
        </div>
      </Container>
    </section>
  );
}
