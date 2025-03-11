
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import ProfileCard from '@/components/ProfileCard';
import Button from '@/components/Button';
import { Filter, Sparkles, MapPin, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for the profiles
const mockProfiles = [
  {
    id: '1',
    name: 'Jamie',
    age: 28,
    pronouns: 'They/Them',
    gender: 'Non-Binary',
    location: 'Seattle, WA',
    bio: "Hey there! I'm a graphic designer who loves creating art, listening to indie music, and exploring new coffee shops. Looking to connect with like-minded people who appreciate creativity and authenticity.",
    interests: ['Art', 'Music', 'Coffee', 'Design', 'Hiking'],
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    verified: true,
  },
  {
    id: '2',
    name: 'Alex',
    age: 32,
    pronouns: 'She/Her',
    gender: 'Trans Woman',
    location: 'Portland, OR',
    bio: "Bookworm, tea enthusiast, and avid hiker. I'm passionate about environmental activism and spend my weekends volunteering at the local animal shelter. Looking for genuine connections and shared adventures.",
    interests: ['Reading', 'Hiking', 'Activism', 'Animals', 'Nature'],
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    verified: true,
  },
  {
    id: '3',
    name: 'Taylor',
    age: 26,
    pronouns: 'He/Him',
    gender: 'Trans Man',
    location: 'Vancouver, BC',
    bio: "Software developer by day, amateur chef by night. I love coding, trying new recipes, and playing board games with friends. Seeking connections with people who appreciate good food and thoughtful conversations.",
    interests: ['Coding', 'Cooking', 'Gaming', 'Technology', 'Food'],
    imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    verified: false,
  },
];

const Dashboard = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleLike = (id: string) => {
    toast.success('You liked their profile!');
    moveToNextProfile();
  };
  
  const handleDislike = (id: string) => {
    moveToNextProfile();
  };
  
  const handleMessage = (id: string) => {
    toast.success('Message feature coming soon!');
  };
  
  const handleInfo = (id: string) => {
    toast('Profile details', {
      description: 'Additional profile information will be available in the full version.',
    });
  };
  
  const moveToNextProfile = () => {
    if (currentProfileIndex < mockProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      toast('You\'ve viewed all profiles', {
        description: 'Check back later for more matches!',
      });
    }
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API call to refresh profiles
    setTimeout(() => {
      setCurrentProfileIndex(0);
      setIsRefreshing(false);
      toast.success('Profiles refreshed!');
    }, 1500);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-brand-50/50">
        <Navbar />
        
        <div className="container max-w-4xl px-4 pt-28 pb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Discover</h1>
              <p className="text-muted-foreground">Find connections that matter</p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                icon={<Filter size={18} />} 
                onClick={toggleFilters}
                className={showFilters ? 'bg-secondary' : ''}
              >
                Filters
              </Button>
              
              <Button 
                variant="outline" 
                icon={<RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />} 
                onClick={handleRefresh}
                isLoading={isRefreshing}
                disabled={isRefreshing}
              >
                Refresh
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mb-8 glass-card p-6 rounded-xl animate-scale-in">
              <h2 className="text-lg font-semibold mb-4">Filter Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Distance
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      defaultValue="50" 
                      className="w-full accent-brand-500"
                    />
                    <span className="ml-2 text-sm">50 mi</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Age Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number" 
                      min="18" 
                      max="99" 
                      defaultValue="18" 
                      className="w-20 h-9 px-2 rounded-md border border-input bg-background" 
                    />
                    <span>to</span>
                    <input 
                      type="number" 
                      min="18" 
                      max="99" 
                      defaultValue="45" 
                      className="w-20 h-9 px-2 rounded-md border border-input bg-background" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Looking For
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Dating', 'Friendship', 'Networking', 'Community'].map((option) => (
                      <button
                        key={option}
                        className="px-3 py-1 text-sm rounded-full bg-brand-100 text-brand-700"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Show Me
                  </label>
                  <select className="w-full h-9 px-3 rounded-md border border-input bg-background">
                    <option>Everyone</option>
                    <option>Trans Women</option>
                    <option>Trans Men</option>
                    <option>Non-Binary People</option>
                    <option>Gender Fluid People</option>
                    <option>Cis Women</option>
                    <option>Cis Men</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline">Reset</Button>
                <Button onClick={toggleFilters}>Apply Filters</Button>
              </div>
            </div>
          )}
          
          <div className="flex justify-center items-center">
            {currentProfileIndex < mockProfiles.length ? (
              <div className="animate-fade-in">
                <ProfileCard 
                  profile={mockProfiles[currentProfileIndex]} 
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onMessage={handleMessage}
                  onInfo={handleInfo}
                />
              </div>
            ) : (
              <div className="text-center py-12 glass-card p-8 rounded-xl max-w-md">
                <Sparkles size={48} className="mx-auto mb-4 text-brand-300" />
                <h2 className="text-xl font-semibold mb-2">No More Profiles</h2>
                <p className="text-muted-foreground mb-6">
                  You've viewed all available profiles for now. Check back later or adjust your filters to see more people.
                </p>
                <Button onClick={handleRefresh} isLoading={isRefreshing}>
                  Refresh Profiles
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-100 text-brand-700">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">Showing profiles near you</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Dashboard;
