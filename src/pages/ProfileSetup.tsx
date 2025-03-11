
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Upload, X, Check } from 'lucide-react';
import Button from '@/components/Button';
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    birthdate: '',
    gender: '',
    pronouns: '',
    customGender: '',
    customPronouns: '',
    lookingFor: [] as string[],
    bio: '',
    interests: [] as string[],
    location: '',
    photos: [] as string[],
  });
  
  // Options
  const genderOptions = ['Trans Woman', 'Trans Man', 'Non-Binary', 'Gender Fluid', 'Bigender', 'Agender', 'Questioning', 'Cis Woman', 'Cis Man', 'Custom'];
  
  const pronounOptions = ['She/Her', 'He/Him', 'They/Them', 'She/They', 'He/They', 'Ze/Zir', 'Custom'];
  
  const interestOptions = [
    'Art', 'Music', 'Film', 'Travel', 'Reading', 'Writing', 'Cooking', 'Gaming',
    'Fitness', 'Hiking', 'Yoga', 'Dancing', 'Photography', 'Technology', 'Fashion',
    'Activism', 'Meditation', 'Sports', 'Nature', 'Animals', 'Science', 'History',
    'Languages', 'Crafting', 'Podcasts', 'Comedy', 'Poetry'
  ];
  
  const relationshipOptions = ['Dating', 'Friendship', 'Networking', 'Community'];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMultiSelect = (value: string, field: 'lookingFor' | 'interests') => {
    setFormState(prev => {
      if (prev[field].includes(value)) {
        return { ...prev, [field]: prev[field].filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...prev[field], value] };
      }
    });
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newPhotos: string[] = [];
    
    // Simulate file uploads with placeholders
    for (let i = 0; i < files.length; i++) {
      if (formState.photos.length + newPhotos.length >= 6) break;
      
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormState(prev => ({
            ...prev,
            photos: [...prev.photos, event.target?.result as string]
          }));
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const removePhoto = (index: number) => {
    setFormState(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };
  
  const nextStep = () => {
    // Validate current step before proceeding
    if (step === 1 && (!formState.name || !formState.birthdate)) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (step === 2 && !formState.gender) {
      toast.error('Please select your gender identity');
      return;
    }
    
    if (step === 3 && formState.lookingFor.length === 0) {
      toast.error('Please select at least one option');
      return;
    }
    
    if (step === 4 && (!formState.bio || formState.bio.length < 10)) {
      toast.error('Please write a bio with at least 10 characters');
      return;
    }
    
    if (step === 5 && formState.photos.length === 0) {
      toast.error('Please upload at least one photo');
      return;
    }
    
    if (step < 6) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Profile created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const calculateProgress = () => {
    return (step / 6) * 100;
  };
  
  // Age calculation for birthdate validation
  const getMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split('T')[0];
  };
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-trans-pink/10 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-center">Create Your Profile</h1>
            <p className="text-muted-foreground text-center mt-2">
              Tell us about yourself to get started
            </p>
            
            <div className="w-full bg-secondary h-2 rounded-full mt-8">
              <div 
                className="bg-gradient-to-r from-brand-400 to-brand-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Step {step} of 6</span>
              <span>{Math.round(calculateProgress())}% Complete</span>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-2xl shadow-soft">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Name*
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      placeholder="Your name as you'd like it to appear"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="birthdate" className="block text-sm font-medium text-muted-foreground mb-1">
                      Date of Birth* (You must be 18 or older)
                    </label>
                    <input
                      id="birthdate"
                      name="birthdate"
                      type="date"
                      value={formState.birthdate}
                      onChange={handleChange}
                      max={getMaxDate()}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-1">
                      Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formState.location}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      placeholder="City, State/Province"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Gender & Pronouns */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-6">Identity</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">
                      Gender Identity*
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {genderOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormState(prev => ({ ...prev, gender: option }))}
                          className={`px-4 py-2 rounded-lg border ${
                            formState.gender === option 
                              ? 'bg-brand-100 border-brand-300 text-brand-700' 
                              : 'border-input hover:bg-secondary'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {formState.gender === 'Custom' && (
                      <div className="mt-3">
                        <input
                          name="customGender"
                          type="text"
                          value={formState.customGender}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          placeholder="Enter your gender identity"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">
                      Pronouns
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {pronounOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormState(prev => ({ ...prev, pronouns: option }))}
                          className={`px-4 py-2 rounded-lg border ${
                            formState.pronouns === option 
                              ? 'bg-brand-100 border-brand-300 text-brand-700' 
                              : 'border-input hover:bg-secondary'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {formState.pronouns === 'Custom' && (
                      <div className="mt-3">
                        <input
                          name="customPronouns"
                          type="text"
                          value={formState.customPronouns}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          placeholder="Enter your pronouns"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Looking For */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-6">What are you looking for?*</h2>
                <p className="text-muted-foreground mb-4">Select all that apply</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {relationshipOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleMultiSelect(option, 'lookingFor')}
                      className={`px-4 py-3 rounded-lg border flex items-center justify-between ${
                        formState.lookingFor.includes(option) 
                          ? 'bg-brand-100 border-brand-300 text-brand-700' 
                          : 'border-input hover:bg-secondary'
                      }`}
                    >
                      <span>{option}</span>
                      {formState.lookingFor.includes(option) && (
                        <Check size={16} className="text-brand-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Step 4: Bio */}
            {step === 4 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-6">About You</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-muted-foreground mb-1">
                      Bio* (Minimum 10 characters)
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formState.bio}
                      onChange={handleChange}
                      className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background"
                      placeholder="Tell potential matches about yourself, your interests, and what you're looking for..."
                      required
                    />
                    <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                      <span>{formState.bio.length} characters</span>
                      <span>{formState.bio.length < 10 ? `At least ${10 - formState.bio.length} more needed` : 'Looks good!'}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">
                      Interests (Select up to 10)
                    </label>
                    <div className="h-48 overflow-y-auto border border-input rounded-md p-3">
                      <div className="flex flex-wrap gap-2">
                        {interestOptions.map((interest) => (
                          <button
                            key={interest}
                            type="button"
                            disabled={formState.interests.length >= 10 && !formState.interests.includes(interest)}
                            onClick={() => handleMultiSelect(interest, 'interests')}
                            className={`px-3 py-1 rounded-full text-sm ${
                              formState.interests.includes(interest)
                                ? 'bg-brand-100 text-brand-700'
                                : formState.interests.length >= 10
                                ? 'bg-secondary/50 text-muted-foreground cursor-not-allowed'
                                : 'bg-secondary hover:bg-secondary/80'
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {formState.interests.length}/10 interests selected
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 5: Photos */}
            {step === 5 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-6">Photos</h2>
                <p className="text-muted-foreground mb-4">
                  Upload at least 1 photo of yourself (max 6)
                </p>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {Array(6).fill(0).map((_, index) => (
                    <div 
                      key={index} 
                      className={`aspect-square rounded-lg overflow-hidden relative ${
                        formState.photos[index] ? 'border-brand-300' : 'border border-dashed border-muted-foreground'
                      }`}
                    >
                      {formState.photos[index] ? (
                        <>
                          <img 
                            src={formState.photos[index]} 
                            alt={`Upload ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white"
                          >
                            <X size={14} />
                          </button>
                        </>
                      ) : index === formState.photos.length ? (
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-secondary transition-elegant">
                          <Upload size={24} className="text-muted-foreground mb-1" />
                          <span className="text-xs text-muted-foreground">Upload</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handlePhotoUpload}
                          />
                        </label>
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-muted-foreground/50">
                          <span className="text-xs">{index + 1}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Tips:</p>
                  <ul className="list-disc ml-5 mt-1 space-y-1">
                    <li>Clear face photos help you get more matches</li>
                    <li>Show your interests and personality</li>
                    <li>Avoid group photos for your primary image</li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* Step 6: Review */}
            {step === 6 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-6">Review Your Profile</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    {formState.photos[0] ? (
                      <img 
                        src={formState.photos[0]} 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mr-4">
                        <Upload size={24} className="text-muted-foreground" />
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-semibold text-lg">{formState.name}</h3>
                      <p className="text-muted-foreground">{formState.location}</p>
                      
                      <div className="flex space-x-2 mt-2">
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                          {formState.gender === 'Custom' ? formState.customGender : formState.gender}
                        </span>
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                          {formState.pronouns === 'Custom' ? formState.customPronouns : formState.pronouns}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">About me</h4>
                    <p className="mt-1">{formState.bio}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Interests</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formState.interests.map((interest, index) => (
                        <span key={index} className="text-xs bg-secondary px-2 py-1 rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Looking for</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formState.lookingFor.map((item, index) => (
                        <span key={index} className="text-xs bg-secondary px-2 py-1 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Photos ({formState.photos.length})</h4>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      {formState.photos.map((photo, index) => (
                        <img 
                          key={index}
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-brand-50 rounded-lg border border-brand-100">
                  <p className="text-sm">
                    Before finishing, please ensure all information is accurate. You can edit your profile anytime after creation.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                icon={<ChevronLeft size={16} />}
                iconPosition="left"
              >
                Back
              </Button>
              
              <Button
                variant={step === 6 ? 'gradient' : 'primary'}
                onClick={nextStep}
                isLoading={isLoading}
                icon={step < 6 ? <ChevronRight size={16} /> : <Check size={16} />}
                iconPosition="right"
              >
                {step < 6 ? 'Continue' : 'Complete Profile'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ProfileSetup;
