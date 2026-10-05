import React, { useState } from 'react';
import { Search, Compass, MapPin, Sparkles, Film, UtensilsCrossed, ArrowRight } from 'lucide-react';
import heroImg from '../assets/images/hero_grand_atrium_mall_1791195166739.jpg';
import { STORES, DINING_SPOTS, MOVIES } from '../data/mallData';

interface HeroProps {
  onSearchSelect: (query: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchSelect, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Suggestions preview
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...STORES.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))).slice(0, 3).map(s => ({
      type: 'Store',
      name: s.name,
      location: `${s.levelName} (${s.unit})`,
      target: 'directory'
    })),
    ...DINING_SPOTS.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.cuisine.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2).map(d => ({
      type: 'Dining',
      name: d.name,
      location: `${d.level} · ${d.cuisine}`,
      target: 'dining'
    })),
    ...MOVIES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2).map(m => ({
      type: 'Movie',
      name: m.title,
      location: `CineLux IMAX · ${m.duration}`,
      target: 'cinema'
    }))
  ];

  const handleSelectResult = (item: { target: string; name: string }) => {
    onSearchSelect(item.name);
    onNavigate(item.target);
    setSearchQuery('');
    setIsFocused(false);
  };

  return (
    <section id="hero" className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-stone-900 overflow-hidden">
      {/* Background Architectural Photography */}
      <img
        src={heroImg}
        alt="The Grand Atrium luxury shopping mall soaring skylights and marble architecture"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Measured Scrim Gradient for WCAG AA Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/30" />
      <div className="absolute inset-0 bg-radial from-transparent via-stone-950/20 to-stone-950/70" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
        {/* Unboxed Metadata Header */}
        <div className="flex items-center justify-center gap-2.5 text-xs tracking-widest uppercase text-amber-200/90 mb-4 font-medium">
          <span>Open Today 10:00 AM – 10:00 PM</span>
          <span aria-hidden="true">·</span>
          <span>180+ Designer Boutiques</span>
          <span aria-hidden="true">·</span>
          <span>Valet & Concierge</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white mb-6 text-balance leading-tight max-w-4xl mx-auto">
          Where Architectural Grandeur Meets High-Fashion Culture
        </h1>

        <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Experience world-renowned flagship houses, Michelin-recognized culinary terraces, and CineLux laser IMAX in the city&apos;s landmark destination.
        </p>

        {/* Instant Search Bar */}
        <div className="max-w-xl mx-auto relative mb-10">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search Chanel, Apple, Omakase, CineLux IMAX..."
              className="w-full pl-12 pr-28 py-3.5 bg-white/95 backdrop-blur-md rounded-xl text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-20 text-xs text-stone-400 hover:text-stone-700 font-medium"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => {
                if (searchQuery) {
                  onSearchSelect(searchQuery);
                  onNavigate('directory');
                }
              }}
              className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1"
            >
              Search
            </button>
          </div>

          {/* Search Dropdown Results */}
          {isFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-stone-200 text-left overflow-hidden z-30">
              <div className="p-2 border-b border-stone-100 text-xs font-medium text-stone-400 uppercase tracking-wider px-3">
                Matching Destinations
              </div>
              <div className="divide-y divide-stone-100">
                {searchResults.map((res, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectResult(res)}
                    className="w-full px-4 py-2.5 text-left hover:bg-stone-50 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-amber-900">
                        {res.name}
                      </div>
                      <div className="text-xs text-stone-500">{res.location}</div>
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-stone-700 flex items-center gap-1">
                      {res.type} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Route Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium">
          <button
            onClick={() => onNavigate('directory')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-xs border border-white/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Explore 180+ Boutiques
          </button>
          <button
            onClick={() => onNavigate('floormap')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-xs border border-white/20 transition-all flex items-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            Interactive Floor Map
          </button>
          <button
            onClick={() => onNavigate('dining')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-xs border border-white/20 transition-all flex items-center gap-2"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-300" />
            Rooftop & Dining
          </button>
          <button
            onClick={() => onNavigate('cinema')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-xs border border-white/20 transition-all flex items-center gap-2"
          >
            <Film className="w-3.5 h-3.5 text-amber-300" />
            CineLux IMAX Showtimes
          </button>
        </div>
      </div>
    </section>
  );
};
