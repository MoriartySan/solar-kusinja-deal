import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Calculator, Users, Phone, LogOut, Settings } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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
            <a href="/financing" className="text-muted-foreground hover:text-foreground transition-colors">
              Financing
            </a>
            <a href="/order-tracking" className="text-muted-foreground hover:text-foreground transition-colors">
              Track Order
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Customer Stories
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/installer-dashboard")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button 
                  variant="solar" 
                  size="sm"
                  onClick={() => navigate("/auth")}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Installer Login
                </Button>
              </>
            )}
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
                href="/financing" 
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                <Calculator className="w-4 h-4 inline mr-2" />
                Financing
              </a>
              <a 
                href="/order-tracking" 
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                <Calculator className="w-4 h-4 inline mr-2" />
                Track Order
              </a>
              <a 
                href="#testimonials" 
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Customer Stories
              </a>
              <div className="px-4 py-2 space-y-2">
                {user ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        navigate("/installer-dashboard");
                        toggleMenu();
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        handleSignOut();
                        toggleMenu();
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Us
                    </Button>
                    <Button 
                      variant="solar" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        navigate("/auth");
                        toggleMenu();
                      }}
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Installer Login
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;