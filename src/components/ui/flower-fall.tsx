"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLOWER_TYPES = [
  // Sakura/Cherry Blossom style
  <path d="M12 21.6c-2.4 0-4.8-.8-4.8-2.4 0-1.6 2.4-1.6 4.8-1.6s4.8 0 4.8 1.6c0 1.6-2.4 2.4-4.8 2.4z" />,
  // Heart/Petal style
  <path d="M12 21.6c-1.2-1.2-3.6-2.4-3.6-4.8 0-2.4 2.4-2.4 3.6-1.2 1.2-1.2 3.6-1.2 3.6 1.2 0 2.4-2.4 3.6-3.6 4.8z" />,
  // Simple Petal
  <path d="M12 21.6C8.4 18 8.4 12 12 12s3.6 6 0 9.6z" />
];

const COLORS = [
  'rgba(212, 175, 55, 0.8)', // Gold
  'rgba(251, 191, 36, 0.7)', // Amber
  'rgba(255, 182, 193, 0.8)', // Sakura Pink
  'rgba(255, 255, 255, 0.9)', // White
];

interface FlowerData {
  id: string;
}

interface FlowerProps {
  id: string;
  onComplete: (id: string) => void;
}

const Flower = ({ id, onComplete }: FlowerProps) => {
  const [config] = useState(() => ({
    x: Math.random() * 100,
    size: 15 + Math.random() * 20,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
    rotationDirection: Math.random() > 0.5 ? 1 : -1,
    drift: (Math.random() - 0.5) * 30,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    svgIndex: Math.floor(Math.random() * FLOWER_TYPES.length)
  }));

  return (
    <motion.div
      initial={{ 
        top: '-10vh', 
        left: `${config.x}%`, 
        opacity: 0, 
        rotate: config.rotation,
        scale: 0.5
      }}
      animate={{ 
        top: '110vh', 
        left: `${config.x + config.drift}%`,
        opacity: [0, 1, 1, 0],
        rotate: config.rotation + (360 * config.rotationDirection * 2),
        scale: [0.5, 1, 1, 0.8]
      }}
      transition={{ 
        duration: config.duration, 
        delay: config.delay,
        ease: "linear"
      }}
      onAnimationComplete={() => onComplete(id)}
      style={{
        position: 'absolute',
        zIndex: 1,
        pointerEvents: 'none',
        width: config.size,
        height: config.size,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill={config.color}
        style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      >
        {FLOWER_TYPES[config.svgIndex]}
      </svg>
    </motion.div>
  );
};

export const FlowerFall = ({ count = 12 }: { count?: number }) => {
  const [flowers, setFlowers] = useState<FlowerData[]>([]);

  useEffect(() => {
    const initialFlowers = Array.from({ length: count }).map((_, i) => ({
      id: `${Date.now()}-${i}-${Math.random()}`
    }));
    setFlowers(initialFlowers);
  }, [count]);

  const removeFlower = (id: string) => {
    setFlowers(prev => {
      const filtered = prev.filter(f => f.id !== id);
      return [...filtered, { id: `${Date.now()}-${Math.random()}` }];
    });
  };

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      <AnimatePresence>
        {flowers.map(flower => (
          <Flower 
            key={flower.id} 
            id={flower.id} 
            onComplete={removeFlower} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
