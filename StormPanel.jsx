import { useEffect, useState } from "react";
import axios from "axios";

function StormPanel() {
  const [storm, setStorm] = useState(null);

  const [seconds, setSeconds] = useState(
    2 * 60 * 60 + 34 * 60 + 18
  );

  useEffect(() => {
    const fetchStorm = () => {
      axios
        .get("http://127.0.0.1:8000/api/storm")
        .then((response) => {
          setStorm(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch storm data:", error);
        });
    };

    fetchStorm();

    const interval = setInterval(fetchStorm, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 0) return 0;
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!storm) {
    return (
      <div className="storm-panel">
        Loading storm data...
      </div>
    );
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(remainingSeconds).padStart(2, "0")}`;

  return (
    <div className="storm-panel">

      <div className="storm-panel-header">

        <div>
          <span className="live-badge">
            ● LIVE STORM
          </span>

          <h2>{storm.storm.id}</h2>
        </div>

        <div className="storm-eta">
          <small>ETA</small>
          <strong>{formattedTime}</strong>
        </div>

      </div>

      <div className="storm-details">

        <div>
          <span>Movement</span>
          <strong>
            {storm.storm.direction} ↗
          </strong>
        </div>

        <div>
          <span>Speed</span>
          <strong>
            {storm.storm.speed} km/h
          </strong>
        </div>

        <div>
          <span>Lightning</span>
          <strong>
            {storm.lightning.risk}
          </strong>
        </div>

        <div>
          <span>Hail</span>
          <strong>
            {storm.hail.risk}
          </strong>
        </div>

      </div>

    </div>
  );
}

export default StormPanel;