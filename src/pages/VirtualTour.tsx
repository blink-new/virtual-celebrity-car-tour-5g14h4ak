import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, ArrowRight, Play, Pause, Camera, 
  ChevronLeft, ChevronRight, Fullscreen, Grid3X3
} from "lucide-react";
import { delay } from "@/lib/utils";
import Car3DView from "@/components/tour/Car3DView";
import AvatarInteraction from "@/components/tour/AvatarInteraction";
import toast from "react-hot-toast";

// Mock data - in a real app, this would come from the application state
const CAR_DATA = {
  id: "car1",
  name: "Elegance S600",
  type: "Luxury Sedan",
  engine: "4.0L V8 Biturbo",
  horsepower: "496 hp",
  acceleration: "4.3 seconds",
  exteriorImage: "/img/cars/luxury-car-exterior.jpg",
  interiorImage: "/img/cars/luxury-car-interior.jpg",
};

const CELEBRITY_DATA = {
  id: "cel1",
  name: "Alex Morgan",
  specialty: "Sports Cars",
  rating: 4.9,
  image: "/img/cars/celebrity.jpg",
};

export default function VirtualTour() {
  const [tourProgress, setTourProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentView, setCurrentView] = useState("exterior");
  const [tourComplete, setTourComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showInteraction, setShowInteraction] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<"normal" | "3d" | "interaction">("normal");
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const navigate = useNavigate();

  // On first load, simulate loading avatar from previous steps
  useEffect(() => {
    const getAvatar = async () => {
      await delay(1000);
      // In a real app, this would be retrieved from state or context
      // Here we're just using a placeholder
      setAvatarImage("/img/cars/celebrity.jpg");
    };
    
    getAvatar();
  }, []);

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
          
          // Show interaction at specific point
          if (newProgress > 30 && newProgress < 32) {
            setShowInteraction(true);
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
    
    if (isPlaying) {
      toast.success("Tour paused. Take your time to explore!");
    } else {
      toast.success("Tour resumed!");
    }
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);

    // In a real app, we would implement proper fullscreen API
    if (!isFullscreen) {
      toast.success("Fullscreen mode activated for better viewing!");
    } else {
      toast.success("Exited fullscreen mode");
    }
  };

  const toggleViewMode = () => {
    if (viewMode === "normal") {
      setViewMode("3d");
      toast.success("Switched to 3D View");
    } else if (viewMode === "3d") {
      setViewMode("interaction");
      toast.success("Avatar interaction mode enabled");
    } else {
      setViewMode("normal");
      toast.success("Switched to normal view");
    }
  };

  const handleFinishTour = async () => {
    try {
      toast.success("Preparing your personalized video...");
      
      // Simulate API call to process the tour results
      await delay(1000);
      
      // Navigate to the video generation page
      navigate("/video");
    } catch (error) {
      console.error("Error finishing tour:", error);
      toast.error("Error preparing video");
    }
  };

  const handleInteractionComplete = () => {
    setShowInteraction(false);
    toast.success("Great conversation! Let's continue with the tour.");
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
              onClick={toggleFullscreen}
            >
              <Fullscreen className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleViewMode}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container-wrapper py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {viewMode === "interaction" && (
              <div className="mb-6">
                <AvatarInteraction 
                  avatar={avatarImage || ""}
                  celebrity={CELEBRITY_DATA} 
                  onInteractionComplete={handleInteractionComplete}
                />
              </div>
            )}
            
            {viewMode === "3d" ? (
              <div className="aspect-video mb-6">
                <Car3DView />
              </div>
            ) : (
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
                          <h3 className="font-semibold">{CAR_DATA.name}</h3>
                          <p className="text-sm text-white/80">Touring with {CELEBRITY_DATA.name}</p>
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
                          <h3 className="font-semibold">{CAR_DATA.name} Interior</h3>
                          <p className="text-sm text-white/80">Touring with {CELEBRITY_DATA.name}</p>
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
            )}
            
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
                    src={CELEBRITY_DATA.image}
                    alt="Celebrity Guide" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium mb-1">{CELEBRITY_DATA.name}</p>
                    <p className="text-muted-foreground">
                      {currentStep === 0 ? 
                        "Welcome to your personalized tour of the Elegance S600! I'm excited to show you all the amazing features of this luxury sedan today. This vehicle represents the pinnacle of automotive engineering and luxury." : 
                      currentStep === 1 ? 
                        "Let's take a look at the exterior design. Notice the sleek lines and premium LED lighting. The S600 features a panoramic sunroof and 21-inch premium alloy wheels. The aerodynamic design isn't just for show - it improves fuel efficiency and reduces wind noise at high speeds." : 
                      currentStep === 2 ? 
                        "The interior is where the S600 truly shines. Hand-stitched leather seats with heating, cooling, and massage functions. The cockpit is designed with the driver in mind, with an intuitive layout and premium materials throughout. Notice the real wood accents and ambient lighting system." : 
                      "Some key features include the advanced driver assistance system with level 3 autonomous driving capabilities, 22-speaker premium sound system, and ambient lighting with 64 colors to choose from. The augmented reality navigation overlay is particularly impressive."}
                    </p>
                    
                    {viewMode === "normal" && currentStep !== 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setViewMode("interaction")}
                      >
                        Ask a question
                      </Button>
                    )}
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
                
                <div className="pt-2">
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${tourProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>{Math.round(tourProgress)}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="text-xl font-semibold">Vehicle Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-medium">{CAR_DATA.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{CAR_DATA.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engine</span>
                    <span className="font-medium">{CAR_DATA.engine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horsepower</span>
                    <span className="font-medium">{CAR_DATA.horsepower}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">0-60 mph</span>
                    <span className="font-medium">{CAR_DATA.acceleration}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setViewMode("3d")}
                  >
                    View in 3D
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setViewMode("interaction")}
                  >
                    Ask Questions
                  </Button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                    <img 
                      src={avatarImage || "/img/cars/celebrity.jpg"}
                      alt="Your avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Your Avatar</p>
                    <p className="text-sm text-muted-foreground">
                      Touring with {CELEBRITY_DATA.name}
                    </p>
                  </div>
                </div>
                
                {tourComplete && (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleFinishTour}
                  >
                    Generate Your Video
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                
                {!tourComplete && (
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Complete the tour to create your personalized video</p>
                    <p className="text-xs mt-1">{Math.round(100 - tourProgress)}% remaining</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}