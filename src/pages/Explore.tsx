import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import OrbitSystem from '../components/OrbitSystem';

export default function Explore() {
  const { preferences } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!preferences) {
      // Redirect to signup if no preferences are set
      navigate('/');
    }
  }, [preferences, navigate]);

  if (!preferences) return null;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', width: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ 
        color: 'var(--color-secondary)', 
        textShadow: '0 0 15px rgba(217, 3, 104, 0.4)',
        fontSize: '2rem',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        Exploring Sector...
      </h2>
      <p style={{ 
        marginBottom: '24px',
        color: 'rgba(234, 222, 218, 0.8)',
        fontWeight: '500',
        fontSize: '1.1rem'
      }}>
        Scanning for potential matches within {preferences.maxDistanceLY} LY
      </p>

      <OrbitSystem />
    </div>
  );
}
