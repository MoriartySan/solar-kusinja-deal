import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, TrendingUp, Shield, Clock, CheckCircle, DollarSign } from "lucide-react";

const Financing = () => {
  const financingOptions = [
    {
      provider: "Malawi Microfinance Network",
      type: "Solar Loan",
      rate: "12% APR",
      term: "36 months",
      minAmount: "MWK 500,000",
      maxAmount: "MWK 2,000,000",
      features: ["No collateral required", "Flexible payment terms", "Quick approval process"],
      badge: "Most Popular",
      badgeVariant: "default" as const
    },
    {
      provider: "Rural Finance Corporation",
      type: "Green Energy Financing",
      rate: "10% APR",
      term: "48 months", 
      minAmount: "MWK 750,000",
      maxAmount: "MWK 3,500,000",
      features: ["Government subsidized", "Lower interest rates", "Agricultural background preferred"],
      badge: "Government Backed",
      badgeVariant: "secondary" as const
    },
    {
      provider: "Opportunity Bank Malawi",
      type: "Clean Energy Loan",
      rate: "14% APR",
      term: "24 months",
      minAmount: "MWK 300,000",
      maxAmount: "MWK 1,500,000",
      features: ["Fast disbursement", "Mobile banking integration", "Small business friendly"],
      badge: "Quick Approval",
      badgeVariant: "outline" as const
    },
    {
      provider: "Standard Bank Malawi",
      type: "Renewable Energy Finance",
      rate: "11% APR",
      term: "60 months",
      minAmount: "MWK 1,000,000",
      maxAmount: "MWK 5,000,000",
      features: ["Competitive rates", "Extended payment period", "Professional installation included"],
      badge: "Premium",
      badgeVariant: "outline" as const
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Increase Property Value",
      description: "Solar installations can increase your property value by up to 15%"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Energy Security",
      description: "Protect yourself from rising electricity costs and power outages"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Immediate Savings",
      description: "Start saving on electricity bills from day one of installation"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick ROI",
      description: "Most installations pay for themselves within 3-5 years"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background via-muted/30 to-secondary/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Solar Financing Options
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Partner with trusted local financial institutions to make solar energy affordable. 
                Choose from flexible payment plans that fit your budget.
              </p>
              <div className="flex items-center justify-center gap-2 text-secondary">
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Flexible • Affordable • Transparent</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Finance Your Solar Investment?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Solar financing allows you to start saving immediately while spreading the cost over time
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-solar rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financing Options */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Local Financing Partners
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We've partnered with trusted Malawian financial institutions to offer you the best rates and terms
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {financingOptions.map((option, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  {option.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge variant={option.badgeVariant}>{option.badge}</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{option.provider}</CardTitle>
                    <CardDescription className="text-lg font-medium text-secondary">
                      {option.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Interest Rate:</span>
                        <div className="font-semibold text-foreground">{option.rate}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Loan Term:</span>
                        <div className="font-semibold text-foreground">{option.term}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Min Amount:</span>
                        <div className="font-semibold text-foreground">{option.minAmount}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max Amount:</span>
                        <div className="font-semibold text-foreground">{option.maxAmount}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {option.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-secondary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full" variant="outline">
                      Learn More & Apply
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                How Solar Financing Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple steps to get your solar system financed and installed
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-solar rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Choose Your System
                </h3>
                <p className="text-muted-foreground">
                  Select the solar package that meets your energy needs and budget requirements
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-solar rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Apply for Financing
                </h3>
                <p className="text-muted-foreground">
                  Submit your application to one of our partner financial institutions for approval
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-solar rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Get Installed
                </h3>
                <p className="text-muted-foreground">
                  Once approved, we'll schedule your professional installation and you start saving immediately
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-solar">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Solar Journey?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Contact us today to discuss financing options and get a personalized quote for your solar system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-white text-foreground hover:bg-white/90">
                <CreditCard className="w-5 h-5 mr-2" />
                Compare Financing Options
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-foreground hover:bg-white/90">
                Get Free Quote
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Financing;