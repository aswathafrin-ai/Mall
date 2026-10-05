import React, { useState, useEffect } from 'react';
import { Layers, MapPin, Navigation, Info, Compass, ChevronRight, Phone, Clock } from 'lucide-react';
import { STORES, Store } from '../data/mallData';

interface InteractiveFloorMapProps {
  selectedStoreFromOutside?: Store | null;
}

export const InteractiveFloorMap: React.FC<InteractiveFloorMapProps> = ({
  selectedStoreFromOutside,
}) => {
  const [activeFloor, setActiveFloor] = useState<'G' | 'L1' | 'L2' | 'L3'>('G');
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const [routeFrom, setRouteFrom] = useState<'main_entrance' | 'valet' | 'metro'>('main_entrance');
  const [showDirections, setShowDirections] = useState(false);

  // When a store is selected from outside (e.g. Directory "Locate on Map")
  useEffect(() => {
    if (selectedStoreFromOutside) {
      setActiveFloor(selectedStoreFromOutside.level);
      setActiveStore(selectedStoreFromOutside);
    }
  }, [selectedStoreFromOutside]);

  const floorStores = STORES.filter((s) => s.level === activeFloor);

  const floorMeta = {
    G: {
      name: 'Ground Floor — Grand Boulevard',
      description: 'Haute Horlogerie, High Jewellery & Maison Flagships',
      amenities: ['North Porte-Cochère Valet', 'VIP Lounge', 'Central Atrium Garden', 'Guest Concierge']
    },
    L1: {
      name: 'Level 1 — Contemporary Runway',
      description: 'Designer Ready-to-Wear, Botanical Apothecary & Balcony Cafes',
      amenities: ['Personal Styling Suites', 'Matcha Botanical Tearoom', 'Beauty Consultation Counter']
    },
    L2: {
      name: 'Level 2 — Innovation & Design',
      description: 'Acoustic Studios, Global Tech Flagships & Travel Luxury',
      amenities: ['Apple Genius Grove', 'Rimowa Service Atelier', 'Family Restrooms & Nursery']
    },
    L3: {
      name: 'Level 3 — Skyline Terrace & Cinema',
      description: 'CineLux IMAX, Omakase Counters & Panoramic Sunset Terrace',
      amenities: ['CineLux Box Office & VIP Lounge', 'Open Sky Deck', 'Wine Barrels & Cigar Terrace']
    }
  };

  return (
    <section id="floormap" className="py-20 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Architectural Wayfinding
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Interactive Multi-Level Floor Navigator
            </h2>
          </div>

          {/* Floor Level Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-800 rounded-xl border border-stone-700/80">
            {(['G', 'L1', 'L2', 'L3'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setActiveFloor(lvl);
                  setActiveStore(null);
                  setShowDirections(false);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeFloor === lvl
                    ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-700/60'
                }`}
              >
                {lvl === 'G' ? 'Ground (G)' : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Current Floor Subtitle & Amenities */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400 border-b border-stone-800 pb-4">
          <div>
            <span className="font-semibold text-stone-200">{floorMeta[activeFloor].name}</span>
            <span className="mx-2">·</span>
            <span>{floorMeta[activeFloor].description}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-stone-500">Key Hubs:</span>
            <span>{floorMeta[activeFloor].amenities.join(' · ')}</span>
          </div>
        </div>

        {/* Interactive Map Canvas Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SVG Architectural Canvas (8 Cols) */}
          <div className="lg:col-span-8 bg-stone-950 p-4 sm:p-6 rounded-2xl border border-stone-800 relative shadow-2xl overflow-hidden">
            {/* Compass / Legend overlay */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2 text-xs text-stone-400 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>North Boulevard Axis</span>
            </div>

            <div className="absolute top-6 right-6 z-10 flex items-center gap-3 text-xs text-stone-400 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-xs inline-block" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-stone-800 border border-stone-600 rounded-xs inline-block" />
                <span>Unit</span>
              </div>
            </div>

            {/* Architectural Floor Plan SVG */}
            <div className="w-full aspect-[16/10] min-h-[380px] sm:min-h-[460px] relative flex items-center justify-center">
              <svg
                viewBox="0 0 800 500"
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Outer Floor Boundary */}
                <rect
                  x="30"
                  y="30"
                  width="740"
                  height="440"
                  rx="24"
                  fill="#141416"
                  stroke="#26262a"
                  strokeWidth="2"
                />

                {/* Outer Walkway Concourse Track */}
                <rect
                  x="50"
                  y="50"
                  width="700"
                  height="400"
                  rx="18"
                  fill="none"
                  stroke="#1f1f23"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Central Open Sky Atrium / Lightwell */}
                <rect
                  x="280"
                  y="210"
                  width="240"
                  height="120"
                  rx="60"
                  fill="#1a1a20"
                  stroke="#3b3b45"
                  strokeWidth="1.5"
                />
                <circle cx="400" cy="270" r="32" fill="#242430" opacity="0.6" />
                <text
                  x="400"
                  y="266"
                  fill="#78716c"
                  fontSize="11"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  GRAND ATRIUM
                </text>
                <text
                  x="400"
                  y="282"
                  fill="#57534e"
                  fontSize="9"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                >
                  Lush Indoor Garden & Void
                </text>

                {/* Vertical Transport Cores (Elevators & Escalators) */}
                <g transform="translate(190, 235)">
                  <rect width="60" height="70" rx="6" fill="#1c1917" stroke="#44403c" strokeWidth="1" />
                  <text x="30" y="32" fill="#a8a29e" fontSize="9" textAnchor="middle">Elevators</text>
                  <text x="30" y="48" fill="#d97706" fontSize="8" textAnchor="middle">G &rarr; L3</text>
                </g>

                <g transform="translate(550, 235)">
                  <rect width="60" height="70" rx="6" fill="#1c1917" stroke="#44403c" strokeWidth="1" />
                  <text x="30" y="32" fill="#a8a29e" fontSize="9" textAnchor="middle">Escalators</text>
                  <text x="30" y="48" fill="#78716c" fontSize="8" textAnchor="middle">North Wing</text>
                </g>

                {/* Main Entrances & Gateways */}
                <g transform="translate(350, 435)">
                  <rect width="100" height="25" rx="4" fill="#292524" stroke="#78716c" strokeWidth="1" />
                  <text x="50" y="16" fill="#f5f5f4" fontSize="9" textAnchor="middle" fontWeight="bold">
                    GRAND ENTRANCE
                  </text>
                </g>

                {/* Render Interactive Stores for this Floor */}
                {floorStores.map((store) => {
                  const isSelected = activeStore?.id === store.id;
                  const { x, y, width, height } = store.mapCoordinates;

                  return (
                    <g
                      key={store.id}
                      onClick={() => {
                        setActiveStore(store);
                        setShowDirections(false);
                      }}
                      className="cursor-pointer transition-all duration-200"
                    >
                      {/* Store Boundary Box */}
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx="8"
                        fill={isSelected ? '#d97706' : '#1e1e24'}
                        stroke={isSelected ? '#fef08a' : '#33333d'}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        className="hover:fill-amber-900/40 transition-colors"
                      />

                      {/* Store Unit Code */}
                      <text
                        x={x + 10}
                        y={y + 20}
                        fill={isSelected ? '#ffffff' : '#78716c'}
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="monospace"
                      >
                        {store.unit}
                      </text>

                      {/* Store Name (Truncated if long) */}
                      <text
                        x={x + 10}
                        y={y + 40}
                        fill={isSelected ? '#ffffff' : '#f5f5f4'}
                        fontSize="12"
                        fontWeight="600"
                        fontFamily="sans-serif"
                      >
                        {store.name.length > 18 ? store.name.slice(0, 16) + '…' : store.name}
                      </text>

                      {/* Category subtext */}
                      <text
                        x={x + 10}
                        y={y + 56}
                        fill={isSelected ? '#fef3c7' : '#a8a29e'}
                        fontSize="9"
                        fontFamily="sans-serif"
                      >
                        {store.category}
                      </text>

                      {/* Active Pin Beacon */}
                      {isSelected && (
                        <circle
                          cx={x + width - 15}
                          cy={y + 18}
                          r="5"
                          fill="#ffffff"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Additional Amenities Placed on Map */}
                {activeFloor === 'G' && (
                  <g transform="translate(690, 80)">
                    <rect width="60" height="95" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
                    <text x="30" y="45" fill="#a1a1aa" fontSize="9" textAnchor="middle">Valet</text>
                    <text x="30" y="60" fill="#71717a" fontSize="8" textAnchor="middle">Concierge</text>
                  </g>
                )}

                {activeFloor === 'L3' && (
                  <g transform="translate(420, 80)">
                    <rect width="320" height="140" rx="8" fill="#18181b" stroke="#d97706" strokeWidth="1.5" />
                    <text x="160" y="65" fill="#fef3c7" fontSize="13" fontWeight="bold" textAnchor="middle">
                      AURA SKYLINE BRASSERIE
                    </text>
                    <text x="160" y="85" fill="#a8a29e" fontSize="10" textAnchor="middle">
                      Panoramic Sunset View & Open Oyster Bar
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Quick Helper footer */}
            <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
              <span>Click on any unit box to inspect details or get walking directions.</span>
              <span className="font-mono text-stone-400">Scale: 1:200m Architectonic Model</span>
            </div>
          </div>

          {/* Details / Directions Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-stone-950 p-6 rounded-2xl border border-stone-800">
            {activeStore ? (
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-amber-400 font-medium">
                  <span>Unit {activeStore.unit}</span>
                  <span>{activeStore.levelName.split('—')[0]}</span>
                </div>

                <h3 className="text-2xl font-serif text-white mb-2">{activeStore.name}</h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-6">
                  {activeStore.description}
                </p>

                <div className="space-y-3 mb-6 text-xs border-y border-stone-800/80 py-4">
                  <div className="flex items-center gap-2 text-stone-300">
                    <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                    <span>Open Today: {activeStore.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-300">
                    <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                    <span>Direct Atelier: {activeStore.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-300">
                    <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
                    <span>Location: {activeStore.levelName}</span>
                  </div>
                </div>

                {/* Wayfinding Route Generator */}
                <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-200 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-amber-400" />
                      Walking Wayfinder
                    </span>
                    <button
                      onClick={() => setShowDirections(!showDirections)}
                      className="text-amber-400 hover:text-amber-300 text-xs font-medium"
                    >
                      {showDirections ? 'Hide Route' : 'Show Route'}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
                    <span>From:</span>
                    <select
                      value={routeFrom}
                      onChange={(e) => setRouteFrom(e.target.value as any)}
                      className="bg-stone-800 border border-stone-700 text-stone-200 rounded px-2 py-1 text-xs focus:outline-none"
                    >
                      <option value="main_entrance">Grand South Entrance</option>
                      <option value="valet">North Valet Porte-Cochère</option>
                      <option value="metro">Metro Atrium Concourse</option>
                    </select>
                  </div>

                  {showDirections && (
                    <div className="space-y-2 pt-2 border-t border-stone-800 text-xs text-stone-300">
                      <div className="flex items-start gap-2">
                        <span className="font-mono text-amber-400">1.</span>
                        <span>
                          {routeFrom === 'valet'
                            ? 'Enter via North Porte-Cochère and walk through the perfume garden.'
                            : routeFrom === 'metro'
                            ? 'Take the express escalator up to Ground Concourse.'
                            : 'Enter through the main glass revolving doors.'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono text-amber-400">2.</span>
                        <span>
                          {activeStore.level === 'G'
                            ? 'Walk 35 meters straight ahead along the marble grand corridor.'
                            : `Take Central Glass Elevator to ${activeStore.levelName.split('—')[0]}.`}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono text-amber-400">3.</span>
                        <span>
                          Arrive at Unit <strong className="text-white">{activeStore.unit}</strong> on the left.
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 pt-1">
                        Estimated walk time: ~2 minutes (180 meters)
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStore(null)}
                    className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Compass className="w-10 h-10 text-stone-700 mx-auto mb-3" />
                <h4 className="text-base font-serif text-stone-300 mb-1">Select a Boutique or Amenity</h4>
                <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto mb-6">
                  Click any highlighted retail unit on the schematic to view its opening hours, direct atelier phone line, and step-by-step indoor wayfinding.
                </p>

                <div className="space-y-2 text-left">
                  <span className="text-xs uppercase tracking-wider text-stone-500 block mb-2 font-semibold">
                    Destinations on this level:
                  </span>
                  {floorStores.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveStore(s)}
                      className="w-full text-left px-3 py-2 bg-stone-900 hover:bg-stone-850 rounded-lg text-xs text-stone-300 flex items-center justify-between border border-stone-800 transition-colors"
                    >
                      <span className="font-medium text-stone-200">{s.name}</span>
                      <span className="font-mono text-stone-500">{s.unit}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
