import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import customerImage from "@/assets/customer-testimonial.jpg";
import { Star, MapPin, Zap, Heart } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  packageType: string;
  monthsSaved: number;
  annualSavings: string;
  quote: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "David Mbewe",
    location: "Blantyre",
    packageType: "Full Home Backup",
    monthsSaved: 18,
    annualSavings: "K420,000",
    quote: "The silence is golden! My children can now study peacefully in the evening, and we've saved enough money to pay for their school fees. Best investment we ever made.",
    rating: 5,
    image: customerImage
  },
  {
    id: "2", 
    name: "Grace Phiri",
    location: "Lilongwe",
    packageType: "Generator Replacement",
    monthsSaved: 12,
    annualSavings: "K380,000",
    quote: "No more 5am trips to buy fuel! No more noise complaints from neighbors. The solar system just works, day and night. I wish I had done this years ago.",
    rating: 5
  },
  {
    id: "3",
    name: "James Banda",
    location: "Mzuzu", 
    packageType: "Energy Independence",
    monthsSaved: 24,
    annualSavings: "K650,000",
    quote: "Our business runs 24/7 now without worry about power cuts or fuel costs. The savings paid for a new delivery vehicle. This is the future of energy in Malawi.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const formatCurrency = (amount: string) => amount;

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Real Stories, Real Savings
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of satisfied customers who've made the switch from expensive, 
            noisy generators to clean, silent solar power.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-elegant hover:shadow-xl transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-solar">
                    {testimonial.image ? (
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {testimonial.packageType}
                    </Badge>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-solar-gold text-solar-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Savings Info */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Annual Savings:</span>
                    <span className="font-bold text-energy-green">
                      {formatCurrency(testimonial.annualSavings)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Solar for:</span>
                    <span className="font-medium">
                      {testimonial.monthsSaved} months
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-xl shadow-md">
            <div className="w-12 h-12 bg-gradient-solar rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
          </div>
          
          <div className="text-center p-6 bg-card rounded-xl shadow-md">
            <div className="w-12 h-12 bg-gradient-energy rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-energy-green mb-2">2,500+</div>
            <div className="text-sm text-muted-foreground">Homes Powered</div>
          </div>
          
          <div className="text-center p-6 bg-card rounded-xl shadow-md">
            <div className="w-12 h-12 bg-earth-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">K</span>
            </div>
            <div className="text-3xl font-bold text-earth-orange mb-2">45M+</div>
            <div className="text-sm text-muted-foreground">Total Savings Generated</div>
          </div>
          
          <div className="text-center p-6 bg-card rounded-xl shadow-md">
            <div className="w-12 h-12 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">25</span>
            </div>
            <div className="text-3xl font-bold text-trust-blue mb-2">Years</div>
            <div className="text-sm text-muted-foreground">Warranty Period</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-hero text-white rounded-xl p-8 shadow-elegant">
            <h3 className="text-2xl font-bold mb-4">Ready to Join the Solar Revolution?</h3>
            <p className="mb-6 text-white/90">
              Stop paying for expensive fuel. Start saving with silent, reliable solar power.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-smooth">
                Calculate My Savings
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-smooth border border-white/30">
                View Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;