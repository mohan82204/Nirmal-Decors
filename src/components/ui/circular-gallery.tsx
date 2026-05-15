import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
  /** External rotation in degrees. If provided, internal scroll handling is disabled. */
  rotation?: number;
  /** Callback when an item is clicked */
  onItemClick?: (item: GalleryItem) => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, rotation: externalRotation, onItemClick, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Effect to handle scroll-based rotation
    useEffect(() => {
      if (externalRotation !== undefined) return;

      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setIsScrolling(true);
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }

            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
            const scrollRotation = scrollProgress * 360;
            setRotation(scrollRotation);

            scrollTimeoutRef.current = setTimeout(() => {
              setIsScrolling(false);
            }, 150);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [externalRotation]);

    // Effect for auto-rotation when not scrolling
    useEffect(() => {
      if (externalRotation !== undefined) return;

      const autoRotate = () => {
        if (!isScrolling) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed, externalRotation]);

    const displayRotation = externalRotation !== undefined ? externalRotation : rotation;
    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            rotateY: displayRotation,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            // For the opacity calculation, we need the numeric value. 
            // If it's a MotionValue, we can't easily get it here for every frame without a hook or another motion component.
            // However, the opacity calculation is already a bit complex.
            // Let's simplify: the items will rotate, and we'll keep the static opacity or use a simpler approach.
            // Actually, we can just use the internal 'rotation' state for opacity if not provided, 
            // or just accept that opacity might not be as dynamic if using MotionValue for rotation.
            // But let's try to keep it functional.
            
            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute w-[240px] h-[320px] cursor-pointer"
                onClick={() => onItemClick?.(item)}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-120px',
                  marginTop: '-160px',
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Replaced text-primary-foreground with text-white for consistent color */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h2 className="text-xl font-bold">{item.common}</h2>
                    <em className="text-sm italic opacity-80">{item.binomial}</em>
                    <p className="text-xs mt-2 opacity-70">Photo by: {item.photo.by}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
