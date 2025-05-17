import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Camera, Video, Share2, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `url('/img/cars/luxury-car-exterior.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50 z-0"></div>
        
        <div className="container-wrapper relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 animate-in">
              <span className="block mb-2">Virtual Celebrity</span>
              <span className="gradient-heading">Car Tour Experience</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-in" style={{animationDelay: '100ms'}}>
              Create your avatar and join a celebrity for an exclusive virtual tour of luxury cars.
              Share your personalized experience with friends and family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in" style={{animationDelay: '200ms'}}>
              <Button size="lg" asChild>
                <Link to="/upload">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-it-works">
                  How It Works
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Cars Section */}
      <section className="py-16 bg-muted/50">
        <div className="container-wrapper">
          <div className="text-center mb-12">
            <h2 className="mb-4">Featured Luxury Cars</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of premium vehicles available for virtual tours with celebrities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-card rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src="/img/cars/luxury-car-exterior.jpg" 
                    alt="Luxury Car" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-medium py-1 px-2 rounded">
                    Premium
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">Luxury Model X</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm ml-1">4.9</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Experience the ultimate luxury with our Model X. Featuring cutting-edge technology and unparalleled comfort.
                  </p>
                  <Button className="w-full" asChild>
                    <Link to="/upload">Take a Tour</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link to="/gallery">View All Cars</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16">
        <div className="container-wrapper">
          <div className="text-center mb-12">
            <h2 className="mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating your personalized celebrity car tour is simple and fun.
              Follow these steps to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Camera className="h-10 w-10 text-accent" />,
                title: "Upload Your Photo",
                description: "Upload a clear photo of yourself to create your personalized avatar.",
              },
              {
                icon: <Star className="h-10 w-10 text-accent" />,
                title: "Choose a Celebrity",
                description: "Select from our roster of AI-generated celebrities to guide your tour.",
              },
              {
                icon: <Video className="h-10 w-10 text-accent" />,
                title: "Generate Video",
                description: "Our AI creates a personalized video of you and the celebrity touring the car.",
              },
              {
                icon: <Share2 className="h-10 w-10 text-accent" />,
                title: "Share Experience",
                description: "Download your video and share it with friends and family on social media.",
              },
            ].map((step, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="bg-muted/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild>
              <Link to="/upload">
                Create Your Tour <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-wrapper">
          <div className="text-center mb-12">
            <h2 className="mb-4">What Our Users Say</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Hear from people who have experienced our virtual celebrity car tours.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "I can't believe how realistic my avatar looked! The tour with my favorite celebrity was so much fun. I've shared it with everyone!",
                name: "Sarah Johnson",
                title: "Car Enthusiast",
              },
              {
                quote: "The attention to detail in the car tour was amazing. It felt like I was actually sitting next to the celebrity in a luxury car.",
                name: "Michael Chen",
                title: "Tech Blogger",
              },
              {
                quote: "What a unique experience! I gifted this to my dad who loves cars, and he couldn't stop talking about it. Worth every penny!",
                name: "Emma Wilson",
                title: "Digital Creator",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-primary-foreground/5 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/10">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="italic mb-4 text-primary-foreground/90">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary-foreground/70">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-accent/10">
        <div className="container-wrapper">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Ready to Create Your Celebrity Car Tour?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have created memorable experiences with our virtual celebrity car tours.
              Upload your photo now and get started!
            </p>
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <Link to="/upload">
                  Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your privacy is our priority. All uploads are secure and private.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}