import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion';
import {
  CutoutCard,
  CutoutCardMedia,
  CutoutCardContent,
  CutoutCardInsetLabel,
  CutoutCardPin,
  CutoutCorner,
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

const SeriesCard = ({ card, index, isMobile }) => {
  const vertMargin = 10;
  const container = useRef(null);
  const inView = useInView(container, { once: true, margin: '-60px' });
  const stagger = useCutoutContentStaggerVariants();

  // Scroll animations - only active on desktop
  const [maxScrollY, setMaxScrollY] = useState(Infinity);
  const filter = useMotionValue(0);
  const negateFilter = useTransform(filter, (value) => -Math.min(value, 6));

  const { scrollY } = useScroll({ 
    target: container,
    disabled: isMobile // Optimization: disable scroll tracking on mobile
  });
  
  const scale = useTransform(scrollY, [maxScrollY, maxScrollY + 10000], [1, 0]);

  const isInView = useInView(container, {
    margin: `0px 0px -${100 - vertMargin}% 0px`,
    once: true,
  });

  useEffect(() => {
    if (!isMobile && isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView, isMobile, scrollY]);

  // Handle scroll updates for scale/rotate on desktop
  useEffect(() => {
    if (isMobile) return;

    const unsubscribe = scrollY.on('change', (y) => {
      let animationValue = 1;
      if (y > maxScrollY) {
        animationValue = Math.max(0, 1 - (y - maxScrollY) / 10000);
      }
      scale.set(animationValue);
      filter.set((1 - animationValue) * 6);
    });
    return () => unsubscribe();
  }, [isMobile, maxScrollY, scrollY, scale, filter]);

  return (
    <motion.div
      ref={container}
      initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0 }}
      animate={inView ? (isMobile ? { opacity: 1, y: 0 } : { opacity: 1 }) : {}}
      transition={isMobile ? { duration: 0.6, ease: EASE, delay: index * 0.08 } : { duration: 0.3 }}
      className={`${!isMobile ? "sticky" : ""} w-full max-w-2xl mx-auto overflow-hidden rounded-[28px] ${!isMobile ? "bg-neutral-200" : "bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.18)] border border-stone-200/60"}`}
      style={!isMobile ? {
        scale: scale,
        rotate: filter,
        top: `${vertMargin}vh`,
      } : {}}
    >
      <CutoutCard
        trackPointerHover={!isMobile}
        className="group/cutout relative cursor-pointer overflow-hidden rounded-[28px] bg-white text-stone-900 border border-stone-200/60 shadow-[0px_4px_24px_rgba(0,0,0,0.25)] transition-shadow duration-500 hover:shadow-[0px_8px_40px_rgba(0,0,0,0.4)]"
      >
        <CutoutCardMedia className={isMobile ? "h-[56vw] max-h-[280px]" : "h-[52vw] max-h-[420px] sm:h-[400px] md:h-[380px]"}>
          {isMobile ? (
             <img
               src={card.image}
               srcSet={`${card.image.replace('w=800', 'w=400')} 400w, ${card.image} 800w`}
               sizes="100vw"
               alt={card.title}
               width="800"
               height="500"
               className="h-full w-full object-cover"
               loading="lazy"
             />
          ) : (
            <motion.img
              src={card.image}
              srcSet={`${card.image.replace('w=800', 'w=400')} 400w, ${card.image} 800w`}
              sizes="(max-width: 768px) 100vw, 800px"
              alt={card.title}
              width="800"
              height="500"
              style={{ rotate: negateFilter }}
              className="h-full w-full scale-125 object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cutout:scale-150"
              loading="lazy"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Tag label — bottom-left */}
          <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-[20px] bg-white px-4 py-2">
            <span className={`font-bold uppercase tracking-[3px] text-stone-500 ${isMobile ? "text-[9px]" : "text-[9px] sm:text-[10px]"}`}>
              {card.tag}
            </span>
            <CutoutCorner className="absolute -right-[31px] -bottom-px rotate-90 text-white" size={32} />
            <CutoutCorner className="absolute -top-[31px] -left-px rotate-90 text-white" size={32} />
          </CutoutCardInsetLabel>

          {/* Series number pin — top-right */}
          <CutoutCardPin className="top-0 right-0 rounded-bl-[20px] bg-white px-4 py-2">
            <span className={`font-bold uppercase tracking-[3px] text-stone-600 ${isMobile ? "text-[9px]" : "text-[9px] sm:text-[10px]"}`}>
              0{index + 1}
            </span>
            <CutoutCorner className="absolute -left-[31px] -top-px rotate-[270deg] text-white" size={32} />
            <CutoutCorner className="absolute -bottom-[31px] -right-px rotate-[270deg] text-white" size={32} />
          </CutoutCardPin>
        </CutoutCardMedia>

        <CutoutCardContent className="px-5 pt-5 pb-5">
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <motion.h3
              variants={stagger.item}
              className={`font-serif font-semibold text-stone-900 mb-2 tracking-tight leading-snug ${isMobile ? "text-xl" : "text-xl sm:text-2xl"}`}
            >
              {card.title}
            </motion.h3>
            <motion.p
              variants={stagger.item}
              className={`text-stone-500 font-light leading-relaxed mb-5 ${isMobile ? "text-xs" : "text-xs sm:text-sm"}`}
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
              <button className={`rounded-full border border-stone-300 bg-stone-50 hover:bg-stone-100 px-4 py-1.5 text-[11px] font-semibold tracking-[1.5px] uppercase text-stone-600 transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37] ${isMobile ? "active:bg-stone-100" : ""}`}>
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      id="series"
      className="relative py-24 md:py-32 px-4 sm:px-8 md:px-12 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&auto=format&fit=crop&q=40")',
      }}
    >
      <div ref={headingRef} className="text-center mb-12 md:mb-20 pt-[20vh]">
        <motion.span
          initial={{ opacity: 0, letterSpacing: '14px' }}
          animate={headingInView ? { opacity: 1, letterSpacing: '5px' } : {}}
          transition={{ duration: 1.2, ease: EASE }}
          className="block uppercase text-[10px] sm:text-[11px] tracking-[5px] font-sans font-medium mb-4 text-white"
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
        />
      </div>

      <div className={`${isMobile ? "max-w-lg mx-auto flex flex-col gap-8 pb-16" : "max-w-2xl mx-auto flex flex-col gap-[30vh] pb-[50vh]"}`}>
        {seriesCards.map((card, i) => (
          <SeriesCard key={card.id} card={card} index={i} isMobile={isMobile} />
        ))}
      </div>

      <div className="mt-16 text-center flex items-center justify-center gap-4">
        <div className="w-12 h-[0.5px] bg-[#d4af37]/50" />
        <span className="font-sans text-[10px] tracking-[5px] uppercase text-[#d4af37] font-medium">
          Luxury Redefined
        </span>
        <div className="w-12 h-[0.5px] bg-[#d4af37]/50" />
      </div>
    </section>
  );
};

export default Series;
