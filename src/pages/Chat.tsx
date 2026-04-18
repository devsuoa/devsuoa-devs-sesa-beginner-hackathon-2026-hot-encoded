import { useParams, Link } from 'react-router';
import { useAppContext } from '../context/AppContext';

export default function Chat() {
  const { id } = useParams();
  const { matches } = useAppContext();
  
  const alien = matches.find(m => m.id === id);

  if (!alien) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Transmission Lost</h2>
        <p>We couldn't connect you to this alien.</p>
        <Link to="/explore" className="btn-outline" style={{ display: 'inline-block', marginTop: '20px' }}>Return to Orbit</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
        
        {/* Chat Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={alien.profilePic} alt={alien.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>{alien.name}</h3>
            <span style={{ fontSize: '0.8rem', color: 'rgba(234, 222, 218, 0.6)' }}>{alien.alienType} • {alien.distanceAU} AU away</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <div style={{ textAlign: 'center', margin: '20px 0', color: 'rgba(234, 222, 218, 0.4)', fontSize: '0.9rem' }}>
            Connection established across {alien.distanceAU} AU. Say hello!
          </div>
        </div>

        {/* Chat Input */}
        <div style={{ padding: '20px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="Send a transmission..." style={{ flex: 1 }} />
          <button className="btn-primary">Send</button>
        </div>

      </div>
    </div>
  );
}
