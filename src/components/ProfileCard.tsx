
import { Heart, X, MessageSquare, Info } from 'lucide-react';
import { useState } from 'react';
import Button from './Button';

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    pronouns: string;
    gender: string;
    location: string;
    bio: string;
    interests: string[];
    imageUrl: string;
    verified: boolean;
  };
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onMessage?: (id: string) => void;
  onInfo?: (id: string) => void;
  interactive?: boolean;
}

const ProfileCard = ({ 
  profile, 
  onLike, 
  onDislike, 
  onMessage, 
  onInfo,
  interactive = true 
}: ProfileCardProps) => {
  const [flipped, setFlipped] = useState(false);
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  return (
    <div className="w-full max-w-sm mx-auto h-[500px] perspective">
      <div 
        className={`relative w-full h-full preserve-3d transition-all duration-500 ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden glass-card border-2 border-white/40 shadow-lg"
          onClick={handleFlip}
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${profile.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold">{profile.name}, {profile.age}</h3>
                  {profile.verified && (
                    <span className="bg-brand-500 text-white text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap mt-1 space-x-2">
                  <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {profile.pronouns}
                  </span>
                  <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {profile.gender}
                  </span>
                </div>
                
                <p className="mt-2 text-sm text-white/90 line-clamp-2">{profile.bio}</p>
                
                <div className="mt-3 text-sm text-white/80">
                  <span className="flex items-center">
                    <span className="mr-1">📍</span> {profile.location}
                  </span>
                </div>
                
                <p className="mt-3 text-xs text-white/70">Tap to see more</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180 rounded-3xl overflow-hidden glass-card border-2 border-white/40"
          onClick={handleFlip}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{profile.name}, {profile.age}</h3>
                <div className="flex space-x-2 mt-1">
                  <span className="text-sm bg-secondary px-2 py-0.5 rounded-full">
                    {profile.pronouns}
                  </span>
                  <span className="text-sm bg-secondary px-2 py-0.5 rounded-full">
                    {profile.gender}
                  </span>
                </div>
              </div>
              {profile.verified && (
                <span className="bg-brand-500 text-white text-xs px-2 py-1 rounded-full">
                  Verified
                </span>
              )}
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-sm text-muted-foreground">About me</h4>
              <p className="mt-1">{profile.bio}</p>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-sm text-muted-foreground">Interests</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.interests.map((interest, index) => (
                  <span key={index} className="text-sm bg-secondary px-2 py-1 rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-sm text-muted-foreground">Location</h4>
              <p className="mt-1">{profile.location}</p>
            </div>
            
            <div className="mt-auto">
              <p className="text-xs text-muted-foreground mb-3">Tap to go back</p>
            </div>
          </div>
        </div>
      </div>
      
      {interactive && (
        <div className="flex justify-center space-x-3 mt-5">
          <button 
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-red-500 hover:bg-red-50 transition-elegant"
            onClick={() => onDislike && onDislike(profile.id)}
          >
            <X size={28} />
          </button>
          
          <button 
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-blue-500 hover:bg-blue-50 transition-elegant"
            onClick={() => onInfo && onInfo(profile.id)}
          >
            <Info size={24} />
          </button>
          
          <button 
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-brand-500 hover:bg-brand-50 transition-elegant"
            onClick={() => onMessage && onMessage(profile.id)}
          >
            <MessageSquare size={24} />
          </button>
          
          <button 
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-pink-500 hover:bg-pink-50 transition-elegant"
            onClick={() => onLike && onLike(profile.id)}
          >
            <Heart size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
