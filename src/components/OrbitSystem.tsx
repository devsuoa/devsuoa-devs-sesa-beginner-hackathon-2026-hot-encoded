import { useState } from 'react';
import { mockAliens } from '../data/mockAliens';
import type { AlienProfile } from '../data/mockAliens';
import { useAppContext } from '../context/AppContext';
import ProfileModal from './ProfileModal';
import MatchOverlay from './MatchOverlay';

export default function OrbitSystem() {
  const { preferences, addMatch } = useAppContext();
  const [selectedAlien, setSelectedAlien] = useState<AlienProfile | null>(null);
  const [matchedAlien, setMatchedAlien] = useState<AlienProfile | null>(null);

  if (!preferences) return null;

  // Filter aliens based on max distance
  const visibleAliens = mockAliens.filter(a => a.distanceAU <= preferences.maxDistanceAU);
  
  const handleMatch = (alien: AlienProfile) => {
    addMatch(alien);
    setSelectedAlien(null);
    setMatchedAlien(alien);
  };

  return (
    <>
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(var(--radius)) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(var(--radius)) rotate(-360deg); }
        }
        .orbit-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 3px dashed rgba(217, 3, 104, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .orbit-item {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -30px;
          margin-left: -30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          cursor: pointer;
          animation: orbit var(--duration) linear infinite;
        }
        .orbit-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(234, 222, 218, 0.2);
          border: 2px solid var(--color-primary);
          background-size: cover;
          background-position: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .orbit-item:hover {
          z-index: 50;
          animation-play-state: paused;
        }
        .orbit-item:hover .orbit-avatar {
          transform: scale(1.2);
          box-shadow: 0 0 25px var(--color-secondary);
        }
      `}</style>

      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* User Center */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          boxShadow: '0 0 30px var(--color-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          zIndex: 10,
          fontSize: '1.2rem',
          color: 'white'
        }}>
          {preferences.name.substring(0, 2).toUpperCase() || 'YOU'}
        </div>

        {/* Orbit Rings and Aliens */}
        {visibleAliens.map((alien, i) => {
          // Calculate radius based on distance (min 80px, max 280px)
          const radiusRatio = preferences.maxDistanceAU > 0 ? alien.distanceAU / preferences.maxDistanceAU : 1;
          const radius = 80 + (radiusRatio * 200);
          const duration = 15 + (radius / 10); // Slower orbit for further objects
          const startAngle = (i * (360 / visibleAliens.length));

          return (
            <div key={alien.id}>
              {/* Ring */}
              <div className="orbit-ring" style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }} />
              
              {/* Profile */}
              <div 
                className="orbit-item"
                onClick={() => setSelectedAlien(alien)}
                style={{
                  backgroundImage: `url(${alien.profilePic})`,
                  // @ts-ignore
                  '--radius': `${radius}px`,
                  '--duration': `${duration}s`,
                  animationDelay: `-${startAngle}s` // Stagger start positions
                }}
                title={`${alien.name} (${alien.distanceAU} AU)`}
              >
                <div className="orbit-avatar" style={{ backgroundImage: `url(${alien.profilePic})` }} />
              </div>
            </div>
          );
        })}
      </div>

      {selectedAlien && (
        <ProfileModal 
          alien={selectedAlien} 
          onClose={() => setSelectedAlien(null)} 
          onMatch={handleMatch} 
        />
      )}

      {matchedAlien && (
        <MatchOverlay 
          alien={matchedAlien} 
          userName={preferences.name || 'User'} 
        />
      )}
    </>
  );
}
