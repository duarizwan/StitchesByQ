import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Services", href: "/services" },
  { name: "Place an Order", href: "/order" },
  { name: "FAQs", href: "/#faq" },
  { name: "Contact Us", href: "/contact" },
];

const contactInfo = [
  {
    icon: MapPin,
    text: "House 1, Block 1, Model Colony, Moinabad, Karachi",
    href: "https://goo.gl/maps/xyz",
  },
  {
    icon: Phone,
    text: "+92-312-3615522",
    href: "tel:+923123615522",
  },
  {
    icon: Mail,
    text: "stitchesbyq@gmail.com",
    href: "mailto:stitchesbyq@gmail.com",
  },
  {
    icon: Clock,
    text: "9 AM - 9 PM",
    href: null,
  },
];

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white pt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo Section */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo/white-full.png"
                alt="Stitches by Q"
                width={200}
                height={80}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Contact Form Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="mb-4">Stay connected for quick responses.</p>
            <Link
              href="/contact"
              className="inline-block bg-coral-red hover:bg-coral-dark text-white px-6 py-2 rounded-full transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-coral-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Reach Out to Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-coral-red flex-shrink-0 mt-1" />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-coral-red transition-colors"
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-80 rounded-lg overflow-hidden mb-8">
          <iframe
            title="Stitches by Q Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.558284213234!2d67.11531797400985!3d24.8977743791316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33eafa5a4d4c7%3A0x2c4b4c89ff68b7e7!2sModel%20Colony%2C%20Karachi%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1603629984048!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/10 py-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Stitches by Q. All Rights
            Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
