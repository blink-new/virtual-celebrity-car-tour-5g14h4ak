import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Download, Share2, Save } from "lucide-react";
import { delay } from "@/lib/utils";

export default function VideoGeneration() {
  const [generationProgress, setGenerationProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  // Simulate video generation process
  useEffect(() => {
    const generateVideo = async () => {
      // Start progress animation
      const interval = setInterval(() => {
        setGenerationProgress((prev) => {
          const newProgress = prev + 0.5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      // Simulate API call to generate video
      await delay(10000); // 10 seconds
      
      // Video generation complete
      clearInterval(interval);
      setGenerationProgress(100);
      setVideoReady(true);
      setVideoUrl("/img/cars/luxury-car-exterior.jpg"); // Placeholder for actual video
    };

    generateVideo();

    return () => {};
  }, []);

  const handleShare = () => {
    navigate("/share");
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
            
            <h1 className="text-3xl font-bold mb-2">Creating Your Experience</h1>
            <p className="text-muted-foreground">
              We're generating your personalized video with the celebrity. This may take a few moments.
            </p>
          </div>
          
          <Card className="overflow-hidden shadow-lg mb-8">
            <CardContent className="p-0">
              <div className="aspect-video relative bg-black flex items-center justify-center overflow-hidden">
                {videoReady ? (
                  <>
                    <img 
                      src={videoUrl || "/img/cars/luxury-car-exterior.jpg"} 
                      alt="Generated video preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Button size="lg" className="rounded-full w-16 h-16 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-white p-6 max-w-md">
                    <div className="mb-6">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4 mx-auto"></div>
                      <h3 className="text-xl font-semibold mb-2">Generating Your Video</h3>
                      <p className="text-white/80 mb-4">
                        We're creating a unique experience with you and your selected celebrity in the luxury car.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{Math.round(generationProgress)}%</span>
                      </div>
                      <Progress value={generationProgress} className="h-1.5" />
                      <p className="text-xs text-white/60 text-center mt-2">
                        {generationProgress < 30 
                          ? "Processing your avatar..." 
                          : generationProgress < 60 
                            ? "Creating the scene with the celebrity..." 
                            : generationProgress < 90 
                              ? "Adding special effects and environment..." 
                              : "Finalizing your video..."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            {videoReady && (
              <div className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <img 
                    src="/img/cars/celebrity.jpg" 
                    alt="Celebrity" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium mb-1">Your video with Alex Morgan is ready!</p>
                    <p className="text-muted-foreground text-sm">
                      Experience your virtual ride in the Elegance S600 with Alex Morgan.
                      This personalized video is ready to be downloaded and shared with your friends and family.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Video
                  </Button>
                  <Button variant="outline" className="flex items-center" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save to Account
                  </Button>
                </div>
              </div>
            )}
          </Card>
          
          {videoReady && (
            <div className="space-y-6">
              <div className="border-t border-border pt-6">
                <h2 className="text-xl font-semibold mb-4">About Your Video</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Celebrity</span>
                      <span className="font-medium">Alex Morgan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vehicle</span>
                      <span className="font-medium">Elegance S600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">02:48</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created On</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resolution</span>
                      <span className="font-medium">1080p HD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format</span>
                      <span className="font-medium">MP4</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Want to create more videos with different celebrities and cars?
                </p>
                <Button asChild>
                  <Link to="/upload">
                    Create Another Video <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground text-center">
            <p>
              This video is for personal use only. CelebrityCar does not claim any rights to celebrity likeness beyond the scope of this application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}