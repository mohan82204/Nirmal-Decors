import * as React from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'HOME',    href: '#home' },
  { name: 'SERIES',  href: '#series' },
  { name: 'GALLERY', href: '#gallery' },
  { name: 'REVIEWS', href: '#reviews' },
  { name: 'CONTACT', href: '#contact' },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: 'auto',
    transition: {
      y: { type: 'spring' as const, damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: '3rem',
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
      when: 'afterChildren' as const,
      staggerChildren: 0.05,
      staggerDirection: -1 as const,
    },
  },
};

const logoVariants = {
  expanded: {
    opacity: 1, x: 0,
    transition: { type: 'spring' as const, damping: 15 },
  },
  collapsed: {
    opacity: 0, x: -20,
    transition: { duration: 0.25 },
  },
};

const itemVariants = {
  expanded: {
    opacity: 1, x: 0, scale: 1,
    transition: { type: 'spring' as const, damping: 15 },
  },
  collapsed: {
    opacity: 0, x: -16, scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1, scale: 1,
    transition: { type: 'spring' as const, damping: 15, stiffness: 300, delay: 0.15 },
  },
};

export function AnimatedNavFramer() {
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

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        className={cn(
          'relative flex items-center overflow-hidden rounded-full shadow-lg h-12',
          'border border-[rgba(212,175,55,0.25)]',
          'backdrop-blur-md',
          !isExpanded && 'cursor-pointer justify-center',
        )}
        style={{
          background: 'rgba(5, 5, 5, 0.75)',
          position: 'relative',
        }}
      >
        {/* Logo / brand pill */}
        <motion.div
          variants={logoVariants}
          className="flex-shrink-0 flex items-center pl-5 pr-3"
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#d4af37',
              fontSize: 'clamp(0.85rem, 3vw, 1rem)',
              fontWeight: 400,
              letterSpacing: '2px',
              whiteSpace: 'nowrap',
            }}
          >
            Nirmal Decor
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={logoVariants}
          style={{
            width: '1px',
            height: '20px',
            background: 'rgba(212,175,55,0.3)',
            flexShrink: 0,
            marginRight: '4px',
          }}
        />

        {/* Nav links */}
        <motion.div
          className={cn(
            'flex items-center gap-0 pr-4',
            !isExpanded && 'pointer-events-none',
          )}
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              variants={itemVariants}
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                letterSpacing: '2px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                padding: '4px 12px',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#d4af37';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
              }}
            >
              {item.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Collapsed menu icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? 'expanded' : 'collapsed'}
          >
            <Menu className="h-5 w-5" style={{ color: '#d4af37' }} />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}
