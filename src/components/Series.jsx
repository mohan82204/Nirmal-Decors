import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CardStack } from '@/components/ui/card-stack';

const EASE = [0.76, 0, 0.24, 1];

/* ── Wedding series cards for the CardStack ── */
const seriesCards = [
  {
    id: 1,
    title: 'Floral Ethereal',
    description:
      'Delicate blooms, soft candlelight, and cascading petals creating a dreamy, garden-paradise atmosphere.',
    imageSrc:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1280&auto=format&fit=crop',
    tag: 'Signature',
    ctaLabel: 'Explore',
  },
  {
    id: 2,
    title: 'Royal Golden',
    description:
      'Opulent gold leaf accents, grand chandeliers, and majestic mandap structures fit for royalty.',
    imageSrc:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1280&auto=format&fit=crop',
    tag: 'Premium',
    ctaLabel: 'Discover',
  },
  {
    id: 3,
    title: 'Modern Minimal',
    description:
      'Clean architectural lines, monochromatic palettes, and sculptural florals for the contemporary couple.',
    imageSrc:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1280&auto=format&fit=crop',
    tag: 'Contemporary',
    ctaLabel: 'View',
  },
  {
    id: 4,
    title: 'Mandap Heritage',
    description:
      'Traditional sacred structures reimagined — hand-painted motifs and marigold arrangements celebrating culture.',
    imageSrc:
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1280&auto=format&fit=crop',
    tag: 'Traditional',
    ctaLabel: 'Explore',
  },
  {
    id: 5,
    title: 'Candlelit Intimate',
    description:
      'Warm amber candlelight, lush greenery, and whisper-soft fabrics for an unforgettable micro-wedding.',
    imageSrc:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1280&auto=format&fit=crop',
    tag: 'Intimate',
    ctaLabel: 'Discover',
  },
];

/* ── Animated section heading ── */
const SectionHeading = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="text-center mb-16">
      <motion.span
        initial={{ opacity: 0, letterSpacing: '14px' }}
        animate={inView ? { opacity: 1, letterSpacing: '5px' } : {}}
        transition={{ duration: 1.2, ease: EASE }}
        className="block uppercase text-[10px] sm:text-[11px] tracking-[5px] font-sans font-medium mb-4"
        style={{ color: '#d4af37' }}
      >
        Curated Experiences
      </motion.span>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '110%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="font-serif text-[clamp(2.2rem,6vw,4rem)] font-light m-0 tracking-[-0.5px] !text-white"
        >
          Our Signature Series
        </motion.h2>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        className="w-[60px] h-[1px] bg-gradient-to-r from-[#d4af37] to-[#fbbf24] mx-auto mt-6 origin-left"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
        className="font-sans text-sm sm:text-[15px] text-white/70 font-light mt-4 leading-relaxed"
      >
        Click a card or drag to browse — use arrow keys for accessibility
      </motion.p>
    </div>
  );
};

/* ── Series ── */
const Series = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth < 640 ? 300 : 500,
    height: window.innerWidth < 640 ? 220 : 340,
    spread: window.innerWidth < 640 ? 20 : 44
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth < 640 ? 300 : 500,
        height: window.innerWidth < 640 ? 220 : 340,
        spread: window.innerWidth < 640 ? 20 : 44
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="series"
      className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&auto=format&fit=crop&q=60")',
      }}
    >
      {/* Animated gold gradient overlay */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.15) 0%, transparent 65%)' }}
      />
      {/* Decorative amber blobs */}
      <motion.div
        animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-8%] right-[-4%] w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] pointer-events-none opacity-40 sm:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ x: [0, -18, 0], y: [0, 24, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] left-[-4%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] pointer-events-none opacity-40 sm:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
      />

      <div className="container max-w-[1200px] mx-auto px-6 relative z-[1]">
        <SectionHeading />

        {/* Card Stack */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="flex justify-center"
        >
          <CardStack
            items={seriesCards}
            initialIndex={0}
            autoAdvance
            intervalMs={2000}
            pauseOnHover
            showDots
            cardWidth={dimensions.width}
            cardHeight={dimensions.height}
            overlap={0.42}
            spreadDeg={dimensions.spread}
            maxVisible={5}
            loop
            perspectivePx={1200}
            depthPx={120}
            activeLiftPx={26}
            activeScale={1.04}
            inactiveScale={0.92}
            springStiffness={260}
            springDamping={26}
          />
        </motion.div>

        {/* Bottom caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
          className="mt-12 md:mt-16 text-center flex items-center justify-center gap-4"
        >
          <div className="w-6 sm:w-9 h-[0.5px] bg-[#d4af37]" />
          <span className="font-sans text-[9px] sm:text-[11px] tracking-[4px] uppercase text-[#d4af37] font-medium">
            5 Signature Collections Available
          </span>
          <div className="w-6 sm:w-9 h-[0.5px] bg-[#d4af37]" />
        </motion.div>
      </div>
    </section>
  );
};

export default Series;
