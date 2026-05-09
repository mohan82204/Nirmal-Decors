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
      style={{
        position: 'relative',
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.65)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&auto=format&fit=crop&q=60")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#cbd5e1',
        paddingTop: '120px',
        paddingBottom: '100px',
      }}
    >
      {/* Animated gold gradient overlay */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div 
        className="px-6"
        style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
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
/* ── Contact ── */
export const Contact = ({ onBookClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const staggerItems = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const fadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section
      id="contact"
      style={{
        background: '#fffbf5',
        position: 'relative',
        paddingTop: '120px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      {/* Animated Liquid Silk Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
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
          style={{ position: 'absolute', inset: 0, opacity: 0.6 }}
        />
        
        {/* Large Parallax Background Text */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '20vw',
            fontWeight: 900,
            color: 'rgba(212, 175, 55, 0.03)',
            whiteSpace: 'nowrap',
            fontFamily: "'Cormorant Garamond', serif",
            zIndex: -1,
            pointerEvents: 'none',
            userSelect: 'none'
          }}
          animate={{ x: ['-20%', '0%', '-20%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          NIRMAL DECOR
        </motion.div>

        {/* Floating Accent Blobs */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left: Contact Info */}
          <motion.div
            variants={staggerItems}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeUp}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
            >
              <div style={{ width: '30px', height: '1px', background: '#d4af37' }} />
              <span style={{
                color: '#d4af37',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                fontSize: '10px',
                fontWeight: 700
              }}>
                Contact Us
              </span>
            </motion.div>
            
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 300,
                color: '#1a1a1a',
                margin: '0 0 40px',
                lineHeight: 1.05
              }}
            >
              The Beginning of <br />
              Your <span style={{ fontStyle: 'italic', color: '#d4af37' }}>Story</span>
            </motion.h2>

            <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div style={{ padding: '24px', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)', borderLeft: '2px solid #d4af37' }}>
                <h4 style={{ fontSize: '9px', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontWeight: 700 }}>Studio</h4>
                <p style={{ color: '#444', fontSize: '14px', fontWeight: 300, lineHeight: 1.6, margin: 0 }}>
                  123 Grand Emerald Ave,<br />
                  Chennai, Tamil Nadu
                </p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)', borderLeft: '2px solid #d4af37' }}>
                <h4 style={{ fontSize: '9px', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontWeight: 700 }}>Connect</h4>
                <p style={{ color: '#1a1a1a', fontSize: '18px', fontWeight: 300, margin: 0, fontFamily: "'Cormorant Garamond', serif" }}>
                  +91 99942 06952
                </p>
                <p style={{ color: '#555', fontSize: '13px', fontWeight: 300, marginTop: '4px' }}>
                  info@nirmaldecor.com
                </p>
              </div>
            </motion.div>

            {/* Social Icons (Bright Style) */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
              {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, color: '#d4af37' }}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(212,175,55,0.1)'
                  }}
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
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              padding: '64px 48px',
              borderRadius: '2px',
              boxShadow: '0 40px 80px rgba(180,130,20,0.12)',
              border: '1px solid #fff',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            {/* Outer Frame Accent */}
            <div style={{ position: 'absolute', inset: '12px', border: '0.5px solid rgba(212,175,55,0.3)', pointerEvents: 'none' }} />

            <div style={{ marginBottom: '32px' }}>
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto' }}>
                <circle cx="50" cy="50" r="48" stroke="#d4af37" strokeWidth="0.5" />
                <path d="M50 30 L50 70 M30 50 L70 50" stroke="#d4af37" strokeWidth="0.5" />
                <path d="M35 35 L65 65 M35 65 L65 35" stroke="#d4af37" strokeWidth="0.5" />
              </svg>
            </div>

            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.5rem',
              color: '#1a1a1a',
              margin: '0 0 8px',
              fontWeight: 300,
              letterSpacing: '1px'
            }}>
              Consultation
            </h3>
            <p style={{
              color: '#d4af37',
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '32px',
              fontWeight: 600
            }}>
              Bespoke Artistry
            </p>
            
            <p style={{
              color: '#666',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.8,
              marginBottom: '48px',
              fontFamily: "'Inter', sans-serif",
              maxWidth: '300px',
              margin: '0 auto 48px'
            }}>
              Reserve your exclusive design session and let us bring your vision to life with timeless elegance.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookClick}
              className="text-white bg-gradient-to-br from-[#d4af37] to-[#fbbf24] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer shadow-lg"
              style={{
                border: 'none',
                padding: '20px 56px',
                borderRadius: '1px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Reserve Now
            </motion.button>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <div style={{ 
          marginTop: '60px', 
          paddingTop: '40px', 
          borderTop: '1px solid rgba(212,175,55,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#d4af37' }}>
            Nirmal Decor
          </span>
          <p style={{ 
            color: 'rgba(0,0,0,0.4)', 
            fontSize: '10px', 
            letterSpacing: '2px', 
            textTransform: 'uppercase',
            margin: 0
          }}>
            ©2026 · Handcrafted with passion in Tamil Nadu
          </p>
        </div>
      </div>
    </section>
  );
};
