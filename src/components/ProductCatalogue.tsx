import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Users, Zap, Battery, Home } from "lucide-react";

interface SolarPackage {
  id: string;
  name: string;
  description: string;
  power: string;
  battery: string;
  coverage: string;
  originalPrice: number;
  groupPrice: number;
  savings: number;
  participantsNeeded: number;
  currentParticipants: number;
  features: string[];
  popular?: boolean;
}

const packages: SolarPackage[] = [
  {
    id: "basic",
    name: "Generator Replacement",
    description: "Perfect for essential home appliances and lighting",
    power: "3kW Solar System",
    battery: "5kWh Battery Backup",
    coverage: "4-6 hours backup power",
    originalPrice: 2800000,
    groupPrice: 1950000,
    savings: 850000,
    participantsNeeded: 50,
    currentParticipants: 37,
    features: [
      "All lights and fans",
      "TV and entertainment",
      "Refrigerator",
      "Phone charging",
      "WiFi router"
    ]
  },
  {
    id: "family",
    name: "Full Home Backup",
    description: "Powers your entire home during outages",
    power: "5kW Solar System", 
    battery: "10kWh Battery Backup",
    coverage: "8-12 hours backup power",
    originalPrice: 4200000,
    groupPrice: 2950000,
    savings: 1250000,
    participantsNeeded: 40,
    currentParticipants: 32,
    features: [
      "Everything in Basic package",
      "Water pump",
      "Washing machine",
      "Air conditioning (1 room)",
      "Kitchen appliances"
    ],
    popular: true
  },
  {
    id: "premium",
    name: "Energy Independence",
    description: "Complete energy independence with surplus generation",
    power: "8kW Solar System",
    battery: "15kWh Battery Backup", 
    coverage: "24+ hours backup power",
    originalPrice: 6500000,
    groupPrice: 4250000,
    savings: 2250000,
    participantsNeeded: 30,
    currentParticipants: 18,
    features: [
      "Everything in Family package",
      "Multiple AC units",
      "Electric cooking",
      "Workshop tools",
      "Pool equipment"
    ]
  }
];

const ProductCatalogue = () => {
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return `K${(price / 1000000).toFixed(1)}M`;
  };

  const handlePurchase = (pkg: SolarPackage) => {
    try {
      navigate("/checkout", { 
        state: { 
          productName: pkg.name, 
          productPrice: pkg.groupPrice / 1000000 // Convert to readable format
        }
      });
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback: refresh page with route
      window.location.href = "/checkout";
    }
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Choose Your Solar Package
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each package is designed to replace your generator completely. 
            Join a group to unlock bulk pricing and start saving immediately.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const progress = (pkg.currentParticipants / pkg.participantsNeeded) * 100;
            const spotsLeft = pkg.participantsNeeded - pkg.currentParticipants;
            
            return (
              <Card 
                key={pkg.id} 
                className={`relative transition-smooth hover:shadow-elegant ${
                  pkg.popular ? 'ring-2 ring-primary shadow-solar' : ''
                }`}
              >
                {pkg.popular && (
                  <Badge 
                    variant="default" 
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-solar px-6 py-1 font-semibold"
                  >
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold mb-2">{pkg.name}</CardTitle>
                  <p className="text-muted-foreground">{pkg.description}</p>
                  
                  <div className="flex justify-center items-center gap-4 mt-4">
                    <div className="text-center">
                      <Zap className="w-6 h-6 mx-auto mb-1 text-solar-gold" />
                      <div className="text-sm font-medium">{pkg.power}</div>
                    </div>
                    <div className="text-center">
                      <Battery className="w-6 h-6 mx-auto mb-1 text-energy-green" />
                      <div className="text-sm font-medium">{pkg.battery}</div>
                    </div>
                    <div className="text-center">
                      <Home className="w-6 h-6 mx-auto mb-1 text-earth-orange" />
                      <div className="text-sm font-medium">{pkg.coverage}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Pricing */}
                  <div className="text-center border-t pt-4">
                    <div className="text-sm text-muted-foreground line-through">
                      Individual Price: {formatPrice(pkg.originalPrice)}
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(pkg.groupPrice)}
                    </div>
                    <div className="text-energy-green font-semibold">
                      Save {formatPrice(pkg.savings)}
                    </div>
                  </div>

                  {/* Group Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Group Progress
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {pkg.currentParticipants}/{pkg.participantsNeeded}
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="text-center">
                      <span className="text-sm font-medium text-earth-orange">
                        Only {spotsLeft} spots left!
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">What's Included:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-energy-green flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant={pkg.popular ? "solar" : "energy"} 
                    className="w-full" 
                    size="lg"
                    onClick={() => handlePurchase(pkg)}
                  >
                    Buy Now - {formatPrice(pkg.groupPrice)}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-card rounded-xl p-8 shadow-elegant max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Can't decide which package?</h3>
            <p className="text-muted-foreground mb-6">
              Use our savings calculator to see exactly how much you'll save with each package 
              compared to your current generator costs.
            </p>
            <Button variant="outline" size="lg">
              Calculate My Savings
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalogue;