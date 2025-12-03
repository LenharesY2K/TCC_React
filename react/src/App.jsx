import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './components/pages/LoginPage';
import StartTrial from './components/pages/StartTrial';
import RegisterPage from './components/pages/RegisterPage';
import JoinPage from './components/pages/JoinPage';
import Dashboard from './components/pages/Dashboard';
import { Zap } from 'lucide-react';
import PeopleRegister from './components/pages/modules/register/PeopleRegister';
import RegisterCompany from './components/pages/modules/register/RegisterCompany';
import ManagerProfiles from './components/pages/modules/register/ManagerProfiles';
import PageChoice from './components/pages/PageChoice';
import RegisterOrder from './components/pages/modules/Condominium/RegisterOrder';
import Reports from './components/pages/modules/financial/Reports';
import Transports from './components/pages/modules/Condominium/ Transports';

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
            <img src={imagePath} alt="Logo" style={defaultImageStyle} />
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
      <BrowserRouter>
        <FadeInScreen
          duration={3000}
          imagePath="src/img/apeaqui.jpeg"
          imageStyle={{ width: "150px", height: "150px" }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pageChoice" element={<PageChoice />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/startTrial" element={<StartTrial />} />
            <Route path="/peopleRegister" element={<PeopleRegister />} />
            <Route path='/registryCondominius' element={<RegisterCompany />} />
            <Route path='/managerProfiles' element={<ManagerProfiles />} />
            <Route path='/Orders' element={<RegisterOrder />} />
            <Route path='/Reports' element={<Reports />} />
            <Route path='/Transport' element={<Transports />} />
          </Routes>
        </FadeInScreen>
      </BrowserRouter>
    </div>
  );
}

export default App;
