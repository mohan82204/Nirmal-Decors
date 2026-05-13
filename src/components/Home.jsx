import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1];
import { FlowerFall } from './ui/flower-fall';

const WORDS = ['ELEGANCE', 'TIMELESS', 'BEAUTY'];

/* ── Word cycler ── */
const WordCycler = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: 'inline-block', position: 'relative', minWidth: '8ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(to bottom right, #334155 0%, #94a3b8 50%, #334155 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontStyle: 'italic',
            fontWeight: 400,
            padding: '0 0.2ch',
          }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ── Decorative diagonal band ── */
const DiagonalBand = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '42%',
      height: '100%',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 40%, #fbbf24 100%)',
      clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
      zIndex: 0,
      opacity: 0.55,
      transformOrigin: 'right',
    }}
  />
);

/* ── Stat pill ── */
const StatPill = ({ value, label, delay }) => {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      style={{
        textAlign: 'center',
        padding: '20px 28px',
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(12px)',
        border: '0.5px solid rgba(212,175,55,0.3)',
        borderRadius: '2px',
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.2rem',
          fontWeight: 600,
          color: '#c8922a',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#666',
          marginTop: '6px',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
};

/* ── Home ── */
const Home = ({ onBookClick }) => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
  };
  const fadeUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: EASE } },
  };
  const slideIn = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1, ease: EASE } },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        overflow: 'hidden',
        /* Bright warm gradient background */
        background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 30%, #fde68a 60%, #fef9c3 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* ── Background layers ── */}
      {/* Left soft rose wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 15% 60%, rgba(249,168,212,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(253,230,138,0.4) 0%, transparent 50%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Diagonal accent */}
      <DiagonalBand />

      {/* Falling Flowers */}
      <FlowerFall count={15} />

      {/* Gold top shimmer bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #d4af37, #fbbf24, #d4af37, transparent)',
          transformOrigin: 'left',
          zIndex: 10,
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, position: 'relative', zIndex: 5, width: '100%' }}
      >
        <div className="max-w-[1300px] mx-auto px-[6%] pt-[100px] pb-[80px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-center">
          {/* LEFT — Text */}
          <motion.div variants={stagger} initial="hidden" animate={controls} className="order-2 lg:order-1 pt-8 lg:pt-0">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}
            >
              <div style={{ width: '36px', height: '1px', background: '#d4af37' }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '5px',
                  color: '#b45309',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                Nirmal Decor · Est. 2015
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp} style={{ marginBottom: '12px' }}>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
                  fontWeight: 300,
                  color: '#1a1208',
                  lineHeight: 1.1,
                  margin: 0,
                  letterSpacing: '-1px',
                }}
              >
                <span
                  style={{
                    background: 'linear-gradient(to bottom right, #450a0a 0%, #7f1d1d 25%, #dc2626 50%, #7f1d1d 75%, #450a0a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  Where Every
                  <br />
                  Moment Is{' '}
                </span>
                <WordCycler />
              </h1>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE } },
              }}
              style={{
                width: '80px',
                height: '1px',
                background: 'linear-gradient(90deg, #d4af37, #fbbf24)',
                margin: '28px 0',
                transformOrigin: 'left',
              }}
            />

            {/* Body */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                fontWeight: 300,
                color: '#5c4a1e',
                lineHeight: 1.85,
                maxWidth: '460px',
                margin: '0 0 48px',
              }}
            >
              We craft bespoke wedding experiences — from grand mandap structures to intimate floral
              canopies — transforming your vision into a timeless work of art.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
            >
              <motion.a
                href="#gallery"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-white bg-gradient-to-br from-[#d4af37] to-[#fbbf24] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer shadow-lg"
                style={{
                  padding: '18px 44px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '1px',
                  display: 'inline-block',
                }}
              >
                View Gallery
              </motion.a>

              <motion.button
                onClick={onBookClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="min-w-[160px] sm:min-w-[200px] text-[#b45309] border-[1.5px] border-[#d4af37] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(212,175,55,0.4)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] cursor-pointer px-8 sm:px-11 py-4 sm:py-[18px] font-sans text-[11px] sm:text-[12px] font-bold tracking-[3px] uppercase rounded-[1px] text-center"
              >
                Book Now
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT — Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
            transition={{ 
              opacity: { duration: 1.2, ease: EASE, delay: 0.5 },
              x: { duration: 1.2, ease: EASE, delay: 0.5 },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="relative h-[400px] sm:h-[500px] lg:h-[560px] order-1 lg:order-2"
          >
            {/* Main image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="absolute top-0 left-[10%] lg:left-[5%] right-0 h-[80%] lg:h-[78%] rounded-[2px] overflow-hidden shadow-[0_30px_60px_rgba(180,130,20,0.2)]"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&auto=format&fit=crop"
                alt="Floral wedding decor"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
                className="w-full h-full object-cover"
                fetchPriority="high"
                decoding="sync"
              />
              <div className="absolute inset-0 border-[0.5px] border-[#d4af37]/50 rounded-[2px] pointer-events-none" />
            </motion.div>

            {/* Floating small image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ 
                opacity: { duration: 1, ease: EASE, delay: 1 },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }
              }}
              whileHover={{ y: -6 }}
              className="absolute bottom-0 left-0 w-[45%] lg:w-[42%] h-[45%] lg:h-[42%] rounded-[2px] overflow-hidden shadow-2xl border-[3px] border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop"
                alt="Golden reception"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: [1, 1.08, 1] }}
              transition={{ 
                opacity: { duration: 0.8, ease: EASE, delay: 1.3 },
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              whileHover={{ rotate: 10 }}
              className="absolute top-[10%] left-0 lg:left-[-6%] w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#d4af37] to-[#fbbf24] flex flex-col items-center justify-center shadow-[0_12px_30px_rgba(212,175,55,0.4)]"
            >
              <span className="font-serif text-2xl sm:text-[1.8rem] font-semibold text-white leading-none">10+</span>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-widest text-white/90 uppercase mt-0.5">Yrs Exp</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.1 }}
          className="max-w-[1300px] mx-auto px-[6%] pb-20 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-5"
        >
          <StatPill value="500+" label="Weddings Styled" delay={1.2} />
          <StatPill value="98%" label="Client Satisfaction" delay={1.35} />
          <StatPill value="50+" label="Design Collections" delay={1.5} />
          <StatPill value="10+" label="Years of Excellence" delay={1.65} />
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      {[
        { top: '1.75rem', left: '1.75rem', clip: 'polygon(0 0, 100% 0, 100% 2%, 2% 2%, 2% 100%, 0 100%)' },
        { top: '1.75rem', right: '1.75rem', clip: 'polygon(0 0, 100% 0, 100% 100%, 98% 100%, 98% 2%, 0 2%)' },
        { bottom: '1.75rem', left: '1.75rem', clip: 'polygon(0 0, 2% 0, 2% 98%, 100% 98%, 100% 100%, 0 100%)' },
        { bottom: '1.75rem', right: '1.75rem', clip: 'polygon(98% 0, 100% 0, 100% 100%, 0 100%, 0 98%, 98% 98%)' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute w-10 h-10 border border-[#d4af37] z-10 pointer-events-none"
          style={{
            clipPath: pos.clip,
            ...pos
          }}
        />
      ))}
    </section>
  );
};

export default Home;
