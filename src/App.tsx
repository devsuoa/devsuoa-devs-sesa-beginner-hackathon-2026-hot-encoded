import { Routes, Route, Link, useLocation } from 'react-router';
import Signup from './pages/Signup';
import Preferences from './pages/Preferences';
import Home from './pages/home/Home';
import Explore from './pages/Explore';
import Chat from './pages/Chat';
import { RocketTransition } from './components/RocketTransition';
import UserProfileWidget from './components/UserProfileWidget';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-container">
      {!isHomePage && (
        <div style={{ position: 'absolute', top: '24px', left: '32px', zIndex: 100 }}>
          <Link to="/" style={{ display: 'inline-block' }}>
            <img src={`${import.meta.env.BASE_URL}SSTRUK-logo.png?v=5`} alt="SSTRUK Logo" style={{ height: '80px', objectFit: 'contain' }} />
          </Link>
        </div>
      )}
      {!isHomePage && <UserProfileWidget />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </main>

      <RocketTransition />
    </div>
  );
}

export default App;
