import Image from "next/image";
import { Check } from "lucide-react";

const features = [
  "Professional guidance throughout the design process.",
  "High-quality materials for exceptional durability and style.",
  "Timely delivery to match your schedule.",
];

export function Info() {
  return (
    <section className="py-20 bg-gray-50 text-off-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/assets/gallery/info img.jpg"
                alt="Stitching Process"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              Experience Quality Stitching Services with Stitches by Q
            </h2>

            <p className="text-lg mb-8">
              At Stitches by Q, we provide a variety of stitching services
              tailored to meet your style and preferences. From elegant sarees
              to intricate bridal gowns, we ensure top-notch quality and
              craftsmanship in every piece.
            </p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-coral-red flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
