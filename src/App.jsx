import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Series from './components/Series';
import Gallery from './components/Gallery';
import { Reviews, Contact } from './components/InfoSections';
import { BookingModal } from './components/BookingModal';

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Home onBookClick={() => setIsModalOpen(true)} />
        <Series />
        <Gallery />
        <Reviews />
        <Contact onBookClick={() => setIsModalOpen(true)} />
      </main>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;

