
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/Button';
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSignUp = searchParams.get('signup') === 'true';
  
  const [showSignUp, setShowSignUp] = useState(isSignUp);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  useEffect(() => {
    setShowSignUp(isSignUp);
  }, [isSignUp]);
  
  const handleToggleForm = () => {
    setShowSignUp(!showSignUp);
    const newPath = !showSignUp ? '/auth?signup=true' : '/auth';
    window.history.replaceState(null, '', newPath);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (showSignUp) {
        toast.success('Account created successfully!');
        // In a real app, you would create the user account here
        navigate('/profile-setup');
      } else {
        toast.success('Welcome back!');
        // In a real app, you would authenticate the user here
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-trans-pink/10 px-4 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground mb-8 hover:text-foreground transition-elegant">
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
          
          <div className="glass-card p-8 rounded-2xl shadow-soft">
            <div className="text-center mb-8">
              <div className="flex h-12 w-12 bg-gradient-to-br from-trans-blue to-trans-pink rounded-full items-center justify-center mx-auto mb-4">
                <div className="h-8 w-8 bg-trans-white rounded-full"></div>
              </div>
              <h1 className="text-2xl font-bold">
                {showSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {showSignUp 
                  ? 'Join our inclusive community today' 
                  : 'Sign in to continue to TransConnect'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {showSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              {!showSignUp && (
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-brand-500 hover:text-brand-600">
                    Forgot password?
                  </Link>
                </div>
              )}
              
              <Button
                type="submit"
                variant={showSignUp ? 'gradient' : 'primary'}
                fullWidth
                isLoading={isLoading}
              >
                {showSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                {showSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={handleToggleForm}
                  className="ml-1 text-brand-500 hover:text-brand-600 font-medium"
                >
                  {showSignUp ? 'Sign in' : 'Create one'}
                </button>
              </p>
            </div>
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-8">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Auth;
