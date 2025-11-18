import { useState, useEffect } from 'react';

function App() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`container ${fadeIn ? 'fade-in' : ''}`}>
      <div className="center-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>
      
      <h1>Bem-vindo ao Sistema</h1>
    </div>
  );
}

export default App;