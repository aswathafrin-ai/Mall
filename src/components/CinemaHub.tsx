import React, { useState } from 'react';
import { Film, Clock, Sparkles, Check, X, QrCode, Ticket, Armchair } from 'lucide-react';
import cinemaImg from '../assets/images/luxury_cinema_auditorium_1791195206161.jpg';
import { MOVIES, Movie } from '../data/mallData';

export const CinemaHub: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(MOVIES[0]);
  const [selectedShowtime, setSelectedShowtime] = useState(MOVIES[0].showtimes[0]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Seat booking state
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['D4', 'D5']);
  const [addPopcornCombo, setAddPopcornCombo] = useState(true);
  const [ticketConfirmed, setTicketConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // 6 rows x 8 seats layout
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];
  const occupiedSeats = ['B3', 'B4', 'C5', 'E2', 'E3', 'A1'];

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const handleOpenBooking = (movie: Movie, showtime: typeof movie.showtimes[0]) => {
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    setBookingModalOpen(true);
    setTicketConfirmed(false);
  };

  const calculateTotal = () => {
    const seatPrice = selectedShowtime.format.includes('VIP') ? 28 : selectedShowtime.format.includes('IMAX') ? 24 : 19;
    const seatsTotal = selectedSeats.length * seatPrice;
    const concessions = addPopcornCombo ? 16 : 0;
    return seatsTotal + concessions;
  };

  const handleConfirmTickets = () => {
    if (selectedSeats.length === 0) return;
    const generatedId = `CINELUX-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setTicketConfirmed(true);
  };

  return (
    <section id="cinema" className="py-20 bg-stone-950 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Cinematic Sanctuary
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              CineLux IMAX & ScreenX Auditoriums
            </h2>
          </div>
          <p className="text-sm text-stone-400 max-w-md">
            Laser dual-projection, plush leather power-recliners, sommelier curated beverage service, and in-seat gourmet dining.
          </p>
        </div>

        {/* Feature Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-12 border border-stone-800 shadow-2xl aspect-[21/9] min-h-[300px] flex items-end">
          <img
            src={cinemaImg}
            alt="CineLux luxury VIP cinema auditorium"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-2">
              <Film className="w-4 h-4" />
              <span>Level 3 North Wing · 12 State-of-the-Art Halls</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
              The Ultimate Audio-Visual Immersion
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mb-4 font-light">
              Experience the world&apos;s largest commercial curved screen, custom 64-channel spatial sound, and private VIP lounge service before every screening.
            </p>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MOVIES.map((movie) => {
            const isSelected = selectedMovie.id === movie.id;
            return (
              <div
                key={movie.id}
                className={`bg-stone-900 rounded-xl border p-6 flex flex-col justify-between transition-all ${
                  isSelected ? 'border-amber-400 shadow-lg' : 'border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-medium">
                    <span>{movie.genre}</span>
                    <span className="tabular-nums font-mono text-stone-300">{movie.duration}</span>
                  </div>

                  <h3 className="text-xl font-serif text-white mb-2">{movie.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-3 mb-4">
                    {movie.synopsis}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {movie.formats.map((fmt) => (
                      <span
                        key={fmt}
                        className="text-[11px] font-medium text-amber-300 bg-amber-950/50 border border-amber-800/40 px-2 py-0.5 rounded"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-stone-300 mb-2">Today&apos;s Showtimes:</div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {movie.showtimes.map((st, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOpenBooking(movie, st)}
                        className="p-2 bg-stone-800 hover:bg-amber-400 hover:text-stone-950 rounded-lg text-left text-xs transition-colors group"
                      >
                        <div className="font-semibold text-white group-hover:text-stone-950">
                          {st.time}
                        </div>
                        <div className="text-[10px] text-stone-400 group-hover:text-stone-800">
                          {st.format}
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleOpenBooking(movie, movie.showtimes[0])}
                    className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Armchair className="w-3.5 h-3.5 text-amber-400" />
                    Select Seats & Reserve
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seat Selection & Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs">
          <div className="bg-stone-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-800 relative text-stone-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!ticketConfirmed ? (
              <div>
                <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
                  Seat Selection & Booking
                </div>
                <h3 className="text-2xl font-serif text-white mb-1">{selectedMovie.title}</h3>
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-6">
                  <span>{selectedShowtime.hall}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400 font-semibold">{selectedShowtime.format}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedShowtime.time}</span>
                </div>

                {/* Cinema Screen Curve */}
                <div className="mb-6 text-center">
                  <div className="h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full max-w-md mx-auto mb-1.5 shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
                  <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
                    Curved Laser IMAX Screen
                  </div>
                </div>

                {/* Seat Matrix */}
                <div className="bg-stone-950 p-4 sm:p-6 rounded-xl border border-stone-800 mb-6">
                  <div className="space-y-2 max-w-md mx-auto">
                    {rows.map((row) => (
                      <div key={row} className="flex items-center justify-center gap-1.5">
                        <span className="w-4 text-[10px] text-stone-500 font-mono text-center">
                          {row}
                        </span>
                        {cols.map((col) => {
                          const seatId = `${row}${col}`;
                          const isOccupied = occupiedSeats.includes(seatId);
                          const isSelected = selectedSeats.includes(seatId);

                          return (
                            <button
                              key={seatId}
                              disabled={isOccupied}
                              onClick={() => toggleSeat(seatId)}
                              title={isOccupied ? `Seat ${seatId} Occupied` : `Seat ${seatId}`}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[10px] font-mono transition-all flex items-center justify-center ${
                                isOccupied
                                  ? 'bg-stone-800 text-stone-600 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-amber-400 text-stone-950 font-bold scale-105 shadow-md shadow-amber-400/20'
                                  : 'bg-stone-800/80 hover:bg-stone-700 text-stone-300'
                              }`}
                            >
                              {col}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Seat Legend */}
                  <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-stone-800/60 text-[11px] text-stone-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-stone-800 border border-stone-700 inline-block" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-amber-400 inline-block" />
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-stone-800 text-stone-600 inline-block" />
                      <span>Occupied</span>
                    </div>
                  </div>
                </div>

                {/* Concessions Upsell */}
                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-white">
                        Artisan Truffle Popcorn & Beverage Flight
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        Delivered straight to your recliner seats before start ($16.00)
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={addPopcornCombo}
                    onChange={(e) => setAddPopcornCombo(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                </div>

                {/* Summary & Checkout Button */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                  <div>
                    <span className="text-xs text-stone-400 block">
                      Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                    </span>
                    <span className="text-lg font-bold text-white tabular-nums">
                      ${calculateTotal()}.00
                    </span>
                  </div>

                  <button
                    disabled={selectedSeats.length === 0}
                    onClick={handleConfirmTickets}
                    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    Confirm Reservation
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-1">Reservation Confirmed</h3>
                <p className="text-xs text-stone-400 mb-6">
                  Present this digital pass or booking ID at CineLux VIP lounge entrance.
                </p>

                {/* Digital Ticket Pass Card */}
                <div className="max-w-sm mx-auto bg-stone-950 p-6 rounded-2xl border border-stone-800 mb-6 text-left relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4 border-b border-stone-800 pb-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                        CineLux Boarding Pass
                      </div>
                      <div className="text-base font-serif font-bold text-white">
                        {selectedMovie.title}
                      </div>
                    </div>
                    <div className="p-2 bg-stone-900 rounded-lg">
                      <QrCode className="w-8 h-8 text-amber-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    <div>
                      <span className="text-stone-500 block text-[10px]">Auditorium</span>
                      <span className="font-semibold text-stone-200">{selectedShowtime.hall}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[10px]">Format</span>
                      <span className="font-semibold text-amber-400">{selectedShowtime.format}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[10px]">Time & Date</span>
                      <span className="font-semibold text-stone-200">{selectedShowtime.time} · Today</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[10px]">Reserved Seats</span>
                      <span className="font-semibold text-white">{selectedSeats.join(', ')}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-800 flex justify-between items-center text-xs">
                    <span className="text-stone-500">Booking Pass ID:</span>
                    <span className="font-mono font-bold text-stone-200">{ticketId}</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="px-6 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg"
                >
                  Close Pass
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
