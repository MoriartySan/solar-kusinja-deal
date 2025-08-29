import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Calculator, Users, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-solar rounded-lg flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-foreground">Collective Solar</div>
              <div className="text-xs text-muted-foreground">Malawi</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#packages" className="text-muted-foreground hover:text-foreground transition-colors">
              Solar Packages
            </a>
            <a href="#calculator" className="text-muted-foreground hover:text-foreground transition-colors">
              Savings Calculator
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Customer Stories
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            <Button variant="solar" size="sm">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Savings
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <nav className="py-4 space-y-2">
              <a 
                href="#packages" 
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Solar Packages
              </a>
              <a 
                href="#calculator" 
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                <Calculator className="w-4 h-4 inline mr-2" />
                Savings Calculator
              </a>
              <a 
                href="#testimonials" 
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Customer Stories
              </a>
              <a 
                href="#how-it-works" 
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                How It Works
              </a>
              <div className="px-4 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
                <Button variant="solar" size="sm" className="w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Savings
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;