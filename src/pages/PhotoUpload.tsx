import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { fileToDataUrl, delay } from "@/lib/utils";
import { ArrowLeft, Upload, Camera, Trash2, Check, AlertCircle, Image } from "lucide-react";
import toast from "react-hot-toast";

export default function PhotoUpload() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [processProgress, setProcessProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Reset error when photo changes
  useEffect(() => {
    if (photo) {
      setErrorMessage(null);
    }
  }, [photo]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload an image file (JPEG, PNG, etc.)");
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size should be less than 5MB");
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setPhoto(dataUrl);
      toast.success("Photo uploaded successfully!");
    } catch (error) {
      console.error("Error reading file:", error);
      setErrorMessage("Failed to read the image file");
      toast.error("Failed to read the image file");
    }
  };

  const handleUpload = async () => {
    if (!photo) return;
    
    setIsLoading(true);
    setProcessProgress(0);
    
    try {
      // Simulate multi-stage processing with progress
      const stages = [
        "Analyzing facial features...",
        "Creating 3D model...",
        "Applying texture mapping...",
        "Optimizing avatar...",
        "Final adjustments..."
      ];

      for (let i = 0; i < stages.length; i++) {
        setProcessingStage(stages[i]);
        const startProgress = (i / stages.length) * 100;
        const endProgress = ((i + 1) / stages.length) * 100;
        
        // Simulate processing with incremental progress updates
        for (let j = 0; j < 10; j++) {
          await delay(200);
          const increment = (endProgress - startProgress) / 10;
          setProcessProgress(prev => Math.min(prev + increment, endProgress));
        }
      }
      
      // Simulate avatar creation completion
      setIsUploaded(true);
      setAvatarPreview(photo); // In a real app, this would be the processed avatar
      toast.success("Avatar created successfully!");
      
      await delay(1000);
      
      // Navigate to the next step
      navigate("/celebrities");
    } catch (error) {
      console.error("Error uploading photo:", error);
      setErrorMessage("Failed to process your photo");
      toast.error("Failed to process your photo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetake = () => {
    setPhoto(null);
    setIsUploaded(false);
    setAvatarPreview(null);
    setProcessProgress(0);
    setProcessingStage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container-wrapper">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-4"
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">Create Your Avatar</h1>
            <p className="text-muted-foreground">
              Upload a photo of yourself to create your personalized avatar for the virtual car tour.
            </p>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-8">
                {!photo ? (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="p-6 bg-primary/10 rounded-full">
                        <Upload className="h-12 w-12 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                          For best results, use a clear front-facing portrait with good lighting and a neutral background.
                          The system works best with photos where your face is clearly visible.
                        </p>
                        
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center"
                            size="lg"
                          >
                            <Image className="h-4 w-4 mr-2" />
                            Select Photo
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={handleCameraCapture}
                            className="flex items-center"
                            size="lg"
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Use Camera
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                      <div className="p-4 bg-muted rounded-lg text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Check className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="font-medium mb-1">Clear Face</h4>
                        <p className="text-xs text-muted-foreground">
                          Make sure your face is clearly visible and well-lit
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Check className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="font-medium mb-1">Neutral Expression</h4>
                        <p className="text-xs text-muted-foreground">
                          A neutral or slight smile works best for avatar creation
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Check className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="font-medium mb-1">Simple Background</h4>
                        <p className="text-xs text-muted-foreground">
                          A plain background helps our AI focus on your features
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Your Photo</h3>
                      {!isUploaded && !isLoading && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRetake}
                          className="text-muted-foreground flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Retake
                        </Button>
                      )}
                    </div>
                    
                    {errorMessage && (
                      <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-md p-3 flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Photo Upload Issue</p>
                          <p className="text-sm">{errorMessage}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="mb-2 block">Original Photo</Label>
                        <div className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                          <img
                            src={photo}
                            alt="Your uploaded photo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Avatar Preview</Label>
                        <div className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                          {avatarPreview ? (
                            <div className="relative w-full h-full">
                              <img
                                src={avatarPreview}
                                alt="Your avatar preview"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                <Check className="h-4 w-4" />
                              </div>
                            </div>
                          ) : (
                            <div className="text-center p-4 w-full">
                              {isLoading ? (
                                <div className="space-y-4">
                                  <Progress value={processProgress} className="w-full h-2" />
                                  <p className="text-sm font-medium">{processingStage}</p>
                                  <p className="text-xs text-muted-foreground">
                                    This may take a few moments...
                                  </p>
                                </div>
                              ) : (
                                <p className="text-muted-foreground text-sm">
                                  Click "Process Photo" to generate your avatar
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {!isUploaded && !isLoading && (
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg text-sm">
                          <p className="font-medium mb-2">Before processing, please ensure:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Your face is clearly visible in the photo</li>
                            <li>The photo has good lighting conditions</li>
                            <li>You're looking directly at the camera</li>
                          </ul>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button
                            onClick={handleUpload}
                            disabled={isLoading}
                            className="w-full sm:w-auto"
                            size="lg"
                          >
                            {isLoading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Processing...
                              </>
                            ) : (
                              <>Process Photo</>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {isUploaded && (
                      <div className="space-y-4">
                        <Separator />
                        <div className="text-center">
                          <p className="text-green-600 font-medium flex items-center justify-center mb-2">
                            <Check className="h-4 w-4 mr-2" />
                            Avatar created successfully!
                          </p>
                          <p className="text-muted-foreground text-sm mb-4">
                            Your avatar is ready for the virtual car tour with a celebrity.
                          </p>
                          <Button asChild size="lg">
                            <Link to="/celebrities">Continue to Select Celebrity</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground pt-4 border-t border-border space-y-2">
                  <p>
                    <strong>Privacy Notice:</strong> Your photo will only be used to create your avatar for this virtual tour experience.
                  </p>
                  <p>
                    We do not store or share your original photos. Your privacy is important to us.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}