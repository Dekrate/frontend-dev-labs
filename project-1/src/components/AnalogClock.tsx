import React, { useEffect, useState } from 'react';

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();

  const hourAngle = (hours + minutes / 60) * 30;
  const minuteAngle = minutes * 6;

  return (
    <div
      className="relative w-12 h-12 rounded-sm overflow-hidden border border-gray-300 shrink-0"
      style={{ backgroundColor: '#8a9bb8' }}
      data-testid="analog-clock"
      aria-label="Zegar analogowy"
    >
      {/* Clock face */}
      <div className="absolute inset-0">
        {/* Hour markers */}
        {[12, 3, 6, 9].map((num) => {
          const angle = num * 30;
          const rad = (angle - 90) * (Math.PI / 180);
          const x = 50 + 35 * Math.cos(rad);
          const y = 50 + 35 * Math.sin(rad);
          return (
            <div
              key={num}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}

        {/* Hour hand */}
        <div
          className="absolute bg-white rounded-full"
          style={{
            width: '2px',
            height: '30%',
            left: '50%',
            top: '50%',
            transformOrigin: '50% 0%',
            transform: `translateX(-50%) rotate(${hourAngle}deg)`,
          }}
        />

        {/* Minute hand */}
        <div
          className="absolute bg-white rounded-full"
          style={{
            width: '1.5px',
            height: '40%',
            left: '50%',
            top: '50%',
            transformOrigin: '50% 0%',
            transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
          }}
        />

        {/* Center dot */}
        <div
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </div>
  );
};

export default AnalogClock;
