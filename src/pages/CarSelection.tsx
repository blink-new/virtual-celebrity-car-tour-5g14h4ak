import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";
import { delay } from "@/lib/utils";

interface Car {
  id: string;
  name: string;
  type: string;
  description: string;
  rating: number;
  exteriorImage: string;
  interiorImage: string;
  category: "luxury" | "sports" | "electric";
}

const CARS: Car[] = [
  {
    id: "car1",
    name: "Elegance S600",
    type: "Luxury Sedan",
    description: "Experience unparalleled luxury with the S600. Features handcrafted interior with premium materials.",
    rating: 4.9,
    exteriorImage: "/img/cars/luxury-car-exterior.jpg",
    interiorImage: "/img/cars/luxury-car-interior.jpg",
    category: "luxury",
  },
  {
    id: "car2",
    name: "Velocity GT",
    type: "Sports Coupe",
    description: "Feel the adrenaline with this high-performance sports car. From 0 to 60 mph in just 3.2 seconds.",
    rating: 4.8,
    exteriorImage: "/img/cars/luxury-car-exterior.jpg",
    interiorImage: "/img/cars/luxury-car-interior.jpg",
    category: "sports",
  },
  {
    id: "car3",
    name: "Aurora EV",
    type: "Electric Sedan",
    description: "The future of driving is here. 400 miles range with luxurious features and zero emissions.",
    rating: 4.7,
    exteriorImage: "/img/cars/luxury-car-exterior.jpg",
    interiorImage: "/img/cars/luxury-car-interior.jpg",
    category: "electric",
  },
  {
    id: "car4",
    name: "Royal SUV",
    type: "Luxury SUV",
    description: "Dominate the road with this premium SUV featuring spacious interior and advanced safety features.",
    rating: 4.9,
    exteriorImage: "/img/cars/luxury-car-exterior.jpg",
    interiorImage: "/img/cars/luxury-car-interior.jpg",
    category: "luxury",
  },
];

export default function CarSelection() {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const navigate = useNavigate();

  const filteredCars = activeTab === "all" 
    ? CARS 
    : CARS.filter(car => car.category === activeTab);

  const handleContinue = async () => {
    if (!selectedCar) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to set the car
      await delay(1500);
      
      // Navigate to the tour experience
      navigate("/tour");
    } catch (error) {
      console.error("Error selecting car:", error);
      alert("Failed to select car");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container-wrapper">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-4"
            >
              <Link to="/celebrities">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Celebrity Selection
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">Select a Car for Your Tour</h1>
            <p className="text-muted-foreground">
              Choose a luxury vehicle for your virtual tour experience with the celebrity.
            </p>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Cars</TabsTrigger>
                <TabsTrigger value="luxury">Luxury</TabsTrigger>
                <TabsTrigger value="sports">Sports</TabsTrigger>
                <TabsTrigger value="electric">Electric</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCars.map((car) => (
                  <Card 
                    key={car.id}
                    className={`overflow-hidden transition-all cursor-pointer hover:shadow-md ${
                      selectedCar === car.id
                        ? "ring-2 ring-primary ring-offset-2"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedCar(car.id)}
                  >
                    <div className="grid grid-cols-5">
                      <div className="col-span-3">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                            src={car.exteriorImage}
                            alt={car.name}
                            className="w-full h-full object-cover"
                          />
                          
                          {selectedCar === car.id && (
                            <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1.5">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-span-2 border-l border-border">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                            src={car.interiorImage}
                            alt={`${car.name} Interior`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                          <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 rounded px-2 py-0.5">
                            Interior View
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{car.name}</h3>
                          <p className="text-muted-foreground text-sm">{car.type}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-sm">{car.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {car.description}
                      </p>
                      
                      <div className="flex items-center text-xs space-x-2">
                        <span className="bg-accent/10 text-accent-foreground px-2 py-0.5 rounded-full">
                          {car.category === "luxury" ? "Premium Luxury" : 
                            car.category === "sports" ? "High Performance" : "Eco Friendly"}
                        </span>
                        <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          360° Tour Available
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredCars.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No cars found in this category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/celebrities">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            
            <Button
              onClick={handleContinue}
              disabled={!selectedCar || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Preparing Tour...
                </>
              ) : (
                <>
                  Start Tour
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}