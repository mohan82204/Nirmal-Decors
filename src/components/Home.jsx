import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1];
const SPRING = { type: 'spring', stiffness: 260, damping: 22 };
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
      className="p-8 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 text-center"
    >
      <h3 className="font-serif text-4xl text-[#1a1a1a] mb-1">{value}</h3>
      <p className="text-[10px] uppercase tracking-[2px] text-[#b45309] font-semibold">{label}</p>
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

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 30%, #fde68a 60%, #fef9c3 100%)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
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

      <DiagonalBand />
      <FlowerFall count={15} />

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

      <motion.div
        style={{ opacity: heroOpacity, y: heroY, position: 'relative', zIndex: 5, width: '100%' }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10 max-w-[1300px] mx-auto px-[6%] py-[100px]">
          
          <motion.div 
            variants={stagger} 
            initial="hidden" 
            animate={controls}
            className="w-full lg:w-[55%] text-center lg:text-left"
          >
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

            <motion.div variants={fadeUp} style={{ marginBottom: '12px' }}>
              <h1 
                className="font-serif leading-[1.1] text-gray-900 mb-6"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 6rem)',
                  fontWeight: 300,
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

            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE } },
              }}
              style={{
                width: '80px',
                height: '1px',
                background: 'linear-gradient(90deg, #d4af37, #fbbf24)',
                margin: '28px auto 28px 0',
                transformOrigin: 'left',
              }}
            />

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                fontWeight: 300,
                color: '#5c4a1e',
                lineHeight: 1.85,
                maxWidth: '460px',
                margin: '0 auto 48px 0',
              }}
            >
              We craft bespoke wedding experiences — from grand mandap structures to intimate floral
              canopies — transforming your vision into a timeless work of art.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', lg: 'justify-start' }}
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
                className="text-[#b45309] border-[1.5px] border-[#d4af37] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(212,175,55,0.4)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] cursor-pointer"
                style={{
                  padding: '18px 44px',
                  background: 'transparent',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  borderRadius: '1px',
                }}
              >
                Book Now
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ 
              opacity: 1, 
              x: 0,
            }}
            transition={{ 
              opacity: { duration: 1.2, ease: EASE, delay: 0.5 },
              x: { duration: 1.2, ease: EASE, delay: 0.5 },
            }}
            className="w-full lg:w-[40%] relative h-[400px] lg:h-[500px]"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={SPRING}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '2px',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(180,130,20,0.2)',
                border: '0.5px solid rgba(212,175,55,0.5)',
              }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&auto=format&fit=crop"
                alt="Floral wedding decor"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>

            {/* Floating small image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: [0, 10, 0],
              }}
              transition={{ 
                opacity: { duration: 1, ease: EASE, delay: 1 },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }
              }}
              whileHover={{ y: -6 }}
              className="absolute -bottom-10 -left-6 lg:-bottom-20 lg:-left-20 w-[45%] aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border-2 lg:border-4 border-white z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop"
                alt="Golden reception"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.08, 1],
              }}
              transition={{ 
                opacity: { duration: 0.8, ease: EASE, delay: 1.3 },
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              whileHover={{ rotate: 10 }}
              className="absolute -top-10 -left-10 lg:-top-16 lg:-left-16 size-24 lg:size-32 rounded-full bg-gradient-to-br from-[#d4af37] to-[#fbbf24] flex flex-col items-center justify-center text-white shadow-xl z-30 border-4 border-white/30 backdrop-blur-md"
            >
              <span className="font-serif text-2xl lg:text-3xl font-bold leading-none">10+</span>
              <span className="text-[8px] lg:text-[10px] tracking-widest uppercase mt-1 opacity-90">Yrs Exp</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <div className="w-full max-w-7xl mx-auto px-[5%] pb-20 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatPill value="500+" label="Weddings Styled" delay={1.2} />
            <StatPill value="98%" label="Client Satisfaction" delay={1.35} />
            <StatPill value="50+" label="Design Collections" delay={1.5} />
            <StatPill value="10+" label="Years of Excellence" delay={1.65} />
          </div>
        </div>
      </motion.div>

      {/* Corner accents */}
      {[
        { top: 28, left: 28, clip: 'polygon(0 0, 100% 0, 100% 2%, 2% 2%, 2% 100%, 0 100%)' },
        { top: 28, right: 28, clip: 'polygon(0 0, 100% 0, 100% 100%, 98% 100%, 98% 2%, 0 2%)' },
        { bottom: 28, left: 28, clip: 'polygon(0 0, 2% 0, 2% 98%, 100% 98%, 100% 100%, 0 100%)' },
        { bottom: 28, right: 28, clip: 'polygon(98% 0, 100% 0, 100% 100%, 0 100%, 0 98%, 98% 98%)' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{
            position: 'absolute',
            width: '40px',
            height: '40px',
            border: '1px solid #d4af37',
            zIndex: 10,
            clipPath: pos.clip,
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            right: pos.right,
          }}
        />
      ))}

    </section>
  );
};

export default Home;
