import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { Settings, X, Edit2, MapPin, Globe, Zap, Target } from 'lucide-react';

export default function UserProfileWidget() {
  const { preferences } = useAppContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!preferences) return null;

  return (
    <>
      <style>{`
        @keyframes slideInPanel {
          from { opacity: 0; transform: translateY(-10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .profile-panel {
          animation: slideInPanel 0.25s ease-out;
        }
        .profile-avatar-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .profile-avatar-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px var(--color-secondary);
        }
      `}</style>

      {/* Avatar Button */}
      <button
        className="profile-avatar-btn"
        onClick={() => setIsOpen(o => !o)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '2px solid var(--color-secondary)',
          background: preferences.profilePic
            ? `url(${preferences.profilePic}) center/cover`
            : 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          cursor: 'pointer',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          boxShadow: '0 0 12px rgba(217, 3, 104, 0.4)',
          flexShrink: 0,
        }}
        title="Your Profile"
        aria-label="Open profile panel"
      >
        {!preferences.profilePic && (
          <Settings size={22} />
        )}
      </button>

      {/* Slide-out Panel */}
      {isOpen && (
        <div
          className="profile-panel glass-panel"
          style={{
            position: 'fixed',
            top: '88px',
            right: '24px',
            width: '300px',
            zIndex: 199,
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(217, 3, 104, 0.3)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>

          {/* Profile Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '2px solid var(--color-secondary)',
              background: preferences.profilePic
                ? `url(${preferences.profilePic}) center/cover`
                : 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.3rem',
              color: 'white',
            }}>
              {!preferences.profilePic && preferences.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 style={{ margin: 0, color: 'var(--color-secondary)', fontSize: '1.2rem' }}>
                {preferences.name}
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.85rem', opacity: 0.7 }}>
                {preferences.species} • {preferences.age && `${preferences.age} yrs`}
              </p>
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {preferences.planet && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', opacity: 0.85 }}>
                <MapPin size={14} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <span>{preferences.planet}</span>
              </div>
            )}
            {preferences.bio && (
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75, lineHeight: 1.4, fontStyle: 'italic' }}>
                "{preferences.bio.length > 80 ? preferences.bio.substring(0, 80) + '…' : preferences.bio}"
              </p>
            )}
          </div>

          {/* Preferences Summary */}
          <div style={{
            background: 'rgba(217, 3, 104, 0.08)',
            border: '1px solid rgba(217, 3, 104, 0.2)',
            borderRadius: '10px',
            padding: '14px',
            marginBottom: '18px',
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6 }}>
              Match Preferences
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Globe size={13} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <span style={{ opacity: 0.8 }}>Seeking:</span>
                <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{preferences.alienType}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Zap size={13} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <span style={{ opacity: 0.8 }}>Size:</span>
                <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{preferences.size}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Target size={13} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <span style={{ opacity: 0.8 }}>Max distance:</span>
                <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{preferences.maxDistanceLY} LY</span>
              </div>
            </div>
          </div>

          {/* Edit Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => { setIsOpen(false); navigate('/signup'); }}
              className="btn-outline"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', fontSize: '0.85rem' }}
            >
              <Edit2 size={14} /> Profile
            </button>
            <button
              onClick={() => { setIsOpen(false); navigate('/preferences'); }}
              className="btn-primary"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', fontSize: '0.85rem' }}
            >
              <Settings size={14} /> Prefs
            </button>
          </div>
        </div>
      )}

      {/* Click-outside backdrop (transparent) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 198,
          }}
        />
      )}
    </>
  );
}
