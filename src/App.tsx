import { Routes, Route, Link, useLocation } from 'react-router';
import Signup from './pages/Signup';
import Preferences from './pages/Preferences';
import Home from './pages/home/Home';
import Signup from './pages/Signup';
import Explore from './pages/Explore';
import Chat from './pages/Chat';
import { Rocket } from 'lucide-react';

function App() {
  const location = useLocation();
  const hideExploreLink = location.pathname === '/' || location.pathname === '/preferences';
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <Rocket className="inline-block mr-2" size={24} style={{ verticalAlign: 'text-bottom', color: 'var(--color-secondary)' }} />
          SSTRUK
        </Link>
        {!isHomePage && (
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/explore" className="btn-outline" style={{ padding: '6px 16px', fontSize: '0.9rem' }}>Explore</Link>
          </div>
        )}
      </nav>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
