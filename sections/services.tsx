import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    title: "Saree",
    description: "Elegant sarees, tailored for sophistication and style.",
    img: "/assets/gallery/pexels-manishjangid-28943579.jpg",
  },
  {
    title: "Bridal",
    description:
      "Perfectly tailored bridal wear to make your day unforgettable.",
    img: "/assets/gallery/Bridal1.jpg",
  },
  {
    title: "Frocks",
    description: "Stylish frocks for all occasions, crafted with care.",
    img: "/assets/gallery/Frocks.jpg",
  },
];

export default function ServicesPage() {
  return (
    <section className="py-16 bg-gray-50" id="services">
      <Container>
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          Our Top-Notch Stitching Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-5 flex flex-col items-center">
                <Image
                  src={service.img}
                  alt={service.title}
                  width={350}
                  height={400}
                  className="w-[350px] h-[400px] object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm text-center">
                  {service.description}
                </p>
                <Button
                  asChild
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  <Link href="/services">Explore</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
