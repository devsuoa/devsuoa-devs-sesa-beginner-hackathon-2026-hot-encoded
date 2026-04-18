export interface AlienProfile {
  id: string;
  name: string;
  alienType: string;
  limbs: number;
  size: string; // e.g. "Small", "Medium", "Large", "Colossal"
  distanceAU: number;
  profilePic: string;
  
  // Dating Info
  bio: string;
  age: number;
  hobbies: string[];

  // Scientific Measures
  gravityGs: number;
  oxygenPercent: number;
  planetType: 'Gas Giant' | 'Solid Ground' | 'All Water';
}

export const mockAliens: AlienProfile[] = [
  {
    id: "alien-1",
    name: "Glaxion",
    alienType: "Neon Synth",
    limbs: 4,
    size: "Medium",
    distanceAU: 4.2,
    profilePic: "/alien_glax.png",
    bio: "Just a glowing being looking for someone to share binary sunsets with. I love long flights through nebula clouds.",
    age: 420,
    hobbies: ["Stargazing", "Quantum Chess", "Nebula Surfing"],
    gravityGs: 2.5,
    oxygenPercent: 5,
    planetType: "Gas Giant"
  },
  {
    id: "alien-2",
    name: "Zorblax",
    alienType: "Aquatic Siren",
    limbs: 8,
    size: "Small",
    distanceAU: 12.8,
    profilePic: "/alien_zorblax.png",
    bio: "Water you up to? I'm quite the catch! Looking for a land-dweller to show me around the solid ground.",
    age: 185,
    hobbies: ["Deep Sea Weaving", "Coral Sculpting", "Hydro-acoustics"],
    gravityGs: 0.8,
    oxygenPercent: 12,
    planetType: "All Water"
  },
  {
    id: "alien-3",
    name: "Vex'tar",
    alienType: "Draconian",
    limbs: 4,
    size: "Large",
    distanceAU: 1.5,
    profilePic: "/alien_vex.png",
    bio: "Tough scales, soft heart. Need someone who can handle the heat. Let's make some craters together.",
    age: 890,
    hobbies: ["Volcano Diving", "Asteroid Mining", "Heavy Metal (Literally)"],
    gravityGs: 1.5,
    oxygenPercent: 18,
    planetType: "Solid Ground"
  }
];
