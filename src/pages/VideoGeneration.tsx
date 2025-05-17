import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Check, Download, Share2, Facebook, Twitter, Linkedin, Mail, Copy, 
  ArrowLeft, Film, Video, Image, Disc, SlidersHorizontal, Sparkles
} from "lucide-react";
import { delay } from "@/lib/utils";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const PROCESSING_STEPS = [
  { 
    id: "init", 
    name: "Initializing video generation",
    icon: <Film className="h-4 w-4" />,
    description: "Setting up the video generation pipeline..."
  },
  { 
    id: "avatar", 
    name: "Processing avatar integration",
    icon: <Image className="h-4 w-4" />,
    description: "Preparing your personalized avatar for the video..."
  },
  { 
    id: "celebrity", 
    name: "Rendering celebrity interactions",
    icon: <Video className="h-4 w-4" />,
    description: "Creating natural interactions with the celebrity guide..."
  },
  { 
    id: "environment", 
    name: "Adding vehicle environment",
    icon: <Disc className="h-4 w-4" />,
    description: "Placing your avatar and celebrity in the luxury car setting..."
  },
  { 
    id: "effects", 
    name: "Applying visual effects",
    icon: <SlidersHorizontal className="h-4 w-4" />,
    description: "Enhancing the video with professional visual effects..."
  },
  { 
    id: "final", 
    name: "Generating final output",
    icon: <Sparkles className="h-4 w-4" />,
    description: "Producing your personalized high-quality video..."
  },
];

export default function VideoGeneration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);
  const navigate = useNavigate();

  // Simulate video generation progress
  useEffect(() => {
    const simulateProgress = async () => {
      for (let i = 0; i < PROCESSING_STEPS.length; i++) {
        setCurrentStep(i);
        
        // Show toast for each new step
        if (i > 0) {
          toast.success(`${PROCESSING_STEPS[i-1].name} completed!`);
        }
        
        // Each step takes some time and contributes to overall progress
        const stepDuration = 1000 + Math.random() * 2000; // 1-3 seconds per step
        const startProgress = (i / PROCESSING_STEPS.length) * 100;
        const endProgress = ((i + 1) / PROCESSING_STEPS.length) * 100;
        const increment = (endProgress - startProgress) / 10;
        
        for (let j = 0; j < 10; j++) {
          await delay(stepDuration / 10);
          setProgress(prev => Math.min(prev + increment, endProgress));
        }
      }
      
      // Video generation complete
      await delay(500);
      setIsComplete(true);
      setVideoUrl("/img/cars/luxury-car-exterior.jpg"); // In a real app, this would be a video URL
      toast.success("Your personalized video is ready!");
    };
    
    simulateProgress();
  }, []);

  const handleCopyLink = () => {
    // In a real app, you would copy a shareable URL to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopySuccess(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
        toast.error("Failed to copy link");
      });
  };

  const handleShare = (platform: string) => {
    setLoadingShare(true);
    
    // Simulate sharing delay
    setTimeout(() => {
      toast.success(`Shared to ${platform}!`);
      setLoadingShare(false);
    }, 1000);
  };

  const handleDownload = () => {
    toast.success("Downloading your video...");
  };

  const handleContinueToShare = () => {
    navigate("/share");
  };

  // Calculate the video generation ETA
  const calculateETA = () => {
    const remainingSteps = PROCESSING_STEPS.length - currentStep;
    const avgStepTime = 2; // Average time per step in seconds
    return remainingSteps * avgStepTime;
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container-wrapper">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-4"
            >
              <Link to="/tour">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tour
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">
              {isComplete ? "Your Video Is Ready!" : "Generating Your Video"}
            </h1>
            <p className="text-muted-foreground">
              {isComplete 
                ? "Your personalized celebrity car tour video has been created. You can now download and share it with friends and family."
                : "Please wait while we create your personalized video experience with the celebrity and luxury car."}
            </p>
          </div>
          
          <Card className="shadow-lg overflow-hidden">
            {!isComplete ? (
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Processing video</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    <p className="text-center text-xs text-muted-foreground mt-2">
                      Estimated time remaining: {calculateETA()} seconds
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Generation progress:</h3>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>Step</span>
                        <span className="font-medium">{currentStep + 1}</span>
                        <span>of</span>
                        <span className="font-medium">{PROCESSING_STEPS.length}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {PROCESSING_STEPS.map((step, index) => (
                        <motion.div 
                          key={index} 
                          className={`flex items-center p-3 rounded-md transition-all ${ 
                            currentStep === index 
                              ? "bg-primary/10 border border-primary/20" 
                              : index < currentStep 
                                ? "bg-muted" 
                                : "bg-muted opacity-50"
                          }`}
                          initial={{ y: 5, opacity: 0.8 }}
                          animate={{ 
                            y: 0, 
                            opacity: currentStep >= index ? 1 : 0.6 
                          }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 ${ 
                            currentStep > index 
                              ? "bg-green-500 text-white" 
                              : currentStep === index 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted-foreground/30 text-muted-foreground"
                          }`}>
                            {currentStep > index ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              step.icon
                            )}
                          </div>
                          
                          <div className="flex-1 overflow-hidden">
                            <div className={`font-medium ${currentStep >= index ? "text-foreground" : "text-muted-foreground"}`}>
                              {step.name}
                            </div>
                            {(currentStep === index || currentStep > index) && (
                              <p className="text-xs text-muted-foreground truncate">
                                {step.description}
                              </p>
                            )}
                          </div>
                          
                          {currentStep === index && (
                            <div className="ml-auto">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"></div>
                            </div>
                          )}
                          
                          {currentStep > index && (
                            <div className="ml-auto text-green-500">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mini video preview during generation */}
                  {progress > 30 && (
                    <div className="rounded-lg overflow-hidden border border-border bg-card/50 p-4">
                      <div className="text-sm font-medium mb-2 flex items-center">
                        <Film className="h-4 w-4 mr-2 text-primary" />
                        <span>Preview</span>
                      </div>
                      <div className="aspect-video rounded bg-muted/50 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-pulse text-xs text-muted-foreground">
                            Video preview generating...
                          </div>
                        </div>
                        
                        {progress > 60 && (
                          <img 
                            src="/img/cars/luxury-car-exterior.jpg" 
                            alt="Video preview" 
                            className="w-full h-full object-cover opacity-50"
                            style={{ 
                              filter: "blur(3px)",
                              opacity: (progress - 60) / 40
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>This process typically takes 2-3 minutes. Please don't close this page.</p>
                  </div>
                </div>
              </CardContent>
            ) : (
              <div>
                <div className="aspect-video bg-muted relative">
                  {videoUrl && (
                    <img 
                      src={videoUrl} 
                      alt="Your tour video" 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="rounded-full w-16 h-16 flex items-center justify-center"
                      onClick={() => toast.success("Video playback started!")}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold">Celebrity Car Tour with You</h3>
                    <p className="text-white/70 text-sm">Elegance S600 with Alex Morgan</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Your Personalized Video</h3>
                      <p className="text-muted-foreground">
                        Your tour of the Elegance S600 with Alex Morgan has been transformed into an exclusive personalized video. Download or share it with your friends and family!
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button 
                        className="w-full flex items-center justify-center gap-2"
                        size="lg"
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4" />
                        Download Video
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
                        size="lg"
                        onClick={handleCopyLink}
                      >
                        {copySuccess ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy Link
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium">Share on social media:</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-center gap-1"
                          disabled={loadingShare}
                          onClick={() => handleShare("Facebook")}
                        >
                          <Facebook className="h-4 w-4 text-blue-600" />
                          <span className="truncate">Facebook</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-center gap-1"
                          disabled={loadingShare}
                          onClick={() => handleShare("Twitter")}
                        >
                          <Twitter className="h-4 w-4 text-sky-500" />
                          <span className="truncate">Twitter</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-center gap-1"
                          disabled={loadingShare}
                          onClick={() => handleShare("LinkedIn")}
                        >
                          <Linkedin className="h-4 w-4 text-blue-700" />
                          <span className="truncate">LinkedIn</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-center gap-1"
                          disabled={loadingShare}
                          onClick={() => handleShare("Email")}
                        >
                          <Mail className="h-4 w-4" />
                          <span className="truncate">Email</span>
                        </Button>
                      </div>
                      
                      <Button 
                        className="w-full mt-2" 
                        onClick={handleContinueToShare}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        More Sharing Options
                      </Button>
                    </div>
                    
                    <div className="text-center pt-6 border-t border-border">
                      <p className="text-muted-foreground mb-4">Want to try another car or celebrity?</p>
                      <Button asChild>
                        <Link to="/celebrities">
                          Create New Tour
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            )}
          </Card>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              {isComplete 
                ? "Thank you for using our virtual celebrity car tour service!"
                : "By using this service, you agree to our Terms of Service and Privacy Policy."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}