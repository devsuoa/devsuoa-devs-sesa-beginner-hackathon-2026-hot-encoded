import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TransitionContextType {
  isLaunching: boolean;
  launchData: any;
  destination: string | null;
  triggerRocketNav: (path: string, data?: any) => void;
  finalizeNav: () => void;
}

export const TransitionContext = createContext<TransitionContextType | undefined>(undefined);


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
