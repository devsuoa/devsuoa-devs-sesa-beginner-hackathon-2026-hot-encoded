import { useState, useEffect } from 'react';
import type { AlienProfile } from '../data/mockAliens';
import { X, Heart, Info, Globe, Wind, Thermometer } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getCompatibility } from '../utils/compatibility';
import { getScientificWarnings } from '../utils/scienceWarnings';

interface ProfileModalProps {
  alien: AlienProfile;
  onClose: () => void;
  onMatch: (alien: AlienProfile) => void;
  onDismiss: (alien: AlienProfile) => void;
}

export default function ProfileModal({ alien, onClose, onMatch, onDismiss }: ProfileModalProps) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const { preferences } = useAppContext();
  const compatibility = getCompatibility(alien, preferences);
  const warnings = getScientificWarnings(alien);
  const warnedLabels = new Set(warnings.map(w => w.label.toLowerCase()));

  // Helper: return red/orange border colour if a stat is flagged
  const dangerFor = (key: string) => {
    const w = warnings.find(w => w.label.toLowerCase().includes(key.toLowerCase()));
    if (!w) return 'rgba(234, 222, 218, 0.1)';
    return w.severity === 'danger' ? 'rgba(220, 38, 38, 0.6)' : 'rgba(245, 158, 11, 0.6)';
  };
  void warnedLabels;

  useEffect(() => {
    setSwipeDirection(null);
  }, [alien.id]);

  const handleMatch = () => {
    setSwipeDirection('right');
    setTimeout(() => onMatch(alien), 300);
  };

  const handleDismiss = () => {
    setSwipeDirection('left');
    setTimeout(() => onDismiss(alien), 300);
  };

  return (
    <>
      <style>{`
        .swipe-card {
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }
        .swipe-card.left {
          transform: translateX(-150%) rotate(-15deg);
          opacity: 0;
        }
        .swipe-card.right {
          transform: translateX(150%) rotate(15deg);
          opacity: 0;
        }
      `}</style>
      <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', width: '100%', maxWidth: '700px', justifyContent: 'center' }}>
        
        {/* Reject Button */}
        <button 
          onClick={handleDismiss}
          style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'rgba(46, 41, 78, 0.8)', border: '2px solid var(--color-white)',
            color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <X size={28} />
        </button>

        <div className={`glass-panel swipe-card ${swipeDirection || ''}`} style={{
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(15, 23, 42, 0.5)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        <div style={{
          width: '100%',
          height: '300px',
          backgroundImage: `url(${alien.profilePic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }} />

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--color-secondary)' }}>{alien.name}, {alien.age}</h2>
              <p style={{ margin: '4px 0 0', color: 'rgba(234, 222, 218, 0.8)' }}>
                {alien.alienType} • {alien.distanceLY} Light years Away
              </p>
            </div>
            
            {/* Compatibility Badge */}
            <div style={{ 
              background: `linear-gradient(135deg, ${compatibility >= 80 ? 'var(--color-primary), var(--color-secondary)' : 'rgba(234, 222, 218, 0.2), rgba(234, 222, 218, 0.1)'})`,
              padding: '8px 16px', 
              borderRadius: '20px',
              fontWeight: 'bold',
              boxShadow: compatibility >= 80 ? '0 4px 15px rgba(217, 3, 104, 0.4)' : 'none'
            }}>
              {compatibility.toFixed(1)}% Match
            </div>
          </div>

          <p style={{ fontSize: '1.1rem', lineHeight: 1.5, marginBottom: '24px' }}>
            "{alien.bio}"
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {alien.hobbies.map(h => (
              <span key={h} style={{
                background: 'rgba(217, 3, 104, 0.2)',
                border: '1px solid var(--color-secondary)',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.9rem'
              }}>
                {h}
              </span>
            ))}
          </div>

          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={18} /> Scientific Measures
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px', marginBottom: '32px' }}>
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', border: `1px solid ${dangerFor('gravity')}` }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{alien.gravityGs}G</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Gravity</div>
            </div>
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', border: `1px solid ${dangerFor('oxygen')}` }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{alien.oxygenPercent}%</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Atmospheric Oxygen</div>
            </div>
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', border: `1px solid ${dangerFor('temperature') || dangerFor('heat') || dangerFor('cold')}` }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Thermometer size={20} />{alien.homeTemperatureC.toLocaleString()}°C
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Surface Temperature</div>
            </div>
            <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: `1px solid ${dangerFor('surface') || dangerFor('ocean')}` }}>
              {alien.planetType === 'Gas Giant' ? <Wind size={20} /> : <Globe size={20} />}
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{alien.planetType}</span>
            </div>
          </div>

          </div>
        </div>
        
        {/* Match Button */}
        <button 
          onClick={handleMatch}
          style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', border: 'none',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(217, 3, 104, 0.5)',
            cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart size={28} fill="white" />
        </button>
      </div>
    </div>
    </>
  );
}
