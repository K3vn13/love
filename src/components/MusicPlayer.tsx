import { useState, useRef, useEffect } from 'react';
import { Music, Music2 } from 'lucide-react';

interface MusicPlayerProps {
  autoStart?: boolean;
}

export default function MusicPlayer({ autoStart }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoStart && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Autoplay blocked or failed:", err));
    }
  }, [autoStart]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/assets/those_eye_new.mp3" loop />
      <button
        onClick={togglePlay}
        className={`p-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-pink-200 transition-all duration-500 hover:scale-110 group ${
          isPlaying ? 'animate-pulse text-pink-500' : 'text-gray-400'
        }`}
      >
        {isPlaying ? (
          <Music2 className="w-6 h-6" />
        ) : (
          <Music className="w-6 h-6" />
        )}
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg border border-pink-100 text-pink-500 text-sm font-elegant opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isPlaying ? 'Pausar música' : 'Reproducir música ❤️'}
        </span>
      </button>
    </div>
  );
}
