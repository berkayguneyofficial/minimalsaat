import React, { useEffect, useState, useMemo } from 'react';
import { ClockConfig, MarkerStyle, HandStyle } from '../types';

interface ClockProps {
  config: ClockConfig;
}

const Clock: React.FC<ClockProps> = ({ config }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let animationFrameId: number;

    const updateTime = () => {
      setTime(new Date());
      animationFrameId = requestAnimationFrame(updateTime);
    };

    animationFrameId = requestAnimationFrame(updateTime);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const { theme, markerStyle, handStyle, showSeconds, smoothSeconds, showDate, language } = config;

  // Calculate angles
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  // Smooth or Tick calculation
  const secondAngle = smoothSeconds 
    ? (seconds + milliseconds / 1000) * 6 
    : seconds * 6;
    
  const minuteAngle = (minutes + seconds / 60) * 6;
  const hourAngle = ((hours % 12) + minutes / 60) * 30;

  // Generate Markers
  const markers = useMemo(() => {
    const items = [];
    if (markerStyle === MarkerStyle.None) return [];

    const totalMarkers = markerStyle === MarkerStyle.Quarters ? 4 : 12; // Basic simplified logic
    const isAll60 = markerStyle === MarkerStyle.All || markerStyle === MarkerStyle.Dots;

    const count = isAll60 ? 60 : 12;

    for (let i = 0; i < count; i++) {
      const isHour = i % 5 === 0;
      if (markerStyle === MarkerStyle.Quarters && i % 15 !== 0) continue;
      
      const angle = (i * 360) / count;
      const radians = (angle - 90) * (Math.PI / 180);
      
      // Determine length/size based on importance
      let length = isHour ? 12 : 6;
      let width = isHour ? 2.5 : 1;
      
      if (markerStyle === MarkerStyle.Dots) {
        // Render dots
        const r = 42; // Radius to place center of dot
        const cx = 50 + r * Math.cos(radians);
        const cy = 50 + r * Math.sin(radians);
        const radius = isHour ? 1.5 : 0.8;
        
        items.push(
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill={theme.markerColor}
            opacity={isHour ? 1 : 0.6}
          />
        );
      } else {
        // Render lines
        const outerR = 45;
        const innerR = outerR - length;
        
        const x1 = 50 + innerR * Math.cos(radians);
        const y1 = 50 + innerR * Math.sin(radians);
        const x2 = 50 + outerR * Math.cos(radians);
        const y2 = 50 + outerR * Math.sin(radians);

        items.push(
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={theme.markerColor}
            strokeWidth={width}
            strokeLinecap="round"
            opacity={isHour ? 1 : 0.5}
          />
        );
      }
    }
    return items;
  }, [markerStyle, theme.markerColor]);

  // Hand Rendering Helpers
  const renderHand = (type: 'hour' | 'minute' | 'second', angle: number) => {
    const isHour = type === 'hour';
    const isSec = type === 'second';
    
    let length = isHour ? 25 : 38;
    if (isSec) length = 40;
    
    let width = isHour ? 4 : 3;
    if (isSec) width = 1.5;

    let color = isSec ? theme.secondHandColor : (isHour ? theme.hourHandColor : theme.minuteHandColor);

    // Style adjustments
    if (handStyle === HandStyle.Minimal) {
      width = isSec ? 1 : 2;
    } else if (handStyle === HandStyle.Tapered && !isSec) {
        // Render polygon for tapered
        return (
             <g transform={`rotate(${angle} 50 50)`}>
                <polygon 
                    points={`48.5,50 50,${50 - length} 51.5,50 50,52`} 
                    fill={color} 
                />
             </g>
        );
    }

    return (
      <line
        x1="50"
        y1="50"
        x2="50"
        y2={50 - length}
        stroke={color}
        strokeWidth={width}
        strokeLinecap={handStyle === HandStyle.Round ? "round" : "butt"}
        transform={`rotate(${angle} 50 50)`}
        style={{ transition: isSec && !smoothSeconds ? 'transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44)' : 'none' }}
      />
    );
  };

  // Date String
  const dateString = time.toLocaleDateString(language, { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Container for the Clock */}
      <div 
        className="relative w-full max-w-md aspect-square rounded-full shadow-2xl transition-colors duration-500 ease-in-out"
        style={{ 
          backgroundColor: theme.clockFaceColor,
          boxShadow: `0 20px 50px -12px rgba(0,0,0,0.25)` 
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Markers */}
            {markers}

            {/* Date Display (Optional) */}
            {showDate && (
                <text 
                    x="50" 
                    y="70" 
                    textAnchor="middle" 
                    className="text-[4px] font-medium tracking-widest uppercase"
                    style={{ fill: theme.textColor, opacity: 0.8 }}
                >
                    {dateString}
                </text>
            )}

            {/* Hands */}
            {renderHand('hour', hourAngle)}
            {renderHand('minute', minuteAngle)}
            {showSeconds && renderHand('second', secondAngle)}

            {/* Center Cap */}
            <circle cx="50" cy="50" r={showSeconds ? 2 : 3} fill={showSeconds ? theme.secondHandColor : theme.hourHandColor} />
            {showSeconds && (
                <circle cx="50" cy="50" r="0.8" fill={theme.clockFaceColor} />
            )}
        </svg>
      </div>
    </div>
  );
};

export default Clock;