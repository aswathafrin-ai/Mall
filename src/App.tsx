import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StoreDirectory } from './components/StoreDirectory';
import { InteractiveFloorMap } from './components/InteractiveFloorMap';
import { DiningTerrace } from './components/DiningTerrace';
import { CinemaHub } from './components/CinemaHub';
import { ParkingAssistant } from './components/ParkingAssistant';
import { EventsAndVIP } from './components/EventsAndVIP';
import { Footer } from './components/Footer';
import { Store } from './data/mallData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedStoreForMap, setSelectedStoreForMap] = useState<Store | null>(null);
  const [directorySearchQuery, setDirectorySearchQuery] = useState('');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectStoreForMap = (store: Store) => {
    setSelectedStoreForMap(store);
    handleNavigate('floormap');
  };

  const handleHeroSearchSelect = (query: string) => {
    setDirectorySearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Universal Top Bar */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Architectural Hero with Live Status & Quick Search */}
        <Hero
          onSearchSelect={handleHeroSearchSelect}
          onNavigate={handleNavigate}
        />

        {/* Curated Store Directory with Filters & Details Modal */}
        <StoreDirectory
          initialSearch={directorySearchQuery}
          onSelectStoreForMap={handleSelectStoreForMap}
        />

        {/* Interactive Multi-Level Architectural Floor Map */}
        <InteractiveFloorMap
          selectedStoreFromOutside={selectedStoreForMap}
        />

        {/* Rooftop Dining, Michelin-recognized Chefs & Table Reservations */}
        <DiningTerrace />

        {/* CineLux IMAX Laser Cinema with Interactive Seat Booking */}
        <CinemaHub />

        {/* Real-time Parking Sensor Monitor & "Remember My Spot" Saver */}
        <ParkingAssistant />

        {/* Art Exhibitions & VIP Privilege Club Pass */}
        <EventsAndVIP />
      </main>

      {/* Sophisticated Footer with Hours, Transport & Concierge */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
