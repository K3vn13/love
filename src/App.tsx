import { useState } from 'react';
import HeartParticles from './sections/HeartParticles';
import HeroSection from './sections/HeroSection';
import MessageSection from './sections/MessageSection';
import PhotoTimeline from './sections/PhotoTimeline';
import FinalSection from './sections/FinalSection';
import RosePetals from './sections/RosePetals';
import MusicPlayer from './components/MusicPlayer';
import LetterSection from './sections/LetterSection';
import ReasonCards from './sections/ReasonCards';
import ScratchSection from './sections/ScratchSection';
import HeartBurstButton from './components/HeartBurstButton';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const startExperience = () => {
    setHasStarted(true);
    // Give a small delay for the fade out effect
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Loading/Enter screen */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 transition-all duration-1000 ${
          isLoading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        } ${hasStarted ? 'opacity-0 scale-110' : ''}`}
      >
        <div className="text-center px-4">
          <div className="relative inline-block">
            <span className="text-7xl heartbeat inline-block mb-8">❤️</span>
            <div className="absolute inset-0 blur-2xl bg-pink-400/40 rounded-full" />
          </div>
          <h2 className="font-script text-4xl text-rose-600 mb-8 block">Una sorpresa para ti...</h2>
          
          <button
            onClick={startExperience}
            className="group relative px-8 py-4 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 border-2 border-pink-200"
          >
            <span className="relative z-10 font-elegant text-rose-500 tracking-widest uppercase font-bold">
              Abrir con amor ❤️
            </span>
            <div className="absolute inset-0 bg-pink-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
          </button>
          
          <p className="font-elegant text-xs text-pink-400/70 mt-8 tracking-widest uppercase">
            Sube el volumen para una mejor experiencia
          </p>
        </div>
      </div>

      {/* Atmospheric effects */}
      <HeartParticles />
      <RosePetals />
      
      {/* Interactive Floating Button */}
      <HeartBurstButton />

      {/* Background Music */}
      <MusicPlayer autoStart={hasStarted} />

      {/* Main content */}
      <main className="relative" style={{ zIndex: 2 }}>
        <HeroSection />
        <LetterSection />
        <MessageSection />
        <ReasonCards />
        <PhotoTimeline />
        <ScratchSection />
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
