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
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1280&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Royal Golden',
    tag: 'Premium',
    description: 'Opulent gold leaf accents, grand chandeliers, and majestic mandap structures fit for royalty.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1280&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Modern Minimal',
    tag: 'Contemporary',
    description: 'Clean architectural lines, monochromatic palettes, and sculptural florals for the contemporary couple.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1280&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Mandap Heritage',
    tag: 'Traditional',
    description: 'Traditional sacred structures reimagined — hand-painted motifs and marigold arrangements celebrating culture.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1280&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Candlelit Intimate',
    tag: 'Intimate',
    description: 'Warm amber candlelight, lush greenery, and whisper-soft fabrics for an unforgettable micro-wedding.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1280&auto=format&fit=crop',
  },
];

// Skiper34 sticky scale+rotate scroll effect applied to each card
const SeriesCard = ({ card, index }) => {
  const vertMargin = 10;
  const container = useRef(null);
  const inView = useInView(container, { once: true, margin: '-60px' });
  const stagger = useCutoutContentStaggerVariants();

  const [maxScrollY, setMaxScrollY] = useState(Infinity);
  const filter = useMotionValue(0);
  const negateFilter = useTransform(filter, (value) => -value);

  const { scrollY } = useScroll({ target: container });
  const scale = useTransform(scrollY, [maxScrollY, maxScrollY + 10000], [1, 0]);

  const isInView = useInView(container, {
    margin: `0px 0px -${100 - vertMargin}% 0px`,
    once: true,
  });

  scrollY.on('change', (y) => {
    let animationValue = 1;
    if (y > maxScrollY) {
      animationValue = Math.max(0, 1 - (y - maxScrollY) / 10000);
    }
    scale.set(animationValue);
    filter.set((1 - animationValue) * 100);
  });

  useEffect(() => {
    if (isInView) setMaxScrollY(scrollY.get());
  }, [isInView]);

  return (
    <motion.div
      ref={container}
      className="sticky w-full max-w-2xl mx-auto overflow-hidden rounded-[28px] bg-neutral-200"
      style={{
        scale: scale,
        rotate: filter,
        top: `${vertMargin}vh`,
      }}
    >
      <CutoutCard
        className="group/cutout relative cursor-pointer overflow-hidden rounded-[28px] bg-white text-stone-900 border border-stone-200/60 shadow-[0px_4px_24px_rgba(0,0,0,0.25)] transition-shadow duration-500 hover:shadow-[0px_8px_40px_rgba(0,0,0,0.4)]"
      >
        {/* ── Media ── */}
        <CutoutCardMedia className="h-[52vw] max-h-[420px] sm:h-[400px] md:h-[380px]">
          {/* Counter-rotating image for parallax effect */}
          <motion.img
            src={card.image}
            alt={card.title}
            style={{ rotate: negateFilter }}
            className="h-full w-full scale-125 object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cutout:scale-150"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Tag label — bottom-left */}
          <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-[20px] bg-white px-4 py-2">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[3px] text-stone-500">
              {card.tag}
            </span>
            <CutoutCorner className="absolute -right-[31px] -bottom-px rotate-90 text-white" size={32} />
            <CutoutCorner className="absolute -top-[31px] -left-px rotate-90 text-white" size={32} />
          </CutoutCardInsetLabel>

          {/* Series number pin — top-right */}
          <CutoutCardPin className="top-0 right-0 rounded-bl-[20px] bg-white px-4 py-2">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[3px] text-stone-600">
              0{index + 1}
            </span>
            <CutoutCorner className="absolute -left-[31px] -top-px rotate-[270deg] text-white" size={32} />
            <CutoutCorner className="absolute -bottom-[31px] -right-px rotate-[270deg] text-white" size={32} />
          </CutoutCardPin>
        </CutoutCardMedia>

        {/* ── Content ── */}
        <CutoutCardContent className="px-5 pt-5 pb-5">
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <motion.h3
              variants={stagger.item}
              className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 mb-2 tracking-tight leading-snug"
            >
              {card.title}
            </motion.h3>
            <motion.p
              variants={stagger.item}
              className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed mb-5"
            >
              {card.description}
            </motion.p>
            <motion.div variants={stagger.item} className="w-full h-px bg-stone-200 mb-4" />
            <motion.div variants={stagger.item} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d4af37] to-[#fbbf24] flex items-center justify-center shadow-md">
                  <span className="text-[9px] font-bold text-black">{index + 1}</span>
                </div>
                <span className="text-xs text-stone-500 tracking-wide font-light">Nirmal Decor</span>
              </div>
              <button className="rounded-full border border-stone-300 bg-stone-50 hover:bg-stone-100 px-4 py-1.5 text-[11px] font-semibold tracking-[1.5px] uppercase text-stone-600 transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37]">
                Enquire
              </button>
            </motion.div>
          </motion.div>
        </CutoutCardContent>
      </CutoutCard>
    </motion.div>
  );
};

const Series = () => {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <ReactLenis root>
      <section
        id="series"
        className="relative py-24 md:py-32 px-4 sm:px-8 md:px-12 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&auto=format&fit=crop&q=60")',
        }}
      >
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 md:mb-20 pt-[20vh]">
          <motion.span
            initial={{ opacity: 0, letterSpacing: '14px' }}
            animate={headingInView ? { opacity: 1, letterSpacing: '5px' } : {}}
            transition={{ duration: 1.2, ease: EASE }}
            className="block uppercase text-[10px] sm:text-[11px] tracking-[5px] font-sans font-medium mb-4 text-white"
            style={{ color: '#ffffff' }}
          >
            Curated Experiences
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }}
              animate={headingInView ? { y: '0%' } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="font-serif text-[clamp(2.2rem,6vw,4rem)] font-light m-0 tracking-[-0.5px] text-white drop-shadow-xl"
              style={{ color: '#ffffff' }}
            >
              Our Signature Series
            </motion.h2>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
            className="w-[60px] h-[2px] bg-white mx-auto mt-6 origin-left"
            style={{ backgroundColor: '#ffffff' }}
          />
        </div>

        {/* Cards — single column layout */}
        <div className="max-w-2xl mx-auto flex flex-col gap-[30vh] pb-[50vh]">
          {seriesCards.map((card, i) => (
            <SeriesCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Footer line */}
        <div className="mt-16 text-center flex items-center justify-center gap-4">
          <div className="w-12 h-[0.5px] bg-[#d4af37]/50" />
          <span className="font-sans text-[10px] tracking-[5px] uppercase text-[#d4af37] font-medium">
            Luxury Redefined
          </span>
          <div className="w-12 h-[0.5px] bg-[#d4af37]/50" />
        </div>
      </section>
    </ReactLenis>
  );
};

export default Series;
