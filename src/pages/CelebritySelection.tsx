import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Star, Check } from "lucide-react";
import { delay } from "@/lib/utils";

interface Celebrity {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
}

const CELEBRITIES: Celebrity[] = [
  {
    id: "cel1",
    name: "Alex Morgan",
    specialty: "Sports Cars",
    rating: 4.9,
    image: "/img/cars/celebrity.jpg",
  },
  {
    id: "cel2",
    name: "James Wilson",
    specialty: "Luxury Sedans",
    rating: 4.8,
    image: "/img/cars/celebrity.jpg",
  },
  {
    id: "cel3",
    name: "Emma Rodriguez",
    specialty: "SUVs & Off-Road",
    rating: 4.7,
    image: "/img/cars/celebrity.jpg",
  },
  {
    id: "cel4",
    name: "Michael Chen",
    specialty: "Electric Vehicles",
    rating: 4.9,
    image: "/img/cars/celebrity.jpg",
  },
];

export default function CelebritySelection() {
  const [selectedCelebrity, setSelectedCelebrity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!selectedCelebrity) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to set the celebrity
      await delay(1500);
      
      // Navigate to the car selection page
      navigate("/cars");
    } catch (error) {
      console.error("Error selecting celebrity:", error);
      alert("Failed to select celebrity");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container-wrapper">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-4"
            >
              <Link to="/upload">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Avatar Creation
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">Choose Your Celebrity Guide</h1>
            <p className="text-muted-foreground">
              Select a celebrity to guide you through your virtual car tour experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {CELEBRITIES.map((celebrity) => (
              <Card 
                key={celebrity.id}
                className={`overflow-hidden transition-all cursor-pointer hover:shadow-md ${
                  selectedCelebrity === celebrity.id
                    ? "ring-2 ring-primary ring-offset-2"
                    : "border-border"
                }`}
                onClick={() => setSelectedCelebrity(celebrity.id)}
              >
                <div className="relative">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={celebrity.image}
                      alt={celebrity.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {selectedCelebrity === celebrity.id && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1.5">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{celebrity.name}</h3>
                        <p className="text-muted-foreground text-sm">{celebrity.specialty}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm">{celebrity.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      Expert in {celebrity.specialty} with thousands of positive reviews from users.
                    </p>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="bg-accent/10 text-accent-foreground px-2 py-0.5 rounded-full">
                        AI Generated
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/upload">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            
            <Button
              onClick={handleContinue}
              disabled={!selectedCelebrity || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              All celebrities are AI-generated and not real individuals.
              Any resemblance to actual persons is coincidental.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}