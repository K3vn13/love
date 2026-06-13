import { useState, useRef } from 'react';
import gsap from 'gsap';

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);

  const openLetter = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline();

    // 1. Open the flap
    tl.to(flapRef.current, {
      rotateX: 180,
      duration: 0.6,
      ease: 'power2.inOut',
      transformOrigin: 'top center'
    });

    // 2. Pull out the letter
    tl.to(letterRef.current, {
      y: -250,
      zIndex: 20,
      duration: 0.8,
      ease: 'power2.out'
    });

    // 3. Move letter to front and expand
    tl.to(letterRef.current, {
      y: 0,
      scale: 1.1,
      duration: 0.6,
      ease: 'back.out(1.2)'
    });
  };

  return (
    <section className="py-24 px-4 flex flex-center justify-center bg-transparent relative overflow-hidden">
      <div className="max-w-md w-full perspective-[1000px]">
        {/* Envelope Container */}
        <div 
          ref={envelopeRef}
          onClick={openLetter}
          className={`relative w-full h-64 bg-rose-200 rounded-b-lg cursor-pointer transition-transform duration-500 hover:scale-105 shadow-2xl ${isOpen ? 'cursor-default' : ''}`}
        >
          {/* Flap */}
          <div 
            ref={flapRef}
            className="absolute top-0 left-0 w-0 h-0 border-l-[224px] border-l-transparent border-r-[224px] border-r-transparent border-t-[140px] border-t-rose-300 z-30"
            style={{ transformStyle: 'preserve-3d' }}
          />
          
          {/* Side pockets */}
          <div className="absolute inset-0 border-l-[224px] border-l-rose-100 border-r-[224px] border-r-rose-100 border-b-[140px] border-b-transparent z-25" />
          <div className="absolute inset-0 border-b-[140px] border-b-rose-200 z-20" />

          {/* Letter */}
          <div 
            ref={letterRef}
            className="absolute top-4 left-4 right-4 bg-white p-6 shadow-md z-10 min-h-[300px] rounded-sm transform-gpu"
          >
            <div className="border-2 border-pink-50 p-4 h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-3xl">💌</span>
              <h4 className="font-script text-2xl text-rose-500">Para mi persona favorita</h4>
              <p className="font-elegant text-sm text-gray-600 leading-relaxed italic">
                "Desde aquel 29 de noviembre, mi vida cambió por completo. Eres la luz que ilumina mis días y el amor que llena mi corazón. Gracias por cada sonrisa y por elegirme cada día."
              </p>
              <div className="h-px w-16 bg-pink-200" />
              <p className="font-script text-xl text-pink-400">Te amo infinitamente</p>
            </div>
          </div>
          
          {/* Front Text */}
          {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center z-40">
              <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-rose-400 font-elegant text-sm tracking-widest uppercase shadow-sm">
                Haz clic para abrir 💌
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
