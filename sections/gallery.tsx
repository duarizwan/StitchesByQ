"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { X } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    src: "/assets/gallery/item1.jpg",
    alt: "Gallery Item 1",
    category: "Bridal",
  },
  // Add more gallery items...
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-off-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-lg text-charcoal/80">
            Browse through our collection of custom-made designs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square cursor-pointer group"
              onClick={() => setSelectedImage(item.src)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <p className="text-white text-lg font-medium">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-4xl aspect-square">
              <Image
                src={selectedImage}
                alt="Gallery preview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
