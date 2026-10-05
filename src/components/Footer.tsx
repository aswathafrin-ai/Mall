import React from 'react';
import { MapPin, Phone, Mail, Clock, Compass } from 'lucide-react';
import { MALL_HOURS } from '../data/mallData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-serif text-white tracking-tight">The Grand Atrium</h3>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              The premier destination for haute horlogerie, global luxury fashion, rooftop gastronomy, and CineLux laser IMAX. An architectural landmark in the heart of the metropolis.
            </p>
            <div className="text-xs text-stone-500 pt-2 space-y-1">
              <p>{MALL_HOURS.address}</p>
              <p>{MALL_HOURS.metro}</p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-stone-200 font-semibold">
              Daily Hours
            </h4>
            <div className="text-xs text-stone-400 space-y-2">
              <div>
                <span className="text-stone-300 block font-medium">Boutiques</span>
                <span>{MALL_HOURS.general}</span>
              </div>
              <div>
                <span className="text-stone-300 block font-medium">Dining Terrace</span>
                <span>{MALL_HOURS.dining}</span>
              </div>
              <div>
                <span className="text-stone-300 block font-medium">CineLux IMAX</span>
                <span>{MALL_HOURS.cinema}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-stone-200 font-semibold">
              Navigation
            </h4>
            <ul className="text-xs text-stone-400 space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('directory')}
                  className="hover:text-white transition-colors"
                >
                  Store Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('floormap')}
                  className="hover:text-white transition-colors"
                >
                  Interactive Floor Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dining')}
                  className="hover:text-white transition-colors"
                >
                  Skyline Dining & Bistros
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cinema')}
                  className="hover:text-white transition-colors"
                >
                  CineLux IMAX Showtimes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('parking')}
                  className="hover:text-white transition-colors"
                >
                  Valet & Parking Status
                </button>
              </li>
            </ul>
          </div>

          {/* Guest Services & Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-stone-200 font-semibold">
              Concierge
            </h4>
            <div className="text-xs text-stone-400 space-y-2">
              <p>Main Concierge: +1 (555) 890-0000</p>
              <p>Valet North Desk: +1 (555) 890-0010</p>
              <p>VIP Personal Shopper: concierge@grandatrium.com</p>
              <p className="text-[11px] text-stone-500 pt-1">
                Lost & Found located at Ground Concourse Level G-00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; 2026 The Grand Atrium Mall. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Visitor Policies</span>
            <span className="hover:text-stone-400 cursor-pointer">Accessibility</span>
            <span className="hover:text-stone-400 cursor-pointer">Leasing Opportunities</span>
            <span className="hover:text-stone-400 cursor-pointer">Privacy Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
