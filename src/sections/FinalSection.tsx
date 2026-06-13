import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FINAL_WORDS = 'Eres mi todo. Hoy, mañana y siempre... 💕';

export default function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLDivElement>(null);
  const [finalText, setFinalText] = useState('');
  const [showHearts, setShowHearts] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Content reveal
    gsap.fromTo(
      content.children,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Typewriter for final message
    ScrollTrigger.create({
      trigger: section,
      start: 'top 40%',
      onEnter: () => {
        if (!hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          let i = 0;
          const interval = setInterval(() => {
            if (i <= FINAL_WORDS.length) {
              setFinalText(FINAL_WORDS.slice(0, i));
              i++;
            } else {
              clearInterval(interval);
              setTimeout(() => setShowHearts(true), 500);
            }
          }, 80);
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/50 to-rose-100/50" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl" />
      </div>

      {/* Floating hearts burst */}
      {showHearts && (
        <div ref={heartsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => {
            const randomX = Math.random() * 100;
            const randomDelay = Math.random() * 2;
            const randomDuration = 3 + Math.random() * 4;
            const randomSize = 16 + Math.random() * 32;
            const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞'];
            const heart = hearts[Math.floor(Math.random() * hearts.length)];

            return (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${randomX}%`,
                  bottom: '-10%',
                  animation: `floatUp ${randomDuration}s ease-out ${randomDelay}s forwards`,
                  fontSize: randomSize,
                  opacity: 0,
                }}
              >
                {heart}
              </div>
            );
          })}
        </div>
      )}

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="opacity-0">
          <span className="text-6xl sm:text-7xl md:text-8xl heartbeat inline-block">❤️</span>
        </div>

        <h2 className="font-script text-4xl sm:text-5xl md:text-6xl gradient-text mt-8 mb-6 opacity-0">
          Feliz Cumpleaños, mi amor
        </h2>

        <div className="glass rounded-3xl p-8 sm:p-12 mt-8 opacity-0">
          <p className="font-elegant text-xl sm:text-2xl text-gray-700 leading-relaxed">
            {finalText}
            {!finalText.includes('💕') && finalText.length > 0 && (
              <span className="text-pink-500 animate-pulse">|</span>
            )}
          </p>
        </div>

        <div className="mt-12 opacity-0">
          <p className="font-script text-2xl sm:text-3xl text-rose-400">
            Con todo mi amor, para siempre tuyo
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="text-2xl float" style={{ animationDelay: '0s' }}>🌹</span>
            <span className="text-3xl heartbeat">❤️</span>
            <span className="text-2xl float" style={{ animationDelay: '0.5s' }}>🌹</span>
          </div>
        </div>
      </div>

      {/* Custom keyframes for floatUp */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-10vh) scale(1) rotate(10deg);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-110vh) scale(0.6) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
