import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeartBurstButton() {
  const triggerBurst = () => {
    const scalar = 2;
    const heart = confetti.shapeFromText({ text: '❤️', scalar });

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      shapes: [heart],
      scalar
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
      });

      confetti({
        ...defaults,
        particleCount: 15,
        flat: true
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <button
        onClick={triggerBurst}
        className="p-4 rounded-full bg-rose-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <Heart className="w-6 h-6 relative z-10 fill-current" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-rose-500 text-white text-sm font-elegant rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          ¡Presiona para dar amor! ❤️
        </span>
      </button>
    </div>
  );
}
