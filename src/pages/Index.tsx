import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCatalogue from "@/components/ProductCatalogue";
import SavingsCalculator from "@/components/SavingsCalculator";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <section id="packages">
          <ProductCatalogue />
        </section>
        <section id="calculator">
          <SavingsCalculator />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
