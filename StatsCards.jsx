import { useEffect, useState } from "react";
import axios from "axios";

function StatsCards() {
  const [stormData, setStormData] = useState(null);

  useEffect(() => {
    const fetchStormData = () => {
      axios
        .get("http://127.0.0.1:8000/api/storm")
        .then((response) => {
          setStormData(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch storm data:", error);
        });
    };

    fetchStormData();

    const interval = setInterval(fetchStormData, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!stormData) {
    return <div className="stats">Loading storm data...</div>;
  }

  return (
    <section className="stats">

      <div className="stat-card">
        <span>ACTIVE STORMS</span>
        <strong>
          {String(stormData.activeStorms).padStart(2, "0")}
        </strong>
      </div>

      <div className="stat-card">
        <span>LIGHTNING</span>
        <strong>
          {stormData.lightning.strikes}
        </strong>
      </div>

      <div className="stat-card">
        <span>HAIL RISK</span>
        <strong>
          {stormData.hail.risk}
        </strong>
      </div>

      <div className="stat-card">
        <span>MAX WIND</span>
        <strong>
          {stormData.downburst.maxWind} km/h
        </strong>
      </div>

    </section>
  );
}

export default StatsCards;