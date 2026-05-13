import * as React from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, Home, Sparkles, Image, MessageSquare, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'HOME',    href: '#home',    icon: Home },
  { name: 'SERIES',  href: '#series',  icon: Sparkles },
  { name: 'GALLERY', href: '#gallery', icon: Image },
  { name: 'REVIEWS', href: '#reviews', icon: MessageSquare },
  { name: 'CONTACT', href: '#contact', icon: Mail },
];

const EXPAND_SCROLL_THRESHOLD = 80;

// Custom hook for media query
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export function AnimatedNavFramer() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isExpanded, setExpanded] = React.useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }
    lastScrollY.current = latest;
  });

  if (isMobile) return <BottomNav />;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={{
          expanded: {
            y: 0, opacity: 1, width: 'auto',
            transition: { type: 'spring', damping: 20, stiffness: 300, staggerChildren: 0.07, delayChildren: 0.2 }
          },
          collapsed: {
            y: 0, opacity: 1, width: '3rem',
            transition: { type: 'spring', damping: 20, stiffness: 300, when: 'afterChildren', staggerChildren: 0.05, staggerDirection: -1 }
          }
        }}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={() => !isExpanded && setExpanded(true)}
        className={cn(
          'relative flex items-center overflow-hidden rounded-full shadow-lg h-12',
          'border border-[rgba(212,175,55,0.25)] backdrop-blur-md',
          !isExpanded && 'cursor-pointer justify-center',
        )}
        style={{ background: 'rgba(5, 5, 5, 0.75)' }}
      >
        {/* Logo */}
        <motion.div
          variants={{ expanded: { opacity: 1, x: 0 }, collapsed: { opacity: 0, x: -20 } }}
          className="flex-shrink-0 flex items-center pl-5 pr-3"
        >
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#d4af37', fontSize: '1rem', letterSpacing: '2px' }}>
            Nirmal Decor
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={{ expanded: { opacity: 1, scaleY: 1 }, collapsed: { opacity: 0, scaleY: 0 } }}
          style={{ width: '1px', height: '20px', background: 'rgba(212,175,55,0.3)', marginRight: '4px' }}
        />

        {/* Links */}
        <motion.div className={cn('flex items-center gap-0 pr-4', !isExpanded && 'pointer-events-none')}>
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              variants={{ expanded: { opacity: 1, x: 0, scale: 1 }, collapsed: { opacity: 0, x: -16, scale: 0.95 } }}
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1 text-[10px] tracking-[2px] font-medium text-white/60 hover:text-[#d4af37] transition-colors whitespace-nowrap"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {item.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Collapsed Icon */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Menu className="h-5 w-5 text-[#d4af37]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

function BottomNav() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[400px]"
    >
      <nav 
        className="flex items-center justify-around h-[68px] px-2 rounded-full border border-white/60 backdrop-blur-xl shadow-[0_12px_40px_rgba(180,130,20,0.15)]" 
        style={{ background: 'rgba(255, 255, 255, 0.85)' }}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center gap-1 group relative w-[60px] h-[52px] rounded-2xl transition-all active:scale-95 active:bg-[#d4af37]/10"
          >
            <item.icon className="w-[22px] h-[22px] text-[#b45309]/60 group-hover:text-[#b45309] transition-colors" strokeWidth={1.5} />
            <span className="text-[9px] tracking-[2px] text-[#b45309]/60 group-hover:text-[#b45309] transition-colors uppercase font-bold">
              {item.name}
            </span>
          </a>
        ))}
      </nav>
    </motion.div>
  );
}
