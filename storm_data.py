storm_data = {
    "activeStorms": 4,

    "storm": {
        "id": "Convective Cell #01",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "direction": "NE",
        "speed": 42,
        "intensity": "HIGH",
    },

    "lightning": {
        "strikes": 87,
        "risk": "HIGH",
    },

    "hail": {
        "risk": "MODERATE",
        "probability": 64,
    },

    "downburst": {
        "risk": "LOW",
        "maxWind": 72,
    },

    "cloudburst": {
        "risk": "WATCH",
        "probability": 41,
    },
}


forecast_data = [
    {
        "time": "NOW",
        "risk": "HIGH",
        "event": "Storm detected",
    },
    {
        "time": "+1 HR",
        "risk": "HIGH",
        "event": "Lightning increasing",
    },
    {
        "time": "+2 HR",
        "risk": "HIGH",
        "event": "Hail possible",
    },
    {
        "time": "+3 HR",
        "risk": "MODERATE",
        "event": "Heavy rainfall",
    },
    {
        "time": "+4 HR",
        "risk": "MODERATE",
        "event": "Storm weakening",
    },
    {
        "time": "+5 HR",
        "risk": "LOW",
        "event": "Rainfall decreasing",
    },
    {
        "time": "+6 HR",
        "risk": "LOW",
        "event": "Cell dissipating",
    },
]


observations = {
    "temperature": 29.4,
    "humidity": 78,
    "pressure": 1004.8,
    "windSpeed": 42,
    "windDirection": "NE",
    "rainfall": 18.6,
    "lightningRate": 14,
    "radarReflectivity": 48,
}

ai_engine = {
    "status": "ACTIVE",
    "stormDetection": 94,
    "movementPrediction": 89,
    "lightningRisk": 92,
    "hailProbability": 64,
    "cloudburstProbability": 41,
    "forecastHorizon": "0–6 HOURS",
    "inputs": {
        "radar": "CONNECTED",
        "satellite": "CONNECTED",
        "lightning": "CONNECTED",
        "ground": "CONNECTED",
    },
}