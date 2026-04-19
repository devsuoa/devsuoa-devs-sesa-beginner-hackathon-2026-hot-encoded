import { createContext, useState, useContext, useEffect } from 'react';
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
  clearPreferences: () => void;
  matches: AlienProfile[];
  addMatch: (alien: AlienProfile) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferencesState] = useState<UserPreferences | null>(() => {
    const saved = localStorage.getItem('aligned_preferences');
    return saved ? JSON.parse(saved) : null;
  });
  const [matches, setMatches] = useState<AlienProfile[]>(() => {
    const saved = localStorage.getItem('aligned_matches');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (preferences) {
      localStorage.setItem('aligned_preferences', JSON.stringify(preferences));
    }
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('aligned_matches', JSON.stringify(matches));
  }, [matches]);

  const setPreferences = (prefs: UserPreferences) => {
    setPreferencesState(prefs);
  };

  const clearPreferences = () => {
    setPreferencesState(null);
    setMatches([]);
    localStorage.removeItem('aligned_preferences');
    localStorage.removeItem('aligned_matches');
  };

  const addMatch = (alien: AlienProfile) => {
    if (!matches.find(m => m.id === alien.id)) {
      setMatches([...matches, alien]);
    }
  };

  return (
    <AppContext.Provider value={{ preferences, setPreferences, clearPreferences, matches, addMatch }}>
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
