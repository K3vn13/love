import { useEffect, useState } from 'react';
import HeartParticles from './sections/HeartParticles';
import HeroSection from './sections/HeroSection';
import MessageSection from './sections/MessageSection';
import PhotoTimeline from './sections/PhotoTimeline';
import FinalSection from './sections/FinalSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading screen */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 transition-all duration-1000 ${
          isLoading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="text-center">
          <div className="relative inline-block">
            <span className="text-6xl heartbeat inline-block">❤️</span>
            <div className="absolute inset-0 blur-xl bg-pink-400/30 rounded-full" />
          </div>
          <p className="font-script text-2xl text-rose-500 mt-6 animate-pulse">
            Cargando amor...
          </p>
        </div>
      </div>

      {/* Heart particles background - always visible */}
      <HeartParticles />

      {/* Main content */}
      <main className="relative" style={{ zIndex: 2 }}>
        <HeroSection />
        <MessageSection />
        <PhotoTimeline />
        <FinalSection />
      </main>

      {/* Footer */}
      <footer className="relative py-12 text-center" style={{ zIndex: 2 }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300/40" />
          <span className="text-2xl heartbeat">❤️</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300/40" />
        </div>
        <p className="font-elegant text-sm text-pink-400/60 tracking-wider">
          Hecho con amor, para ti
        </p>
      </footer>
    </>
  );
}
