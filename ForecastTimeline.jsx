import { useEffect, useState } from "react";
import axios from "axios";

function ForecastTimeline() {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchForecast = () => {
      axios
        .get("http://127.0.0.1:8000/api/forecast")
        .then((response) => {
          setForecast(response.data.forecast);
        })
        .catch((error) => {
          console.error("Failed to fetch forecast:", error);
        });
    };

    fetchForecast();

    const interval = setInterval(fetchForecast, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!forecast) {
    return (
      <div className="forecast-panel">
        Loading forecast...
      </div>
    );
  }

  return (
    <div className="forecast-panel">

      <div className="panel-title">
        <h2>🕒 Storm Evolution</h2>
        <span>0–6 HOUR NOWCAST</span>
      </div>

      <div className="timeline">

        {forecast.map((item, index) => (
          <div className="timeline-item" key={index}>

            <div className="timeline-time">
              {item.time}
            </div>

            <div
              className={`timeline-dot ${item.risk.toLowerCase()}`}
            >
              ●
            </div>

            <div className="timeline-content">
              <strong>{item.risk}</strong>

              <p>{item.event}</p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ForecastTimeline;