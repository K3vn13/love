import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function RosePetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createPetal = () => {
      const petal = document.createElement('div');
      const size = Math.random() * 20 + 10;
      const startX = Math.random() * window.innerWidth;
      
      petal.className = 'absolute pointer-events-none z-10';
      petal.style.left = `${startX}px`;
      petal.style.top = `-20px`;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.backgroundColor = '#ff4d6d';
      petal.style.borderRadius = '50% 0 50% 50%';
      petal.style.opacity = (Math.random() * 0.4 + 0.3).toString();
      petal.style.boxShadow = '0 0 10px rgba(255, 77, 109, 0.3)';

      container.appendChild(petal);

      // Animate falling
      gsap.to(petal, {
        y: window.innerHeight + 50,
        x: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        ease: 'none',
        onComplete: () => {
          petal.remove();
        }
      });
    };

    const interval = setInterval(createPetal, 400);

    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" />;
}
