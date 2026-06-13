import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PhotoData {
  url: string;
  caption: string;
}

const PHOTOS: PhotoData[] = [
  { url: 'https://lh3.googleusercontent.com/d/1LgmTrtV8SP5C-cPxF9-sfco33i_nTNiM', caption: 'Primer momento juntos' },
  { url: 'https://lh3.googleusercontent.com/d/1gxMEopDRmKKBlLEVRN-cUyUnVNA37SuF', caption: 'Ese día inolvidable' },
  { url: 'https://lh3.googleusercontent.com/d/1ScuwnMG2mw4du4lvtnHgAFWp48HmdRw1', caption: 'Contigo todo es mejor' },
  { url: 'https://lh3.googleusercontent.com/d/16JkIsMCT5GM_8KF10V3ssWLP1ZyKALEJ', caption: 'Sonrisas que lo dicen todo' },
  { url: 'https://lh3.googleusercontent.com/d/11oQ06LKaamJ-IVnBIaNG2yqEZ8euVke4', caption: 'Te miro y me enamoro más' },
  { url: 'https://lh3.googleusercontent.com/d/1zgDkMwbP6SBWW1uKn6fHl9tUoFSFd0IJ', caption: 'Nuestro mundo perfecto' },
  { url: 'https://lh3.googleusercontent.com/d/17NHgBz_UijSlRSBibnzsDzRwo4FnsrmD', caption: 'Contigo el tiempo vuela' },
  { url: 'https://lh3.googleusercontent.com/d/1-UTlvzGMQsbMgvY20qWGvRQH-i_7AgX8', caption: 'Amor en cada foto' },
  { url: 'https://lh3.googleusercontent.com/d/1yfxF35GuxnKOFzNuaCY1Q9uAIWncXlzY', caption: 'Mi persona favorita' },
  { url: 'https://lh3.googleusercontent.com/d/1nvDhs5jzD96Rh6-F2TnZagKjsEna1_rg', caption: 'Felices juntos' },
  { url: 'https://lh3.googleusercontent.com/d/1lNTxhWA4Hbbi2LxjKAySXcQQHPdyyl8v', caption: 'Siempre juntos' },
  { url: 'https://lh3.googleusercontent.com/d/1pDRdJxhtxycRTBrfVK5ceK38kbLkRp-v', caption: 'Mi refugio' },
  { url: 'https://lh3.googleusercontent.com/d/1tRX38sIoUi3kIyCaa5Q16TZtTwB5DBPa', caption: 'Te amo más cada día' },
  { url: 'https://lh3.googleusercontent.com/d/1cACl17F1-Vnr5k_pmhOH9uYfINvuqmsO', caption: 'Momentos mágicos' },
  { url: 'https://lh3.googleusercontent.com/d/16iPr8Diz-4ZtpkaYlDv6fmzDRIjeCsEU', caption: 'Besándonos en la playa... el mejor final ❤️' },
];

export default function PhotoTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    // Title entrance
    gsap.fromTo(
      title,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Photo cards with 3D flip entrance
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const isEven = index % 2 === 0;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          rotateY: isEven ? -15 : 15,
          rotateX: 5,
          scale: 0.85,
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax on scroll
      gsap.to(card.querySelector('.photo-inner'), {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-4">
      {/* Section background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300/60" />
            <span className="text-3xl sparkle">📸</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300/60" />
          </div>
          <h2
            ref={titleRef}
            className="font-script text-4xl sm:text-5xl md:text-6xl gradient-text opacity-0"
          >
            Nuestros momentos más bonitos
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2 text-pink-400/60">
            <span className="font-elegant text-sm tracking-widest uppercase">
              Cada foto es un recuerdo de nuestro amor
            </span>
          </div>
        </div>

        {/* Timeline line */}
        <div className="relative">
          {/* Central line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-200/0 via-pink-300/40 to-pink-200/0 -translate-x-1/2" />

          {/* Photo cards */}
          <div className="space-y-16 md:space-y-24">
            {PHOTOS.map((photo, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 opacity-0 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ perspective: '1000px' }}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20">
                    <div className="w-4 h-4 rounded-full bg-pink-400 shadow-lg shadow-pink-400/30 heartbeat" />
                  </div>

                  {/* Photo container */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="photo-inner">
                      <div className="photo-frame rounded-2xl overflow-hidden bg-white">
                        <div className="relative overflow-hidden">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-110"
                            loading="lazy"
                          />
                          {/* Photo overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div
                    className={`w-full md:w-1/2 text-center ${
                      isEven ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'
                    }`}
                  >
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <span className="font-elegant text-sm text-pink-400/60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px w-8 bg-pink-200/40" />
                    </div>
                    <p className="font-script text-2xl sm:text-3xl text-rose-500 mt-3">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
