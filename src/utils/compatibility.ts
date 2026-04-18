import type { AlienProfile } from '../data/mockAliens';
import type { UserPreferences } from '../context/AppContext';

// Size proximity
const sizeOrder = ['Small', 'Medium', 'Large', 'Colossal'];

// Type proximity
const typeOrder = ['Human', 'Hybrid', 'Alien'];

export function getCompatibility(alien: AlienProfile, prefs: UserPreferences | null): number {
  if (!prefs) return 50.0;
  
  let score = 40; // Base score
  
  // Size Match (max 25)
  if (prefs.size === alien.size) {
    score += 25;
  } else if (prefs.size === 'No preference' || !prefs.size) {
    score += 20;
  } else {
    const userSizeIdx = sizeOrder.indexOf(prefs.size);
    const alienSizeIdx = sizeOrder.indexOf(alien.size);
    if (userSizeIdx !== -1 && alienSizeIdx !== -1) {
      const diff = Math.abs(userSizeIdx - alienSizeIdx);
      if (diff === 1) score += 15; // Close
      else if (diff === 2) score += 5; // Farther
      // diff of 3 is 0 points
    }
  }

  // Type Match (max 25)
  if (prefs.alienType === 'Open to all' || !prefs.alienType) {
    score += 20;
  } else if (prefs.alienType === alien.alienType) {
    score += 25;
  } else {
    const userTypeIdx = typeOrder.indexOf(prefs.alienType);
    const alienTypeIdx = typeOrder.indexOf(alien.alienType);
    if (userTypeIdx !== -1 && alienTypeIdx !== -1) {
      const diff = Math.abs(userTypeIdx - alienTypeIdx);
      if (diff === 1) score += 15; // Human -> Hybrid, or Hybrid -> Alien
    }
  }

  // Distance Match (max 10)
  if (prefs.maxDistanceAU > 0) {
    const distanceScore = Math.max(0, 1 - (alien.distanceAU / prefs.maxDistanceAU));
    score += distanceScore * 10;
  } else {
    score += 5;
  }

  // Cap between 10.0 and 99.9
  return Math.min(99.9, Math.max(10.0, Math.round(score * 10) / 10));
}
