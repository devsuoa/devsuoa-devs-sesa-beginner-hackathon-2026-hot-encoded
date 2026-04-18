import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useTransitionContext } from '../context/TransitionContext';
import { useAppContext } from '../context/AppContext';

const KawaiiRocket = ({ alienImg }: { alienImg?: string }) => {
  return (
    <svg viewBox="0 0 100 150" width="130" height="195" style={{ filter: 'drop-shadow(0px 10px 20px rgba(217, 3, 104, 0.4))' }}>
      {/* Fins Behind */}
      <path d="M20,95 L5,125 C5,130 15,135 25,130 L25,110 Z" fill="#820263" stroke="#2E294E" strokeWidth="3" />
      <path d="M80,95 L95,125 C95,130 85,135 75,130 L75,110 Z" fill="#820263" stroke="#2E294E" strokeWidth="3" />
      
      {/* Main Body */}
      <path 
        d="M50,15 C30,15 22,45 22,85 L22,115 C22,125 35,135 50,135 C65,135 78,125 78,115 L78,85 C78,45 70,15 50,15 Z" 
        fill="#FFFFFF" 
        stroke="#2E294E" 
        strokeWidth="3"
      />
      
      {/* Nose Cone */}
      <path 
        d="M50,15 C35,15 25,30 22,50 C38,40 62,40 78,50 C75,30 65,15 50,15 Z" 
        fill="#D90368" 
        stroke="#2E294E" 
        strokeWidth="3"
      />

      {/* Center Fin (Front) */}
      <path d="M42,110 L42,138 C42,142 58,142 58,138 L58,110 Z" fill="#D90368" stroke="#2E294E" strokeWidth="3" />

      {/* Window Outer */}
      <circle cx="50" cy="75" r="18" fill="#2E294E" />
      
      {/* Window Inner / Alien Face */}
      <defs>
        <clipPath id="window-clip">
          <circle cx="50" cy="75" r="14" />
        </clipPath>
      </defs>
      
      <circle cx="50" cy="75" r="14" fill="#EADEDA" />
      
      {alienImg && (
        <image 
          href={alienImg} 
          x="36" y="61" 
          width="28" height="28" 
          clipPath="url(#window-clip)"
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      
      {/* Shine on window */}
      {!alienImg && <path d="M43,68 Q45,65 50,65" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />}
    </svg>
  );
};

export const RocketTransition = () => {
  const { isLaunching, launchData, destination, finalizeNav } = useTransitionContext();
  const { preferences } = useAppContext();
  const [particles, setParticles] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleEnterChat = () => {
    if (destination) {
      navigate(destination);
      finalizeNav();
    }
  };

  useEffect(() => {
    if (isLaunching) {
      setParticles(Array.from({ length: 120 }).map((_, i) => i));
    } else {
      setTimeout(() => setParticles([]), 500);
    }
  }, [isLaunching]);

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" 
              result="gooey" 
            />
          </filter>
        </defs>
      </svg>

      <AnimatePresence>
        {isLaunching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', 
              top: 0, left: 0, 
              width: '100%', height: '100%', 
              pointerEvents: 'auto', 
              zIndex: 9999,
              background: 'rgba(46, 41, 78, 0.5)',
              backdropFilter: 'blur(3px)'
            }}
          >
            {/* Fullscreen Gooey Container for Smoke and Heart */}
            <div 
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                filter: 'url(#gooey)',
                zIndex: 1
              }}
            >
              {particles.map((i) => {
                const delay = i * 0.025; // 120 particles * 0.025s = 3.0s total emission period
                // Ends emitting smoke exactly when the heart is fully formed!
                const progress = delay / 4.0; // rocket takes 4.0s total
                const sidewaysBase = (Math.random() - 0.5);
                return (
                  <motion.div
                    key={i}
                    initial={{ y: 0, x: 0, scale: 0.2, opacity: 1 }}
                    animate={{ 
                      y: [0, 80],   // Gentle drift downwards like exhaust
                      x: [0, sidewaysBase * 80], // Drifts sideways and spreads
                      scale: [0.2, 2.0, 0], // Grows larger for more volume, then shrinks
                      opacity: [0, 1, 1, 0] // Fade in and out
                    }}
                    transition={{
                      duration: 1.5, // 1.5s lifespan per particle puff
                      delay,
                      ease: "easeOut",
                    }}
                    style={{
                      position: 'absolute',
                      top: `calc(110vh - ${progress * 140}vh + 120px)`, // Track the rocket perfectly linearly
                      left: '50%',
                      marginLeft: '-25px', // Center the 50px div
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: i % 2 === 0 ? 'var(--color-secondary)' : 'var(--color-white)'
                    }}
                  />
                );
              })}
            </div>

            {/* The Crisp White Heart (Moved outside gooey filter so smoke collisions don't deform it) */}
            <motion.svg
              viewBox="0 0 24 24"
              initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: [0, 1.2, 1], opacity: 1, x: "-50%", y: "-50%" }}
              transition={{ delay: 2.0, duration: 1.0, ease: "backOut" }}
              style={{
                position: 'absolute',
                top: '46%', // Shifted to be optically balanced
                left: '50%',
                width: '500px',
                height: '500px',
                zIndex: 5
              }}
            >
              <path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                fill="var(--color-white)" 
              />
            </motion.svg>

            {/* The Rocket Moving Up */}
            <motion.div
              initial={{ top: '110vh' }}
              animate={{ top: '-40vh' }} // Push it a bit higher offscreen since it's larger now
              transition={{ duration: 4.0, ease: "linear" }}
              style={{
                position: 'absolute',
                left: '50%',
                marginLeft: '-65px', // 130px width / 2
                zIndex: 6
              }}
            >
              <KawaiiRocket alienImg={launchData?.alienImg} />
            </motion.div>

            {/* "IT'S A MATCH!" Text inside the Smoke Heart */}
            <motion.div
              initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: [0, 1.1, 1], opacity: 1, x: "-50%", y: "-50%" }}
              transition={{ delay: 2.2, duration: 0.8, ease: "backOut" }}
              style={{
                position: 'absolute',
                top: '43%', // Optically perfect center inside the heart SVG
                left: '50%',
                transformOrigin: 'center center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                fontSize: '3.5rem',
                fontWeight: '900',
                textShadow: '0 0 10px rgba(234, 222, 218, 0.5)',
                lineHeight: '1.1',
                zIndex: 10
              }}
            >
              <span>IT'S A</span>
              <span>MATCH!</span>
            </motion.div>

            {/* User and Match Avatars */}
            <motion.div
              initial={{ scale: 0, opacity: 0, x: "-50%" }}
              animate={{ scale: 1, opacity: 1, x: "-50%" }}
              transition={{ delay: 2.8, duration: 0.6, ease: "backOut" }}
              style={{
                position: 'absolute',
                top: '55%', // Moved up slightly from 59%
                left: '50%',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                zIndex: 15
              }}
            >
              {/* User Avatar (Profile Pic or Initials) */}
              <div style={{
                width: '76px', height: '76px', borderRadius: '50%', overflow: 'hidden', 
                border: '3px solid var(--color-primary)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                background: preferences?.profilePic ? 'var(--color-bg)' : 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-white)', fontSize: '1.5rem', fontWeight: 'bold'
              }}>
                {preferences?.profilePic ? (
                  <img src={preferences.profilePic} alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span>{preferences?.name ? preferences.name.substring(0, 2).toUpperCase() : 'ME'}</span>
                )}
              </div>

              {/* Heart Icon */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 3.2, duration: 0.4, ease: "backOut" }}
                style={{ color: 'var(--color-secondary)' }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </motion.div>

              {/* Alien Avatar */}
              <div style={{
                width: '76px', height: '76px', borderRadius: '50%', overflow: 'hidden', 
                border: '3px solid var(--color-secondary)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                background: 'var(--color-bg)'
              }}>
                {launchData?.alienImg && (
                  <img src={launchData.alienImg} alt="Alien" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
            </motion.div>

            {/* Manual Enter Chat Button */}
            <motion.div
              initial={{ opacity: 0, x: "-50%", y: 30 }}
              animate={{ opacity: 1, x: "-50%", y: 0 }}
              transition={{ delay: 3.5, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '18%',
                left: '50%',
                zIndex: 20
              }}
            >
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(217, 3, 104, 0.8)' }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnterChat();
                }}
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'white',
                  border: 'none',
                  padding: '18px 48px',
                  borderRadius: '40px',
                  fontSize: '1.3rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: '900',
                  boxShadow: '0 8px 30px rgba(217, 3, 104, 0.5)',
                  cursor: 'pointer'
                }}
              >
                Open Transmission
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
