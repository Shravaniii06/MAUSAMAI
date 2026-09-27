import { useEffect, useState } from "react";
import axios from "axios";

function AIEnginePanel() {
  const [ai, setAi] = useState(null);

  useEffect(() => {
    const fetchAI = () => {
      axios
        .get("http://127.0.0.1:8000/api/ai-engine")
        .then((response) => setAi(response.data))
        .catch((error) => {
          console.error("Failed to fetch AI engine data:", error);
        });
    };

    fetchAI();

    const interval = setInterval(fetchAI, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!ai) {
    return (
      <section className="ai-panel">
        <div className="ai-loading">
          Connecting to मौसम AI Engine...
        </div>
      </section>
    );
  }

  const metrics = [
    ["Storm Detection", ai.stormDetection],
    ["Movement Prediction", ai.movementPrediction],
    ["Lightning Risk", ai.lightningRisk],
    ["Hail Probability", ai.hailProbability],
  ];

  const inputs = [
    ["📡", "Radar", ai.inputs.radar],
    ["🛰️", "Satellite", ai.inputs.satellite],
    ["⚡", "Lightning", ai.inputs.lightning],
    ["🌡️", "Ground Data", ai.inputs.ground],
  ];

  return (
    <section className="ai-panel">

      <div className="ai-header">

        <div className="ai-title">
          <div className="ai-icon">◉</div>

          <div>
            <div className="ai-kicker">
              INTELLIGENCE LAYER
            </div>

            <h2>
              मौसम AI <span>ENGINE</span>
            </h2>

            <p>
              Convective Storm Intelligence & Prediction
            </p>
          </div>
        </div>

        <div className="ai-status">
          <span></span>
          {ai.status}
        </div>

      </div>

      <div className="ai-metrics">

        {metrics.map(([name, value]) => (
          <div className="ai-metric" key={name}>

            <div className="ai-metric-top">
              <span>{name}</span>
              <strong>{value}%</strong>
            </div>

            <div className="ai-progress">
              <div
                className="ai-progress-fill"
                style={{ width: `${value}%` }}
              />
            </div>

          </div>
        ))}

      </div>

      <div className="ai-input-section">

        <div className="ai-section-title">
          <span>INPUT DATA STREAMS</span>
          <small>REAL-TIME</small>
        </div>

        <div className="ai-input-grid">

          {inputs.map(([icon, name, status]) => (
            <div className="ai-input-card" key={name}>

              <div className="ai-input-icon">
                {icon}
              </div>

              <div>
                <strong>{name}</strong>

                <small>
                  <span className="connected-dot"></span>
                  {status}
                </small>
              </div>

            </div>
          ))}

        </div>

      </div>

      <div className="ai-footer">

        <div>
          <span>FORECAST HORIZON</span>
          <strong>{ai.forecastHorizon}</strong>
        </div>

        <div>
          <span>AI ENGINE</span>
          <strong>मौसम AI</strong>
        </div>

        <div>
          <span>DATA UPDATE</span>
          <strong>10 SEC</strong>
        </div>

      </div>

      <div className="ai-demo-note">
        DEMO MODEL OUTPUT • VALIDATED ML MODEL TO BE INTEGRATED
      </div>

    </section>
  );
}

export default AIEnginePanel;