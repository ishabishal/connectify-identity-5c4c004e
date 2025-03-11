
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Heart, MessageSquare, Users, Check } from 'lucide-react';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';

const Index = () => {
  const featureRef = useRef<HTMLDivElement>(null);
  
  // Feature items
  const features = [
    {
      title: 'Identity-Affirming Profiles',
      description: 'Express yourself authentically with custom gender and pronoun options beyond the binary.',
      icon: <Users className="h-6 w-6 text-brand-500" />,
    },
    {
      title: 'Safe & Secure Matching',
      description: 'Our AI-powered matching prioritizes compatibility while keeping your safety as the top priority.',
      icon: <Shield className="h-6 w-6 text-brand-500" />,
    },
    {
      title: 'Verified Profiles',
      description: 'Optional profile verification reduces catfishing and ensures authenticity in every connection.',
      icon: <Check className="h-6 w-6 text-brand-500" />,
    },
    {
      title: 'Inclusive Filters',
      description: 'Match with people based on preferences like identity, interests, and relationship goals.',
      icon: <Heart className="h-6 w-6 text-brand-500" />,
    },
    {
      title: 'Respectful Messaging',
      description: 'Our built-in AI moderation detects and filters out offensive or inappropriate messages.',
      icon: <MessageSquare className="h-6 w-6 text-brand-500" />,
    },
    {
      title: 'Community Spaces',
      description: 'Engage in discussion forums, support groups, and social events with like-minded individuals.',
      icon: <Users className="h-6 w-6 text-brand-500" />,
    },
  ];
  
  // Testimonials
  const testimonials = [
    {
      quote: "TransConnect has completely changed how I approach dating. For the first time, I feel seen and respected for who I am.",
      author: "Alex, 28",
      location: "Portland, OR",
    },
    {
      quote: "I've made genuine connections and even found a supportive community of friends. This app is about so much more than just dating.",
      author: "Jaimie, 32",
      location: "Chicago, IL",
    },
    {
      quote: "The focus on safety and respect is what sets TransConnect apart. I finally feel comfortable being myself online.",
      author: "Taylor, 24",
      location: "Austin, TX",
    },
  ];
  
  // Animation on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  const scrollToFeatures = () => {
    featureRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-trans-blue/20 via-transparent to-trans-pink/20" />
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-brand-50 to-transparent" />
          </div>
          
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 px-3 py-1.5 rounded-full bg-brand-100 animate-fade-in">
                <span className="text-brand-700 text-sm font-medium">✨ The dating app designed for you</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-slide-down">
                Authentic Connections,
                <span className="block text-brand-600">Real Love</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in delay-75">
                TransConnect is a dating and social networking app designed specifically for transgender individuals and allies, creating a safe, respectful, and inclusive space.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-100">
                <Link to="/auth?signup=true">
                  <Button variant="gradient" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                    Join Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg" onClick={scrollToFeatures}>
                  Learn More
                </Button>
              </div>
              
              <div className="mt-16 max-w-3xl mx-auto animate-fade-in delay-150">
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl bg-white glass-card">
                  <img 
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                    alt="TransConnect App Preview" 
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section ref={featureRef} className="py-20 bg-gradient-to-b from-white to-brand-50">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-brand-500 font-medium">Features</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                A platform built with care
              </h2>
              <p className="text-muted-foreground">
                TransConnect was designed from the ground up with your safety, privacy, and authenticity in mind.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="glass-card p-6 rounded-xl animate-on-scroll opacity-0 transition-elegant hover:shadow-md transform hover:-translate-y-1"
                >
                  <div className="h-12 w-12 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-b from-brand-50 to-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
              <span className="text-brand-500 font-medium">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Hear from our community
              </h2>
              <p className="text-muted-foreground">
                TransConnect has helped thousands find love, friendship, and belonging.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="glass-card p-6 rounded-xl animate-on-scroll opacity-0 transition-elegant"
                >
                  <div className="mb-4 text-4xl text-brand-300">"</div>
                  <p className="italic mb-6 text-muted-foreground">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center mr-3">
                      <span className="text-brand-500 font-bold">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-500 to-purple-500 text-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to find authentic connections?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of others on TransConnect today and experience dating with respect, inclusivity, and authenticity.
              </p>
              <Link to="/auth?signup=true">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white text-brand-500 border-white hover:bg-white/90 hover:text-brand-600"
                  icon={<ArrowRight size={18} />} 
                  iconPosition="right"
                >
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-10 bg-white border-t border-gray-100">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="flex h-8 w-8 bg-gradient-to-br from-trans-blue to-trans-pink rounded-full items-center justify-center mr-2">
                  <div className="h-6 w-6 bg-trans-white rounded-full"></div>
                </div>
                <span className="font-bold text-xl">TransConnect</span>
              </div>
              
              <div className="flex space-x-6 mb-6 md:mb-0">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-elegant">
                  About
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-elegant">
                  Safety
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-elegant">
                  Support
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-elegant">
                  Privacy
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-elegant">
                  Terms
                </a>
              </div>
              
              <div className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} TransConnect. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedTransition>
  );
};

export default Index;
