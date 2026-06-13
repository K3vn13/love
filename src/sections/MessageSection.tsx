import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RelationshipTimer from '../components/RelationshipTimer';

gsap.registerPlugin(ScrollTrigger);

const FULL_MESSAGE =
  'Desde que llegaste a mi vida, cada día es más hermoso. Tu sonrisa ilumina todo a tu alrededor y tu amor llena mi corazón de una felicidad que nunca imaginé. En tu día especial, quiero recordarte lo increíble que eres y cuánto te amo.';

export default function MessageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const hasTypedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const decor = decorRef.current;

    if (!section || !title || !decor) return;

    // Title animation
    gsap.fromTo(
      title,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Decorations
    gsap.fromTo(
      decor.children,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Typewriter effect triggered by scroll
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      onEnter: () => {
        if (!hasTypedRef.current) {
          hasTypedRef.current = true;
          setShowCursor(true);
          let i = 0;
          const interval = setInterval(() => {
            if (i <= FULL_MESSAGE.length) {
              setDisplayText(FULL_MESSAGE.slice(0, i));
              i++;
            } else {
              clearInterval(interval);
              setTimeout(() => setShowCursor(false), 2000);
            }
          }, 45);
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
      className="relative min-h-screen flex items-center justify-center py-24 px-4"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Decorative top */}
        <div ref={decorRef} className="mb-12 flex items-center justify-center gap-4">
          <span className="text-3xl sparkle" style={{ animationDelay: '0s' }}>✨</span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300/50" />
          <span className="text-4xl heartbeat">💌</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300/50" />
          <span className="text-3xl sparkle" style={{ animationDelay: '1s' }}>✨</span>
        </div>

        <h2
          ref={titleRef}
          className="font-script text-4xl sm:text-5xl md:text-6xl gradient-text mb-12 opacity-0"
        >
          Para la mujer de mi vida
        </h2>

        {/* Message card */}
        <div className="glass rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 shimmer pointer-events-none" />

          <p
            ref={textRef}
            className="font-elegant text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed relative z-10 min-h-[120px]"
          >
            {displayText}
            {showCursor && <span className="text-pink-500 animate-pulse">|</span>}
          </p>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-2xl opacity-30">❦</div>
          <div className="absolute top-4 right-4 text-2xl opacity-30">❦</div>
          <div className="absolute bottom-4 left-4 text-2xl opacity-30">❦</div>
          <div className="absolute bottom-4 right-4 text-2xl opacity-30">❦</div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="text-2xl float" style={{ animationDelay: '0s' }}>🌹</span>
          <span className="text-xl float" style={{ animationDelay: '0.5s' }}>💕</span>
          <span className="text-2xl float" style={{ animationDelay: '1s' }}>🌹</span>
        </div>

        {/* Relationship Timer */}
        <RelationshipTimer />
      </div>
    </section>
  );
}
