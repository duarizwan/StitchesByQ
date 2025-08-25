"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { createClient } from "@/lib/supabase/client";

export default function ContactPage() {
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await (supabase as any).from("contacts").insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      alert("❌ Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      <Container className="py-12">
        <Card className="shadow-lg border-0">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Contact Form */}
            <div className="flex-1 bg-neutral-900 text-white p-8 lg:p-12 rounded-l-lg">
              <div className="text-center mb-8">
                <div className="mb-8">
                  <Image
                    src="/assets/logo/white-full.png"
                    alt="Stitches by Q Logo"
                    width={200}
                    height={80}
                    className="mx-auto"
                    priority
                  />
                </div>

                <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-600 rounded-md text-white placeholder-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-600 rounded-md text-white placeholder-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-600 rounded-md text-white placeholder-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-600 rounded-md text-white placeholder-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-vertical"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Right Section - Image */}
            <div className="flex-1 relative min-h-[400px] lg:min-h-[600px]">
              <Image
                src="/assets/gallery/contact2.jpg"
                alt="Contact us - measurement and tailoring"
                fill
                className="object-cover rounded-r-lg"
                priority
              />
            </div>
          </div>
        </Card>
      </Container>
    </main>
  );
}
