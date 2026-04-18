export interface AlienProfile {
  id: string;
  name: string;
  alienType: string;
  limbs: number;
  size: string; // e.g. "Small", "Medium", "Large", "Colossal"
  distanceAU: number;
  profilePic: string;
  compatibilityPercent: number; // Randomly generated between 50 and 99.5
  
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
    compatibilityPercent: 87.4,
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
    compatibilityPercent: 92.1,
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
    compatibilityPercent: 76.8,
    bio: "Tough scales, soft heart. Need someone who can handle the heat. Let's make some craters together.",
    age: 890,
    hobbies: ["Volcano Diving", "Asteroid Mining", "Heavy Metal (Literally)"],
    gravityGs: 1.5,
    oxygenPercent: 18,
    planetType: "Solid Ground"
  },
  {
    id: "alien-4",
    name: "Crystalia",
    alienType: "Crystalline Entity",
    limbs: 4,
    size: "Medium",
    distanceAU: 25.4,
    profilePic: "/alien_crystal.png",
    compatibilityPercent: 98.2,
    bio: "I may look fragile, but my heart is a diamond. Looking for someone to refract the light of the cosmos with.",
    age: 1200,
    hobbies: ["Prism Alignment", "Sonic Resonance Meditation", "Jewelry Making"],
    gravityGs: 1.2,
    oxygenPercent: 21,
    planetType: "Solid Ground"
  },
  {
    id: "alien-5",
    name: "Spore'rel",
    alienType: "Fungal Sporeling",
    limbs: 6,
    size: "Small",
    distanceAU: 8.9,
    profilePic: "/alien_fungal.png",
    compatibilityPercent: 88.5,
    bio: "I'm a fun guy! (Get it?) Looking for a fertile mind to grow old together.",
    age: 45,
    hobbies: ["Decomposition", "Bioluminescent Dancing", "Networking (Mycelial)"],
    gravityGs: 0.5,
    oxygenPercent: 8,
    planetType: "Solid Ground"
  },
  {
    id: "alien-6",
    name: "Lyra",
    alienType: "Plasma Being",
    limbs: 0,
    size: "Medium",
    distanceAU: 55.0,
    profilePic: "/alien_plasma.png",
    compatibilityPercent: 61.3,
    bio: "Pure energy trapped in a containment suit. Hoping to find a spark. Warning: Handle with insulated gloves.",
    age: 8000,
    hobbies: ["Solar Surfing", "Fusion Cooking", "Philosophy"],
    gravityGs: 10.0,
    oxygenPercent: 0,
    planetType: "Gas Giant"
  },
  {
    id: "alien-7",
    name: "Klik'thok",
    alienType: "Insectoid Hivemind",
    limbs: 6,
    size: "Small",
    distanceAU: 18.2,
    profilePic: "/alien_zorblax.png", 
    compatibilityPercent: 71.9,
    bio: "We are many, but looking for the one. Do not mind the clicking sounds, it's just affection.",
    age: 12,
    hobbies: ["Collective Thinking", "Burrowing", "Sugar Consumption"],
    gravityGs: 1.1,
    oxygenPercent: 15,
    planetType: "Solid Ground"
  },
  {
    id: "alien-8",
    name: "Gloop",
    alienType: "Amorphous Blob",
    limbs: 0,
    size: "Colossal",
    distanceAU: 40.5,
    profilePic: "/alien_glax.png",
    compatibilityPercent: 55.4,
    bio: "Just looking for someone to merge with. Literally. I promise I won't dissolve you.",
    age: 300,
    hobbies: ["Sliding", "Absorbing Objects", "Interpretive Dance"],
    gravityGs: 0.2,
    oxygenPercent: 2,
    planetType: "All Water"
  }
];
