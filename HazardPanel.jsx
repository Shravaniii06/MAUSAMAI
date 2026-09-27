import { useEffect, useState } from "react";
import axios from "axios";

function HazardPanel() {
  const [hazards, setHazards] = useState(null);

  useEffect(() => {
    const fetchHazards = () => {
      axios
        .get("http://127.0.0.1:8000/api/hazards")
        .then((response) => {
          setHazards(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch hazard data:", error);
        });
    };

    fetchHazards();

    const interval = setInterval(fetchHazards, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!hazards) {
    return (
      <div className="hazard-panel">
        Loading hazard intelligence...
      </div>
    );
  }

  return (
    <div className="hazard-panel">

      <div className="panel-title">
        <h2>⚠️ Hazard Intelligence</h2>
        <span>0–6 HR FORECAST</span>
      </div>

      <div className="hazard-grid">

        <div className="hazard-card lightning">
          <div className="hazard-icon">⚡</div>

          <div>
            <small>LIGHTNING</small>
            <strong>{hazards.lightning.risk}</strong>
            <p>
              {hazards.lightning.strikes} strikes detected
            </p>
          </div>
        </div>

        <div className="hazard-card hail">
          <div className="hazard-icon">🌨️</div>

          <div>
            <small>HAIL</small>
            <strong>{hazards.hail.risk}</strong>
            <p>
              Probability: {hazards.hail.probability}%
            </p>
          </div>
        </div>

        <div className="hazard-card wind">
          <div className="hazard-icon">💨</div>

          <div>
            <small>DOWNBURST</small>
            <strong>{hazards.downburst.risk}</strong>
            <p>
              Max wind: {hazards.downburst.maxWind} km/h
            </p>
          </div>
        </div>

        <div className="hazard-card cloudburst">
          <div className="hazard-icon">🌧️</div>

          <div>
            <small>CLOUDBURST</small>
            <strong>{hazards.cloudburst.risk}</strong>
            <p>
              Probability: {hazards.cloudburst.probability}%
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default HazardPanel;