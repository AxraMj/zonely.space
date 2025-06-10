
import { useState, useEffect } from 'react';

interface AnalogClockProps {
  timezone: string;
  size?: number;
  showNumbers?: boolean;
}

export const AnalogClock = ({ timezone, size = 120, showNumbers = true }: AnalogClockProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeInTimezone = () => {
    try {
      return new Date(time.toLocaleString("en-US", { timeZone: timezone }));
    } catch {
      return time;
    }
  };

  const timeInZone = getTimeInTimezone();
  const hours = timeInZone.getHours() % 12;
  const minutes = timeInZone.getMinutes();
  const seconds = timeInZone.getSeconds();

  const hourAngle = (hours * 30) + (minutes * 0.5) - 90;
  const minuteAngle = (minutes * 6) - 90;
  const secondAngle = (seconds * 6) - 90;

  const radius = size / 2;
  const centerX = radius;
  const centerY = radius;

  const hourHandLength = radius * 0.5;
  const minuteHandLength = radius * 0.7;
  const secondHandLength = radius * 0.8;

  const getHandEndpoint = (angle: number, length: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + length * Math.cos(radian),
      y: centerY + length * Math.sin(radian)
    };
  };

  const hourEnd = getHandEndpoint(hourAngle, hourHandLength);
  const minuteEnd = getHandEndpoint(minuteAngle, minuteHandLength);
  const secondEnd = getHandEndpoint(secondAngle, secondHandLength);

  return (
    <div className="relative inline-block">
      <svg width={size} height={size} className="drop-shadow-sm">
        {/* Clock face */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius - 2}
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
          className="dark:fill-gray-800"
        />
        
        {/* Hour markers */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) - 90;
          const radian = (angle * Math.PI) / 180;
          const innerRadius = radius * 0.85;
          const outerRadius = radius * 0.95;
          
          const x1 = centerX + innerRadius * Math.cos(radian);
          const y1 = centerY + innerRadius * Math.sin(radian);
          const x2 = centerX + outerRadius * Math.cos(radian);
          const y2 = centerY + outerRadius * Math.sin(radian);
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-70"
            />
          );
        })}

        {/* Numbers */}
        {showNumbers && Array.from({ length: 12 }, (_, i) => {
          const number = i === 0 ? 12 : i;
          const angle = (i * 30) - 90;
          const radian = (angle * Math.PI) / 180;
          const numberRadius = radius * 0.75;
          
          const x = centerX + numberRadius * Math.cos(radian);
          const y = centerY + numberRadius * Math.sin(radian);
          
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-xs font-medium fill-current"
            >
              {number}
            </text>
          );
        })}

        {/* Hour hand */}
        <line
          x1={centerX}
          y1={centerY}
          x2={hourEnd.x}
          y2={hourEnd.y}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-80"
        />

        {/* Minute hand */}
        <line
          x1={centerX}
          y1={centerY}
          x2={minuteEnd.x}
          y2={minuteEnd.y}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-90"
        />

        {/* Second hand */}
        <line
          x1={centerX}
          y1={centerY}
          x2={secondEnd.x}
          y2={secondEnd.y}
          stroke="rgb(239 68 68)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle
          cx={centerX}
          cy={centerY}
          r="4"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
