import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Download, Share2, Facebook, Twitter, Linkedin, Mail, Copy, ArrowLeft } from "lucide-react";
import { delay } from "@/lib/utils";

const PROCESSING_STEPS = [
  "Initializing video generation",
  "Processing avatar integration",
  "Rendering celebrity interactions",
  "Adding vehicle environment",
  "Applying visual effects",
  "Generating final output",
];

export default function VideoGeneration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Simulate video generation progress
  useEffect(() => {
    const simulateProgress = async () => {
      for (let i = 0; i < PROCESSING_STEPS.length; i++) {
        setCurrentStep(i);
        
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
      setIsComplete(true);
      setVideoUrl("/img/cars/luxury-car-exterior.jpg"); // In a real app, this would be a video URL
    };
    
    simulateProgress();
  }, []);

  const handleCopyLink = () => {
    // In a real app, you would copy a shareable URL to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
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
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Current progress:</h3>
                    <div className="space-y-3">
                      {PROCESSING_STEPS.map((step, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center p-3 rounded-md ${
                            currentStep === index 
                              ? "bg-primary/10 border border-primary/20" 
                              : index < currentStep 
                                ? "bg-muted" 
                                : "bg-muted opacity-50"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            currentStep > index 
                              ? "bg-green-500 text-white" 
                              : currentStep === index 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted-foreground/30 text-muted-foreground"
                          }`}>
                            {currentStep > index ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <span className={currentStep >= index ? "text-foreground" : "text-muted-foreground"}>
                            {step}
                          </span>
                          
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
                        </div>
                      ))}
                    </div>
                  </div>
                  
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
                    <Button size="lg" className="rounded-full w-16 h-16 flex items-center justify-center">
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
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Celebrity Car Tour with You</h3>
                      <p className="text-muted-foreground">
                        A personalized tour of the Elegance S600 with Alex Morgan featuring your avatar.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button className="w-full flex items-center justify-center gap-2">
                        <Download className="h-4 w-4" />
                        Download Video
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
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
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Share on social media:</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Facebook className="h-4 w-4" />
                          Facebook
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          More
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-center pt-4 border-t border-border">
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
              By using this service, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}