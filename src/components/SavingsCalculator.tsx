import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calculator, TrendingUp, Fuel, Zap } from "lucide-react";

const SavingsCalculator = () => {
  const [monthlyFuelCost, setMonthlyFuelCost] = useState<number>(35000);
  const [hoursPerDay, setHoursPerDay] = useState<number>(4);
  const [selectedPackage, setSelectedPackage] = useState<string>("family");

  const packages = {
    basic: { price: 1950000, name: "Generator Replacement" },
    family: { price: 2950000, name: "Full Home Backup" },
    premium: { price: 4250000, name: "Energy Independence" }
  };

  // Calculate savings
  const annualFuelCost = monthlyFuelCost * 12;
  const fiveYearFuelCost = annualFuelCost * 5;
  const tenYearFuelCost = annualFuelCost * 10;
  const twentyFiveYearFuelCost = annualFuelCost * 25;
  
  const packagePrice = packages[selectedPackage as keyof typeof packages].price;
  const packageName = packages[selectedPackage as keyof typeof packages].name;
  
  const fiveYearSavings = fiveYearFuelCost - packagePrice;
  const tenYearSavings = tenYearFuelCost - packagePrice;
  const twentyFiveYearSavings = twentyFiveYearFuelCost - packagePrice;
  
  const paybackPeriod = Math.ceil(packagePrice / annualFuelCost * 12);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `K${(amount / 1000000).toFixed(1)}M`;
    }
    return `K${amount.toLocaleString()}`;
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Calculate Your Savings
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See exactly how much you'll save by switching from generator to solar power.
            Most families save over K10 million in 25 years!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                Your Current Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fuel-cost">Monthly fuel cost (Kwacha)</Label>
                <Input
                  id="fuel-cost"
                  type="number"
                  value={monthlyFuelCost}
                  onChange={(e) => setMonthlyFuelCost(Number(e.target.value))}
                  placeholder="35000"
                />
                <p className="text-sm text-muted-foreground">
                  Include diesel, petrol, and maintenance costs
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Hours of generator use per day</Label>
                <Input
                  id="hours"
                  type="number"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  placeholder="4"
                  min="1"
                  max="24"
                />
              </div>

              <div className="space-y-3">
                <Label>Select solar package to compare</Label>
                <div className="space-y-2">
                  {Object.entries(packages).map(([key, pkg]) => (
                    <label 
                      key={key} 
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={key}
                        checked={selectedPackage === key}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">
                        {pkg.name} - {formatCurrency(pkg.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="solar" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                Update Calculations
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-energy-green" />
                Your Solar Savings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Costs vs Solar */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-malawi-red/10 rounded-lg">
                  <Fuel className="w-8 h-8 mx-auto mb-2 text-malawi-red" />
                  <div className="text-sm text-muted-foreground">Current Annual Cost</div>
                  <div className="text-xl font-bold text-malawi-red">
                    {formatCurrency(annualFuelCost)}
                  </div>
                </div>
                <div className="text-center p-4 bg-energy-green/10 rounded-lg">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-energy-green" />
                  <div className="text-sm text-muted-foreground">Solar System Cost</div>
                  <div className="text-xl font-bold text-energy-green">
                    {formatCurrency(packagePrice)}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payback Period */}
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">{paybackPeriod} months</div>
                <div className="text-sm text-muted-foreground">Payback period</div>
                <div className="text-xs text-muted-foreground mt-1">
                  After this, your power is completely FREE!
                </div>
              </div>

              {/* Long-term Savings */}
              <div className="space-y-4">
                <h4 className="font-semibold">Total Savings Over Time</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-energy-green/5 rounded-lg">
                    <span className="text-sm">5 years</span>
                    <span className="font-bold text-energy-green">
                      {formatCurrency(fiveYearSavings)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-energy-green/10 rounded-lg">
                    <span className="text-sm">10 years</span>
                    <span className="font-bold text-energy-green">
                      {formatCurrency(tenYearSavings)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-energy-green/20 rounded-lg">
                    <span className="text-sm">25 years (warranty period)</span>
                    <span className="font-bold text-energy-green text-lg">
                      {formatCurrency(twentyFiveYearSavings)}
                    </span>
                  </div>
                </div>
              </div>

              <Button variant="hero" className="w-full">
                Join {packageName} Group
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12 p-8 bg-gradient-subtle rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Your solar system pays for itself, then generates 
            <span className="text-energy-green"> free electricity for decades!</span>
          </h3>
          <p className="text-muted-foreground">
            With a 25-year warranty, you'll enjoy free, silent power long after 
            your neighbors are still buying expensive fuel.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;