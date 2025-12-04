import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { ProductShowcase } from "../components/ProductShowcase";
import { Features } from "../components/Features";
import { Testimonials } from "../components/Testimonials";
import { CTA } from "../components/CTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ProductShowcase />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
}
