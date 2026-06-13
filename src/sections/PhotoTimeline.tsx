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
      const img = card.querySelector('img');
      const overlay = card.querySelector('.polaroid-reveal');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo(
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
          rotateY: index % 3 === 0 ? -2 : 2, // Slight random tilt
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      // "Developing" effect
      if (overlay) {
        tl.to(overlay, {
          opacity: 0,
          duration: 2,
          ease: 'power1.inOut'
        }, "-=0.8");
      }

      if (img) {
        tl.fromTo(img, 
          { filter: 'grayscale(100%) brightness(200%)' },
          { filter: 'grayscale(0%) brightness(100%)', duration: 2.5, ease: 'none' },
          "-=2"
        );
      }

      // Parallax on scroll
      gsap.to(card, {
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
    <section ref={sectionRef} className="relative py-24 px-4 bg-pink-50/20">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="font-script text-4xl sm:text-5xl md:text-6xl gradient-text opacity-0"
          >
            Nuestros momentos inolvidables
          </h2>
          <p className="mt-4 font-elegant text-sm text-pink-400/60 uppercase tracking-widest">
            Un álbum de recuerdos de nuestra historia
          </p>
        </div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {PHOTOS.map((photo, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group opacity-0"
              style={{ perspective: '1000px' }}
            >
              {/* Polaroid Frame */}
              <div className="bg-white p-4 pb-12 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
                <div className="relative aspect-square overflow-hidden bg-gray-100 mb-6">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Polaroid Reveal Overlay (the "film" developing) */}
                  <div className="polaroid-reveal absolute inset-0 bg-white z-10" />
                </div>
                
                {/* Handwritten Caption */}
                <div className="text-center">
                  <p className="font-script text-2xl text-gray-700">
                    {photo.caption}
                  </p>
                </div>
                
                {/* Fingerprint decoration */}
                <div className="absolute bottom-2 right-4 opacity-10 text-xl grayscale pointer-events-none">
                  👆
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
