import React, { useEffect } from 'react';
import './css/LoginBackground.css';

export default function LoginBackground() {

 const purpleHalf = document.querySelector('.purple-half');
        
       useEffect(() => {
    const purpleHalf = document.querySelector('.purple-half');

    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      purpleHalf.appendChild(particle);
      setTimeout(() => {
        particle.remove();
      }, 20000);
    }
    for (let i = 0; i < 8; i++) {
      setTimeout(createParticle, i * 2000);
    }
    const interval = setInterval(createParticle, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
 <div class="background">
        <div class="purple-half">
            <div class="wave-effect"></div>
        </div>
        <div class="white-half"></div>
        <div class="divider"></div>
    </div>

  );
}

