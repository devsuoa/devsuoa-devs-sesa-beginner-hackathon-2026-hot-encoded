import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import PhotoCropper from '../components/PhotoCropper';
import { Trash2 } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const { preferences, setPreferences } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tempPhoto, setTempPhoto] = useState<string | null>(null);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  
  const [formData, setFormData] = useState({
    name: preferences?.name || '',
    age: preferences?.age || '',
    species: preferences?.species || 'Human',
    planet: preferences?.planet || '',
    bio: preferences?.bio || '',
    interests: preferences?.interests || [],
    profilePic: preferences?.profilePic || '',
    // Default preferences for now, will be updated on the next page
    limbs: preferences?.limbs || 4,
    alienType: preferences?.alienType || 'Open to all',
    size: preferences?.size || 'No preference',
    maxDistanceAU: preferences?.maxDistanceAU || 100,
    goals: preferences?.goals || 'Long term fusion',
  });
  const [interestInput, setInterestInput] = useState('');
  const interestSuggestions = ['Stargazing', 'Volcano Diving', 'Heavy Metal (Literally)', 'Asteroid Mining'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreferences(formData);
    navigate('/preferences');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addInterest = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || formData.interests.includes(trimmed) || formData.interests.length >= 3) return;
    setFormData(prev => ({
      ...prev,
      interests: [...prev.interests, trimmed]
    }));
    setInterestInput('');
  };

  const removeInterest = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(item => item !== value)
    }));
  };

  const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest(interestInput);
    }
  };

  const handlePhotoClick = () => {
    // Only open the file dialog if we don't already have a photo, 
    // or if they click the overlay. (Actually, clicking the overlay could mean changing photo)
    // We'll let them click to change, and use the trash icon to delete.
    fileInputRef.current?.click();
  };

  const handleDeletePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData(prev => ({ ...prev, profilePic: '' }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result as string);
        // Clear input so selecting the same file again triggers onChange
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropConfirm = (croppedBase64: string) => {
    setFormData(prev => ({ ...prev, profilePic: croppedBase64 }));
    setTempPhoto(null);
  };

  const handleCropCancel = () => {
    setTempPhoto(null);
  };

  if (tempPhoto) {
    return (
      <PhotoCropper 
        imageSrc={tempPhoto} 
        onConfirm={handleCropConfirm} 
        onCancel={handleCropCancel} 
      />
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px', padding: '20px', boxSizing: 'border-box' }}>
      <div className="glass-panel" style={{ padding: '40px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--color-secondary)' }}>Welcome to SSTRUK</h1>
        <p style={{ textAlign: 'center', marginBottom: '32px', color: 'rgba(234, 222, 218, 0.8)', fontWeight: 'bold', fontSize: '1.1rem' }}>
          Enter your details
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div 
              onClick={handlePhotoClick}
              onMouseEnter={() => setIsHoveringPhoto(true)}
              onMouseLeave={() => setIsHoveringPhoto(false)}
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: formData.profilePic ? 'none' : '2px dashed rgba(255,255,255,0.3)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handlePhotoChange}
              />
              {formData.profilePic ? (
                <>
                  <img src={formData.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {isHoveringPhoto && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <button 
                        onClick={handleDeletePhoto}
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ff4d4d',
                          cursor: 'pointer',
                          padding: '8px'
                        }}
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <span style={{ fontSize: '0.8rem', textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                  Add profile photo
                </span>
              )}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Your Name:</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Age (Earth Years):</label>
              <input type="number" min="0" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 24" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Species:</label>
              <input type="text" name="species" value={formData.species} onChange={handleChange} placeholder="Type your species" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Planet:</label>
            <input type="text" name="planet" value={formData.planet} onChange={handleChange} placeholder="e.g. Earth" />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Bio:</label>
            <textarea 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange} 
              placeholder="What do you want the solar system to know about you?"
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '8px', 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                color: 'white',
                minHeight: '80px',
                fontFamily: 'inherit'
              }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.9rem' }}>Interests:</label>
              <span style={{ fontSize: '0.8rem', color: 'rgba(234, 222, 218, 0.7)' }}>Up to 3</span>
            </div>
            <input
              type="text"
              value={interestInput}
              onChange={e => setInterestInput(e.target.value)}
              onKeyDown={handleInterestKeyDown}
              placeholder="Type an interest and press Enter"
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '12px 0' }}>
              {formData.interests.map(interest => (
                <button
                  type="button"
                  key={interest}
                  onClick={() => removeInterest(interest)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {interest} ×
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {interestSuggestions
                .filter(suggestion => !formData.interests.includes(suggestion))
                .map(suggestion => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => addInterest(suggestion)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '999px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(234, 222, 218, 0.9)',
                      cursor: 'pointer'
                    }}
                  >
                    {suggestion}
                  </button>
              ))}
            </div>
          </div>
          
          <div style={{ marginTop: '16px' }}>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}
