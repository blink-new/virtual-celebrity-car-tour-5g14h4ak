import { useState, useRef, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { fileToDataUrl, delay } from "@/lib/utils";
import { ArrowLeft, Upload, Camera, Trash2, Check } from "lucide-react";

export default function PhotoUpload() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setPhoto(dataUrl);
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Failed to read the image file");
    }
  };

  const handleUpload = async () => {
    if (!photo) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to process the image
      await delay(2000);
      
      // Simulate avatar creation completion
      setIsUploaded(true);
      setAvatarPreview(photo); // In a real app, this would be the processed avatar
      
      await delay(1500);
      
      // Navigate to the next step
      navigate("/celebrities");
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload the photo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetake = () => {
    setPhoto(null);
    setIsUploaded(false);
    setAvatarPreview(null);
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
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Upload className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Upload Your Photo</h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                          For best results, use a clear front-facing portrait with good lighting and a neutral background.
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
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Browse Files
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={handleCameraCapture}
                            className="flex items-center"
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Use Camera
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Your Photo</h3>
                      {!isUploaded && (
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
                            <div className="text-center p-4">
                              {isLoading ? (
                                <div className="space-y-2">
                                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
                                  <p className="text-sm">Processing your avatar...</p>
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
                    
                    {!isUploaded && (
                      <div className="flex justify-end">
                        <Button
                          onClick={handleUpload}
                          disabled={isLoading}
                          className="w-full sm:w-auto"
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
                          <Button asChild>
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