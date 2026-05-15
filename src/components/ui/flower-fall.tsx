import React, { useEffect, useState, useMemo } from 'react';

const COLORS = [
  'rgba(212, 175, 55, 0.4)', // Gold (Lower opacity)
  'rgba(251, 191, 36, 0.3)', // Amber
  'rgba(255, 182, 193, 0.4)', // Sakura Pink
  'rgba(255, 255, 255, 0.5)', // White
];

const FLOWER_PATHS = [
  "M12 21.6c-2.4 0-4.8-.8-4.8-2.4 0-1.6 2.4-1.6 4.8-1.6s4.8 0 4.8 1.6c0 1.6-2.4 2.4-4.8 2.4z",
  "M12 21.6c-1.2-1.2-3.6-2.4-3.6-4.8 0-2.4 2.4-2.4 3.6-1.2 1.2-1.2 3.6-1.2 3.6 1.2 0 2.4-2.4 3.6-3.6 4.8z",
  "M12 21.6C8.4 18 8.4 12 12 12s3.6 6 0 9.6z"
];

// Pure CSS approach to remove main-thread workload from Framer Motion
export const FlowerFall = ({ count = 6 }: { count?: number }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Reduce count on mobile significantly
  const actualCount = isMobile ? Math.min(count, 5) : count;

  const flowers = useMemo(() => {
    return Array.from({ length: actualCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 15, // Smaller flowers
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      path: FLOWER_PATHS[Math.floor(Math.random() * FLOWER_PATHS.length)],
      rotation: Math.random() * 360,
    }));
  }, [actualCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes flowerFall {
          0% { transform: translateY(-10vh) rotate(0deg) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg) translateX(20px); opacity: 0; }
        }
        .flower-petal {
          position: absolute;
          animation: flowerFall linear infinite;
          will-change: transform;
        }
      `}</style>
      {flowers.map((f) => (
        <svg
          key={f.id}
          className="flower-petal"
          viewBox="0 0 24 24"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            fill: f.color,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            transform: `rotate(${f.rotation}deg)`,
          }}
        >
          <path d={f.path} />
        </svg>
      ))}
    </div>
  );
};
