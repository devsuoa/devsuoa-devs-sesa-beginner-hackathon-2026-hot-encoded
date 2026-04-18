const fs = require('fs');
let content = fs.readFileSync('src/data/mockAliens.ts', 'utf8');

const types = {
  "Glaxion": "Alien",
  "Zorblax": "Alien",
  "Vex'tar": "Alien",
  "Crystalia": "Alien",
  "Spore'rel": "Alien",
  "Lyra": "Alien",
  "Lumina": "Hybrid",
  "Zarok": "Hybrid",
  "Squish": "Alien",
  "Xeno": "Alien",
  "Cyra": "Hybrid",
  "Ignis": "Human",
  "Sparky": "Alien",
  "Kaelen": "Human"
};

for (const [name, type] of Object.entries(types)) {
  const regex = new RegExp(`name: "${name}",\\s*alienType: "[^"]+"`, 'g');
  content = content.replace(regex, `name: "${name}",\n    alienType: "${type}"`);
}
fs.writeFileSync('src/data/mockAliens.ts', content);
