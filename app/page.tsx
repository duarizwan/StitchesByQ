import { FAQ } from "@/sections/faq";
import { Info } from "@/sections/info";
import { Testimonials } from "@/sections/testimonials";
import { Hero } from "@/sections/hero";
import ServicesPage from "@/sections/services";
import { WhyChooseUs } from "@/sections/whychoose";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesPage />
      <Testimonials />
      <WhyChooseUs />
      <Info />
      <FAQ />
    </main>
  );
}
