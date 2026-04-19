import { useEffect } from 'react';
import type { AlienProfile } from '../data/mockAliens';
import { Heart } from 'lucide-react';
import { useRocketNav } from '../context/TransitionContext';

interface MatchOverlayProps {
  alien: AlienProfile;
  userName: string;
}

export default function MatchOverlay({ alien, userName }: MatchOverlayProps) {
  const triggerRocketNav = useRocketNav();

  useEffect(() => {
    // Trigger rocket navigation after 2 seconds (giving time to see the match)
    const timer = setTimeout(() => {
      triggerRocketNav(`/chat/${alien.id}`);
    }, 2000);
    return () => clearTimeout(timer);
  }, [triggerRocketNav, alien.id]);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(130, 2, 99, 0.9)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      color: 'white',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseHeart {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
      
      <h1 style={{ fontSize: '3.5rem', fontStyle: 'italic', marginBottom: '40px', textShadow: '0 4px 20px rgba(0,0,0,0.5)', textAlign: 'center' }}>
        YOU'VE BEEN STARSTRUCK!
      </h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '40px' }}>
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'var(--color-dark)', border: '4px solid var(--color-white)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold'
        }}>
          {userName.substring(0, 1).toUpperCase()}
        </div>
        
        <Heart size={64} fill="var(--color-secondary)" style={{ animation: 'pulseHeart 1s infinite' }} />
        
        <img 
          src={alien.profilePic} 
          alt={alien.name} 
          style={{
            width: '120px', height: '120px', borderRadius: '50%',
            objectFit: 'cover', border: '4px solid var(--color-white)',
            boxShadow: '0 0 30px rgba(234, 222, 218, 0.5)'
          }} 
        />
      </div>

      <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>
        Opening transmission to {alien.name}...
      </p>
    </div>
  );
}
