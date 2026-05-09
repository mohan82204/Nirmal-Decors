import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X } from 'lucide-react';
import { CircularGallery } from '@/components/ui/circular-gallery';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

const EASE = [0.76, 0, 0.24, 1];
const SPRING = { type: 'spring', stiffness: 280, damping: 22 };

const galleryItems = [
  {
    id: 1,
    label: 'Floral Canopy',
    category: 'Floral Design',
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1280&auto=format&fit=crop',
    bg: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&auto=format&fit=crop',
    desc: 'A breathtaking archway of fresh florals cascading in soft blush and ivory tones, setting an ethereal entrance for the most important walk of your life.',
  },
  {
    id: 2,
    label: 'Golden Reception',
    category: 'Table Setting',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1280&auto=format&fit=crop',
    bg: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&auto=format&fit=crop',
    desc: 'Opulent gold centrepieces, candlelight, and custom linens transform every table into a statement of elegance your guests will remember forever.',
  },
  {
    id: 3,
    label: 'Ceremony Arch',
    category: 'Wedding Decor',
    img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1280&auto=format&fit=crop',
    bg: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1920&auto=format&fit=crop',
    desc: 'Handcrafted ceremony arches entwined with seasonal blooms and flowing fabric — the perfect frame for your vows.',
  },
  {
    id: 4,
    label: 'Bridal Stage',
    category: 'Stage Design',
    img: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=1280&auto=format&fit=crop',
    bg: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=1920&auto=format&fit=crop',
    desc: 'Grand bridal stages adorned with draping silks and curated floral walls — designed to make you the centerpiece of every gaze.',
  },
  {
    id: 5,
    label: 'Mandap Elegance',
    category: 'Traditional Decor',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1280&auto=format&fit=crop',
    bg: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1920&auto=format&fit=crop',
    desc: 'Traditional mandap designs reimagined with contemporary elegance — honouring sacred rituals while creating a visually stunning ceremony.',
  },
  {
    id: 6,
    label: 'Candlelit Aisle',
    category: 'Ambient Lighting',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1280&auto=format&fit=crop',
    bg: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&auto=format&fit=crop',
    desc: 'Hundreds of candles casting a warm golden glow — a romantic aisle that feels like a dream and photographs like a painting.',
  },
];

const circularGalleryData = galleryItems.map(item => ({
  common: item.label,
  binomial: item.category,
  photo: {
    url: item.img,
    text: item.desc,
    by: 'Nirmal Decor'
  },
  raw: item // Keep the original item for full access
}));

/* ── Section heading ── */
const SectionHeading = ({ eyebrow, title, subtitle }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      style={{ textAlign: 'center', marginBottom: '40px' }}
    >
      <motion.span
        initial={{ opacity: 0, letterSpacing: '12px' }}
        animate={inView ? { opacity: 1, letterSpacing: '4px' } : {}}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          display: 'block',
          color: '#b45309',
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
            color: '#1a1208',
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
          background: 'linear-gradient(90deg, #d4af37, #fbbf24)',
          margin: '24px auto 16px',
          transformOrigin: 'left',
        }}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          style={{
            color: '#78580a',
            fontSize: '13px',
            letterSpacing: '1px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

const Gallery = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <AnimatePresence>
        {selected && (
          <motion.div
            key="expansion-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: '#000',
              overflowY: 'auto',
            }}
          >
            <motion.button
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               transition={{ delay: 0.5, ...SPRING }}
               onClick={() => setSelected(null)}
               style={{
                 position: 'fixed',
                 top: '32px',
                 right: '32px',
                 zIndex: 1100,
                 background: 'rgba(255,255,255,0.1)',
                 border: '1px solid rgba(255,255,255,0.2)',
                 borderRadius: '50%',
                 width: '48px',
                 height: '48px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 cursor: 'pointer',
                 color: '#fff',
                 backdropFilter: 'blur(10px)',
               }}
            >
              <X size={20} />
            </motion.button>

            <ScrollExpandMedia
              mediaType="image"
              mediaSrc={selected.img}
              bgImageSrc={selected.bg || selected.img}
              title={selected.label}
              date={selected.category}
              scrollToExpand="↓ Scroll to expand details"
              textBlend
            >
              <div className="max-w-4xl mx-auto py-12 px-6">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="text-4xl font-serif mb-8 text-[#1a1a1a]"
                >
                  {selected.label}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                  className="text-xl leading-relaxed text-gray-600 font-light"
                >
                  {selected.desc}
                </motion.p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                     className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
                   >
                      <img src={selected.img} className="w-full h-full object-cover" alt="Detail" />
                   </motion.div>
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
                     className="flex flex-col justify-center"
                   >
                      <h4 className="text-sm uppercase tracking-widest text-[#d4af37] mb-4 font-bold">The Vision</h4>
                      <p className="text-gray-500 leading-relaxed">
                         Every detail is meticulously planned to create a cohesive and breathtaking atmosphere. 
                         We combine traditional elements with modern aesthetics to tell your unique love story.
                      </p>
                   </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="mt-20 text-center"
                >
                   <motion.button 
                    whileHover="hover"
                    whileTap="tap"
                    initial="initial"
                    onClick={() => setSelected(null)}
                    style={{
                      padding: '16px 48px',
                      background: '#d4af37',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '3px',
                      cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif",
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 10px 20px rgba(212,175,55,0.2)',
                    }}
                   >
                      <motion.div
                        variants={{
                          initial: { x: '-100%', opacity: 0 },
                          hover: { x: '100%', opacity: 0.6 },
                        }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                          zIndex: 1,
                        }}
                      />
                      <span style={{ position: 'relative', zIndex: 2 }}>Close Gallery</span>
                   </motion.button>
                </motion.div>
              </div>
            </ScrollExpandMedia>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="gallery"
        className="relative w-full overflow-visible"
        style={{
          background: 'linear-gradient(180deg, #fffbf5 0%, #fef3c7 60%, #fde68a 100%)',
          height: '400vh',
        }}
      >
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Decorative amber blobs from Series design */}
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
                'radial-gradient(circle, rgba(251,191,36,0.14) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
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
                'radial-gradient(circle, rgba(249,168,212,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div className="w-full max-w-[1400px] px-6 lg:px-[5%] z-10 absolute top-12 lg:top-24">
            <SectionHeading
              eyebrow="Visual Storytelling"
              title="The Exhibition"
            />
          </div>

          <div className="w-full h-full pt-20 relative z-0">
            <CircularGallery 
              items={circularGalleryData} 
              radius={window.innerWidth < 768 ? 300 : 500}
              autoRotateSpeed={0.03}
              onItemClick={(item) => setSelected(item.raw)}
            />
          </div>

        </div>
      </section>
    </>
  );
};

export default Gallery;
