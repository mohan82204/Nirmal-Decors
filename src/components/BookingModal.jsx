import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasicDatePicker from './ui/calendar-1';
import { parseDate } from '@ark-ui/react/date-picker';

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
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(5,5,5,0.85)',
              backdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative bg-[#fdfcfb] w-full max-w-[560px] p-6 sm:p-10 rounded-sm shadow-2xl z-[1001] border border-[#d4af371a] overflow-hidden"
          >
            {/* Spotlight Gradient (Light) */}
            <div 
              style={{
                position: 'absolute',
                top: '-20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '140%',
                height: '100%',
                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />
            {/* Gold accent bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                transformOrigin: 'left',
              }}
            />

            {/* Close */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(212,175,55,0.1)' }}
              whileTap={{ scale: 0.9 }}
              transition={SPRING}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'transparent',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#d4af37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              ×
            </motion.button>

            {/* Heading */}
            <div style={{ overflow: 'hidden', marginBottom: '4px', position: 'relative', zIndex: 1 }}>
              <motion.h2
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
                  color: '#1a1a1a',
                  margin: 0,
                  textAlign: 'center',
                  fontWeight: 400,
                  letterSpacing: '1px'
                }}
              >
                Book Your <span style={{ color: '#d4af37' }}>Day</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              style={{
                textAlign: 'center',
                color: '#1a1a1a',
                marginBottom: '32px',
                fontSize: '12px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                letterSpacing: '0.5px',
                margin: '4px 0 32px',
                position: 'relative',
                zIndex: 1
              }}
            >
              Let's begin crafting your timeless masterpiece.
            </motion.p>

            <form onSubmit={handleWhatsAppSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 1 }}>
              {/* Name & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <motion.div
                  custom={0}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
                >
                  <label style={{ fontSize: '9px', color: '#b48a04', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: "'Inter', sans-serif" }}>
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
                  style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
                >
                  <label style={{ fontSize: '9px', color: '#b48a04', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: "'Inter', sans-serif" }}>
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
                  />
                </motion.div>
              </div>

              {/* Date */}
              <motion.div
                custom={2}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
              >
                <label
                  style={{
                    fontSize: '9px',
                    color: '#b48a04',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: '4px'
                  }}
                >
                  Event Date
                </label>
                <motion.div
                  whileHover={{ borderBottomColor: '#d4af37', cursor: 'pointer' }}
                  onClick={() => setShowCalendar(true)}
                  style={{
                    ...inputStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '16px'
                  }}
                >
                  <span style={{ color: formData.date.length > 0 ? '#1a1a1a' : 'rgba(0,0,0,0.3)', fontSize: '13px' }}>
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
                    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCalendar(false)}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{ 
                          position: 'relative', 
                          zIndex: 1, 
                          background: '#ffffff', 
                          padding: '24px', 
                          borderRadius: '8px', 
                          border: '1px solid rgba(212,175,55,0.2)',
                          boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
                        }}
                      >
                        <BasicDatePicker 
                          value={formData.date}
                          onValueChange={(details) => setFormData({ ...formData, date: details.value })}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowCalendar(false)}
                          className="text-white bg-[#d4af37] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer"
                          style={{
                            width: '100%',
                            marginTop: '20px',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                          }}
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
                style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
              >
                <label
                  style={{
                    fontSize: '10px',
                    color: '#d4af37',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Message
                </label>
                <motion.textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  whileFocus={{ borderBottomColor: '#d4af37', paddingLeft: '8px' }}
                  style={{ ...inputStyle, resize: 'none' }}
                  placeholder="Tell us about your vision..."
                />
              </motion.div>

              {/* Submit */}
              <motion.div
                custom={4}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="text-white bg-gradient-to-br from-[#d4af37] to-[#fbbf24] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer shadow-lg"
                  style={{
                    width: '100%',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '2px',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontFamily: "'Inter', sans-serif",
                  }}
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
