export interface Store {
  id: string;
  name: string;
  category: 'Fashion & Luxury' | 'Tech & Lifestyle' | 'Dining & Cafes' | 'Beauty & Wellness' | 'Entertainment';
  level: 'G' | 'L1' | 'L2' | 'L3';
  levelName: string;
  unit: string;
  hours: string;
  phone: string;
  description: string;
  tags: string[];
  featuredOffer?: string;
  isFlagship?: boolean;
  mapCoordinates: { x: number; y: number; width: number; height: number };
}

export interface DiningSpot {
  id: string;
  name: string;
  cuisine: string;
  level: string;
  unit: string;
  priceRange: '$$' | '$$$' | '$$$$';
  hours: string;
  phone: string;
  rating: number;
  highlight: string;
  description: string;
  acceptsReservations: boolean;
  signatureDish: string;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: string;
  duration: string;
  director: string;
  synopsis: string;
  formats: ('IMAX 70mm' | 'Dolby Atmos' | 'ScreenX' | 'VIP Recliner')[];
  showtimes: { time: string; format: string; hall: string; availableSeats: number }[];
}

export interface MallEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  isFeatured?: boolean;
}

export const STORES: Store[] = [
  {
    id: 's1',
    name: 'Maison Hermès',
    category: 'Fashion & Luxury',
    level: 'G',
    levelName: 'Ground Floor — Grand Boulevard',
    unit: 'G-01',
    hours: '10:00 AM – 10:00 PM',
    phone: '+1 (555) 890-1120',
    description: 'Iconic French luxury house showcasing bespoke leather goods, silk scarves, equestrian heritage, and haute horlogerie.',
    tags: ['Leather', 'Accessories', 'Haute Horlogerie', 'Flagship'],
    featuredOffer: 'Complimentary leather conditioning & monogramming atelier',
    isFlagship: true,
    mapCoordinates: { x: 70, y: 80, width: 140, height: 95 }
  },
  {
    id: 's2',
    name: 'Cartier & Joaillerie',
    category: 'Fashion & Luxury',
    level: 'G',
    levelName: 'Ground Floor — Grand Boulevard',
    unit: 'G-04',
    hours: '10:00 AM – 09:30 PM',
    phone: '+1 (555) 890-1124',
    description: 'The King of Jewellers. Exquisite high jewellery, iconic Tank and Santos timepieces, and bespoke diamond engagement consultations.',
    tags: ['Watches', 'Jewellery', 'Diamonds'],
    isFlagship: true,
    mapCoordinates: { x: 230, y: 80, width: 120, height: 95 }
  },
  {
    id: 's3',
    name: 'Rolex Crown Boutique',
    category: 'Fashion & Luxury',
    level: 'G',
    levelName: 'Ground Floor — Grand Boulevard',
    unit: 'G-06',
    hours: '10:00 AM – 09:30 PM',
    phone: '+1 (555) 890-1126',
    description: 'Official Rolex boutique featuring master watchmakers on-site, rare collector exhibitions, and certified chronometer collections.',
    tags: ['Watches', 'Luxury', 'Horology'],
    mapCoordinates: { x: 370, y: 80, width: 130, height: 95 }
  },
  {
    id: 's4',
    name: 'Chanel Parfums & Mode',
    category: 'Fashion & Luxury',
    level: 'G',
    levelName: 'Ground Floor — Grand Boulevard',
    unit: 'G-10',
    hours: '10:00 AM – 10:00 PM',
    phone: '+1 (555) 890-1130',
    description: 'Two-story boutique offering ready-to-wear seasonal runways, fine fragrances, Les Exclusifs, and private VIP dressing salons.',
    tags: ['Fashion', 'Fragrance', 'Haute Couture'],
    featuredOffer: 'Private appointments for Les Exclusifs fragrance flight',
    isFlagship: true,
    mapCoordinates: { x: 520, y: 80, width: 160, height: 95 }
  },
  {
    id: 's5',
    name: 'Apple Grand Atrium',
    category: 'Tech & Lifestyle',
    level: 'L2',
    levelName: 'Level 2 — Innovation & Design',
    unit: 'L2-01',
    hours: '10:00 AM – 10:00 PM',
    phone: '+1 (555) 890-2201',
    description: 'Architectural glass storefront offering Today at Apple masterclasses, Genius Grove consultations, and the complete hardware ecosystem.',
    tags: ['Technology', 'Electronics', 'Genius Bar'],
    isFlagship: true,
    mapCoordinates: { x: 80, y: 90, width: 170, height: 110 }
  },
  {
    id: 's6',
    name: 'Le Labo Fragrances',
    category: 'Beauty & Wellness',
    level: 'L1',
    levelName: 'Level 1 — Contemporary Runway',
    unit: 'L1-08',
    hours: '10:00 AM – 09:30 PM',
    phone: '+1 (555) 890-1418',
    description: 'Freshly hand-compounded perfumes, botanical body formulations, and personalized labels stamped with your name on the spot.',
    tags: ['Perfume', 'Apothecary', 'Cruelty Free'],
    mapCoordinates: { x: 190, y: 90, width: 110, height: 85 }
  },
  {
    id: 's7',
    name: 'Aesop Apothecary',
    category: 'Beauty & Wellness',
    level: 'L1',
    levelName: 'Level 1 — Contemporary Runway',
    unit: 'L1-12',
    hours: '10:00 AM – 09:30 PM',
    phone: '+1 (555) 890-1422',
    description: 'Distinctive architectural interior made with recycled clay tiles, offering sensory skin, hair, and home fragrance consultations.',
    tags: ['Skincare', 'Sustainable', 'Botanical'],
    mapCoordinates: { x: 320, y: 90, width: 120, height: 85 }
  },
  {
    id: 's8',
    name: 'Bang & Olufsen Acoustic Studio',
    category: 'Tech & Lifestyle',
    level: 'L2',
    levelName: 'Level 2 — Innovation & Design',
    unit: 'L2-09',
    hours: '10:00 AM – 09:00 PM',
    phone: '+1 (555) 890-2209',
    description: 'Danish acoustic engineering meets sculptural Scandinavian aesthetics. Test sound in the private acoustic listening lounge.',
    tags: ['Hi-Fi Audio', 'Design', 'Speakers'],
    mapCoordinates: { x: 270, y: 90, width: 130, height: 90 }
  },
  {
    id: 's9',
    name: 'Rimowa Travel Atelier',
    category: 'Tech & Lifestyle',
    level: 'L2',
    levelName: 'Level 2 — Innovation & Design',
    unit: 'L2-14',
    hours: '10:00 AM – 09:30 PM',
    phone: '+1 (555) 890-2214',
    description: 'Iconic grooved aluminium and lightweight polycarbonate luggage with lifetime warranty repair service center on premise.',
    tags: ['Luggage', 'Travel', 'Aluminium'],
    mapCoordinates: { x: 420, y: 90, width: 120, height: 90 }
  },
  {
    id: 's10',
    name: 'Marni & Isabel Marant',
    category: 'Fashion & Luxury',
    level: 'L1',
    levelName: 'Level 1 — Contemporary Runway',
    unit: 'L1-18',
    hours: '10:00 AM – 09:30 PM',
    phone: '+1 (555) 890-1430',
    description: 'Eclectic modern bohemian apparel, bold color blocking, avant-garde footwear, and signature knitwear collections.',
    tags: ['Designer Apparel', 'Contemporary', 'Accessories'],
    mapCoordinates: { x: 460, y: 90, width: 140, height: 85 }
  },
  {
    id: 's11',
    name: 'CineLux IMAX & ScreenX',
    category: 'Entertainment',
    level: 'L3',
    levelName: 'Level 3 — Skyline Terrace & Cinema',
    unit: 'L3-Cinema',
    hours: '11:00 AM – 01:00 AM',
    phone: '+1 (555) 890-3300',
    description: '12 luxury auditoriums with heated leather power-recliners, IMAX laser projection, curated sommelier wine list, and in-seat dining.',
    tags: ['Cinema', 'IMAX', 'Entertainment', 'VIP Lounge'],
    featuredOffer: 'Complimentary gourmet truffle popcorn with VIP seat booking',
    isFlagship: true,
    mapCoordinates: { x: 80, y: 80, width: 320, height: 140 }
  },
  {
    id: 's12',
    name: 'Lego Concept Flagship',
    category: 'Entertainment',
    level: 'L2',
    levelName: 'Level 2 — Innovation & Design',
    unit: 'L2-22',
    hours: '10:00 AM – 09:30 PM',
    phone: '+1 (555) 890-2222',
    description: 'Pick-a-brick wall, life-size sculpture builds of local architectural landmarks, and interactive digital mosaic maker.',
    tags: ['Toys', 'Family', 'Interactive'],
    mapCoordinates: { x: 560, y: 90, width: 150, height: 90 }
  }
];

export const DINING_SPOTS: DiningSpot[] = [
  {
    id: 'd1',
    name: 'Aura Skyline Brasserie',
    cuisine: 'Modern French & Seafood',
    level: 'Level 3 Rooftop',
    unit: 'L3-01',
    priceRange: '$$$$',
    hours: '11:30 AM – 11:00 PM',
    phone: '+1 (555) 890-3101',
    rating: 4.9,
    highlight: 'Panoramic sunset terrace & open oyster raw bar',
    description: 'Elevated culinary experience overlooking the city skyline. Sustainable wild seafood, dry-aged steaks, and an award-winning 600-label wine cellar.',
    acceptsReservations: true,
    signatureDish: 'Brittany Blue Lobster with saffron bisque and verbena butter'
  },
  {
    id: 'd2',
    name: 'Kintsugi Omakase',
    cuisine: 'Japanese Edomae',
    level: 'Level 3 Rooftop',
    unit: 'L3-04',
    priceRange: '$$$$',
    hours: '12:00 PM – 02:30 PM, 06:00 PM – 10:30 PM',
    phone: '+1 (555) 890-3104',
    rating: 4.95,
    highlight: '12-seat cedar counter with Tokyo Toyosu daily air-freighted fish',
    description: 'Exclusive 18-course chef omakase prepared live before your eyes by Master Chef Kenji Sato, using 200-year-old traditional vinegared rice.',
    acceptsReservations: true,
    signatureDish: 'Otoro Nigiri with Binchotan charcoal sear and aged soy'
  },
  {
    id: 'd3',
    name: 'Café de L’Orangerie',
    cuisine: 'Artisan Patisserie & Specialty Coffee',
    level: 'Ground Floor Atrium',
    unit: 'G-Atrium',
    priceRange: '$$',
    hours: '08:30 AM – 09:30 PM',
    phone: '+1 (555) 890-1199',
    rating: 4.8,
    highlight: 'Glass-enclosed atrium garden with fresh morning baking batches',
    description: 'Chic European salon serving single-origin Ethiopian espresso, double-laminated butter croissants, and seasonal fruit tartelettes.',
    acceptsReservations: false,
    signatureDish: 'Pistachio Paris-Brest with roasted praline cream'
  },
  {
    id: 'd4',
    name: 'Trattoria del Sole',
    cuisine: 'Handmade Pasta & Wood-fired Pizza',
    level: 'Level 3 Promenade',
    unit: 'L3-08',
    priceRange: '$$$',
    hours: '11:30 AM – 10:00 PM',
    phone: '+1 (555) 890-3108',
    rating: 4.75,
    highlight: 'Imported Marana Forni stone oven & open pasta laboratory',
    description: 'Authentic Roman comfort dining with flour milled in Naples, San Marzano tomatoes, and artisanal burrata flown in weekly.',
    acceptsReservations: true,
    signatureDish: 'Aged Guanciale Carbonara served in a pecorino wheel'
  },
  {
    id: 'd5',
    name: 'Matcha Botanical Tearoom',
    cuisine: 'Ceremonial Matcha & Wagashi',
    level: 'Level 1 Balcony',
    unit: 'L1-02',
    priceRange: '$$',
    hours: '10:00 AM – 09:00 PM',
    phone: '+1 (555) 890-1402',
    rating: 4.85,
    highlight: 'Single-estate Uji first-harvest stone-ground matcha',
    description: 'Serene bamboo-lined refuge providing authentic hand-whisked ceremonial matcha, hojicha soft serve, and artisanal Japanese confectionery.',
    acceptsReservations: false,
    signatureDish: 'Ceremonial Koicha Affogato with Hokkaido milk gelato'
  }
];

export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Dune: The Sisterhood Chronicles',
    genre: 'Sci-Fi / Epic Drama',
    rating: 'PG-13',
    duration: '2h 42m',
    director: 'Denis Villeneuve',
    synopsis: 'An interstellar political odyssey unfolding across the shifting sands of Arrakis and imperial palaces of Kaitain, filmed with full 1.43:1 aspect ratio IMAX cameras.',
    formats: ['IMAX 70mm', 'Dolby Atmos', 'VIP Recliner'],
    showtimes: [
      { time: '12:30 PM', format: 'IMAX 70mm', hall: 'Hall 1 (IMAX)', availableSeats: 18 },
      { time: '03:45 PM', format: 'VIP Recliner', hall: 'VIP Lounge 2', availableSeats: 8 },
      { time: '07:15 PM', format: 'IMAX 70mm', hall: 'Hall 1 (IMAX)', availableSeats: 4 },
      { time: '10:00 PM', format: 'Dolby Atmos', hall: 'Hall 3', availableSeats: 32 }
    ]
  },
  {
    id: 'm2',
    title: 'Symphony of the Cosmopolis',
    genre: 'Documentary / Architectural Art',
    rating: 'G',
    duration: '1h 38m',
    director: 'Elena Rostova',
    synopsis: 'A mesmerizing visual journey through the world’s most audacious modern architectural wonders, scored by the Berlin Philharmonic in spatial surround audio.',
    formats: ['ScreenX', 'Dolby Atmos'],
    showtimes: [
      { time: '01:00 PM', format: 'ScreenX', hall: 'Hall 4 (ScreenX)', availableSeats: 26 },
      { time: '04:15 PM', format: 'Dolby Atmos', hall: 'Hall 3', availableSeats: 41 },
      { time: '06:45 PM', format: 'ScreenX', hall: 'Hall 4 (ScreenX)', availableSeats: 19 }
    ]
  },
  {
    id: 'm3',
    title: 'The Milan Heist',
    genre: 'Thriller / Action',
    rating: 'R',
    duration: '2h 14m',
    director: 'Marcus Sterling',
    synopsis: 'An intricate caper targeting the high jewellery vaults beneath Quadrilatero della Moda during Milan Fashion Week. High octane choreography and cinematic tension.',
    formats: ['VIP Recliner', 'Dolby Atmos'],
    showtimes: [
      { time: '02:00 PM', format: 'VIP Recliner', hall: 'VIP Lounge 1', availableSeats: 12 },
      { time: '05:30 PM', format: 'Dolby Atmos', hall: 'Hall 2', availableSeats: 28 },
      { time: '08:30 PM', format: 'VIP Recliner', hall: 'VIP Lounge 1', availableSeats: 6 },
      { time: '11:15 PM', format: 'Dolby Atmos', hall: 'Hall 2', availableSeats: 44 }
    ]
  }
];

export const MALL_EVENTS: MallEvent[] = [
  {
    id: 'e1',
    title: 'Sculptural Light: An Atrium Installation',
    date: 'Oct 10 – Nov 15, 2026',
    time: 'Daily from 06:00 PM',
    location: 'Central Glass Atrium',
    category: 'Art & Culture',
    description: 'A 24-meter suspended kinetic crystal installation by Studio Drift, choreographed to ambient soundscapes and shifting daylight rays.',
    isFeatured: true
  },
  {
    id: 'e2',
    title: 'Autumn Horology & Fine Jewels Salon',
    date: 'Oct 17 – Oct 19, 2026',
    time: '11:00 AM – 08:00 PM',
    location: 'Grand Boulevard Exhibition Hall',
    category: 'Exhibition',
    description: 'Rare vintage watches and limited-edition complications presented by Geneva master artisans with private collector evaluations.',
    isFeatured: false
  },
  {
    id: 'e3',
    title: 'Acoustic Sunset Sessions on the Sky Terrace',
    date: 'Every Friday & Saturday',
    time: '06:30 PM – 09:30 PM',
    location: 'Level 3 Rooftop Garden',
    category: 'Live Music',
    description: 'Live neoclassical cello and jazz quartets paired with signature twilight cocktails under the city stars.',
    isFeatured: false
  }
];

export const PARKING_DECKS = [
  { id: 'p1', name: 'P1 Valet & VIP Arrival', total: 180, occupied: 128, type: 'Valet & Direct Atrium Access' },
  { id: 'p2', name: 'P2 Central Promenade Deck', total: 650, occupied: 410, type: 'Direct Access to Level G & L1' },
  { id: 'p3', name: 'P3 North Galleria Deck', total: 520, occupied: 295, type: 'Direct Elevator to Cinema & Terrace' },
  { id: 'p4', name: 'EV Supercharge Hub (350kW)', total: 60, occupied: 34, type: 'High-Speed Tesla & Universal CCS' }
];

export const MALL_HOURS = {
  general: '10:00 AM – 10:00 PM',
  dining: '11:00 AM – 11:30 PM',
  cinema: '11:00 AM – 01:00 AM',
  valet: '09:30 AM – Midnight',
  address: '800 Grand Boulevard, Metropolitan Center',
  metro: 'Direct underground walkway to Grand Central Line (Station Atrium)'
};
