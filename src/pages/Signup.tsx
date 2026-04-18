import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';

export default function Signup() {
  const navigate = useNavigate();
  const { setPreferences } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: '',
    limbs: 4,
    alienType: 'Humanoid',
    size: 'Medium',
    maxDistanceAU: 10,
    profilePic: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreferences(formData);
    navigate('/explore');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'limbs' || name === 'maxDistanceAU' ? Number(value) : value
    }));
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', padding: '20px', boxSizing: 'border-box' }}>
      <div className="glass-panel" style={{ padding: '40px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--color-secondary)' }}>Welcome to SSTRUK</h1>
        <p style={{ textAlign: 'center', marginBottom: '32px', color: 'rgba(234, 222, 218, 0.8)' }}>
          Enter your details and preferences to find your perfect alien match.
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Your Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Earthling Name" />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Preferred Limbs</label>
              <input type="number" min="0" name="limbs" value={formData.limbs} onChange={handleChange} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Preferred Size</label>
              <select name="size" value={formData.size} onChange={handleChange}>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Colossal">Colossal</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Preferred Alien Type</label>
            <input type="text" name="alienType" value={formData.alienType} onChange={handleChange} placeholder="e.g. Neon Synth, Draconian..." />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Max Distance (AU)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <input type="range" name="maxDistanceAU" min="1" max="100" value={formData.maxDistanceAU} onChange={handleChange} style={{ flex: 1 }} />
              <span style={{ width: '40px', textAlign: 'right' }}>{formData.maxDistanceAU}</span>
            </div>
          </div>
          
          <div style={{ marginTop: '16px' }}>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Launch Search</button>
          </div>
        </form>
      </div>
    </div>
  );
}
