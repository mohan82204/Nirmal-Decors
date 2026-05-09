import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasicDatePicker from './ui/calendar-1';
import { parseDate } from '@ark-ui/react/date-picker';
import { cn } from '@/lib/utils';

const EASE = [0.76, 0, 0.24, 1];
const SPRING = { type: 'spring', stiffness: 260, damping: 22 };

const inputStyle = {
  padding: '12px 0',
  background: 'transparent',
  border: 'none',
  borderBottom: '1.5px solid rgba(212,175,55,0.4)',
  fontSize: '14px',
  fontFamily: "'Inter', sans-serif",
  color: '#1a1a1a',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
};

const fieldVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.1 },
  }),
};

export const BookingModal = ({ isOpen, onClose }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: [parseDate(new Date().toISOString().split('T')[0])],
    message: '',
  });

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const dateStr = formData.date.length > 0 
      ? formData.date.map(d => d.toString()).join(', ') 
      : 'Not selected';
    const text = `*Booking Request - Nirmal Decor*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Dates:* ${dateStr}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/919994206952?text=${text}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative bg-[#fdfcfb] w-full max-w-[560px] p-8 sm:p-10 rounded-sm shadow-2xl z-[1001] border border-[#d4af37]/10 overflow-hidden"
          >
            {/* Spotlight Gradient */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[140%] h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none z-0" />
            
            {/* Gold accent bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent origin-left z-10"
            />

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(212,175,55,0.1)' }}
              whileTap={{ scale: 0.9 }}
              transition={SPRING}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-transparent border border-[#d4af37]/10 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-[#d4af37] z-20 text-xl"
            >
              ×
            </motion.button>

            {/* Heading */}
            <div className="relative z-10 overflow-hidden mb-1 text-center">
              <motion.h2
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                className="font-serif text-[1.8rem] sm:text-[2.4rem] text-[#1a1a1a] m-0 font-normal tracking-[1px]"
              >
                Book Your <span className="text-[#d4af37]">Day</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="relative z-10 text-center text-[#1a1a1a] text-[11px] sm:text-xs font-sans font-normal tracking-wide mb-8 mt-1"
            >
              Let's begin crafting your timeless masterpiece.
            </motion.p>

            <form onSubmit={handleWhatsAppSubmit} className="relative z-10 flex flex-col gap-4">
              {/* Name & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {/* Full Name */}
                <motion.div
                  custom={0}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-1"
                >
                  <label className="text-[9px] text-[#b48a04] font-bold uppercase tracking-[1.5px] font-sans">
                    Full Name
                  </label>
                  <motion.input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    whileFocus={{ borderBottomColor: '#d4af37', paddingLeft: '4px' }}
                    style={inputStyle}
                    placeholder="Your Name"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div
                  custom={1}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-1"
                >
                  <label className="text-[9px] text-[#b48a04] font-bold uppercase tracking-[1.5px] font-sans">
                    Phone Number
                  </label>
                  <motion.input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) {
                        setFormData({ ...formData, phone: val });
                      }
                    }}
                    whileFocus={{ borderBottomColor: '#d4af37', paddingLeft: '4px' }}
                    style={inputStyle}
                    maxLength={10}
                    placeholder="10-digit number"
                  />
                </motion.div>
              </div>

              {/* Date */}
              <motion.div
                custom={2}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-1"
              >
                <label className="text-[9px] text-[#b48a04] font-bold uppercase tracking-[1.5px] font-sans mb-1">
                  Event Date
                </label>
                <motion.div
                  whileHover={{ borderBottomColor: '#d4af37', cursor: 'pointer' }}
                  onClick={() => setShowCalendar(true)}
                  className="flex items-center justify-between pb-4 transition-all duration-300"
                  style={inputStyle}
                >
                  <span className={cn("text-[13px]", formData.date.length > 0 ? "text-[#1a1a1a]" : "text-black/30")}>
                    {formData.date.length > 0 
                      ? formData.date.length === 1 
                        ? formData.date[0].toString() 
                        : `${formData.date.length} dates selected`
                      : 'Select your dates'}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b48a04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </motion.div>

                {/* Calendar Popup */}
                <AnimatePresence>
                  {showCalendar && (
                    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCalendar(false)}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative z-10 bg-white p-6 rounded-lg border border-[#d4af37]/20 shadow-xl max-w-full"
                      >
                        <BasicDatePicker 
                          value={formData.date}
                          onValueChange={(details) => setFormData({ ...formData, date: details.value })}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowCalendar(false)}
                          className="w-full mt-5 text-white bg-[#d4af37] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] cursor-pointer py-3 rounded-[4px] text-[12px] font-semibold uppercase tracking-[2px]"
                        >
                          Done
                        </motion.button>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Message */}
              <motion.div
                custom={3}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-1.5"
              >
                <label className="text-[10px] text-[#d4af37] font-bold uppercase tracking-[2px] font-sans">
                  Message
                </label>
                <motion.textarea
                  rows={window.innerWidth < 640 ? 2 : 3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  whileFocus={{ borderBottomColor: '#d4af37', paddingLeft: '8px' }}
                  style={{ ...inputStyle, resize: 'none' }}
                  placeholder="Tell us about your vision..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full mt-3 text-white bg-gradient-to-br from-[#d4af37] to-[#fbbf24] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] cursor-pointer shadow-lg py-4 sm:py-5 rounded-[2px] font-bold text-xs uppercase tracking-[3px] flex items-center justify-center gap-2.5 font-sans"
                >
                  Confirm Booking
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

