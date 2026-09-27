const stormData = {
  system: {
    name: "MAUSAMAI",
    status: "LIVE",
    forecastWindow: "0–6 HR",
    lastUpdated: "Just now",
  },

  activeStorms: 4,

  lightning: {
    strikes: 87,
    density: "HIGH",
    risk: "HIGH",
  },

  hail: {
    risk: "MODERATE",
    probability: 64,
    size: "2–3 cm",
  },

  downburst: {
    risk: "LOW",
    probability: 28,
    maxWind: 72,
  },

  cloudburst: {
    risk: "WATCH",
    probability: 41,
    rainfallRate: 48,
  },

  storm: {
    id: "Convective Cell #01",
    latitude: 21.1458,
    longitude: 79.0882,
    direction: "NE",
    speed: 42,
    intensity: "HIGH",
  },
};

export default stormData;