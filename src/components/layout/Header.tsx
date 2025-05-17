import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  return (
    <header className="bg-background border-b border-border">
      <div className="container-wrapper py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-accent" />
          <span className="text-xl font-semibold tracking-tight">CelebrityCar</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link to="/gallery" className="text-foreground/80 hover:text-foreground transition-colors">
            Gallery
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isNavOpen && (
        <div className="md:hidden py-4 px-4 space-y-4 border-t border-border animate-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsNavOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsNavOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/gallery" 
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsNavOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              to="/about" 
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsNavOpen(false)}
            >
              About
            </Link>
          </nav>
          
          <div className="flex flex-col space-y-2 pt-2">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
}