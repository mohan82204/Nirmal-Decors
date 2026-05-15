import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion';
import ReactLenis from 'lenis/react';
import {
  CutoutCard,
  CutoutCardMedia,
  CutoutCardImage,
  CutoutCardOverlay,
  CutoutCardContent,
  CutoutCardInsetLabel,
  CutoutCardPin,
  CutoutCardAction,
  CutoutCorner,
  cutoutCardSurfaceClassName,
  useCutoutContentStaggerVariants,
} from '@/components/ui/cutout-card';

const EASE = [0.76, 0, 0.24, 1];

const seriesCards = [
  {
    id: 1,
    title: 'Floral Ethereal',
    tag: 'Signature',
    description: 'Delicate blooms, soft candlelight, and cascading petals creating a dreamy, garden-paradise atmosphere.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    title: 'Royal Golden',
    tag: 'Premium',
    description: 'Opulent gold leaf accents, grand chandeliers, and majestic mandap structures fit for royalty.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    title: 'Modern Minimal',
    tag: 'Contemporary',
    description: 'Clean architectural lines, monochromatic palettes, and sculptural florals for the contemporary couple.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    title: 'Mandap Heritage',
    tag: 'Traditional',
    description: 'Traditional sacred structures reimagined — hand-painted motifs and marigold arrangements celebrating culture.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    title: 'Candlelit Intimate',
    tag: 'Intimate',
    description: 'Warm amber candlelight, lush greenery, and whisper-soft fabrics for an unforgettable micro-wedding.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60',
  },
];

const SeriesCard = ({ card, index }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  });

  // Extremely smooth transforms for the stacking effect
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -2 : 2]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  return (
    <motion.div
      ref={container}
      className="sticky w-full max-w-2xl mx-auto overflow-hidden rounded-[28px]"
      style={{
        scale,
        opacity,
        rotate,
        top: `${10 + (index * 2)}vh`, // Staggered sticky tops for stacking
      }}
    >
      <CutoutCard className="group/cutout relative cursor-pointer overflow-hidden rounded-[28px] bg-white text-stone-900 border border-stone-200/60 shadow-[0px_10px_50px_rgba(0,0,0,0.2)]">
        <CutoutCardMedia className="h-[60vw] max-h-[460px] sm:h-[400px]">
          <motion.img
            src={card.image}
            alt={card.title}
            style={{ scale: imageScale }}
            className="h-full w-full object-cover transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-[20px] bg-white px-4 py-2">
            <span className="text-[10px] font-bold uppercase tracking-[3px] text-stone-500">{card.tag}</span>
            <CutoutCorner className="absolute -right-[31px] -bottom-px rotate-90 text-white" size={32} />
            <CutoutCorner className="absolute -top-[31px] -left-px rotate-90 text-white" size={32} />
          </CutoutCardInsetLabel>

          <CutoutCardPin className="top-0 right-0 rounded-bl-[20px] bg-white px-4 py-2">
            <span className="text-[10px] font-bold uppercase tracking-[3px] text-stone-600">0{index + 1}</span>
            <CutoutCorner className="absolute -left-[31px] -top-px rotate-[270deg] text-white" size={32} />
            <CutoutCorner className="absolute -bottom-[31px] -right-px rotate-[270deg] text-white" size={32} />
          </CutoutCardPin>
        </CutoutCardMedia>

        <CutoutCardContent className="px-6 py-6">
          <h3 className="font-serif text-2xl font-light text-stone-900 mb-3 tracking-tight">{card.title}</h3>
          <p className="text-stone-500 text-sm font-light leading-relaxed mb-6">{card.description}</p>
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <span className="text-xs text-stone-400 tracking-widest uppercase">Signature Collection</span>
            <button className="text-[11px] font-bold tracking-[2px] uppercase text-[#d4af37] hover:opacity-70 transition-opacity">Explore Details</button>
          </div>
        </CutoutCardContent>
      </CutoutCard>
    </motion.div>
  );
};

const Series = () => {
  const containerRef = useRef(null);
  
  return (
    <ReactLenis root>
      <section
        id="series"
        ref={containerRef}
        className="relative w-full min-h-[300vh] overflow-visible pb-[20vh]"
      >
        {/* Modern Sticky Background strategy — works perfectly on mobile */}
        <div className="sticky top-0 left-0 w-full h-[100vh] z-0 overflow-hidden">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&auto=format&fit=crop&q=40")',
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 -mt-[100vh]">
          {/* Heading */}
          <div className="text-center pt-[20vh] mb-[10vh]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="block uppercase text-[11px] tracking-[8px] text-white/60 mb-4 font-sans"
            >
              Curated Experiences
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="font-serif text-[clamp(2.5rem,8vw,5rem)] font-light text-white m-0"
            >
              The Signature Series
            </motion.h2>
            <div className="w-16 h-px bg-[#d4af37] mx-auto mt-8" />
          </div>

          {/* Cards Stack */}
          <div className="max-w-2xl mx-auto px-4 flex flex-col gap-[40vh] mb-[20vh]">
            {seriesCards.map((card, i) => (
              <SeriesCard key={card.id} card={card} index={i} />
            ))}
          </div>

          {/* Brand Footer */}
          <div className="text-center py-20">
            <div className="flex items-center justify-center gap-6 opacity-30">
              <div className="w-12 h-px bg-white" />
              <span className="text-white text-[10px] tracking-[6px] uppercase font-light">Luxury Redefined</span>
              <div className="w-12 h-px bg-white" />
            </div>
          </div>
        </div>
      </section>
    </ReactLenis>
  );
};

export default Series;
