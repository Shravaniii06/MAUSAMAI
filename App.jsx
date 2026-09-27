import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import Map from "./components/Map";
import StormPanel from "./components/StormPanel";
import HazardPanel from "./components/HazardPanel";
import ForecastTimeline from "./components/ForecastTimeline";
import EnvironmentalPanel from "./components/EnvironmentalPanel";
import AIEnginePanel from "./components/AIEnginePanel";

function App() {
  return (
    <div className="app">
      <Header />

      <div className="main-layout">
        <Sidebar />

        <main className="content">

          <div className="dashboard-intro">
            <div>
              <div className="intro-kicker">
                भारत का AI WEATHER INTELLIGENCE SYSTEM
              </div>

              <h1>
                मौसम समझो <span>•</span> पहले संभलो
              </h1>

              <p>
                Hyperlocal Convective Storm Nowcasting & Early Warning
              </p>
            </div>

            <div className="intro-live">
              <span></span>
              SYSTEM OPERATIONAL
            </div>
          </div>

          <StatsCards />

          <section className="map-container">
            <Map />
          </section>

          <StormPanel />

          <div className="dashboard-two-column">
            <HazardPanel />
            <ForecastTimeline />
          </div>

          <EnvironmentalPanel />

          <AIEnginePanel />

          <div className="dashboard-footer">
            <div>
              <strong>🌩️ मौसम AI</strong>
              <span>Predict • Prepare • Protect</span>
            </div>

            <div>DEMO / SIMULATION MODE</div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;