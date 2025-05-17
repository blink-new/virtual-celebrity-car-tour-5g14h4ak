import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Share2, Facebook, Twitter, Linkedin, Instagram, Mail, Check, Download } from "lucide-react";
import { delay } from "@/lib/utils";
import toast from "react-hot-toast";

export default function VideoShare() {
  const [videoUrl, setVideoUrl] = useState<string>("/img/cars/luxury-car-exterior.jpg"); // This would be a real video URL in production
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [activeTab, setActiveTab] = useState("social");

  useEffect(() => {
    // Generate a shareable URL (in a real app, this would be a unique URL from the backend)
    const generateShareableUrl = async () => {
      await delay(500);
      const baseUrl = window.location.origin;
      const uniqueId = Math.random().toString(36).substring(2, 12);
      setShareUrl(`${baseUrl}/shared-tour/${uniqueId}`);
    };

    generateShareableUrl();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
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
    // In a real app, this would open a share dialog for the respective platform
    console.log(`Sharing to ${platform}`);
    
    // Simulate successful share
    setShareCount(prev => prev + 1);
    toast.success(`Shared to ${platform}!`);
  };

  const handleEmailShare = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the email
    toast.success("Share email sent!");
    setShareCount(prev => prev + 1);
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
              <Link to="/video">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Video
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">Share Your Experience</h1>
            <p className="text-muted-foreground">
              Share your personalized celebrity car tour video with friends and family.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img 
                    src={videoUrl} 
                    alt="Your tour video" 
                    className="w-full h-full object-cover"
                  />
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
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Celebrity Car Tour with You</h3>
                      <p className="text-sm text-muted-foreground">
                        Elegance S600 with Alex Morgan
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <img 
                      src="/img/cars/celebrity.jpg" 
                      alt="Your avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">Your Tour Summary</p>
                    <p className="text-muted-foreground text-sm mb-2">
                      You toured the luxurious Elegance S600 with celebrity guide Alex Morgan.
                      The tour showcased both exterior design elements and premium interior features.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Luxury Sedan</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Premium Interior</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Celebrity Guide</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-5">
                  <h2 className="text-xl font-semibold mb-4">Share Your Experience</h2>
                  
                  <Tabs defaultValue="social" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="social">Social</TabsTrigger>
                      <TabsTrigger value="email">Email</TabsTrigger>
                      <TabsTrigger value="link">Link</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="social" className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start h-12 px-4 gap-3"
                          onClick={() => handleShare("Facebook")}
                        >
                          <Facebook className="h-5 w-5 text-[#1877F2]" />
                          <span>Facebook</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start h-12 px-4 gap-3"
                          onClick={() => handleShare("Twitter")}
                        >
                          <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                          <span>Twitter</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start h-12 px-4 gap-3"
                          onClick={() => handleShare("Instagram")}
                        >
                          <Instagram className="h-5 w-5 text-[#E4405F]" />
                          <span>Instagram</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start h-12 px-4 gap-3"
                          onClick={() => handleShare("LinkedIn")}
                        >
                          <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                          <span>LinkedIn</span>
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground pt-2">
                        {shareCount > 0 ? (
                          <span>Shared {shareCount} time{shareCount > 1 ? 's' : ''}! Thank you for spreading the joy.</span>
                        ) : (
                          <span>Share your experience with your social network.</span>
                        )}
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="email" className="space-y-4">
                      <form onSubmit={handleEmailShare}>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="recipient">Recipient Email</Label>
                            <Input id="recipient" type="email" placeholder="friend@example.com" required />
                          </div>
                          
                          <div>
                            <Label htmlFor="subject">Subject</Label>
                            <Input 
                              id="subject" 
                              defaultValue="Check out my virtual celebrity car tour!" 
                              required 
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="message">Message (optional)</Label>
                            <textarea 
                              id="message" 
                              className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
                              defaultValue="I just experienced an amazing virtual tour of a luxury car with a celebrity guide. Check out my personalized video!"
                            ></textarea>
                          </div>
                          
                          <Button type="submit" className="w-full">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="link" className="space-y-4">
                      <div>
                        <Label htmlFor="share-link">Shareable Link</Label>
                        <div className="flex mt-1.5">
                          <Input 
                            id="share-link" 
                            value={shareUrl} 
                            readOnly 
                            className="rounded-r-none"
                          />
                          <Button 
                            className="rounded-l-none"
                            onClick={handleCopyLink}
                          >
                            {copySuccess ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">
                          This link will allow anyone to view your personalized car tour video. The link is valid for 30 days.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-3">Create Another Tour</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Want to try a different car or celebrity? Create a new tour experience.
                    </p>
                    <Button asChild className="w-full">
                      <Link to="/celebrities">
                        Start New Tour
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center text-sm text-muted-foreground">
            <p>
              Thank you for using our virtual celebrity car tour service.
              Your experience has been saved to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}