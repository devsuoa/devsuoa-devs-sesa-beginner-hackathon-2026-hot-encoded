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
  homeTemperatureC: number; // Average surface temperature in Celsius
  planetType: 'Gas Giant' | 'Solid Ground' | 'All Water';
}

export const mockAliens: AlienProfile[] = [
  {
    id: "alien-1",
    name: "Glaxion",
    alienType: "Alien",
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
    homeTemperatureC: 450,
    planetType: "Gas Giant"
  },
  {
    id: "alien-2",
    name: "Zorblax",
    alienType: "Alien",
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
    homeTemperatureC: 4,
    planetType: "All Water"
  },
  {
    id: "alien-3",
    name: "Vex'tar",
    alienType: "Alien",
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
    homeTemperatureC: 280,
    planetType: "Solid Ground"
  },
  {
    id: "alien-4",
    name: "Crystalia",
    alienType: "Alien",
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
    homeTemperatureC: 18,
    planetType: "Solid Ground"
  },
  {
    id: "alien-5",
    name: "Spore'rel",
    alienType: "Alien",
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
    homeTemperatureC: 10,
    planetType: "Solid Ground"
  },
  {
    id: "alien-6",
    name: "Lyra",
    alienType: "Alien",
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
    homeTemperatureC: 6000,
    planetType: "Gas Giant"
  },
  {
    id: "alien-7",
    name: "Lumina",
    alienType: "Hybrid",
    limbs: 4,
    size: "Large",
    distanceAU: 12.4,
    profilePic: "/alien_lumina.webp",
    compatibilityPercent: 94.2,
    bio: "I can show you the stars, literally. Looking for an Earthling to share my cosmic wisdom and glowing energy with.",
    age: 3500,
    hobbies: ["Energy Channeling", "Forest Walks", "Astral Projection"],
    gravityGs: 1.0,
    oxygenPercent: 21,
    homeTemperatureC: 20,
    planetType: "Solid Ground"
  },
  {
    id: "alien-8",
    name: "Zarok",
    alienType: "Hybrid",
    limbs: 4,
    size: "Medium",
    distanceAU: 8.1,
    profilePic: "/alien_zarok.webp",
    compatibilityPercent: 65.8,
    bio: "Serious, dedicated, and very logical. My third eye sees all possibilities. Seeking a companion who appreciates order.",
    age: 154,
    hobbies: ["Galactic Politics", "Telepathy", "Strategic Board Games"],
    gravityGs: 1.5,
    oxygenPercent: 16,
    homeTemperatureC: 8,
    planetType: "Solid Ground"
  },
  {
    id: "alien-9",
    name: "Squish",
    alienType: "Alien",
    limbs: 0,
    size: "Small",
    distanceAU: 3.3,
    profilePic: "/alien_squish.webp",
    compatibilityPercent: 89.9,
    bio: "I'm just a little guy! Extremely squishy and very affectionate. I will stick to you.",
    age: 5,
    hobbies: ["Absorbing Nutrients", "Bouncing", "Looking Cute"],
    gravityGs: 0.8,
    oxygenPercent: 25,
    homeTemperatureC: 26,
    planetType: "Solid Ground"
  },
  {
    id: "alien-10",
    name: "Xeno",
    alienType: "Alien",
    limbs: 4,
    size: "Colossal",
    distanceAU: 35.0,
    profilePic: "/alien_xeno.webp",
    compatibilityPercent: 52.1,
    bio: "Hiss... I mean, hello. Might look intimidating, but I'm really just a misunderstood collector of genetic material.",
    age: 40,
    hobbies: ["Hunting", "Acid Spitting", "Hiding in Vents"],
    gravityGs: 2.0,
    oxygenPercent: 5,
    homeTemperatureC: -90,
    planetType: "Gas Giant"
  },
  {
    id: "alien-11",
    name: "Cyra",
    alienType: "Hybrid",
    limbs: 4,
    size: "Medium",
    distanceAU: 66.6,
    profilePic: "/alien_cyra.jpeg",
    compatibilityPercent: 78.4,
    bio: "Drifting through the nebulas has made me quiet, but my bioluminescence speaks volumes.",
    age: 950,
    hobbies: ["Nebula Drifting", "Silent Meditation", "Cloak Making"],
    gravityGs: 0.5,
    oxygenPercent: 2,
    homeTemperatureC: -210,
    planetType: "Gas Giant"
  },
  {
    id: "alien-12",
    name: "Ignis",
    alienType: "Human",
    limbs: 4,
    size: "Medium",
    distanceAU: 2.1,
    profilePic: "/alien_ignis.jpeg",
    compatibilityPercent: 81.5,
    bio: "I bring greetings from the Scarlet Court. If you can handle high society and fiery personalities, we'll get along famously.",
    age: 320,
    hobbies: ["Diplomacy", "Fashion", "Sipping Plasma Wine"],
    gravityGs: 1.2,
    oxygenPercent: 18,
    homeTemperatureC: 38,
    planetType: "Solid Ground"
  },
  {
    id: "alien-13",
    name: "Sparky",
    alienType: "Alien",
    limbs: 4,
    size: "Small",
    distanceAU: 18.9,
    profilePic: "/alien_sparky.jpeg",
    compatibilityPercent: 91.2,
    bio: "I'm literally the light of the party! My head-stalks glow when I'm happy.",
    age: 22,
    hobbies: ["Creating Light Shows", "Exploring Dark Caves", "Eating Batteries"],
    gravityGs: 0.7,
    oxygenPercent: 15,
    homeTemperatureC: 22,
    planetType: "Solid Ground"
  },
  {
    id: "alien-14",
    name: "Kaelen",
    alienType: "Human",
    limbs: 4,
    size: "Medium",
    distanceAU: 9.5,
    profilePic: "/alien_kaelen.jpeg",
    compatibilityPercent: 96.7,
    bio: "Protector of the azure waterfalls. I'm looking for a partner to explore the wild flora and fauna of my home planet.",
    age: 205,
    hobbies: ["Vine Swinging", "Amulet Crafting", "Botany"],
    gravityGs: 1.0,
    oxygenPercent: 25,
    homeTemperatureC: 34,
    planetType: "Solid Ground"
  }
];
