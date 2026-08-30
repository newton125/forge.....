import { Category, Product, User, Order, Customer, AdminDashboardStats } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'power-tools',
    name: 'Power Tools',
    description: 'Industrial brushless drills, grinders, saws, and cordless systems',
    icon: 'Zap',
    itemCount: 428,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hand-tools',
    name: 'Hand Tools',
    description: 'Precision torque wrenches, industrial pliers, sockets, and calipers',
    icon: 'Wrench',
    itemCount: 890,
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'safety-gear',
    name: 'Safety & PPE',
    description: 'ANSI-certified hard hats, respirators, hearing protection, and gloves',
    icon: 'ShieldCheck',
    itemCount: 312,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'welding',
    name: 'Welding & Cutting',
    description: 'MIG/TIG welding rigs, auto-darkening helmets, and plasma cutters',
    icon: 'Flame',
    itemCount: 175,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fasteners',
    name: 'Fasteners & Hardware',
    description: 'Grade 8 bolts, structural anchors, stainless hex nuts, and studs',
    icon: 'Disc',
    itemCount: 1450,
    image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pneumatics',
    name: 'Pneumatics & Air',
    description: 'Heavy pneumatic impact wrenches, air compressors, and air lines',
    icon: 'Wind',
    itemCount: 210,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'electrical',
    name: 'Electrical & Testing',
    description: 'True-RMS multimeters, thermal cameras, wire strippers, and conduit',
    icon: 'Activity',
    itemCount: 340,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'machinery',
    name: 'Heavy Machinery & Bench',
    description: 'Industrial metal lathes, drill presses, heavy vises, and bandsaws',
    icon: 'Cpu',
    itemCount: 94,
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'frg-101',
    sku: 'PWR-DW-996B',
    name: 'DeWalt 20V MAX XR Brushless 3-Speed Hammerdrill',
    brand: 'DeWalt',
    category: 'power-tools',
    price: 9850.00,
    originalPrice: 11500.00,
    stock: 34,
    lowStockThreshold: 10,
    inStock: true,
    rating: 4.9,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The DCD996B 20V MAX* XR High Power Brushless 3-Speed Hammerdrill features a high-performance, high-efficiency brushless motor that delivers up to 75% more runtime than standard brushed motors. Official Egyptian agent warranty included.',
    features: [
      'High-power, high-efficiency brushless motor delivering 820 Unit Watts Out (UWO)',
      'Heavy-duty 1/2-inch nitro-carburized ratcheting metal chuck with carbide inserts',
      '3-Mode LED spotlight with 20-minute shutoff function in spotlight mode',
      'All-metal transmission with 3 speed ranges: 0-450, 0-1300, 0-2000 RPM'
    ],
    specs: [
      { name: 'Voltage', value: '20V MAX' },
      { name: 'Max Power', value: '820 UWO' },
      { name: 'Chuck Size', value: '1/2" Metal Ratcheting' },
      { name: 'BPM', value: '0-38,250 BPM' },
      { name: 'Tool Weight', value: '2.13 kg (4.7 lbs)' },
      { name: 'Warranty', value: '3-Year Official Agent Warranty (ضمان وكيل 3 سنوات)' }
    ],
    tags: ['Brushless', '20V Max', 'Heavy Duty', 'Bestseller'],
    warranty: '3-Year Official Agent Warranty',
    weight: '2.13 kg',
    certifications: ['CE Certified', 'ISO 9001', 'EOS Compliant'],
    featured: true,
    bestSeller: true
  },
  {
    id: 'frg-102',
    sku: 'GRN-MK-450X',
    name: 'Makita 18V LXT Lithium-Ion 4-1/2" / 5" Paddle Switch Angle Grinder',
    brand: 'Makita',
    category: 'power-tools',
    price: 6450.00,
    originalPrice: 7200.00,
    stock: 18,
    lowStockThreshold: 8,
    inStock: true,
    rating: 4.8,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Delivers corded grinding performance without the cord. Powered by a Makita brushless motor with Automatic Speed Change technology that adjusts speed and torque during heavy-duty workshop operation in Egypt.',
    features: [
      'Brushless motor delivers 8,500 RPM for fast cutting and grinding',
      'Active Feedback-sensing Technology (AFT) turns off motor if wheel rotation suddenly stops',
      'Electric brake stops the wheel in 2 seconds or less for maximum safety',
      'Extreme Protection Technology (XPT) engineered for improved dust & water resistance'
    ],
    specs: [
      { name: 'Wheel Diameter', value: '115mm / 125mm (4-1/2" / 5")' },
      { name: 'No Load Speed', value: '8,500 RPM' },
      { name: 'Switch Type', value: 'Paddle with Lock-off' },
      { name: 'Spindle Thread', value: 'M14 (Standard Metric)' },
      { name: 'Weight with Battery', value: '2.58 kg' }
    ],
    tags: ['Brushless', 'Safety Brake', '18V LXT'],
    warranty: '2-Year Official Makita Egypt Warranty',
    weight: '2.58 kg',
    featured: true,
    bestSeller: false
  },
  {
    id: 'frg-103',
    sku: 'TST-FLK-87V',
    name: 'Fluke 87V Industrial True-RMS Digital Multimeter',
    brand: 'Fluke',
    category: 'electrical',
    price: 18900.00,
    originalPrice: 21000.00,
    stock: 22,
    lowStockThreshold: 5,
    inStock: true,
    rating: 5.0,
    reviewCount: 215,
    images: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The industry benchmark for accurate electrical measurement in industrial facilities across Egypt. Delivers the resolution and accuracy to troubleshoot motor drives, plant automation, and power distribution.',
    features: [
      'Unique function for accurate voltage and frequency measurements on adjustable speed motor drives (VFDs)',
      'Built-in thermometer conveniently allows you to take temperature readings without a separate instrument',
      'Withstands hazardous 8,000 volt spikes caused by load switching and industrial circuit faults',
      'Large digit display with bright, two-level backlight makes it easy to read in dimly lit plant locations'
    ],
    specs: [
      { name: 'Safety Rating', value: 'CAT IV 600V / CAT III 1000V' },
      { name: 'True RMS', value: 'AC Voltage and Current' },
      { name: 'Bandwidth', value: '20 kHz' },
      { name: 'Display Counts', value: '20,000 counts' },
      { name: 'Calibration', value: 'Factory Calibration Certificate Included' }
    ],
    tags: ['True-RMS', 'Industrial Grade', 'Fluke Benchmark'],
    warranty: 'Lifetime Limited Commercial Warranty',
    weight: '0.6 kg',
    certifications: ['CAT IV 600V', 'CAT III 1000V', 'CE', 'ISO 17025'],
    featured: true,
    bestSeller: true
  },
  {
    id: 'frg-104',
    sku: 'WLD-MIL-220M',
    name: 'Miller Electric Multimatic 220 AC/DC Multi-Process Welder',
    brand: 'Miller Electric',
    category: 'welding',
    price: 115000.00,
    originalPrice: 128000.00,
    stock: 6,
    lowStockThreshold: 3,
    inStock: true,
    rating: 4.95,
    reviewCount: 47,
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'All-process industrial welding powerhouse: MIG, flux-cored, DC TIG, DC Stick, and AC TIG for aluminum welding with Auto-Set Elite technology. Suitable for 220V/380V Egyptian workshop power grids.',
    features: [
      'All-in-one Multi-Process: MIG, AC/DC TIG, Flux-Cored, and Stick',
      'Auto-Set Elite automatically provides predefined weld parameters for your wire/rod thickness',
      'Color LCD screen with intuitive interface guides you step-by-step',
      'QuickTech technology automatically switches weld mode when you pull the MIG trigger or foot pedal'
    ],
    specs: [
      { name: 'Processes', value: 'MIG, Flux-Cored, AC/DC TIG, Stick' },
      { name: 'Input Voltage', value: '220V Single Phase / Dual Voltage Support' },
      { name: 'Duty Cycle', value: '120A at 24V, 60% / 200A at 24V, 20%' },
      { name: 'Welding Amperage', value: '20 - 230 Amps' },
      { name: 'Weight', value: '25.4 kg (56 lbs)' }
    ],
    tags: ['AC/DC TIG', 'MIG', 'Multi-Process', 'Pro Rig'],
    warranty: '3-Year Miller True Blue Warranty',
    weight: '25.4 kg',
    certifications: ['CE Certified', 'ISO 9001:2015', 'EOS'],
    featured: true,
    bestSeller: false
  },
  {
    id: 'frg-105',
    sku: 'SFT-3M-6500QL',
    name: '3M Rugged Comfort Quick Latch Half Facepiece Reusable Respirator',
    brand: '3M Safety',
    category: 'safety-gear',
    price: 1450.00,
    originalPrice: 1700.00,
    stock: 145,
    lowStockThreshold: 20,
    inStock: true,
    rating: 4.85,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Designed for dusty construction sites, cement factories, and petrochemical plants across Egypt. Features a proprietary Quick Latch mechanism for easy drop-down.',
    features: [
      'Quick Latch drop down mechanism for rapid on/off when stepping out of contaminated zones',
      'Resilient silicone faceseal provides comfort, durability and stability in high heat',
      'Low profile half facepiece design offers a wide field of view and compatibility with welding shields',
      '3M Cool Flow Valve helps reduce heat and moisture build-up inside facepiece'
    ],
    specs: [
      { name: 'Material', value: 'Resilient High-Heat Silicone' },
      { name: 'Harness Type', value: '4-Point Quick Latch' },
      { name: 'Connection Type', value: '3M Bayonet Filter System' },
      { name: 'Compliance', value: 'NIOSH / CE EN 140 Approved' },
      { name: 'Size', value: 'Medium / Large' }
    ],
    tags: ['Quick Latch', 'NIOSH Approved', 'Silicone Seal'],
    warranty: '1-Year Official 3M Egypt Warranty',
    weight: '0.22 kg',
    certifications: ['NIOSH 42 CFR 84', 'EN 140:1998', 'CE'],
    featured: false,
    bestSeller: true
  },
  {
    id: 'frg-106',
    sku: 'PNU-IR-2235TiMAX',
    name: 'Ingersoll Rand 1/2" Drive Titanium Duty Air Impact Wrench',
    brand: 'Ingersoll Rand',
    category: 'pneumatics',
    price: 14200.00,
    originalPrice: 16000.00,
    stock: 14,
    lowStockThreshold: 5,
    inStock: true,
    rating: 4.9,
    reviewCount: 168,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Punches out 1,350 ft-lbs (1,830 Nm) of nut-busting torque with a titanium hammer case and composite housing that stands up to heavy fleet maintenance and manufacturing plants.',
    features: [
      '1,830 Nm (1,350 ft-lbs) Nut-Busting Torque powered by twin-hammer impact mechanism',
      'Titanium hammer case is lightweight yet provides unmatched durability',
      'Finely tuned twin-hammer mechanism maximizes power-to-weight ratio',
      'One-handed forward/reverse control with 4-position power regulator'
    ],
    specs: [
      { name: 'Max Torque (Reverse)', value: '1,260 Nm (930 ft-lbs)' },
      { name: 'Nut-Busting Torque', value: '1,830 Nm (1,350 ft-lbs)' },
      { name: 'Drive Size', value: '1/2" Square with Friction Ring' },
      { name: 'Free Speed', value: '8,500 RPM' },
      { name: 'Air Inlet', value: '1/4" NPT / BSP Standard' }
    ],
    tags: ['1830 Nm', 'Titanium Case', 'Pneumatic Powerhouse'],
    warranty: '2-Year Commercial Warranty',
    weight: '2.1 kg',
    featured: true,
    bestSeller: true
  },
  {
    id: 'frg-107',
    sku: 'HND-MIT-500196',
    name: 'Mitutoyo 500-196-30 Advanced Onsite Sensor (AOS) Absolute Digimatic Caliper 0-150mm',
    brand: 'Mitutoyo',
    category: 'hand-tools',
    price: 5600.00,
    originalPrice: 6400.00,
    stock: 42,
    lowStockThreshold: 10,
    inStock: true,
    rating: 4.98,
    reviewCount: 480,
    images: [
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Standard caliper for precision CNC machining and mold making. Equipped with electromagnetic induction AOS sensor offering IP67 resistance to water, oil, and coolant contamination.',
    features: [
      'AOS (Advanced Onsite Sensor) patented induction encoder resists dirt, coolant, and workshop grit',
      'Absolute scale retains origin setting for the life of the battery (up to 3.5 years normal usage)',
      'High-contrast LCD display eliminates reading errors in high ambient shop lighting',
      'Carbide-tipped outside and inside measuring jaws with smooth thumb roller'
    ],
    specs: [
      { name: 'Range', value: '0 to 150mm (0 to 6")' },
      { name: 'Resolution', value: '0.01mm (0.0005")' },
      { name: 'Accuracy', value: '±0.02mm' },
      { name: 'Data Output', value: 'Optional SPC Output' },
      { name: 'Protection Level', value: 'IP67 Dust & Coolant Proof' }
    ],
    tags: ['AOS Sensor', '0.01mm Accuracy', 'Japan Made'],
    warranty: '1-Year Factory Calibration Guarantee',
    weight: '0.17 kg',
    certifications: ['NIST Traceable', 'ISO/IEC 17025'],
    featured: false,
    bestSeller: true
  },
  {
    id: 'frg-108',
    sku: 'MCH-WLT-650HD',
    name: 'Wilton 6-1/2" Industrial Tradesman Heavy-Duty Bench Vise with Swivel Base',
    brand: 'Wilton',
    category: 'machinery',
    price: 24500.00,
    originalPrice: 27500.00,
    stock: 8,
    lowStockThreshold: 3,
    inStock: true,
    rating: 4.9,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cast from 60,000 PSI ductile iron. Designed with a fully enclosed spindle and nut to keep out chips, slag, and moisture for industrial workshops.',
    features: [
      '60,000 PSI ductile iron casting delivers twice the strength of gray cast iron vises',
      'Enclosed precision spindle assembly keeps lubricants in and contaminants out forever',
      '360-degree swivel base with dual lockdown pins for rigid clamping',
      'Replaceable hardened steel serrated top jaws and pipe jaws'
    ],
    specs: [
      { name: 'Jaw Width', value: '165mm (6-1/2")' },
      { name: 'Jaw Opening', value: '165mm' },
      { name: 'Throat Depth', value: '102mm' },
      { name: 'Pipe Capacity', value: '6mm to 90mm' },
      { name: 'Tensile Strength', value: '60,000 PSI Ductile Iron' }
    ],
    tags: ['60k PSI Ductile', 'Enclosed Spindle', 'Lifetime Warranty'],
    warranty: 'Wilton Lifetime Guarantee',
    weight: '32.2 kg',
    featured: true,
    bestSeller: false
  },
  {
    id: 'frg-109',
    sku: 'FST-SMP-1250B',
    name: 'Simpson Strong-Tie Titen HD M12 x 125mm Heavy-Duty Concrete Screw Anchor (Box of 20)',
    brand: 'Simpson Strong-Tie',
    category: 'fasteners',
    price: 1250.00,
    originalPrice: 1450.00,
    stock: 75,
    lowStockThreshold: 15,
    inStock: true,
    rating: 4.8,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-strength structural screw anchor for cracked and uncracked concrete foundations. Used extensively in industrial plant erection and rack installation.',
    features: [
      'Qualified for static and seismic loading conditions in cracked & uncracked concrete',
      'Thread design undercuts smooth concrete surface for supreme shear and pullout strength',
      'Removable - ideal for temporary plant installations and fixture anchoring',
      'Hex washer head requires no separate washer and leaves a clean profile'
    ],
    specs: [
      { name: 'Size', value: 'M12 Diameter x 125mm Length' },
      { name: 'Quantity', value: 'Box of 20' },
      { name: 'Drive Size', value: '19mm Hex Socket' },
      { name: 'Drill Bit Size', value: '12mm Carbide Tip' },
      { name: 'Code Approval', value: 'ETA / ICC-ES Approved' }
    ],
    tags: ['Seismic Rated', 'Concrete Anchor', 'High Tensile'],
    warranty: 'Manufacturer Code Guarantee',
    weight: '3.7 kg',
    certifications: ['ETA-15/0732', 'CE Mark'],
    featured: false,
    bestSeller: false
  },
  {
    id: 'frg-110',
    sku: 'PWR-MLW-2767',
    name: 'Milwaukee M18 FUEL 1/2" High Torque Impact Wrench with Friction Ring',
    brand: 'Milwaukee',
    category: 'power-tools',
    price: 12800.00,
    originalPrice: 14500.00,
    stock: 26,
    lowStockThreshold: 8,
    inStock: true,
    rating: 4.92,
    reviewCount: 388,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Eliminates the need for pneumatic compressors by delivering 1,898 Nm of nut-busting torque in a cordless system built for heavy equipment maintenance.',
    features: [
      'POWERSTATE brushless motor delivers maximum torque and 2X longer motor life',
      'REDLINK PLUS intelligence prevents damage to tool and battery from overload or overheating',
      '4-Mode DRIVE CONTROL with Bolt Removal mode for maximum fastener removal speed',
      'Premium rubber overmold resists corrosive industrial chemicals'
    ],
    specs: [
      { name: 'Fastening Torque', value: '1,356 Nm (1,000 ft-lbs)' },
      { name: 'Nut-Busting Torque', value: '1,898 Nm (1,400 ft-lbs)' },
      { name: 'Anvil Type', value: '1/2" Friction Ring' },
      { name: 'RPM Range', value: '0-550 / 0-1,400 / 0-1,750 RPM' },
      { name: 'Battery System', value: 'M18 REDLITHIUM' }
    ],
    tags: ['1898 Nm', 'M18 Fuel', 'Brushless'],
    warranty: '3-Year Official Warranty',
    weight: '2.68 kg',
    featured: true,
    bestSeller: true
  },
  {
    id: 'frg-111',
    sku: 'SFT-HON-FH900',
    name: 'Honeywell North Hard Hat with Integrated Face Shield & Ratchet Suspension',
    brand: 'Honeywell',
    category: 'safety-gear',
    price: 1850.00,
    originalPrice: 2200.00,
    stock: 58,
    lowStockThreshold: 12,
    inStock: true,
    rating: 4.75,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'ANSI Type 1 Class E safety helmet with retractable polycarbonate face shield for dual head and face impact protection on Egyptian industrial sites.',
    features: [
      'High-density polyethylene (HDPE) shell withstands heavy top impact and 20,000V dielectric rating',
      '6-Point ratchet suspension with moisture-wicking brow pad for all-day comfort in warm climate',
      'Anti-fog, anti-scratch retractable clear face shield rotates up inside shell when not in use',
      'Accessory slots for hearing protection earmuffs and communications gear'
    ],
    specs: [
      { name: 'Shell Material', value: 'HDPE High Density Polyethylene' },
      { name: 'Classification', value: 'ANSI/ISEA Z89.1 Type 1, Class E & EN 397' },
      { name: 'Face Shield', value: 'EN 166 / ANSI Z87.1+ High Impact' },
      { name: 'Suspension', value: '6-Point Wheel Ratchet' }
    ],
    tags: ['Class E Dielectric', 'EN 397', 'Retractable Shield'],
    warranty: '1-Year Commercial Warranty',
    weight: '0.64 kg',
    certifications: ['EN 397', 'ANSI Z89.1-2014', 'CE'],
    featured: false,
    bestSeller: false
  },
  {
    id: 'frg-112',
    sku: 'WLD-LNC-VIKING',
    name: 'Lincoln Electric Viking 3350 Auto-Darkening Welding Helmet 4C Lens',
    brand: 'Lincoln Electric',
    category: 'welding',
    price: 11900.00,
    originalPrice: 13500.00,
    stock: 19,
    lowStockThreshold: 6,
    inStock: true,
    rating: 4.96,
    reviewCount: 174,
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Industry-leading 4C lens technology provides true-color optical clarity with a massive 12.5 square inch viewing area and 1/1/1/1 optical rating for master fabricators.',
    features: [
      '4C Lens Technology delivers clear view of the weld puddle with reduced lime green hue',
      'Extra large 95 x 85mm viewing area with external grind mode button',
      'Pivot-style X6 headgear distributes weight across 6 contact points for neck relief',
      '4 arc sensors with ultra-fast 1/25,000 second switching speed from light to dark'
    ],
    specs: [
      { name: 'Optical Clarity', value: '1/1/1/1 (Highest possible rating)' },
      { name: 'View Size', value: '95 x 85 mm (12.5 sq. in.)' },
      { name: 'Shade Range', value: 'DIN 5-13 with Grind Mode (Shade 3.5)' },
      { name: 'Switching Speed', value: '1/25,000 sec' },
      { name: 'Sensors', value: '4 Independent Arc Sensors' }
    ],
    tags: ['4C Technology', '1/1/1/1 Clarity', 'X6 Headgear'],
    warranty: '3-Year Official Agent Warranty',
    weight: '0.59 kg',
    certifications: ['CE EN379', 'ANSI Z87.1', 'ISO 9001'],
    featured: true,
    bestSeller: false
  }
];

export const INITIAL_USER: User = {
  id: 'usr-901',
  fullName: 'Eng. Ahmed Mansour',
  email: 'ahmed.mansour@elsewedy-eng.eg',
  phone: '+20 10 2345 8901',
  company: 'El Sewedy Heavy Engineering & Contracting SAE',
  jobTitle: 'Senior Maintenance & Operations Engineer',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  savedAddresses: [
    {
      id: 'addr-1',
      title: '10th of Ramadan Plant #4 (Primary Workshop)',
      fullName: 'Eng. Ahmed Mansour (Attn: Receiving Bay B3)',
      company: 'El Sewedy Heavy Engineering & Contracting SAE',
      street: 'Industrial Zone B3, Plot 18',
      buildingNumber: 'Building 18',
      apartmentOrSuite: 'Bay B-12',
      landmark: 'Opposite Egyptian Steel Complex',
      city: '10th of Ramadan (العاشر من رمضان)',
      governorate: 'Sharqia - 10th of Ramadan (الشرقية - العاشر من رمضان)',
      state: 'Sharqia',
      postalCode: '44629',
      country: 'Egypt',
      phone: '+20 10 2345 8901',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: '6th of October Logistics Hub',
      fullName: 'Tarek El-Hawary / Tech Ops',
      company: 'El Sewedy Distribution Center',
      street: '4th Industrial Zone, Central Logistics Blvd',
      buildingNumber: 'Warehouse 42',
      apartmentOrSuite: 'Dock 4',
      landmark: 'Near Juhayna Square',
      city: '6th of October City (السادس من أكتوبر)',
      governorate: 'Giza (الجيزة)',
      state: 'Giza',
      postalCode: '12566',
      country: 'Egypt',
      phone: '+20 11 8904 4412',
      isDefault: false
    }
  ],
  preferences: {
    orderUpdatesEmail: true,
    orderUpdatesSms: true,
    promotionalOffers: false,
    inventoryAlerts: true
  }
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'FRG-EG-90210',
    createdAt: '2026-08-28T14:32:00Z',
    estimatedDelivery: '2026-09-01',
    status: 'Shipped',
    items: [
      {
        productId: 'frg-101',
        sku: 'PWR-DW-996B',
        name: 'DeWalt 20V MAX XR Brushless 3-Speed Hammerdrill',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        price: 9850.00,
        quantity: 2
      },
      {
        productId: 'frg-105',
        sku: 'SFT-3M-6500QL',
        name: '3M Rugged Comfort Quick Latch Half Facepiece Reusable Respirator',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        price: 1450.00,
        quantity: 4
      },
      {
        productId: 'frg-107',
        sku: 'HND-MIT-500196',
        name: 'Mitutoyo 500-196-30 Advanced Onsite Sensor (AOS) Absolute Digimatic Caliper 0-150mm',
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
        price: 5600.00,
        quantity: 1
      }
    ],
    shippingAddress: {
      id: 'addr-1',
      title: '10th of Ramadan Plant #4 (Primary Workshop)',
      fullName: 'Eng. Ahmed Mansour',
      company: 'El Sewedy Heavy Engineering & Contracting SAE',
      street: 'Industrial Zone B3, Plot 18',
      buildingNumber: 'Building 18',
      apartmentOrSuite: 'Bay B-12',
      landmark: 'Opposite Egyptian Steel Complex',
      city: '10th of Ramadan (العاشر من رمضان)',
      governorate: 'Sharqia - 10th of Ramadan (الشرقية - العاشر من رمضان)',
      state: 'Sharqia',
      postalCode: '44629',
      country: 'Egypt',
      phone: '+20 10 2345 8901'
    },
    paymentDetails: {
      method: 'card',
      cardLast4: '4242',
      cardBrand: 'Visa Commercial / Meeza',
      billingAddressSameAsShipping: true
    },
    subtotal: 31100.00,
    shipping: 0.00,
    tax: 4354.00,
    discount: 1500.00,
    total: 33954.00,
    trackingNumber: 'BST-EG-993821004',
    carrier: 'Bosta Heavy Industrial Express Egypt',
    trackingSteps: [
      {
        status: 'Confirmed',
        label: 'Order Verified & Tax Invoice Issued',
        description: 'Electronic tax invoice stamped under Egyptian Tax Authority VAT registration.',
        timestamp: 'Aug 28, 2026 - 14:32 EET',
        completed: true
      },
      {
        status: 'Processing',
        label: 'Picked at 10th of Ramadan Fulfillment Hub',
        description: 'Barcodes verified at FORGE Egypt Central Logistics Center.',
        timestamp: 'Aug 29, 2026 - 08:15 EET',
        completed: true
      },
      {
        status: 'Shipped',
        label: 'In Transit via Bosta Industrial Fleet',
        description: 'Departed 10th of Ramadan Logistics Terminal en route to Giza & Cairo Distribution Hub.',
        timestamp: 'Aug 30, 2026 - 06:40 EET',
        completed: true,
        current: true
      },
      {
        status: 'Out for Delivery',
        label: 'Out for Delivery across Industrial Sector',
        description: 'Scheduled with heavy freight truck dispatch for receiving dock handoff.',
        completed: false
      },
      {
        status: 'Delivered',
        label: 'Delivered & Handed Over',
        description: 'Requires signature and stamp from receiving site engineer.',
        completed: false
      }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'FRG-EG-88419',
    createdAt: '2026-08-14T09:12:00Z',
    estimatedDelivery: '2026-08-17',
    status: 'Delivered',
    items: [
      {
        productId: 'frg-103',
        sku: 'TST-FLK-87V',
        name: 'Fluke 87V Industrial True-RMS Digital Multimeter',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        price: 18900.00,
        quantity: 1
      },
      {
        productId: 'frg-106',
        sku: 'PNU-IR-2235TiMAX',
        name: 'Ingersoll Rand 1/2" Drive Titanium Duty Air Impact Wrench',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        price: 14200.00,
        quantity: 1
      }
    ],
    shippingAddress: {
      id: 'addr-1',
      title: '10th of Ramadan Plant #4 (Primary Workshop)',
      fullName: 'Eng. Ahmed Mansour',
      company: 'El Sewedy Heavy Engineering & Contracting SAE',
      street: 'Industrial Zone B3, Plot 18',
      buildingNumber: 'Building 18',
      apartmentOrSuite: 'Bay B-12',
      landmark: 'Opposite Egyptian Steel Complex',
      city: '10th of Ramadan (العاشر من رمضان)',
      governorate: 'Sharqia - 10th of Ramadan (الشرقية - العاشر من رمضان)',
      state: 'Sharqia',
      postalCode: '44629',
      country: 'Egypt',
      phone: '+20 10 2345 8901'
    },
    paymentDetails: {
      method: 'invoice',
      purchaseOrderNumber: 'PO-SWD-2026-0881',
      billingAddressSameAsShipping: true
    },
    subtotal: 33100.00,
    shipping: 150.00,
    tax: 4634.00,
    discount: 0,
    total: 37884.00,
    trackingNumber: 'BST-EG-881290311',
    carrier: 'Bosta Heavy Industrial Express Egypt',
    trackingSteps: [
      {
        status: 'Confirmed',
        label: 'Purchase Order Approved',
        description: 'Corporate Net 30 terms verified against Commercial Registry #39281.',
        timestamp: 'Aug 14, 2026 - 09:12 EET',
        completed: true
      },
      {
        status: 'Processing',
        label: 'Fulfillment & Calibration Verification',
        description: 'Certified Fluke calibration certificate logged into customer portal.',
        timestamp: 'Aug 15, 2026 - 11:20 EET',
        completed: true
      },
      {
        status: 'Shipped',
        label: 'Dispatched from Central Hub',
        description: 'In transit via Bosta Industrial Priority.',
        timestamp: 'Aug 16, 2026 - 14:00 EET',
        completed: true
      },
      {
        status: 'Delivered',
        label: 'Delivered & Stamped',
        description: 'Signed and stamped by Eng. Mahmoud Fawzy at Workshop Dock 4.',
        timestamp: 'Aug 17, 2026 - 10:14 EET',
        completed: true,
        current: true
      }
    ]
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Eng. Ahmed Mansour',
    email: 'ahmed.mansour@elsewedy-eng.eg',
    phone: '+20 10 2345 8901',
    company: 'El Sewedy Heavy Engineering SAE',
    totalOrders: 14,
    totalSpent: 685400.00,
    lastOrderDate: '2026-08-28',
    joinedDate: '2025-03-12',
    status: 'VIP',
    avatarInitials: 'AM'
  },
  {
    id: 'cust-2',
    name: 'Eng. Karim Abdel-Aziz',
    email: 'k.abdelaziz@orascom-construction.eg',
    phone: '+20 11 4419 9231',
    company: 'Orascom Construction Materials',
    totalOrders: 28,
    totalSpent: 1420000.00,
    lastOrderDate: '2026-08-30',
    joinedDate: '2024-11-04',
    status: 'VIP',
    avatarInitials: 'KA'
  },
  {
    id: 'cust-3',
    name: 'Tarek El-Gammal',
    email: 'tarek@petrojet-maintenance.com',
    phone: '+20 12 8821 2090',
    company: 'Petrojet Technical Services',
    totalOrders: 8,
    totalSpent: 385000.00,
    lastOrderDate: '2026-08-25',
    joinedDate: '2025-06-18',
    status: 'Active',
    avatarInitials: 'TG'
  },
  {
    id: 'cust-4',
    name: 'Dr. Mona El-Shazly',
    email: 'mona@delta-steel-works.eg',
    phone: '+20 15 7736 1102',
    company: 'Delta Steel & Galvanizing Co.',
    totalOrders: 3,
    totalSpent: 195000.00,
    lastOrderDate: '2026-08-19',
    joinedDate: '2026-01-22',
    status: 'Active',
    avatarInitials: 'MS'
  },
  {
    id: 'cust-5',
    name: 'Mahmoud Soliman',
    email: 'm.soliman@alex-shipyard.com',
    phone: '+20 10 9023 3445',
    company: 'Alexandria Shipyard & Marine Engineering',
    totalOrders: 19,
    totalSpent: 940000.00,
    lastOrderDate: '2026-08-29',
    joinedDate: '2024-08-15',
    status: 'VIP',
    avatarInitials: 'MS'
  }
];

export const INITIAL_ADMIN_STATS: AdminDashboardStats = {
  totalRevenue: 48500000.00,
  revenueGrowthPercentage: 18.4,
  pendingOrdersCount: 142,
  lowStockItemsCount: 18,
  totalCustomersCount: 1840,
  newCustomersCount: 84,
  totalProductsCount: 3509
};
