import React, { useState } from 'react';
import { Utensils, Star, Clock, Calendar, Users, Phone, CheckCircle, Sparkles, X, ChevronRight } from 'lucide-react';
import { DINING_SPOTS, DiningSpot } from '../data/mallData';
import diningImg from '../assets/images/gourmet_dining_terrace_1791195193948.jpg';
import cafeImg from '../assets/images/artisan_cafe_atrium_1791195216979.jpg';

export const DiningTerrace: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<DiningSpot | null>(null);
  const [reservationModalSpot, setReservationModalSpot] = useState<DiningSpot | null>(null);

  // Reservation form state
  const [partySize, setPartySize] = useState('2 Guests');
  const [reserveDate, setReserveDate] = useState('Today, Oct 5');
  const [reserveTime, setReserveTime] = useState('07:30 PM');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleOpenReservation = (spot: DiningSpot) => {
    setReservationModalSpot(spot);
    setBookingConfirmed(false);
    setConfirmationCode('');
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;
    const code = `GA-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(code);
    setBookingConfirmed(true);
  };

  return (
    <section id="dining" className="py-20 bg-[#FAF9F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-1">
              Gastronomic Heights
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              Skyline Terraces, Omakase & Grand Cafes
            </h2>
          </div>
          <p className="text-sm text-stone-500 max-w-md">
            From Michelin-star chefs on Level 3 Sky Deck to peaceful botanical tea salons overlooking the indoor palm court.
          </p>
        </div>

        {/* Hero Spotlight Split-Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl relative aspect-[16/10] bg-stone-900">
            <img
              src={diningImg}
              alt="Aura Skyline Brasserie rooftop sunset dining"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs tracking-wider uppercase text-amber-300 font-semibold block mb-1">
                Featured Rooftop Experience
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif mb-2">Aura Skyline Brasserie</h3>
              <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 max-w-lg mb-4">
                Enjoy Brittany blue lobster and vintage champagne on the heated open-air terrace with 360-degree city views.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenReservation(DINING_SPOTS[0])}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg transition-colors"
                >
                  Reserve Sunset Table
                </button>
                <span className="text-xs text-stone-300">Level 3 Skyline Deck · Reservations Essential</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-xl relative aspect-[16/10] bg-stone-900">
            <img
              src={cafeImg}
              alt="Café de L'Orangerie glass atrium patisserie"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs tracking-wider uppercase text-amber-300 font-semibold block mb-1">
                Morning & Afternoon Salon
              </span>
              <h3 className="text-2xl font-serif mb-1">Café de L&apos;Orangerie</h3>
              <p className="text-xs text-stone-200 mb-3">
                Double-laminated croissants baked fresh hourly with specialty Ethiopian pour-overs.
              </p>
              <div className="text-xs text-amber-200 font-medium">
                Walk-ins Welcome · Ground Floor Atrium Court
              </div>
            </div>
          </div>
        </div>

        {/* Dining Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DINING_SPOTS.map((spot) => (
            <div
              key={spot.id}
              className="bg-white rounded-xl border border-stone-200/80 p-6 flex flex-col justify-between hover:shadow-md hover:border-amber-900/30 transition-all"
            >
              <div>
                {/* Clean unboxed metadata */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
                  <span>{spot.cuisine}</span>
                  <span className="font-mono text-stone-700">{spot.priceRange}</span>
                </div>

                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-serif text-stone-900">{spot.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-amber-700 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{spot.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {spot.description}
                </p>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 mb-4 text-xs">
                  <span className="text-stone-400 block mb-0.5">Signature Recommendation:</span>
                  <span className="font-medium text-stone-800">{spot.signatureDish}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <span>{spot.level}</span>
                  <span>{spot.hours}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">{spot.phone}</span>
                  {spot.acceptsReservations ? (
                    <button
                      onClick={() => handleOpenReservation(spot)}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-md transition-colors"
                    >
                      Book Table
                    </button>
                  ) : (
                    <span className="text-xs text-stone-400 italic">Walk-ins only</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Reservation Modal */}
      {reservationModalSpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setReservationModalSpot(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingConfirmed ? (
              <form onSubmit={handleConfirmReservation}>
                <div className="text-xs uppercase tracking-wider text-amber-900 font-semibold mb-1">
                  Table Reservation
                </div>
                <h3 className="text-2xl font-serif text-stone-900 mb-1">
                  {reservationModalSpot.name}
                </h3>
                <p className="text-xs text-stone-500 mb-6">
                  {reservationModalSpot.level} · {reservationModalSpot.cuisine}
                </p>

                <div className="space-y-4 text-xs mb-6">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Party Size</label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-900"
                    >
                      <option>1 Guest (Counter Seating)</option>
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests (Private Booth)</option>
                      <option>8+ Guests (VIP Salon)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Date</label>
                      <select
                        value={reserveDate}
                        onChange={(e) => setReserveDate(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-900"
                      >
                        <option>Today, Oct 5</option>
                        <option>Tomorrow, Oct 6</option>
                        <option>Friday, Oct 9</option>
                        <option>Saturday, Oct 10</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Time Slot</label>
                      <select
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-900"
                      >
                        <option>12:30 PM (Lunch)</option>
                        <option>06:00 PM</option>
                        <option>07:30 PM (Peak Sunset)</option>
                        <option>08:45 PM</option>
                        <option>09:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Primary Guest Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Mobile Contact</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Special Occasion or Dietary Preferences</label>
                    <input
                      type="text"
                      placeholder="Anniversary, window table, seafood allergy..."
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-stone-900 text-white font-semibold text-xs rounded-lg hover:bg-stone-800 transition-colors shadow-xs"
                >
                  Confirm Table Reservation
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-2xl font-serif text-stone-900 mb-1">Table Reserved</h3>
                <p className="text-xs text-stone-600 mb-6">
                  We look forward to welcoming you at {reservationModalSpot.name}.
                </p>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Booking Reference:</span>
                    <span className="font-mono font-bold text-stone-900">{confirmationCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Party:</span>
                    <span className="font-medium text-stone-800">{partySize} for {guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Time & Date:</span>
                    <span className="font-medium text-stone-800">{reserveDate} at {reserveTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Location:</span>
                    <span className="font-medium text-stone-800">{reservationModalSpot.level}</span>
                  </div>
                </div>

                <p className="text-[11px] text-stone-500 mb-6">
                  A confirmation SMS has been dispatched to {guestPhone}. Valet parking is included with your dining reservation.
                </p>

                <button
                  onClick={() => setReservationModalSpot(null)}
                  className="w-full py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
