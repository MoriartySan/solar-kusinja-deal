import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-solar-family.jpg";
import { Calculator, Volume2, VolumeX, Fuel, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Malawian family with solar panels"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-hero/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Silent Power,
          <span className="block text-solar-gold-light">Endless Savings</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
          Join thousands of Malawian families switching from noisy, expensive generators 
          to quiet, affordable solar power through group buying.
        </p>
        
        {/* Generator vs Solar Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Volume2 className="w-12 h-12 text-malawi-red" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-malawi-red">Your Generator</h3>
            <ul className="space-y-2 text-left text-white/80">
              <li className="flex items-center gap-2">
                <Fuel className="w-4 h-4" />
                High fuel costs (K50,000+/month)
              </li>
              <li className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Noisy operation (disturbs family)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-malawi-red"></span>
                Constant maintenance required
              </li>
            </ul>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-energy-green-light/40">
            <div className="flex items-center justify-center mb-4">
              <VolumeX className="w-12 h-12 text-energy-green-light" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-energy-green-light">Solar System</h3>
            <ul className="space-y-2 text-left text-white/80">
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Zero monthly fuel costs
              </li>
              <li className="flex items-center gap-2">
                <VolumeX className="w-4 h-4" />
                Completely silent operation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-energy-green-light"></span>
                25-year maintenance-free warranty
              </li>
            </ul>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="px-8 py-4">
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Your Savings
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-4 border-white/40 text-white hover:bg-white/20">
            View Solar Packages
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70">
          <div className="text-center">
            <div className="text-2xl font-bold text-solar-gold-light">2,500+</div>
            <div className="text-sm">Families Powered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-energy-green-light">K2.5M</div>
            <div className="text-sm">Average Savings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-earth-orange-light">25 Year</div>
            <div className="text-sm">Warranty</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;