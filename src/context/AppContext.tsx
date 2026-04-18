import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { AlienProfile } from '../data/mockAliens';

export interface UserPreferences {
  name: string;
  age: string;
  species: string;
  planet: string;
  bio: string;
  interests: string[];
  limbs: number;
  alienType: string;
  size: string;
  maxDistanceLY: number;
  goals: string;
  profilePic: string; // URL or base64
}

interface AppContextType {
  preferences: UserPreferences | null;
  setPreferences: (prefs: UserPreferences) => void;
  matches: AlienProfile[];
  addMatch: (alien: AlienProfile) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferencesState] = useState<UserPreferences | null>(null);
  const [matches, setMatches] = useState<AlienProfile[]>([]);

  const setPreferences = (prefs: UserPreferences) => {
    setPreferencesState(prefs);
  };

  const addMatch = (alien: AlienProfile) => {
    if (!matches.find(m => m.id === alien.id)) {
      setMatches([...matches, alien]);
    }
  };

  return (
    <AppContext.Provider value={{ preferences, setPreferences, matches, addMatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
