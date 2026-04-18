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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', width: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ color: 'var(--color-primary)', textShadow: '0 0 10px rgba(130, 2, 99, 0.5)' }}>Exploring Sector...</h2>
      <p style={{ marginBottom: '10px' }}>Scanning for matches within {preferences.maxDistanceLY} Light years</p>

      <OrbitSystem />
    </div>
  );
}
