from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from threading import Lock
import time

from data.storm_data import (
    storm_data,
    forecast_data,
    observations,
    ai_engine,
)

app = FastAPI(
    title="MAUSAMAI API",
    description="AI-Powered Hyperlocal Convective Storm Nowcasting API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

movement_enabled = True
movement_lock = Lock()

last_update = time.time()

# Demo movement speed.
# This is visualization/demo motion, NOT real storm physics.
MOVE_LAT = 0.0018
MOVE_LON = 0.0028


def update_storm_position():
    global last_update

    now = time.time()

    # Move approximately every 10 seconds
    if now - last_update < 10:
        return

    with movement_lock:
        if not movement_enabled:
            last_update = now
            return

        storm = storm_data["storm"]

        # NE movement
        storm["latitude"] += MOVE_LAT
        storm["longitude"] += MOVE_LON

        last_update = now


@app.get("/")
def home():
    return {
        "message": "MAUSAMAI API is running",
        "status": "LIVE",
    }


@app.get("/api/storm")
def get_storm():
    update_storm_position()
    return storm_data


@app.get("/api/hazards")
def get_hazards():
    return {
        "lightning": storm_data["lightning"],
        "hail": storm_data["hail"],
        "downburst": storm_data["downburst"],
        "cloudburst": storm_data["cloudburst"],
    }


@app.get("/api/forecast")
def get_forecast():
    return {
        "forecast": forecast_data
    }


@app.get("/api/observations")
def get_observations():
    return observations


@app.get("/api/ai-engine")
def get_ai_engine():
    return ai_engine


@app.get("/api/movement")
def get_movement_status():
    return {
        "enabled": movement_enabled
    }


@app.post("/api/movement/start")
def start_movement():
    global movement_enabled

    with movement_lock:
        movement_enabled = True

    return {
        "enabled": True,
        "message": "Storm movement started"
    }


@app.post("/api/movement/stop")
def stop_movement():
    global movement_enabled

    with movement_lock:
        movement_enabled = False

    return {
        "enabled": False,
        "message": "Storm movement stopped"
    }