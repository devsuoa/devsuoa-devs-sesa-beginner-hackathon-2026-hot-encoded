import type { AlienProfile } from '../data/mockAliens';

export interface ScientificWarning {
  label: string;
  alienValue: string;
  earthValue: string;
  severity: 'danger' | 'warning'; // danger = lethal/extreme, warning = uncomfortable
  description: string;
}

// Earth baseline values
const EARTH_GRAVITY = 1.0;
const EARTH_OXYGEN = 21;
const EARTH_TEMP_C = 15;
const EARTH_PLANET = 'Solid Ground';

export function getScientificWarnings(alien: AlienProfile): ScientificWarning[] {
  const warnings: ScientificWarning[] = [];

  // --- Gravity ---
  const gravDiff = alien.gravityGs - EARTH_GRAVITY;
  if (alien.gravityGs > 3.0) {
    warnings.push({
      label: 'Extreme Gravity',
      alienValue: `${alien.gravityGs}G`,
      earthValue: `${EARTH_GRAVITY}G`,
      severity: 'danger',
      description: `Gravity is ${alien.gravityGs}x Earth's. Your bones and organs would be crushed under the pressure.`,
    });
  } else if (alien.gravityGs > 1.8) {
    warnings.push({
      label: 'High Gravity',
      alienValue: `${alien.gravityGs}G`,
      earthValue: `${EARTH_GRAVITY}G`,
      severity: 'warning',
      description: `Gravity is ${alien.gravityGs}x Earth's. You would experience severe joint and cardiovascular strain.`,
    });
  } else if (alien.gravityGs < 0.3) {
    warnings.push({
      label: 'Near-Zero Gravity',
      alienValue: `${alien.gravityGs}G`,
      earthValue: `${EARTH_GRAVITY}G`,
      severity: 'danger',
      description: `Gravity is only ${alien.gravityGs}x Earth's. Long-term exposure causes fatal bone density and muscle loss.`,
    });
  } else if (alien.gravityGs < 0.6) {
    warnings.push({
      label: 'Low Gravity',
      alienValue: `${alien.gravityGs}G`,
      earthValue: `${EARTH_GRAVITY}G`,
      severity: 'warning',
      description: `Gravity is only ${alien.gravityGs}x Earth's. Extended stays cause bone density loss and circulation issues.`,
    });
  }
  // suppress unused var warning
  void gravDiff;

  // --- Oxygen ---
  if (alien.oxygenPercent === 0) {
    warnings.push({
      label: 'No Oxygen',
      alienValue: `${alien.oxygenPercent}%`,
      earthValue: `${EARTH_OXYGEN}%`,
      severity: 'danger',
      description: 'There is no breathable oxygen. You would need a full life-support suit at all times.',
    });
  } else if (alien.oxygenPercent < 10) {
    warnings.push({
      label: 'Critically Low Oxygen',
      alienValue: `${alien.oxygenPercent}%`,
      earthValue: `${EARTH_OXYGEN}%`,
      severity: 'danger',
      description: `Atmospheric oxygen is only ${alien.oxygenPercent}% — far below survivable levels. Hypoxia would be near-instant.`,
    });
  } else if (alien.oxygenPercent < 17) {
    warnings.push({
      label: 'Low Oxygen',
      alienValue: `${alien.oxygenPercent}%`,
      earthValue: `${EARTH_OXYGEN}%`,
      severity: 'warning',
      description: `Atmospheric oxygen is ${alien.oxygenPercent}%. You would experience dizziness, fatigue, and shortness of breath.`,
    });
  } else if (alien.oxygenPercent > 30) {
    warnings.push({
      label: 'Hyperoxic Atmosphere',
      alienValue: `${alien.oxygenPercent}%`,
      earthValue: `${EARTH_OXYGEN}%`,
      severity: 'warning',
      description: `Atmospheric oxygen is ${alien.oxygenPercent}%. This hyperoxic environment risks oxygen toxicity and extreme fire hazard.`,
    });
  }

  // --- Temperature ---
  const tempDiff = alien.homeTemperatureC - EARTH_TEMP_C;
  void tempDiff;
  if (alien.homeTemperatureC > 1000) {
    warnings.push({
      label: 'Lethal Heat',
      alienValue: `${alien.homeTemperatureC.toLocaleString()}°C`,
      earthValue: `${EARTH_TEMP_C}°C`,
      severity: 'danger',
      description: `Surface temperature is ${alien.homeTemperatureC.toLocaleString()}°C. You would vaporise instantly without extreme shielding.`,
    });
  } else if (alien.homeTemperatureC > 60) {
    warnings.push({
      label: 'Extreme Heat',
      alienValue: `${alien.homeTemperatureC}°C`,
      earthValue: `${EARTH_TEMP_C}°C`,
      severity: 'danger',
      description: `Surface temperature is ${alien.homeTemperatureC}°C. This is above the threshold for human protein denaturation.`,
    });
  } else if (alien.homeTemperatureC > 40) {
    warnings.push({
      label: 'Very Hot Environment',
      alienValue: `${alien.homeTemperatureC}°C`,
      earthValue: `${EARTH_TEMP_C}°C`,
      severity: 'warning',
      description: `Surface temperature is ${alien.homeTemperatureC}°C. Risk of dangerous overheating and severe dehydration.`,
    });
  } else if (alien.homeTemperatureC < -150) {
    warnings.push({
      label: 'Lethal Cold',
      alienValue: `${alien.homeTemperatureC}°C`,
      earthValue: `${EARTH_TEMP_C}°C`,
      severity: 'danger',
      description: `Surface temperature is ${alien.homeTemperatureC}°C. Exposed tissue freezes in milliseconds. Survival is impossible unprotected.`,
    });
  } else if (alien.homeTemperatureC < -40) {
    warnings.push({
      label: 'Extreme Cold',
      alienValue: `${alien.homeTemperatureC}°C`,
      earthValue: `${EARTH_TEMP_C}°C`,
      severity: 'danger',
      description: `Surface temperature is ${alien.homeTemperatureC}°C. Severe frostbite and hypothermia would set in almost immediately.`,
    });
  } else if (alien.homeTemperatureC < -10) {
    warnings.push({
      label: 'Very Cold Environment',
      alienValue: `${alien.homeTemperatureC}°C`,
      earthValue: `${EARTH_TEMP_C}°C`,
      severity: 'warning',
      description: `Surface temperature is ${alien.homeTemperatureC}°C. You would require heavy cold-weather gear at all times.`,
    });
  }

  // --- Planet Type ---
  if (alien.planetType !== EARTH_PLANET) {
    if (alien.planetType === 'Gas Giant') {
      warnings.push({
        label: 'No Solid Surface',
        alienValue: 'Gas Giant',
        earthValue: 'Solid Ground',
        severity: 'danger',
        description: 'There is no solid surface. You would fall through perpetual crushing gas layers with no way to land.',
      });
    } else if (alien.planetType === 'All Water') {
      warnings.push({
        label: 'Ocean World',
        alienValue: 'All Water',
        earthValue: 'Solid Ground',
        severity: 'warning',
        description: 'The planet is entirely ocean. You would need full aquatic life support to survive on the surface.',
      });
    }
  }

  return warnings;
}
