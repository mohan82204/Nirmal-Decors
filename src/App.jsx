import React, { Suspense, lazy } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';

import { domAnimation, LazyMotion } from 'framer-motion';

// Lazy load components for performance
const Series = lazy(() => import('./components/Series'));
const Gallery = lazy(() => import('./components/Gallery'));
const Reviews = lazy(() => import('./components/InfoSections').then(m => ({ default: m.Reviews })));
const Contact = lazy(() => import('./components/InfoSections').then(m => ({ default: m.Contact })));
const BookingModal = lazy(() => import('./components/BookingModal').then(module => ({ default: module.BookingModal })));

const LoadingFallback = () => (
  <div className="w-full h-20 flex items-center justify-center bg-[#fff7ed]">
    <div className="w-6 h-6 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="app-container">
        <Navbar />
        <main>
          <Home onBookClick={() => setIsModalOpen(true)} />
          
          <Suspense fallback={<LoadingFallback />}>
            <Series />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <Gallery />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <Reviews />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <Contact onBookClick={() => setIsModalOpen(true)} />
          </Suspense>
        </main>
        
        <Suspense fallback={null}>
          <BookingModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        </Suspense>
      </div>
    </LazyMotion>
  );
}

export default App;

