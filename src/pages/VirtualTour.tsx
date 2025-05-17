import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Play, Pause, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { delay } from "@/lib/utils";

export default function VirtualTour() {
  const [tourProgress, setTourProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentView, setCurrentView] = useState("exterior");
  const [tourComplete, setTourComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // Simulate tour progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && tourProgress < 100) {
      interval = setInterval(() => {
        setTourProgress(prev => {
          const newProgress = prev + 0.5;
          if (newProgress >= 100) {
            setTourComplete(true);
            clearInterval(interval);
            return 100;
          }
          
          // Update tour step
          if (newProgress > 25 && currentStep === 0) {
            setCurrentStep(1);
          } else if (newProgress > 50 && currentStep === 1) {
            setCurrentStep(2);
            setCurrentView("interior");
          } else if (newProgress > 75 && currentStep === 2) {
            setCurrentStep(3);
          }
          
          return newProgress;
        });
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, tourProgress, currentStep]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTourProgress(currentStep === 1 ? 0 : currentStep === 2 ? 25 : 50);
      if (currentStep === 2) {
        setCurrentView("exterior");
      }
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setTourProgress(currentStep === 0 ? 25 : currentStep === 1 ? 50 : 75);
      if (currentStep === 1) {
        setCurrentView("interior");
      }
    }
  };

  const handleFinishTour = async () => {
    try {
      // Simulate API call to process the tour results
      await delay(1000);
      
      // Navigate to the video generation page
      navigate("/video");
    } catch (error) {
      console.error("Error finishing tour:", error);
    }
  };

  const TOUR_STEPS = [
    "Celebrity introduction",
    "Exterior tour",
    "Interior tour",
    "Feature demonstration"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container-wrapper py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link to="/cars">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          
          <div className="flex-1 max-w-md mx-4">
            <Progress value={tourProgress} className="h-2" />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container-wrapper py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={currentView} onValueChange={setCurrentView} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="exterior">Exterior View</TabsTrigger>
                <TabsTrigger value="interior">Interior View</TabsTrigger>
              </TabsList>
              <TabsContent value="exterior" className="mt-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted relative">
                  <img 
                    src="/img/cars/luxury-car-exterior.jpg" 
                    alt="Car Exterior" 
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isPlaying ? (
                      <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"></div>
                      </div>
                    ) : (
                      <Button 
                        size="lg"
                        className="rounded-full w-16 h-16 flex items-center justify-center"
                        onClick={togglePlayPause}
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Elegance S600</h3>
                        <p className="text-sm text-white/80">Touring with Alex Morgan</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white hover:text-white hover:bg-white/20"
                          onClick={handlePrevStep}
                          disabled={currentStep === 0}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white hover:text-white hover:bg-white/20"
                          onClick={handleNextStep}
                          disabled={currentStep === 3}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="interior" className="mt-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted relative">
                  <img 
                    src="/img/cars/luxury-car-interior.jpg" 
                    alt="Car Interior" 
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isPlaying ? (
                      <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"></div>
                      </div>
                    ) : (
                      <Button 
                        size="lg"
                        className="rounded-full w-16 h-16 flex items-center justify-center"
                        onClick={togglePlayPause}
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Elegance S600 Interior</h3>
                        <p className="text-sm text-white/80">Touring with Alex Morgan</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white hover:text-white hover:bg-white/20"
                          onClick={handlePrevStep}
                          disabled={currentStep === 0}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white hover:text-white hover:bg-white/20"
                          onClick={handleNextStep}
                          disabled={currentStep === 3}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-4 gap-2 mb-6">
              {TOUR_STEPS.map((step, index) => (
                <div 
                  key={index}
                  className={`p-2 rounded text-center text-xs cursor-pointer transition ${
                    currentStep === index 
                      ? "bg-primary text-primary-foreground" 
                      : index < currentStep 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted text-muted-foreground"
                  }`}
                  onClick={() => {
                    if (index <= Math.max(currentStep, Math.floor(tourProgress / 25))) {
                      setCurrentStep(index);
                      setTourProgress(index * 25);
                      if (index < 2) {
                        setCurrentView("exterior");
                      } else {
                        setCurrentView("interior");
                      }
                    }
                  }}
                >
                  {step}
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                {currentStep === 0 ? "Introduction" : 
                 currentStep === 1 ? "Exterior Tour" : 
                 currentStep === 2 ? "Interior Tour" : 
                 "Feature Highlights"}
              </h2>
              
              <Card className="p-4 bg-muted/50">
                <div className="flex items-start gap-4">
                  <img 
                    src="/img/cars/celebrity.jpg" 
                    alt="Celebrity Guide" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium mb-1">Alex Morgan</p>
                    <p className="text-muted-foreground">
                      {currentStep === 0 ? 
                        "Welcome to your personalized tour of the Elegance S600! I'm excited to show you all the amazing features of this luxury sedan today." : 
                      currentStep === 1 ? 
                        "Let's take a look at the exterior design. Notice the sleek lines and premium LED lighting. The S600 features a panoramic sunroof and 21-inch premium alloy wheels." : 
                      currentStep === 2 ? 
                        "The interior is where the S600 truly shines. Hand-stitched leather seats with heating, cooling, and massage functions. The cockpit is designed with the driver in mind." : 
                      "Some key features include the advanced driver assistance system, 22-speaker premium sound system, and ambient lighting with 64 colors to choose from."}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Tour Progress</h3>
                <div className="space-y-3">
                  {TOUR_STEPS.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        index < currentStep 
                          ? "bg-green-500 text-white" 
                          : index === currentStep 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {index < currentStep ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          index <= currentStep ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="text-xl font-semibold">Vehicle Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-medium">Elegance S600</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">Luxury Sedan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engine</span>
                    <span className="font-medium">4.0L V8 Biturbo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horsepower</span>
                    <span className="font-medium">496 hp</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">0-60 mph</span>
                    <span className="font-medium">4.3 seconds</span>
                  </div>
                </div>
              </div>
              
              {tourComplete && (
                <div className="pt-6 border-t border-border">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleFinishTour}
                  >
                    Generate Your Video
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Create a personalized video of you and the celebrity in this car.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}