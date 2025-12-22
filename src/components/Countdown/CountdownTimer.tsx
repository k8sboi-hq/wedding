interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  const timeUnits = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-4 sm:gap-3">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="bg-white rounded-xl shadow-lg p-6 md:p-5 sm:p-4 min-w-[120px] md:min-w-[100px] sm:min-w-[80px] text-center transform hover:scale-105 transition-transform"
        >
          <div className="font-serif text-5xl md:text-4xl sm:text-3xl font-bold text-primary mb-2">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="font-serif text-lg md:text-base sm:text-sm text-muted-foreground uppercase tracking-wider">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
