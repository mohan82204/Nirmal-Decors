import React, { useState, useEffect, useRef } from 'react';
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
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1280&auto=format&fit=crop&q=60',
    bg: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&auto=format&fit=crop&q=60',
    desc: 'A breathtaking archway of fresh florals cascading in soft blush and ivory tones, setting an ethereal entrance for the most important walk of your life.',
  },
  {
    id: 2,
    label: 'Golden Reception',
    category: 'Table Setting',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1280&auto=format&fit=crop&q=60',
    bg: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&auto=format&fit=crop&q=60',
    desc: 'Opulent gold centrepieces, candlelight, and custom linens transform every table into a statement of elegance your guests will remember forever.',
  },
  {
    id: 3,
    label: 'Ceremony Arch',
    category: 'Wedding Decor',
    img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1280&auto=format&fit=crop&q=60',
    bg: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1920&auto=format&fit=crop&q=60',
    desc: 'Handcrafted ceremony arches entwined with seasonal blooms and flowing fabric — the perfect frame for your vows.',
  },
  {
    id: 4,
    label: 'Bridal Stage',
    category: 'Stage Design',
    img: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=1280&auto=format&fit=crop&q=60',
    bg: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=1920&auto=format&fit=crop&q=60',
    desc: 'Grand bridal stages adorned with draping silks and curated floral walls — designed to make you the centerpiece of every gaze.',
  },
  {
    id: 5,
    label: 'Mandap Elegance',
    category: 'Traditional Decor',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1280&auto=format&fit=crop&q=60',
    bg: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1920&auto=format&fit=crop&q=60',
    desc: 'Traditional mandap designs reimagined with contemporary elegance — honouring sacred rituals while creating a visually stunning ceremony.',
  },
  {
    id: 6,
    label: 'Candlelit Aisle',
    category: 'Ambient Lighting',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1280&auto=format&fit=crop&q=60',
    bg: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&auto=format&fit=crop&q=60',
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
    <motion.div ref={ref} className="text-center mb-10 sm:mb-16">
      <motion.span
        initial={{ opacity: 0, letterSpacing: '12px' }}
        animate={inView ? { opacity: 1, letterSpacing: '4px' } : {}}
        transition={{ duration: 1.2, ease: EASE }}
        className="block uppercase text-[10px] sm:text-xs mb-4 tracking-[4px]"
        style={{ color: '#b45309' }}
      >
        {eyebrow}
      </motion.span>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '110%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="font-serif text-[clamp(2.2rem,6vw,4rem)] font-light m-0 tracking-[-0.5px] text-[#1a1208]"
        >
          {title}
        </motion.h2>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        className="w-[60px] h-[1px] bg-gradient-to-r from-[#d4af37] to-[#fbbf24] mx-auto mt-6 mb-4 origin-left"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          className="text-[#78580a] text-xs sm:text-[13px] tracking-[1px] font-sans font-light px-4"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

const Gallery = () => {
  const [selected, setSelected] = useState(null);
  const [radius, setRadius] = useState(window.innerWidth < 768 ? 300 : 500);

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 300 : 500);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <AnimatePresence>
        {selected && (
          <motion.div
            key="expansion-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black overflow-y-auto"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5, ...SPRING }}
              onClick={() => setSelected(null)}
              className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[1100] bg-white/10 border border-white/20 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer text-white backdrop-blur-md hover:bg-white/20 transition-colors"
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
              <div className="max-w-4xl mx-auto py-12 px-6 flex flex-col items-center text-center sm:text-left sm:items-start">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="text-3xl sm:text-4xl font-serif mb-8 text-[#1a1a1a] w-full"
                >
                  {selected.label}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                  className="text-lg sm:text-xl leading-relaxed text-gray-600 font-light w-full"
                >
                  {selected.desc}
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 sm:mt-16 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                    className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg w-full"
                  >
                    <img src={selected.img} className="w-full h-full object-cover" alt="Detail" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
                    className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left"
                  >
                    <h4 className="text-[10px] uppercase tracking-[3px] text-[#d4af37] mb-4 font-bold">The Vision</h4>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                      Every detail is meticulously planned to create a cohesive and breathtaking atmosphere.
                      We combine traditional elements with modern aesthetics to tell your unique love story.
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="mt-16 sm:mt-20 text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(null)}
                    className="w-full sm:w-auto text-white bg-gradient-to-br from-[#d4af37] to-[#fbbf24] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] cursor-pointer shadow-lg px-12 py-4 font-sans text-[12px] font-bold tracking-[3px] uppercase rounded-[1px]"
                  >
                    Close Gallery
                  </motion.button>
                </motion.div>
              </div>
            </ScrollExpandMedia>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="gallery"
        className="relative w-full overflow-visible h-[250vh]"
        style={{
          background: 'linear-gradient(180deg, #fffbf5 0%, #fef3c7 60%, #fde68a 100%)',
        }}
      >
        <div className="sticky top-0 w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
          {/* Decorative amber blobs */}
          <motion.div
            animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[-8%] right-[-4%] w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] z-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.14) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ x: [0, -18, 0], y: [0, 24, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[-10%] left-[-4%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] z-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(249,168,212,0.1) 0%, transparent 70%)' }}
          />

          <div className="w-full max-w-[1400px] px-[6%] z-10 absolute top-12 sm:top-16">
            <SectionHeading
              eyebrow="Visual Storytelling"
              title="The Exhibition"
            />
          </div>

          <div className="w-full h-full pt-10 sm:pt-20 relative z-0">
            <CircularGallery
              items={circularGalleryData}
              radius={radius}
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