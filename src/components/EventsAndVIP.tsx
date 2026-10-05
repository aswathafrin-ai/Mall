import React, { useState } from 'react';
import { Calendar, Sparkles, Award, Gift, Check, ShieldCheck, HeartHandshake, Luggage, Baby } from 'lucide-react';
import { MALL_EVENTS } from '../data/mallData';

export const EventsAndVIP: React.FC = () => {
  const [membershipName, setMembershipName] = useState('');
  const [membershipEmail, setMembershipEmail] = useState('');
  const [memberCardGenerated, setMemberCardGenerated] = useState(false);
  const [memberTier, setMemberTier] = useState<'Aura Select' | 'Atrium Black'>('Aura Select');

  const handleJoinClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!membershipName || !membershipEmail) return;
    setMemberCardGenerated(true);
  };

  const services = [
    {
      icon: <Gift className="w-5 h-5 text-amber-900" />,
      title: 'Hands-Free Shopping',
      desc: 'Boutique purchases delivered straight to your vehicle boot or valet conciergerie.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-900" />,
      title: 'Personal Styling Suites',
      desc: 'Private fitting salons on Level 1 with champagne and dedicated luxury fashion curators.'
    },
    {
      icon: <Baby className="w-5 h-5 text-amber-900" />,
      title: 'Family & Stroller Lounge',
      desc: 'Private nursing suites, sanitized Silver Cross strollers, and interactive kids play court.'
    },
    {
      icon: <Luggage className="w-5 h-5 text-amber-900" />,
      title: 'Secure Luggage & Coat Check',
      desc: 'Complimentary safe baggage storage on Ground Concourse for international travelers.'
    }
  ];

  return (
    <section className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cultural Exhibitions & Events */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                Culture & Art
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                Current Installations & Salons
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md">
              A rotating program of public architecture, international contemporary art, and fine watchmaking masterclasses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MALL_EVENTS.map((evt) => (
              <div
                key={evt.id}
                className="bg-stone-950 p-6 rounded-2xl border border-stone-800 flex flex-col justify-between hover:border-amber-400/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-400 mb-3 font-semibold">
                    <span>{evt.category}</span>
                    <span className="text-stone-400 font-normal">{evt.time}</span>
                  </div>
                  <h3 className="text-xl font-serif text-white mb-2">{evt.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed mb-4">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-900 text-xs text-stone-500 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {evt.date}
                  </span>
                  <span>{evt.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Privilege Club & Guest Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-stone-800">
          {/* Guest Services List (7 cols) */}
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Bespoke Concierge
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white mb-6">
              Distinguished Guest Amenities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((item, idx) => (
                <div key={idx} className="bg-stone-950 p-5 rounded-xl border border-stone-800">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Privilege Club Membership Card Form (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-950 to-stone-900 p-6 sm:p-8 rounded-2xl border border-amber-900/40 shadow-2xl relative">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Private Membership
            </div>
            <h3 className="text-2xl font-serif text-white mb-2">The Atrium Privilege</h3>
            <p className="text-xs text-stone-400 mb-6">
              Unlock valet privileges, invitation-only boutique trunk shows, and points earned across all 180+ boutiques.
            </p>

            {!memberCardGenerated ? (
              <form onSubmit={handleJoinClub} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Vance"
                    value={membershipName}
                    onChange={(e) => setMembershipName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-lg text-white text-xs placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="julian@example.com"
                    value={membershipEmail}
                    onChange={(e) => setMembershipEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-lg text-white text-xs placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 text-stone-400">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-[11px]">Instant digital card with Apple Wallet / Google Wallet pass</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs rounded-lg transition-colors mt-2"
                >
                  Generate Digital Privilege Pass
                </button>
              </form>
            ) : (
              <div className="text-center py-2">
                {/* Simulated Metallic Luxury Card */}
                <div className="w-full aspect-[16/10] bg-gradient-to-tr from-stone-900 via-amber-950/40 to-stone-800 rounded-xl p-5 border border-amber-400/50 shadow-2xl text-left relative overflow-hidden mb-4 flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] tracking-widest uppercase text-amber-300 font-mono">
                        The Grand Atrium
                      </div>
                      <div className="text-sm font-serif font-bold text-white tracking-wide">
                        {memberTier} Pass
                      </div>
                    </div>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>

                  <div>
                    <div className="font-mono text-xs text-amber-200 tracking-widest mb-1">
                      8042 •••• •••• 9102
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-300">
                      <span className="font-medium uppercase">{membershipName}</span>
                      <span className="font-mono text-[10px] text-amber-400">EXP 10/28</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 text-xs text-emerald-400 font-medium mb-3">
                  <Check className="w-4 h-4" />
                  <span>Privilege Membership Active</span>
                </div>

                <p className="text-[11px] text-stone-400 mb-4">
                  Welcome, {membershipName}. You now receive 2 hours complimentary valet and VIP booking priority at all rooftop bistros.
                </p>

                <button
                  onClick={() => setMemberCardGenerated(false)}
                  className="text-xs text-stone-400 hover:text-stone-200"
                >
                  Edit details or register another guest
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
