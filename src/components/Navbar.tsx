import React, { useState } from 'react';
import { Compass, Menu, X, Clock, Car, Phone } from 'lucide-react';
import { MALL_HOURS } from '../data/mallData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visitModalOpen, setVisitModalOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="text-2xl font-serif tracking-tight text-stone-900 hover:text-amber-900 transition-colors select-none"
          >
            The Grand Atrium
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => handleNavClick('directory')}
              className={`hover:text-stone-950 transition-colors py-1 relative ${
                activeSection === 'directory' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Directory
              {activeSection === 'directory' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('floormap')}
              className={`hover:text-stone-950 transition-colors py-1 relative ${
                activeSection === 'floormap' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Floor Map
              {activeSection === 'floormap' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('dining')}
              className={`hover:text-stone-950 transition-colors py-1 relative ${
                activeSection === 'dining' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Dining
              {activeSection === 'dining' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('cinema')}
              className={`hover:text-stone-950 transition-colors py-1 relative ${
                activeSection === 'cinema' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Cinema
              {activeSection === 'cinema' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('parking')}
              className={`hover:text-stone-950 transition-colors py-1 relative ${
                activeSection === 'parking' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Parking & Visit
              {activeSection === 'parking' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVisitModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap shadow-xs"
            >
              Plan Visit
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 md:hidden hover:text-stone-950"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-3">
            <button
              onClick={() => handleNavClick('directory')}
              className="block w-full text-left py-2 text-base font-medium text-stone-800"
            >
              Store Directory
            </button>
            <button
              onClick={() => handleNavClick('floormap')}
              className="block w-full text-left py-2 text-base font-medium text-stone-800"
            >
              Interactive Floor Map
            </button>
            <button
              onClick={() => handleNavClick('dining')}
              className="block w-full text-left py-2 text-base font-medium text-stone-800"
            >
              Fine Dining & Bistros
            </button>
            <button
              onClick={() => handleNavClick('cinema')}
              className="block w-full text-left py-2 text-base font-medium text-stone-800"
            >
              CineLux IMAX & Showtimes
            </button>
            <button
              onClick={() => handleNavClick('parking')}
              className="block w-full text-left py-2 text-base font-medium text-stone-800"
            >
              Live Parking & Car Finder
            </button>
          </div>
        )}
      </header>

      {/* Plan Visit Quick Modal */}
      {visitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-[#FAF9F5] rounded-xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setVisitModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif text-stone-900 mb-1">Plan Your Visit</h3>
            <p className="text-xs text-stone-500 mb-6">Concierge desk, access, and daily opening hours</p>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-stone-200/70">
                <Clock className="w-5 h-5 text-amber-800 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-stone-900">Today&apos;s Operating Hours</h4>
                  <p className="text-stone-600 text-xs mt-0.5">Boutiques: {MALL_HOURS.general}</p>
                  <p className="text-stone-600 text-xs">Dining Terrace: {MALL_HOURS.dining}</p>
                  <p className="text-stone-600 text-xs">CineLux: {MALL_HOURS.cinema}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-stone-200/70">
                <Car className="w-5 h-5 text-amber-800 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-stone-900">Arrival & Valet Parking</h4>
                  <p className="text-stone-600 text-xs mt-0.5">{MALL_HOURS.address}</p>
                  <p className="text-stone-600 text-xs mt-0.5">Valet Drop-off at Grand North Porte-Cochère ({MALL_HOURS.valet})</p>
                  <p className="text-stone-500 text-xs mt-0.5">{MALL_HOURS.metro}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-stone-200/70">
                <Phone className="w-5 h-5 text-amber-800 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-stone-900">Guest Services & Concierge</h4>
                  <p className="text-stone-600 text-xs mt-0.5">Main Atrium Desk: +1 (555) 890-0000</p>
                  <p className="text-stone-500 text-xs">Wheelchair, pushchair, and personal styling reservations available.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setVisitModalOpen(false);
                  handleNavClick('parking');
                }}
                className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-200 rounded-md hover:bg-stone-300 transition-colors"
              >
                View Parking Status
              </button>
              <button
                onClick={() => setVisitModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
