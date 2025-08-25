import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <Image
          src="/assets/about/about.jpg"
          alt="About us background"
          fill
          className="object-cover"
          priority
        />

        <Container className="relative z-20 text-center">
          <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-sm rounded-4xl p-12">
            <h1 className="text-6xl font-bold mb-6 text-gray-100">About Us</h1>
            <p className="text-xl font-light mb-8 text-gray-200 max-w-3xl mx-auto">
              Celebrating Craftsmanship and Empowering Dreams
            </p>
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Link href="/order">Place Order</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Our Journey Section */}
      <section className="py-20 bg-amber-900 text-gray-100">
        <Container>
          <div className="text-center">
            <h2 className="text-5xl font-semibold mb-12 text-gray-100">
              Our Journey
            </h2>

            <div className="max-w-6xl mx-auto">
              <p className="text-xl leading-relaxed mb-16 max-w-4xl mx-auto">
                What began as a small workshop has flourished into a symbol of
                exceptional craftsmanship and artistry.{" "}
                <strong>Stitches by Q.</strong> is a tailoring business with
                over 20 years of experience in stitching and custom tailoring.
                However, the business lacks an online presence, which hinders
                its growth. We are here to serve you with exceptional tailoring
                services and to reach a wider audience through our accessible
                and user-friendly website.
              </p>

              <div className="mt-16">
                <Image
                  src="/assets/about/ouraim.png"
                  alt="Our story and journey"
                  width={640}
                  height={400}
                  className="mx-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 flex items-center justify-center">
        {/* Background Image */}
        <Image
          src="/assets/about/mission.jpg"
          alt="Our mission background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-amber-800/20"></div>

        <Container className="relative z-10 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-5xl font-semibold mb-12">Our Mission</h2>
            <p className="text-xl leading-relaxed">
              We aim to bridge the gap between tradition and technology. Our
              mission is to provide seamless stitching services while empowering
              skilled women tailors. By blending innovation and heritage, we
              deliver premium-quality tailoring to our valued customers.
            </p>
          </div>
        </Container>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white text-gray-900">
        <Container>
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-semibold mb-12 text-orange-500">
              Our Vision
            </h2>

            <div className="space-y-16">
              <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                We envision a world where fashion is sustainable and empowering.
                Our vision drives us to craft tailored creations that exude
                individuality and inspire confidence. Let us make your dream
                designs a reality.
              </p>

              <div className="mt-16">
                <Image
                  src="/assets/about/ourvision.jpg"
                  alt="Our vision for the future"
                  width={640}
                  height={400}
                  className="mx-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-orange-500 text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-8">Join Our Community</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Ready to experience custom-tailored perfection? Explore our
              services or place an order today!
            </p>
            <Button
              asChild
              className="bg-black hover:bg-gray-800 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
