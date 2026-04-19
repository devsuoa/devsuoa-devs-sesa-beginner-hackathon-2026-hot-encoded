import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';

export default function Preferences() {
  const navigate = useNavigate();
  const { preferences, setPreferences } = useAppContext();

  const [formData, setFormData] = useState({
    alienType: preferences?.alienType === 'Humanoid' || !preferences?.alienType ? 'Open to all' : preferences.alienType,
    size: preferences?.size || 'No preference',
    maxDistanceLY: preferences?.maxDistanceLY || 10,
    goals: preferences?.goals || 'Long term fusion',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (preferences) {
      setPreferences({
        ...preferences,
        ...formData
      });
    }
    navigate('/explore');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxDistanceLY' ? Number(value) : value
    }));
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      overflowY: 'auto',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ width: '100%', maxWidth: '600px', paddingTop: '40px' }}>
        <div className="glass-panel" style={{ padding: '40px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--color-secondary)' }}>Your Preferences</h1>
          <p style={{ textAlign: 'center', marginBottom: '32px', color: 'rgba(234, 222, 218, 0.8)', fontWeight: 'bold', fontSize: '1.1rem' }}>
            What kind of being are you looking for?
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: 'var(--color-secondary)', marginBottom: '16px', fontSize: '1.1rem', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', textTransform: 'uppercase' }}>Biological Preferences</h3>

              <div className="form-group">
                <label>Preferred Biological Type</label>
                <select name="alienType" value={formData.alienType} onChange={handleChange}>
                  <option value="Human">Human</option>
                  <option value="Alien">Alien</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Open to all">Open to all</option>
                </select>
              </div>

              <div className="form-group">
                <label>Preferred Size</label>
                <select name="size" value={formData.size} onChange={handleChange}>
                  <option value="No preference">No preference</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Colossal">Colossal</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: 'var(--color-secondary)', marginBottom: '16px', fontSize: '1.1rem', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', textTransform: 'uppercase' }}>Relationship Goals</h3>

              <div className="form-group">
                <label>What are you seeking?</label>
                <select name="goals" value={formData.goals} onChange={handleChange}>
                  <option value="Short term orbit">Short term orbit</option>
                  <option value="Long term fusion">Long term fusion</option>
                  <option value="Galactic friendship">Galactic friendship</option>
                  <option value="Exploration">Exploration</option>
                </select>
              </div>

              <div className="form-group">
                <label>Max Distance (light years)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px 0' }}>
                  <input type="range" name="maxDistanceLY" min="0" max="100" value={formData.maxDistanceLY} onChange={handleChange} style={{ flex: 1 }} />
                  <span style={{ minWidth: '45px', textAlign: 'right', fontWeight: 'bold', color: 'var(--color-secondary)', fontSize: '1.1rem' }}>{formData.maxDistanceLY}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
              <button type="button" onClick={() => navigate('/')} className="btn-outline" style={{ flex: 1 }}>Back</button>
              <button type="submit" className="btn-primary" style={{ flex: 2 }}>Launch Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
