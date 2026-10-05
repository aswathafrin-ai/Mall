import React, { useState, useEffect } from 'react';
import { Car, Zap, ShieldCheck, MapPin, Bookmark, CheckCircle2, RotateCcw } from 'lucide-react';
import { PARKING_DECKS, MALL_HOURS } from '../data/mallData';

export const ParkingAssistant: React.FC = () => {
  // Live parking state (simulating real-time occupancy updates)
  const [parkingData, setParkingData] = useState(PARKING_DECKS);

  // Remember Spot widget state
  const [savedFloor, setSavedFloor] = useState('P2');
  const [savedSection, setSavedSection] = useState('Green Zone / Pillar 14B');
  const [savedBay, setSavedBay] = useState('248');
  const [savedNote, setSavedNote] = useState('');
  const [hasSavedSpot, setHasSavedSpot] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  useEffect(() => {
    // Load from localStorage if present
    const existing = localStorage.getItem('mall_parked_spot');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        setSavedFloor(parsed.floor || 'P2');
        setSavedSection(parsed.section || '');
        setSavedBay(parsed.bay || '');
        setSavedNote(parsed.note || '');
        setHasSavedSpot(true);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleSaveSpot = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      floor: savedFloor,
      section: savedSection,
      bay: savedBay,
      note: savedNote,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    localStorage.setItem('mall_parked_spot', JSON.stringify(data));
    setHasSavedSpot(true);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleClearSpot = () => {
    localStorage.removeItem('mall_parked_spot');
    setHasSavedSpot(false);
    setSavedSection('');
    setSavedBay('');
    setSavedNote('');
  };

  const totalCapacity = parkingData.reduce((acc, curr) => acc + curr.total, 0);
  const totalOccupied = parkingData.reduce((acc, curr) => acc + curr.occupied, 0);
  const availableOverall = totalCapacity - totalOccupied;
  const overallPercentage = Math.round((availableOverall / totalCapacity) * 100);

  return (
    <section id="parking" className="py-20 bg-[#FAF9F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-1">
              Arrival & Mobility
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              Live Parking Deck Monitor & Valet Concierge
            </h2>
          </div>
          <div className="text-xs text-stone-500 font-medium">
            <span>Overall Capacity:</span>{' '}
            <strong className="text-emerald-700 font-semibold tabular-nums">{availableOverall} bays available</strong>{' '}
            ({overallPercentage}% open)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Deck Occupancy Live Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Real-Time Sensor Deck Status
            </div>

            {parkingData.map((deck) => {
              const available = deck.total - deck.occupied;
              const pct = Math.round((available / deck.total) * 100);
              const isHigh = pct < 20;

              return (
                <div
                  key={deck.id}
                  className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-stone-100 rounded-lg text-stone-700">
                        {deck.id === 'p4' ? <Zap className="w-4 h-4 text-amber-600" /> : <Car className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">{deck.name}</h4>
                        <p className="text-xs text-stone-500">{deck.type}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-base font-bold tabular-nums ${isHigh ? 'text-amber-800' : 'text-emerald-700'}`}>
                        {available}
                      </span>
                      <span className="text-xs text-stone-400"> / {deck.total} open</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHigh ? 'bg-amber-600' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${100 - pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>{100 - pct}% Occupied</span>
                    <span className="text-emerald-700 font-medium">Smooth Entry · No Queues</span>
                  </div>
                </div>
              );
            })}

            {/* Valet service callout */}
            <div className="p-4 bg-amber-900/5 rounded-xl border border-amber-900/15 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-900 shrink-0" />
                <div>
                  <span className="font-semibold text-stone-900 block">White Glove Valet Service</span>
                  <span className="text-stone-600">Available at North Porte-Cochère · Complimentary for Dining & VIP Club</span>
                </div>
              </div>
              <span className="text-stone-500 font-mono shrink-0">$15 flat</span>
            </div>
          </div>

          {/* "Find My Car" Memo Tool (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-stone-900 font-serif text-lg">
                <Bookmark className="w-4 h-4 text-amber-900" />
                <span>Find My Car Assistant</span>
              </div>
              {hasSavedSpot && (
                <button
                  onClick={handleClearSpot}
                  className="text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              Save your parking deck level and pillar coordinate. This stays preserved in your browser during your entire shopping visit.
            </p>

            <form onSubmit={handleSaveSpot} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Deck Level</label>
                  <select
                    value={savedFloor}
                    onChange={(e) => setSavedFloor(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    <option value="P1">P1 (Valet & VIP)</option>
                    <option value="P2">P2 (Central Deck)</option>
                    <option value="P3">P3 (North Deck)</option>
                    <option value="EV">P4 (EV Supercharger)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Bay / Spot Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 248"
                    value={savedBay}
                    onChange={(e) => setSavedBay(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Zone / Pillar Landmark</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Green Zone, Pillar 14B near Elevator A"
                  value={savedSection}
                  onChange={(e) => setSavedSection(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. parked next to blue pillar near cinema exit"
                  value={savedNote}
                  onChange={(e) => setSavedNote(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-stone-900 text-white font-semibold rounded-lg hover:bg-stone-800 transition-colors text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Bookmark className="w-3.5 h-3.5" />
                {hasSavedSpot ? 'Update Parked Location' : 'Save Parked Location'}
              </button>

              {saveSuccessMsg && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium justify-center pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Parking location saved successfully!</span>
                </div>
              )}

              {hasSavedSpot && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl mt-4 text-xs">
                  <div className="font-semibold text-emerald-950 mb-1 flex items-center justify-between">
                    <span>Current Stored Car Location</span>
                    <span className="font-mono text-[10px] text-emerald-700">Active</span>
                  </div>
                  <div className="text-emerald-900 space-y-0.5">
                    <p>Level: <strong className="text-stone-900">{savedFloor}</strong> · Bay: <strong className="text-stone-900">{savedBay}</strong></p>
                    <p className="text-emerald-800">{savedSection}</p>
                    {savedNote && <p className="italic text-emerald-700 text-[11px] mt-1">&quot;{savedNote}&quot;</p>}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
