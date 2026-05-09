import { useRef } from 'react';
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
    <div ref={ref} style={{ textAlign: 'center', marginBottom: '64px' }}>
      <motion.span
        initial={{ opacity: 0, letterSpacing: '14px' }}
        animate={inView ? { opacity: 1, letterSpacing: '5px' } : {}}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          display: 'block',
          color: '#d4af37',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          fontSize: '11px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          marginBottom: '18px',
        }}
      >
        Curated Experiences
      </motion.span>

      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          initial={{ y: '110%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 300,
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          Our Signature Series
        </motion.h2>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, #d4af37, #fbbf24)',
          margin: '24px auto 0',
          transformOrigin: 'left',
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontWeight: 300,
          marginTop: '16px',
          lineHeight: 1.7,
        }}
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

  return (
    <section
      id="series"
      style={{
        position: 'relative',
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&auto=format&fit=crop&q=60")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#cbd5e1',
        padding: '120px 0 80px',
        overflow: 'hidden',
      }}
    >
      {/* Animated gold gradient overlay */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.15) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      {/* Decorative amber blobs */}
      <motion.div
        animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-8%',
          right: '-4%',
          width: '480px',
          height: '480px',
          background:
            'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, -18, 0], y: [0, 24, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-4%',
          width: '550px',
          height: '550px',
          background:
            'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 1 }}
      >
        <SectionHeading />

        {/* Card Stack */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        >
          <CardStack
            items={seriesCards}
            initialIndex={0}
            autoAdvance
            intervalMs={2000}
            pauseOnHover
            showDots
            cardWidth={500}
            cardHeight={340}
            overlap={0.42}
            spreadDeg={44}
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
          style={{
            textAlign: 'center',
            marginTop: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <div style={{ width: '36px', height: '0.5px', background: '#d4af37' }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#d4af37',
              fontWeight: 500,
            }}
          >
            5 Signature Collections Available
          </span>
          <div style={{ width: '36px', height: '0.5px', background: '#d4af37' }} />
        </motion.div>
      </div>
    </section>
  );
};

export default Series;
