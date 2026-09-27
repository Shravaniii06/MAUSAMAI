import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
  CircleMarker,
  Polygon,
} from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

function Map() {
  const [storm, setStorm] = useState(null);

  const [movementEnabled, setMovementEnabled] = useState(true);

  const [layers, setLayers] = useState({
    radar: true,
    satellite: false,
    lightning: true,
    track: true,
    hazard: true,
  });

  useEffect(() => {
    const fetchStorm = () => {
      axios
        .get("http://127.0.0.1:8000/api/storm")
        .then((response) => {
          setStorm(response.data.storm);
        })
        .catch((error) => {
          console.error("Failed to fetch map storm data:", error);
        });
    };

    fetchStorm();

    const interval = setInterval(fetchStorm, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/movement")
      .then((response) => {
        setMovementEnabled(response.data.enabled);
      })
      .catch((error) => {
        console.error("Failed to fetch movement status:", error);
      });
  }, []);

  const toggleLayer = (layerName) => {
    setLayers((previous) => ({
      ...previous,
      [layerName]: !previous[layerName],
    }));
  };

  const toggleMovement = async () => {
    try {
      if (movementEnabled) {
        await axios.post(
          "http://127.0.0.1:8000/api/movement/stop"
        );

        setMovementEnabled(false);
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/movement/start"
        );

        setMovementEnabled(true);
      }
    } catch (error) {
      console.error("Failed to change storm movement:", error);
    }
  };

  if (!storm) {
    return (
      <div className="weather-map-loading">
        <div className="loading-spinner"></div>

        <strong>
          Loading MAUSAMAI Weather Intelligence...
        </strong>

        <span>
          Connecting to storm data service
        </span>
      </div>
    );
  }

  const position = [
    storm.latitude,
    storm.longitude,
  ];

  /*
    Demo forecast path.
    It moves together with the active storm.
  */
  const forecastPositions = [
    position,

    [
      storm.latitude + 0.025,
      storm.longitude + 0.035,
    ],

    [
      storm.latitude + 0.050,
      storm.longitude + 0.070,
    ],

    [
      storm.latitude + 0.075,
      storm.longitude + 0.105,
    ],

    [
      storm.latitude + 0.100,
      storm.longitude + 0.140,
    ],

    [
      storm.latitude + 0.125,
      storm.longitude + 0.175,
    ],
  ];

  /*
    Lightning locations move with the storm.
  */
  const lightningPositions = [
    [
      storm.latitude + 0.012,
      storm.longitude + 0.018,
    ],

    [
      storm.latitude - 0.014,
      storm.longitude + 0.027,
    ],

    [
      storm.latitude + 0.022,
      storm.longitude - 0.024,
    ],

    [
      storm.latitude - 0.021,
      storm.longitude - 0.016,
    ],

    [
      storm.latitude + 0.008,
      storm.longitude - 0.034,
    ],

    [
      storm.latitude + 0.031,
      storm.longitude + 0.006,
    ],

    [
      storm.latitude - 0.006,
      storm.longitude + 0.045,
    ],

    [
      storm.latitude + 0.040,
      storm.longitude - 0.010,
    ],
  ];

  return (
    <div className="professional-map">

      {/* TOP STATUS BAR */}

      <div className="map-status-bar">

        <div className="map-status-left">

          <span className="map-live-dot"></span>

          <div>
            <strong>
              LIVE WEATHER INTELLIGENCE
            </strong>

            <small>
              MAUSAMAI • CONVECTIVE MONITORING
            </small>
          </div>

        </div>

        <div className="map-status-right">

          <div>
            <span>STORM</span>
            <strong>{storm.intensity}</strong>
          </div>

          <div>
            <span>MOTION</span>
            <strong>{storm.direction} ↗</strong>
          </div>

          <div>
            <span>SPEED</span>
            <strong>{storm.speed} km/h</strong>
          </div>

        </div>

      </div>


      {/* MAP */}

      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
        }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* DATA LAYER CONTROL */}

        <div className="layer-control professional-layer-control">

          <div className="layer-title">
            <span>◈</span>
            DATA LAYERS
          </div>

          <label>
            <input
              type="checkbox"
              checked={layers.radar}
              onChange={() =>
                toggleLayer("radar")
              }
            />

            <span className="layer-color radar-color"></span>

            Radar
          </label>

          <label>
            <input
              type="checkbox"
              checked={layers.satellite}
              onChange={() =>
                toggleLayer("satellite")
              }
            />

            <span className="layer-color satellite-color"></span>

            Satellite
          </label>

          <label>
            <input
              type="checkbox"
              checked={layers.lightning}
              onChange={() =>
                toggleLayer("lightning")
              }
            />

            <span className="layer-color lightning-color"></span>

            Lightning
          </label>

          <label>
            <input
              type="checkbox"
              checked={layers.track}
              onChange={() =>
                toggleLayer("track")
              }
            />

            <span className="layer-color track-color"></span>

            Storm Track
          </label>

          <label>
            <input
              type="checkbox"
              checked={layers.hazard}
              onChange={() =>
                toggleLayer("hazard")
              }
            />

            <span className="layer-color hazard-color"></span>

            Hazard Zone
          </label>

        </div>


        {/* MOVEMENT CONTROL */}

        <div className="storm-movement-control">

          <div className="movement-title">
            🌩️ STORM SIMULATION
          </div>

          <button
            onClick={toggleMovement}
            className={
              movementEnabled
                ? "movement-button running"
                : "movement-button stopped"
            }
          >
            {movementEnabled
              ? "⏸ STOP MOVEMENT"
              : "▶ START MOVEMENT"}
          </button>

          <small>
            {movementEnabled
              ? "Storm cell is moving NE"
              : "Storm movement paused"}
          </small>

        </div>


        {/* RADAR */}

        {layers.radar && (
          <>
            <Polygon
              positions={[
                [21.00, 78.80],
                [21.15, 78.95],
                [21.30, 79.10],
                [21.20, 79.30],
                [21.00, 79.20],
                [20.90, 79.00],
              ]}
              pathOptions={{
                color: "#ef4444",
                fillColor: "#ef4444",
                fillOpacity: 0.12,
                weight: 1,
              }}
            />

            <Polygon
              positions={[
                [21.05, 78.95],
                [21.15, 79.05],
                [21.25, 79.15],
                [21.18, 79.25],
                [21.05, 79.18],
                [20.98, 79.05],
              ]}
              pathOptions={{
                color: "#f97316",
                fillColor: "#f97316",
                fillOpacity: 0.20,
                weight: 1,
              }}
            />

            <Polygon
              positions={[
                [21.10, 79.02],
                [21.18, 79.10],
                [21.23, 79.18],
                [21.15, 79.22],
                [21.07, 79.14],
              ]}
              pathOptions={{
                color: "#facc15",
                fillColor: "#facc15",
                fillOpacity: 0.25,
                weight: 1,
              }}
            />
          </>
        )}


        {/* SATELLITE */}

        {layers.satellite && (
          <>
            <Polygon
              positions={[
                [20.90, 78.75],
                [21.05, 78.70],
                [21.25, 78.82],
                [21.38, 79.02],
                [21.30, 79.25],
                [21.10, 79.35],
                [20.90, 79.20],
                [20.82, 78.95],
              ]}
              pathOptions={{
                color: "#a855f7",
                fillColor: "#7e22ce",
                fillOpacity: 0.12,
                weight: 1,
              }}
            />

            <Circle
              center={position}
              radius={18000}
              pathOptions={{
                color: "#d946ef",
                fillColor: "#d946ef",
                fillOpacity: 0.15,
              }}
            />
          </>
        )}


        {/* HAZARD ZONE */}

        {layers.hazard && (
          <>
            <Circle
              center={position}
              radius={28000}
              pathOptions={{
                color: "#ef4444",
                fillColor: "#ef4444",
                fillOpacity: 0.10,
                weight: 2,
              }}
            />

            <Circle
              center={position}
              radius={16000}
              pathOptions={{
                color: "#f97316",
                fillColor: "#f97316",
                fillOpacity: 0.15,
                weight: 1,
              }}
            />
          </>
        )}


        {/* STORM TRACK */}

        {layers.track && (
          <>
            <Polyline
              positions={forecastPositions}
              pathOptions={{
                color: "#facc15",
                weight: 4,
                dashArray: "10 8",
              }}
            />

            {forecastPositions
              .slice(1)
              .map((forecastPosition, index) => (
                <CircleMarker
                  key={index}
                  center={forecastPosition}
                  radius={6}
                  pathOptions={{
                    color: "#facc15",
                    fillColor: "#facc15",
                    fillOpacity: 0.85,
                    weight: 2,
                  }}
                >

                  <Popup>
                    <strong>
                      🌩️ Forecast Position
                    </strong>

                    <br />

                    Nowcast:
                    {" "}
                    +{index + 1} HR

                    <br />

                    Direction:
                    {" "}
                    {storm.direction}
                  </Popup>

                </CircleMarker>
              ))}

          </>
        )}


        {/* LIGHTNING */}

        {layers.lightning &&
          lightningPositions.map(
            (lightningPosition, index) => (
              <CircleMarker
                key={index}
                center={lightningPosition}
                radius={5}
                pathOptions={{
                  color: "#ffffff",
                  fillColor: "#facc15",
                  fillOpacity: 1,
                  weight: 2,
                }}
              >

                <Popup>

                  <strong>
                    ⚡ Lightning Detection
                  </strong>

                  <br />

                  Status: LIVE

                  <br />

                  Confidence: 92%

                </Popup>

              </CircleMarker>
            )
          )}


        {/* MAIN MOVING STORM MARKER */}

        <CircleMarker
          center={position}
          radius={14}
          pathOptions={{
            color: "#ffffff",
            fillColor: "#ef4444",
            fillOpacity: 0.95,
            weight: 3,
          }}
        >

          <Popup>

            <strong>
              🌩️ MAUSAMAI Storm Cell
            </strong>

            <br />
            <br />

            <strong>
              {storm.id}
            </strong>

            <br />

            Latitude:
            {" "}
            {storm.latitude.toFixed(4)}

            <br />

            Longitude:
            {" "}
            {storm.longitude.toFixed(4)}

            <br />

            Movement:
            {" "}
            {storm.direction} ↗

            <br />

            Speed:
            {" "}
            {storm.speed} km/h

            <br />

            Intensity:
            {" "}
            {storm.intensity}

          </Popup>

        </CircleMarker>


        {/* LEAFLET MARKER */}

        <Marker position={position}>

          <Popup>

            <strong>
              🌩️ ACTIVE CONVECTIVE CELL
            </strong>

            <br />

            {storm.id}

            <br />

            Intensity:
            {" "}
            {storm.intensity}

          </Popup>

        </Marker>

      </MapContainer>


      {/* BOTTOM INFO */}

      <div className="map-bottom-panel">

        <div className="map-cell-info">

          <span>ACTIVE CELL</span>

          <strong>
            {storm.id}
          </strong>

        </div>


        <div className="map-cell-info">

          <span>POSITION</span>

          <strong>
            {storm.latitude.toFixed(4)}
            °N{" "}
            {storm.longitude.toFixed(4)}
            °E
          </strong>

        </div>


        <div className="map-cell-info">

          <span>INTENSITY</span>

          <strong className="intensity-high">
            ● {storm.intensity}
          </strong>

        </div>


        <div className="map-cell-info">

          <span>NOWCAST</span>

          <strong>
            0–6 HR
          </strong>

        </div>

      </div>


      <div className="map-demo-notice">

        DEMO DATA • Radar, satellite & lightning visualization

      </div>

    </div>
  );
}

export default Map;