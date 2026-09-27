function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-brand">
        <span>◈</span>
        <div>
          <strong>HAZARD CENTER</strong>
          <small>खतरा निगरानी</small>
        </div>
      </div>

      <div className="sidebar-section-title">
        ACTIVE HAZARDS
      </div>

      <div className="hazard-item lightning-item">
        <div className="hazard-symbol">⚡</div>

        <div className="hazard-copy">
          <strong>Lightning</strong>
          <small>87 strikes detected</small>
        </div>

        <div className="hazard-level high">
          HIGH
        </div>
      </div>

      <div className="hazard-item hail-item">
        <div className="hazard-symbol">🌨️</div>

        <div className="hazard-copy">
          <strong>Hail</strong>
          <small>64% probability</small>
        </div>

        <div className="hazard-level moderate">
          MOD
        </div>
      </div>

      <div className="hazard-item wind-item">
        <div className="hazard-symbol">💨</div>

        <div className="hazard-copy">
          <strong>Downburst</strong>
          <small>72 km/h max wind</small>
        </div>

        <div className="hazard-level low">
          LOW
        </div>
      </div>

      <div className="hazard-item cloud-item">
        <div className="hazard-symbol">🌧️</div>

        <div className="hazard-copy">
          <strong>Cloudburst</strong>
          <small>41% probability</small>
        </div>

        <div className="hazard-level watch">
          WATCH
        </div>
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-section-title">
        DATA STREAMS
      </div>

      <div className="stream">
        <span>📡</span>
        <div>
          <strong>Radar</strong>
          <small>CONNECTED</small>
        </div>
        <i></i>
      </div>

      <div className="stream">
        <span>🛰️</span>
        <div>
          <strong>Satellite</strong>
          <small>CONNECTED</small>
        </div>
        <i></i>
      </div>

      <div className="stream">
        <span>⚡</span>
        <div>
          <strong>Lightning</strong>
          <small>CONNECTED</small>
        </div>
        <i></i>
      </div>

      <div className="stream">
        <span>🌡️</span>
        <div>
          <strong>Ground Stations</strong>
          <small>CONNECTED</small>
        </div>
        <i></i>
      </div>

      <div className="sidebar-bottom">
        <div className="india-badge">
          🇮🇳
        </div>

        <div>
          <strong>भारत Weather Grid</strong>
          <small>Hyperlocal Intelligence</small>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;