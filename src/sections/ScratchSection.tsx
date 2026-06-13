import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function ScratchSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setupCanvas = () => {
      canvas.width = 300;
      canvas.height = 300;
      
      // Fill with scratchable color
      ctx.fillStyle = '#fce7f3'; // pink-100
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some texture/pattern
      ctx.fillStyle = '#fbcfe8'; // pink-200
      for (let i = 0; i < 200; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.font = '24px cursive';
      ctx.fillStyle = '#f472b6'; // pink-400
      ctx.textAlign = 'center';
      ctx.fillText('¡Raspa aquí!', canvas.width / 2, canvas.height / 2);
    };

    setupCanvas();

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();
      
      checkReveal();
    };

    const checkReveal = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentPixels++;
      }
      
      const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
      if (percentage > 50 && !isRevealed) {
        setIsRevealed(true);
        gsap.to(canvas, { opacity: 0, duration: 1, onComplete: () => setIsScratched(true) });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-4 flex flex-col items-center justify-center bg-transparent">
      <h2 className="font-script text-4xl text-rose-500 mb-8 text-center">Un pequeño secreto...</h2>
      
      <div className="relative w-[300px] h-[300px] group">
        {/* Hidden Content */}
        <div className="absolute inset-0 bg-white rounded-3xl shadow-inner flex flex-col items-center justify-center text-center p-8 border-2 border-pink-50">
          <span className="text-6xl mb-4">🎁</span>
          <p className="font-script text-3xl text-rose-500">
            "Eres el mejor regalo de mi vida"
          </p>
          <span className="mt-4 text-pink-300">❤️</span>
        </div>

        {/* Scratch Canvas */}
        {!isScratched && (
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 z-10 rounded-3xl cursor-crosshair shadow-lg touch-none"
          />
        )}
      </div>
      
      <p className="mt-6 font-elegant text-sm text-pink-400/60 uppercase tracking-widest animate-pulse">
        {isRevealed ? "¡Sorpresa! ❤️" : "Usa el ratón o tu dedo para raspar"}
      </p>
    </section>
  );
}
