import { useEffect, useState } from "react";
import axios from "axios";

function EnvironmentalPanel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchObservations = () => {
      axios
        .get("http://127.0.0.1:8000/api/observations")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(
            "Failed to fetch observations:",
            error
          );
        });
    };

    fetchObservations();

    const interval = setInterval(
      fetchObservations,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="environment-panel">
        Loading environmental data...
      </div>
    );
  }

  return (
    <section className="environment-panel">

      <div className="panel-title">
        <h2>🌦️ Environmental Conditions</h2>
        <span>LIVE OBSERVATIONS</span>
      </div>

      <div className="environment-grid">

        <div className="environment-card">
          <span>🌡️ TEMPERATURE</span>
          <strong>{data.temperature}°C</strong>
        </div>

        <div className="environment-card">
          <span>💧 HUMIDITY</span>
          <strong>{data.humidity}%</strong>
        </div>

        <div className="environment-card">
          <span>🧭 PRESSURE</span>
          <strong>{data.pressure} hPa</strong>
        </div>

        <div className="environment-card">
          <span>💨 WIND</span>
          <strong>{data.windSpeed} km/h</strong>
          <small>{data.windDirection}</small>
        </div>

        <div className="environment-card">
          <span>🌧️ RAINFALL</span>
          <strong>{data.rainfall} mm/hr</strong>
        </div>

        <div className="environment-card">
          <span>⚡ LIGHTNING</span>
          <strong>{data.lightningRate}/hr</strong>
        </div>

        <div className="environment-card">
          <span>📡 RADAR REFLECTIVITY</span>
          <strong>{data.radarReflectivity} dBZ</strong>
        </div>

      </div>

    </section>
  );
}

export default EnvironmentalPanel;