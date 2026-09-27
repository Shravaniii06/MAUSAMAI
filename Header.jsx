function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-symbol">🌩️</div>

        <div>
          <h1>मौसम AI</h1>
          <p>AI-Powered Hyperlocal Storm Nowcasting</p>
        </div>
      </div>

      <div className="header-center">
        <div className="header-chip">🇮🇳 INDIA</div>
        <div className="header-chip">0–6 HR NOWCAST</div>
        <div className="header-chip">1–3 KM SCALE</div>
      </div>

      <div className="status">
        <span className="status-dot"></span>

        <div>
          <strong>LIVE</strong>
          <small>System Active</small>
        </div>
      </div>
    </header>
  );
}

export default Header;