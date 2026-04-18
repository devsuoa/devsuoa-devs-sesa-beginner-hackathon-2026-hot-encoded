import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

interface TransitionContextType {
  isLaunching: boolean;
  launchData: any;
  destination: string | null;
  triggerRocketNav: (path: string, data?: any) => void;
  finalizeNav: () => void;
}

export const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

const heartSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,25 C50,25 25,0 0,25 C-25,50 25,90 50,100 C75,90 125,50 100,25 C75,0 50,25 50,25 Z" fill="black"/></svg>`;

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchData, setLaunchData] = useState<any>(null);
  const [destination, setDestination] = useState<string | null>(null);

  const triggerRocketNav = (path: string, data?: any) => {
    if (isLaunching) return;
    setLaunchData(data);
    setDestination(path);
    setIsLaunching(true);
  };

  const finalizeNav = () => {
    setIsLaunching(false);
    setLaunchData(null);
    setDestination(null);
  };

  return (
    <TransitionContext.Provider value={{ isLaunching, launchData, destination, triggerRocketNav, finalizeNav }}>
      <motion.div 
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </motion.div>
    </TransitionContext.Provider>
  );
};

export const useRocketNav = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useRocketNav must be used within a TransitionProvider');
  }
  return context.triggerRocketNav;
};

export const useTransitionContext = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionContext must be used within a TransitionProvider');
  }
  return context;
};
