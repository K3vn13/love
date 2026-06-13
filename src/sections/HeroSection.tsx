import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);

    // Birthday Confetti Animation
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start them higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffffff']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffffff']
      });
    }, 250);

    // Initial big burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffffff']
    });

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          ease: 'power3.out',
          delay: 1,
        }
      );
    }

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          delay: 2.2,
        }
      );
    }

    // Scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 3.5,
        }
      );

      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 4,
      });
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Image/GIF */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/assets/principal.gif"
          alt="Hero Background"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 150px 60px rgba(0,0,0,0.5)',
        }}
      />

      {/* Sparkle particles overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1
          ref={titleRef}
          className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-6 opacity-0 glow-text select-none"
          style={{
            textShadow:
              '0 0 30px rgba(255,77,148,0.5), 0 0 60px rgba(255,77,148,0.3), 0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          Mi amor...
        </h1>

        <p
          ref={subtitleRef}
          className="font-display text-xl sm:text-2xl md:text-3xl text-pink-200 opacity-0 tracking-widest uppercase"
        >
          Feliz Cumpleaños
          <span className="inline-block ml-2 heartbeat text-3xl">❤️</span>
        </p>

        {/* Decorative line */}
        <div
          className={`mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-pink-300/60 to-transparent transition-all duration-2000 ${
            isLoaded ? 'w-48 opacity-100' : 'w-0 opacity-0'
          }`}
          style={{ transitionDelay: '2.8s', transitionDuration: '1.5s' }}
        />
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-elegant text-sm text-white/60 tracking-widest uppercase">
          Desliza
        </span>
        <svg
          className="w-5 h-5 text-pink-300/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
