import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Clock, Sparkles, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { STORES, Store } from '../data/mallData';
import boutiqueImg from '../assets/images/luxury_boutique_storefront_1791195180552.jpg';

interface StoreDirectoryProps {
  initialSearch?: string;
  onSelectStoreForMap: (store: Store) => void;
}

export const StoreDirectory: React.FC<StoreDirectoryProps> = ({
  initialSearch = '',
  onSelectStoreForMap,
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [activeModalStore, setActiveModalStore] = useState<Store | null>(null);

  // Sync external search when prop changes
  React.useEffect(() => {
    if (initialSearch) {
      setSearch(initialSearch);
    }
  }, [initialSearch]);

  const categories = ['All', 'Fashion & Luxury', 'Tech & Lifestyle', 'Beauty & Wellness', 'Entertainment'];
  const levels = [
    { label: 'All Levels', val: 'All' },
    { label: 'Ground Floor', val: 'G' },
    { label: 'Level 1', val: 'L1' },
    { label: 'Level 2', val: 'L2' },
    { label: 'Level 3', val: 'L3' }
  ];

  const filteredStores = useMemo(() => {
    return STORES.filter((store) => {
      const matchSearch =
        search.trim() === '' ||
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        store.description.toLowerCase().includes(search.toLowerCase());

      const matchCat =
        selectedCategory === 'All' || store.category === selectedCategory;

      const matchLvl = selectedLevel === 'All' || store.level === selectedLevel;

      return matchSearch && matchCat && matchLvl;
    });
  }, [search, selectedCategory, selectedLevel]);

  return (
    <section id="directory" className="py-20 bg-[#FAF9F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-1">
              Curated Directory
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              Boutiques, Ateliers & Flagships
            </h2>
          </div>
          <div className="text-sm text-stone-500 font-normal">
            Showing <span className="font-semibold text-stone-900 tabular-nums">{filteredStores.length}</span> of {STORES.length} destinations
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-xs mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search store name, watch, bag..."
                className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {levels.map((lvl) => (
                <button
                  key={lvl.val}
                  onClick={() => setSelectedLevel(lvl.val)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    selectedLevel === lvl.val
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-stone-100 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-900/10 text-amber-950 font-semibold border border-amber-900/20'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Store Grid */}
        {filteredStores.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/80 p-8">
            <p className="text-stone-500 text-sm mb-3">No stores found matching &quot;{search}&quot;</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 rounded-md hover:bg-stone-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                onClick={() => setActiveModalStore(store)}
                className="group bg-white rounded-xl border border-stone-200/80 p-6 flex flex-col justify-between hover:border-amber-900/40 hover:shadow-md transition-all cursor-pointer"
              >
                <div>
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
                    <span>{store.category}</span>
                    <span className="tabular-nums font-mono text-stone-400">{store.unit}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-serif text-stone-900 group-hover:text-amber-900 transition-colors">
                      {store.name}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors shrink-0 mt-1" />
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {store.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  {/* Unboxed Metadata row */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                    <span className="font-medium text-stone-700">{store.levelName.split('—')[0]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{store.hours}</span>
                  </div>

                  {store.featuredOffer && (
                    <div className="text-xs text-amber-900 bg-amber-50/80 rounded-md px-2.5 py-1.5 flex items-center gap-1.5 mb-3">
                      <Sparkles className="w-3 h-3 shrink-0 text-amber-700" />
                      <span className="truncate">{store.featuredOffer}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStoreForMap(store);
                      }}
                      className="text-xs font-semibold text-stone-800 hover:text-amber-900 flex items-center gap-1 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Locate on Map
                    </button>
                    <span className="text-xs text-stone-400 group-hover:text-stone-700 transition-colors">
                      View Atelier &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Store Detail Modal */}
      {activeModalStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden">
            <button
              onClick={() => setActiveModalStore(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header for Flagships */}
            <div className="mb-6 rounded-xl overflow-hidden h-40 relative bg-stone-100">
              <img
                src={boutiqueImg}
                alt={activeModalStore.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <div className="text-xs font-medium text-amber-200 tracking-wider uppercase mb-0.5">
                  {activeModalStore.category}
                </div>
                <h3 className="text-2xl font-serif">{activeModalStore.name}</h3>
              </div>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed mb-6">
              {activeModalStore.description}
            </p>

            {/* Quick Fact Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-6">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
                <span className="text-stone-400 block mb-1">Location & Unit</span>
                <span className="font-semibold text-stone-900">{activeModalStore.levelName}</span>
                <span className="block text-stone-500 mt-0.5 font-mono">Unit {activeModalStore.unit}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
                <span className="text-stone-400 block mb-1">Hours Today</span>
                <span className="font-semibold text-stone-900">{activeModalStore.hours}</span>
                <span className="block text-stone-500 mt-0.5">{activeModalStore.phone}</span>
              </div>
            </div>

            {activeModalStore.featuredOffer && (
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/60 mb-6 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-amber-950 block">Current Privilege Offer</span>
                  <p className="text-xs text-amber-900 mt-0.5">{activeModalStore.featuredOffer}</p>
                </div>
              </div>
            )}

            {/* Tag List */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
              <span className="font-medium text-stone-700">Specialties:</span>
              <span>{activeModalStore.tags.join(' · ')}</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
              <button
                onClick={() => {
                  const store = activeModalStore;
                  setActiveModalStore(null);
                  onSelectStoreForMap(store);
                }}
                className="px-4 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                Highlight on Floor Map
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
