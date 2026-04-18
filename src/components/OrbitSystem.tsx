import { useState, useEffect } from 'react';
import { mockAliens } from '../data/mockAliens';
import type { AlienProfile } from '../data/mockAliens';
import { useAppContext } from '../context/AppContext';
import ProfileModal from './ProfileModal';
import { getCompatibility } from '../utils/compatibility';
import { useRocketNav } from '../context/TransitionContext';

export default function OrbitSystem() {
  const { preferences, addMatch, matches } = useAppContext();
  const triggerRocketNav = useRocketNav();
  const [selectedAlien, setSelectedAlien] = useState<AlienProfile | null>(null);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  
  // Keep exactly 5 slots for the 5 orbit tracks
  const [activeIds, setActiveIds] = useState<(string | null)[]>([null, null, null, null, null]);

  useEffect(() => {
    if (!preferences) return;
    
    // Available aliens are those within distance, not matched, not dismissed, and not currently active
    const available = mockAliens.filter(a => 
      a.distanceAU <= preferences.maxDistanceAU &&
      !matches.find(m => m.id === a.id) &&
      !dismissedIds.has(a.id) &&
      !activeIds.includes(a.id)
    );

    // Sort available aliens by compatibility descending, so the queue is ordered
    // from highest match to lowest match. The next alien pulled will always be the highest remaining match.
    available.sort((a, b) => getCompatibility(b, preferences) - getCompatibility(a, preferences));

    let changed = false;
    const newActiveIds = [...activeIds];
    
    // Check each of the 5 tracks
    for (let i = 0; i < 5; i++) {
      const currentId = newActiveIds[i];
      // Check if the current alien in this track is still valid
      const isStillValid = currentId && 
        mockAliens.find(a => a.id === currentId && a.distanceAU <= preferences.maxDistanceAU) &&
        !matches.find(m => m.id === currentId) &&
        !dismissedIds.has(currentId);

      if (!isStillValid) {
        // The slot is empty or invalid, pull a new alien from available pool
        const nextAlien = available.shift();
        newActiveIds[i] = nextAlien ? nextAlien.id : null;
        changed = true;
      }
    }

    if (changed) {
      setActiveIds(newActiveIds);
    }
  }, [preferences, matches, dismissedIds, activeIds]);

  if (!preferences) return null;

  const handleMatch = (alien: AlienProfile) => {
    addMatch(alien);
    setSelectedAlien(null);
    triggerRocketNav(`/chat/${alien.id}`, { alienImg: alien.profilePic });
  };

  const handleDismiss = (alien: AlienProfile) => {
    setDismissedIds(prev => {
      const newSet = new Set(prev);
      newSet.add(alien.id);
      return newSet;
    });

    // Find the next available alien in activeIds
    const currentIndex = activeIds.indexOf(alien.id);
    let nextId = null;
    if (currentIndex >= 0) {
      for(let i=1; i<5; i++) {
        const candidate = activeIds[(currentIndex + i) % 5];
        if (candidate && candidate !== alien.id) {
          nextId = candidate;
          break;
        }
      }
    }

    if (nextId) {
      const nextAlien = mockAliens.find(a => a.id === nextId);
      setSelectedAlien(nextAlien || null);
    } else {
      setSelectedAlien(null);
    }
  };


  return (
    <>
      <style>{`
        @keyframes orbit {
          from { offset-distance: 0%; }
          to   { offset-distance: 100%; }
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
          width: 60px;
          height: 60px;
          margin-top: -30px; /* Center relative to offset path */
          margin-left: -30px;
          border-radius: 50%;
          cursor: pointer;
          offset-path: ellipse(var(--rx) var(--ry) at 50% 50%);
          offset-rotate: 0deg;
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

      <div style={{ position: 'relative', width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* User Center */}
        <div style={{
          width: '12vmin',
          height: '12vmin',
          minWidth: '60px',
          minHeight: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          boxShadow: '0 0 30px var(--color-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          zIndex: 10,
          fontSize: 'clamp(1rem, 2.5vmin, 1.5rem)',
          color: 'white'
        }}>
          {preferences.name.substring(0, 2).toUpperCase() || 'YOU'}
        </div>

        {/* Orbit Rings and Aliens */}
        {activeIds
          .map(id => id ? mockAliens.find(a => a.id === id) : null)
          .filter((a): a is AlienProfile => a !== null && a !== undefined)
          // Sort by compatibility descending so the highest match is in the innermost track
          .sort((a, b) => getCompatibility(b, preferences) - getCompatibility(a, preferences))
          .map((alien, i) => {

          // Assign each slot to a distinct track (0 to 4)
          const rx = 120 + (i * 65); 
          const ry = 80 + (i * 40);  
          const duration = 15 + (i * 8); 
          
          const delay = -1 * (i * (duration / 5));

          return (
            <div key={`track-${i}-${alien.id}`}>
              {/* Ring */}
              <div className="orbit-ring" style={{ width: `${rx * 2}px`, height: `${ry * 2}px` }} />
              
              {/* Profile */}
              <div 
                className="orbit-item"
                onClick={() => setSelectedAlien(alien)}
                style={{
                  backgroundImage: `url(${alien.profilePic})`,
                  // @ts-ignore
                  '--rx': `${rx}px`,
                  '--ry': `${ry}px`,
                  '--duration': `${duration}s`,
                  animationDelay: `${delay}s`
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
          onDismiss={handleDismiss}
        />
      )}

    </>
  );
}
