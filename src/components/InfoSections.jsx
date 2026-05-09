import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { TestimonialsVariant } from './ui/demo';
import { BorderRotate } from './ui/animated-gradient-border';

const EASE = [0.76, 0, 0.24, 1];
const SPRING = { type: 'spring', stiffness: 260, damping: 22 };

const TESTIMONIALS = [
  {
    id: 'testimonial-3',
    name: 'Elena & Marcus',
    profession: 'Married 2024',
    rating: 5,
    description:
      'Nirmal Decor transformed our wedding into a literal fairytale. Every detail was perfect. The elegance and professionalism displayed was unmatched.',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'testimonial-1',
    name: 'Sophie & Liam',
    profession: 'Married 2025',
    rating: 5,
    description:
      'The attention to detail in their floral work is exceptional. Our guests were in awe of the ceremony arch and the ambient lighting.',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'testimonial-2',
    name: 'Chloe & Daniel',
    profession: 'Married 2023',
    rating: 5,
    description:
      'Working with Nirmal Decor was a game-changer for our project. Their expertise and professionalism exceeded our expectations.',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'testimonial-4',
    name: 'Grace & Thomas',
    profession: 'Married 2024',
    rating: 4.5,
    description:
      'The quality of work and communication throughout the project was outstanding. They delivered exactly what we needed for our Mandap.',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60',
  },
];

/* ── Section heading ── */
const SectionHeading = ({ eyebrow, title, titleColor = '#fff', eyebrowColor = '#d4af37', bodyText }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} style={{ textAlign: 'center', marginBottom: '80px' }}>
      <motion.span
        initial={{ opacity: 0, letterSpacing: '12px' }}
        animate={inView ? { opacity: 1, letterSpacing: '4px' } : {}}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          display: 'block',
          color: eyebrowColor,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontSize: '12px',
          marginBottom: '16px',
        }}
      >
        {eyebrow}
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
            color: titleColor,
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          {title}
        </motion.h2>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        style={{
          width: '60px',
          height: '1px',
          background: '#d4af37',
          margin: '24px auto 0',
          transformOrigin: 'left',
        }}
      />
      {bodyText && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          style={{
            color: '#fff',
            maxWidth: '600px',
            margin: '20px auto 0',
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {bodyText}
        </motion.p>
      )}
    </div>
  );
};

/* ── Social Icons ── */
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SocialIcon = ({ icon: Icon, link, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ ...SPRING, delay }}
    >
      <BorderRotate
        animationSpeed={3}
        gradientColors={{ primary: '#584827', secondary: '#c7a03c', accent: '#f9de90' }}
        backgroundColor="#000000"
        borderWidth={1.5}
        borderRadius={50}
        style={{ display: 'inline-flex' }}
      >
        <motion.a
          href={link}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={SPRING}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            color: '#d4af37',
          }}
        >
          <Icon />
        </motion.a>
      </BorderRotate>
    </motion.div>
  );
};

/* ── Reviews ── */
export const Reviews = () => {
  return (
    <section
      id="reviews"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-20 md:pt-32 md:pb-24 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.65)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&auto=format&fit=crop&q=60")',
      }}
    >
      {/* Animated gold gradient overlay */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 65%)' }}
      />

      <div className="container max-w-[1200px] mx-auto text-center relative z-[1] px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Client Love"
          bodyText="Hear from the couples who trusted us to bring their vision to life."
        />

        <div className="w-full flex justify-center">
          <TestimonialsVariant />
        </div>
      </div>
    </section>
  );
};


/* ── Contact ── */
export const Contact = ({ onBookClick }) => {
  const staggerItems = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const fadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section id="contact" className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-[#fffbf5]">
      {/* Animated Liquid Silk Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(at 0% 0%, #fffbf5 0%, #fff7ed 50%, #fef3c7 100%)',
              'radial-gradient(at 100% 0%, #fffbf5 0%, #fff7ed 50%, #fef3c7 100%)',
              'radial-gradient(at 100% 100%, #fffbf5 0%, #fff7ed 50%, #fef3c7 100%)',
              'radial-gradient(at 0% 100%, #fffbf5 0%, #fff7ed 50%, #fef3c7 100%)',
              'radial-gradient(at 0% 0%, #fffbf5 0%, #fff7ed 50%, #fef3c7 100%)'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-60"
        />
        
        {/* Large Parallax Background Text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-[#d4af37]/[0.03] whitespace-nowrap font-serif z-[-1] pointer-events-none select-none"
          animate={{ x: ['-20%', '0%', '-20%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          NIRMAL DECOR
        </motion.div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Contact Info */}
          <motion.div
            variants={staggerItems}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="w-[30px] h-[1px] bg-[#d4af37]" />
              <span className="text-[#d4af37] tracking-[5px] uppercase text-[10px] font-bold">Contact Us</span>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light text-[#1a1a1a] m-0 mb-10 leading-[1.05]">
              The Beginning of <br />
              Your <span className="italic text-[#d4af37]">Story</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 bg-white/40 backdrop-blur-md border-l-2 border-[#d4af37]">
                <h4 className="text-[9px] text-[#d4af37] uppercase tracking-[2px] mb-2.5 font-bold">Studio</h4>
                <p className="text-[#444] text-sm font-light leading-relaxed m-0">
                  123 Grand Emerald Ave,<br />
                  Chennai, Tamil Nadu
                </p>
              </div>

              <div className="p-6 bg-white/40 backdrop-blur-md border-l-2 border-[#d4af37]">
                <h4 className="text-[9px] text-[#d4af37] uppercase tracking-[2px] mb-2.5 font-bold">Connect</h4>
                <p className="text-[#1a1a1a] text-lg font-light m-0 font-serif">+91 99942 06952</p>
                <p className="text-[#555] text-xs font-light mt-1">info@nirmaldecor.com</p>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
              {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, color: '#d4af37' }}
                  className="w-11 h-11 rounded-full bg-white flex items-center justify-center color-[#666] shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-all border border-[#d4af37]/10"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Frosted Glass Invitation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="relative bg-white/70 backdrop-blur-2xl px-8 py-16 sm:p-16 rounded-[2px] shadow-[0_40px_80px_rgba(180,130,20,0.12)] border border-white text-center"
          >
            <div className="absolute inset-3 border-[0.5px] border-[#d4af37]/30 pointer-events-none" />

            <div className="mb-8">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="mx-auto">
                <circle cx="50" cy="50" r="48" stroke="#d4af37" strokeWidth="0.5" />
                <path d="M50 30 L50 70 M30 50 L70 50" stroke="#d4af37" strokeWidth="0.5" />
                <path d="M35 35 L65 65 M35 65 L65 35" stroke="#d4af37" strokeWidth="0.5" />
              </svg>
            </div>

            <h3 className="font-serif text-[2rem] sm:text-[2.5rem] text-[#1a1a1a] m-0 mb-2 font-light tracking-[1px]">Consultation</h3>
            <p className="text-[#d4af37] text-[10px] sm:text-[11px] tracking-[4px] uppercase mb-8 font-semibold">Bespoke Artistry</p>
            
            <p className="text-[#666] text-sm sm:text-[15px] font-light leading-relaxed mb-12 font-sans max-w-[300px] mx-auto">
              Reserve your exclusive design session and let us bring your vision to life with timeless elegance.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookClick}
              className="w-full sm:w-auto text-white bg-gradient-to-br from-[#d4af37] to-[#fbbf24] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] cursor-pointer shadow-lg px-10 sm:px-14 py-4 sm:py-5 font-sans text-[11px] sm:text-[12px] font-bold tracking-[3px] uppercase rounded-[1px] text-center"
            >
              Reserve Now
            </motion.button>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <div className="mt-16 pt-10 border-t border-[#d4af37]/10 flex flex-col sm:flex-row justify-between items-center gap-5 text-center sm:text-left">
          <span className="font-serif text-2xl text-[#d4af37]">Nirmal Decor</span>
          <p className="text-black/40 text-[10px] tracking-[2px] uppercase m-0">
            ©2026 · Handcrafted with passion in Tamil Nadu
          </p>
        </div>
      </div>
    </section>
  );
};
