
import { Shield, AlertTriangle, Heart, ExternalLink } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

const Safety = () => {
  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-brand-50/50">
        <Navbar />
        
        <div className="container max-w-4xl px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <div className="inline-flex bg-brand-100 p-3 rounded-full mb-4">
              <Shield size={32} className="text-brand-600" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Safety First</h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Your wellbeing is our top priority. Here's how we keep you safe on TransConnect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4 inline-flex bg-red-100 p-2 rounded-full">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Reporting & Blocking</h2>
              <p className="text-muted-foreground mb-4">
                If someone makes you uncomfortable, you can report and block them with just a few taps. 
                Our team reviews all reports within 24 hours.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-brand-500 mr-2">•</span>
                  <span>Instant blocking prevents all future contact</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-500 mr-2">•</span>
                  <span>Detailed reporting helps us take appropriate action</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-500 mr-2">•</span>
                  <span>Emergency resources available 24/7</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4 inline-flex bg-brand-100 p-2 rounded-full">
                <Heart size={24} className="text-brand-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Verification System</h2>
              <p className="text-muted-foreground mb-4">
                Our optional verification system helps ensure you're connecting with real people 
                who are who they say they are.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-brand-500 mr-2">•</span>
                  <span>Photo verification matches selfies to profile pictures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-500 mr-2">•</span>
                  <span>Verified badges show which profiles are confirmed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-500 mr-2">•</span>
                  <span>Community ratings build trust over time</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-xl mb-12">
            <h2 className="text-xl font-semibold mb-4">Safety Tips for Meeting Someone</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-brand-100 h-8 w-8 flex items-center justify-center rounded-full shrink-0 mr-3">
                  <span className="font-medium text-brand-700">1</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Meet in public places</h3>
                  <p className="text-sm text-muted-foreground">
                    Always meet in busy, public locations for your first few meetings. 
                    Coffee shops, restaurants, or parks during daytime are good options.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 h-8 w-8 flex items-center justify-center rounded-full shrink-0 mr-3">
                  <span className="font-medium text-brand-700">2</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Tell someone your plans</h3>
                  <p className="text-sm text-muted-foreground">
                    Let a friend or family member know where you're going, who you're meeting, 
                    and when you expect to return.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 h-8 w-8 flex items-center justify-center rounded-full shrink-0 mr-3">
                  <span className="font-medium text-brand-700">3</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Arrange your own transportation</h3>
                  <p className="text-sm text-muted-foreground">
                    Maintain control of how you get to and from the meeting place. 
                    Don't rely on your date for transportation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 h-8 w-8 flex items-center justify-center rounded-full shrink-0 mr-3">
                  <span className="font-medium text-brand-700">4</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Trust your instincts</h3>
                  <p className="text-sm text-muted-foreground">
                    If something feels off, it probably is. Don't hesitate to leave a situation 
                    that makes you uncomfortable.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              If you're experiencing harassment or feel unsafe, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary">
                Report a Concern
              </Button>
              <Button variant="outline">
                Safety Resources <ExternalLink size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Safety;
