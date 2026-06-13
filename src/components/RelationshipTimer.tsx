import { useState, useEffect } from 'react';

const ANNIVERSARY_DATE = new Date('2025-11-29T00:00:00');

export default function RelationshipTimer() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const start = ANNIVERSARY_DATE;

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();

      if (days < 0) {
        months -= 1;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      // If the date is in the future, set everything to 0
      if (now < start) {
        setTimeLeft({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTimeLeft({ years, months, days, hours, minutes, seconds });
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime();

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center p-3 sm:p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-pink-100 min-w-[70px] sm:min-w-[90px]">
      <span className="text-2xl sm:text-3xl font-bold text-rose-500">{value}</span>
      <span className="text-[10px] sm:text-xs font-elegant text-pink-400 uppercase tracking-tighter sm:tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="mt-12 space-y-6">
      <h3 className="font-script text-2xl text-pink-400 text-center">Nuestro tiempo juntos</h3>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <TimeUnit value={timeLeft.years} label="Años" />
        <TimeUnit value={timeLeft.months} label="Meses" />
        <TimeUnit value={timeLeft.days} label="Días" />
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Seg" />
      </div>
    </div>
  );
}
