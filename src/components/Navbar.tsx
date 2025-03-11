
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, User, MessageSquare, Bell } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const isLoggedIn = false; // This would come from auth context in a real app
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <div className="flex h-8 w-8 bg-gradient-to-br from-trans-blue to-trans-pink rounded-full items-center justify-center">
            <div className="h-6 w-6 bg-trans-white rounded-full"></div>
          </div>
          <span className="font-bold text-xl tracking-tight">TransConnect</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                Home
              </Link>
              <Link to="/matches" className="px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                Matches
              </Link>
              <Link to="/messages" className="px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                Messages
              </Link>
              <Link to="/community" className="px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                Community
              </Link>
              
              <div className="flex items-center ml-4 space-x-2">
                <button className="p-2 rounded-full hover:bg-secondary transition-elegant relative">
                  <Heart size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-elegant relative">
                  <MessageSquare size={20} />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-elegant">
                  <Bell size={20} />
                </button>
                <Link to="/profile" className="ml-2">
                  <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center border-2 border-brand-100 hover:border-brand-300 transition-elegant">
                    <User size={20} className="text-muted-foreground" />
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/about" className="px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                About
              </Link>
              <Link to="/safety" className="px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                Safety
              </Link>
              <Link to="/community" className="px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                Community
              </Link>
              <Link to="/auth" className="ml-2">
                <Button>Log In</Button>
              </Link>
              <Link to="/auth?signup=true" className="ml-2">
                <Button variant="gradient">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-secondary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-card animate-fade-in m-3 mt-2 rounded-xl overflow-hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                  Home
                </Link>
                <Link to="/matches" className="block px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                  Matches
                </Link>
                <Link to="/messages" className="block px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                  Messages
                </Link>
                <Link to="/community" className="block px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                  Community
                </Link>
                <Link to="/profile" className="block px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/about" className="block px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                  About
                </Link>
                <Link to="/safety" className="block px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                  Safety
                </Link>
                <Link to="/community" className="block px-3 py-2 rounded-md hover:bg-secondary transition-elegant">
                  Community
                </Link>
                <div className="px-3 py-2">
                  <Link to="/auth">
                    <Button fullWidth>Log In</Button>
                  </Link>
                </div>
                <div className="px-3 py-2">
                  <Link to="/auth?signup=true">
                    <Button variant="gradient" fullWidth>Sign Up</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
