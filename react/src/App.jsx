import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import { AlignCenter, AlignJustify, Zap } from 'lucide-react';

function FadeInScreen({ children, duration = 2000, imagePath, imageStyle = {} }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return children;

  const defaultImageStyle = {
    width: '120px',
    height: '120px',
    objectFit: 'contain',
    animation: 'pulse 2s ease-in-out infinite',
    ...imageStyle
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>

      <div
        className="fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-1000"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div className="flex flex-col items-center gap-4">
          {imagePath ? (
            <img
              src={imagePath}
              alt="Logo"
              style={defaultImageStyle}
            />
          ) : (
            <Zap className="w-20 h-20 text-purple-600 animate-pulse" />
          )}

          <div className="flex gap-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
      <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
    }}
  >
    <FadeInScreen
      duration={3000}
      imagePath="src/img/apeaqui.jpeg"
      imageStyle={{
        width: '150px',
        height: '150px',
      }}
    >
      <LoginPage />
    </FadeInScreen>
  </div>
  );
}

export default App;
