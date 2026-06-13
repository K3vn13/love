import { useState, useRef } from 'react';
import gsap from 'gsap';

const REASONS = [
  { text: "Tu risa que lo cura todo", emoji: "😂" },
  { text: "Tu forma de ver el mundo", emoji: "🌍" },
  { text: "Como me haces sentir especial", emoji: "✨" },
  { text: "Tu apoyo incondicional", emoji: "🤝" },
  { text: "Nuestras locuras juntos", emoji: "🤪" },
  { text: "Tu mirada que me desarma", emoji: "👀" },
  { text: "Simplemente ser tú", emoji: "💖" }
];

export default function ReasonCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextCard = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      x: 300,
      opacity: 0,
      rotate: 15,
      duration: 0.5,
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % REASONS.length);
        gsap.fromTo(cardRef.current, 
          { x: -300, opacity: 0, rotate: -15 },
          { x: 0, opacity: 1, rotate: 0, duration: 0.5 }
        );
      }
    });
  };

  return (
    <section ref={containerRef} className="py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      <h2 className="font-script text-4xl text-rose-500 mb-12 text-center">Razones por las que te amo...</h2>
      
      <div className="relative w-72 h-96 cursor-pointer" onClick={nextCard}>
        {/* Decorative background cards */}
        <div className="absolute inset-0 bg-pink-100 rounded-3xl translate-x-4 translate-y-4 -rotate-3 shadow-md" />
        <div className="absolute inset-0 bg-rose-50 rounded-3xl translate-x-2 translate-y-2 rotate-2 shadow-md" />
        
        {/* Main Card */}
        <div 
          ref={cardRef}
          className="absolute inset-0 bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center text-center border-2 border-pink-50"
        >
          <span className="text-6xl mb-6">{REASONS[currentIndex].emoji}</span>
          <p className="font-script text-3xl text-gray-700 leading-tight">
            {REASONS[currentIndex].text}
          </p>
          
          <div className="absolute bottom-6 flex items-center gap-2 text-pink-300">
            <span className="font-elegant text-xs uppercase tracking-widest">Toca para pasar</span>
            <div className="w-8 h-px bg-pink-200" />
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex gap-2">
        {REASONS.map((_, i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-rose-400 w-4' : 'bg-pink-100'}`}
          />
        ))}
      </div>
    </section>
  );
}
