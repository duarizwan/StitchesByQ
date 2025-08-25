"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center ">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/assets/gallery/bgwithoverlay.jpg')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 bg-black/30 backdrop-blur-sm rounded-4xl p-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-b max-w-4xl mx-auto ">
          ONLINE STITCHING SERVICE
        </h1>

        <p className="text-xl md:text-3xl text-white mb-8 bg-gradient-to-tb">
          Empowering Women Through Quality Stitching
        </p>

        <Button
          asChild
          size="lg"
          className="bg-black text-white hover:bg-gray-800 hover:scale-105 text-lg px-10 py-4 rounded-full transition-all duration-300"
        >
          <Link href="/order">Place Order</Link>
        </Button>
      </div>
    </section>
  );
}
