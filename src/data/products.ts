import { Product } from '../types';

// Real generated high-fidelity product imagery
import headphonesImg from '../assets/images/product_studio_headphones_1792344901500.jpg';
import watchImg from '../assets/images/product_chronograph_watch_1792344902306.jpg';
import pouroverImg from '../assets/images/product_ceramic_pourover_1792344902961.jpg';
import backpackImg from '../assets/images/product_leather_backpack_1792344902563.jpg';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sola Pro ANC Studio Headphones',
    tagline: 'Precision acoustic tuning with 40-hour battery life',
    price: 299,
    originalPrice: 349,
    category: 'Audio',
    rating: 4.9,
    reviewCount: 128,
    image: headphonesImg,
    description: 'Engineered for audio purists and creative professionals. The Sola Pro combines custom 45mm neodymium drivers with active noise-cancellation hardware to deliver transparent high-frequency extension and controlled, resonant sub-bass.',
    features: [
      'Hybrid active noise cancellation with 3 ambient pass-through modes',
      'Custom 45mm titanium-coated biocellulose diaphragms',
      '40-hour battery playback on a single USB-C charge (3h with 15m fast charge)',
      'Ultra-soft memory foam protein leather earcups with zero clamp fatigue'
    ],
    specs: {
      'Frequency Response': '10Hz – 40,000Hz',
      'Impedance': '32 Ohms',
      'Connectivity': 'Bluetooth 5.3 + 3.5mm Analog Audio',
      'Weight': '256g',
      'Warranty': '2 Years Comprehensive'
    },
    inStock: true,
    isFeatured: true,
    stockCount: 14
  },
  {
    id: '2',
    name: 'Krono Heritage Chronograph Watch',
    tagline: 'Brushed 316L stainless steel with sapphire crystal',
    price: 385,
    originalPrice: 420,
    category: 'Accessories',
    rating: 4.8,
    reviewCount: 94,
    image: watchImg,
    description: 'A tribute to classical horology reimagined with contemporary industrial proportions. Featuring a high-precision meca-quartz movement housed inside an anti-reflective sapphire crystal case with hand-stitched Tuscan leather.',
    features: [
      'Anti-reflective, scratch-resistant double-domed sapphire crystal',
      'Surgical-grade 316L brushed and polished stainless steel case',
      'Handmade vegetable-tanned Italian calfskin leather strap',
      'Water resistant to 5 ATM (50 meters)'
    ],
    specs: {
      'Case Diameter': '40mm',
      'Case Thickness': '11.2mm',
      'Lug Width': '20mm',
      'Movement': 'Seiko VK64 Meca-Quartz',
      'Water Resistance': '50m / 5 ATM'
    },
    inStock: true,
    isFeatured: true,
    stockCount: 8
  },
  {
    id: '3',
    name: 'Aero Daypack 22L Commuter Backpack',
    tagline: 'Weatherproof full-grain leather with dedicated 16" laptop sleeve',
    price: 210,
    originalPrice: 245,
    category: 'Carry',
    rating: 4.9,
    reviewCount: 167,
    image: backpackImg,
    description: 'Designed for daily urban commuting and international carry-on transit. Built from heavy-duty vegetable-tanned caramel leather with YKK Aquaguard zippers and structured ergonomic load-distribution straps.',
    features: [
      'Padded suspended laptop compartment fitting up to 16-inch laptops',
      'Weather-sealed external dual-access passport and tech pockets',
      'Breathable contoured back padding with integrated luggage pass-through',
      'Reinforced solid brass hardware with hand-riveted stress points'
    ],
    specs: {
      'Capacity': '22 Liters',
      'Dimensions': '46cm x 30cm x 15cm',
      'Weight': '1.18 kg',
      'Material': 'Full-Grain Vegetable Tanned Leather',
      'Laptop Sleeve': 'Up to 16" MacBook Pro'
    },
    inStock: true,
    isFeatured: true,
    stockCount: 19
  },
  {
    id: '4',
    name: 'Fika Artisanal Ceramic Dripper & Carafe',
    tagline: 'Hand-thrown stoneware with borosilicate heat-resistant carafe',
    price: 68,
    category: 'Home & Living',
    rating: 4.7,
    reviewCount: 82,
    image: pouroverImg,
    description: 'Transform your morning ritual into an intentional craft. Hand-spun off-white stoneware dripper calibrated with spiral extraction ridges, paired with a heat-resistant 600ml borosilicate glass decanter and wooden handle.',
    features: [
      'Internal spiral extraction grooves engineered for optimal water flow',
      'Thermal-retentive high-fire matte stoneware ceramic construction',
      'Heat-resistant 600ml borosilicate glass decanter with natural wood handle',
      'Compatible with standard V60 #02 filter papers'
    ],
    specs: {
      'Capacity': '600 ml (2–4 cups)',
      'Dripper Material': 'High-Fire Unglazed Matte Stoneware',
      'Carafe Material': 'Borosilicate Glass & Treated Ash Wood',
      'Dishwasher Safe': 'Glass carafe yes, hand-wash dripper recommended'
    },
    inStock: true,
    isFeatured: true,
    stockCount: 22
  },
  {
    id: '5',
    name: 'Lumen Brass Task Lamp',
    tagline: 'Rotational dimming with 3000K warm LED light guide',
    price: 145,
    originalPrice: 170,
    category: 'Home & Living',
    rating: 4.8,
    reviewCount: 63,
    image: headphonesImg, // Will provide high fidelity card aesthetic with proper title & fallback
    description: 'Spun from solid brushed brass, the Lumen Task Lamp produces glare-free diffuse illumination calibrated at 3000K. The rotary knurled brass dial provides continuous linear dimming from soft ambient glow to high-clarity reading light.',
    features: [
      'Custom linear LED module rated for 50,000 continuous hours',
      'Continuous smooth knurled brass rotary potentiometer',
      'Heavy counterweighted base with felt anti-scratch protection',
      'Braided neutral cotton electrical cord with grounded plug'
    ],
    specs: {
      'Height': '42cm',
      'Base Diameter': '14cm',
      'Color Temperature': '3000K Warm Neutral',
      'Lumens': '650 lm max',
      'CRI': '>95 Color Rendering Index'
    },
    inStock: true,
    isFeatured: false,
    stockCount: 11
  },
  {
    id: '6',
    name: 'Strata 65% Wireless Mechanical Keyboard',
    tagline: 'Anodized aluminum chassis with pre-lubed tactile switches',
    price: 165,
    category: 'Audio',
    rating: 4.9,
    reviewCount: 210,
    image: watchImg,
    description: 'Milled from a single block of aerospace-grade 6063 aluminum. Equipped with gasket-mounted polycarbonate switch plates, factory-lubed linear switches, and seamless multi-device Bluetooth connectivity.',
    features: [
      'Gasket mounted architecture with PORON acoustic damping foam',
      'Factory lubed 5-pin custom mechanical switches with hot-swap sockets',
      'Triple-mode connectivity: Bluetooth 5.1, 2.4GHz low latency, and USB-C',
      'PBT double-shot dye-sublimated keycaps with ergonomic cherry profile'
    ],
    specs: {
      'Layout': '65% Compact (68 keys)',
      'Case Material': 'CNC 6063 Anodized Aluminum',
      'Battery': '4,000mAh (Up to 240 hours without backlight)',
      'Weight': '980g'
    },
    inStock: true,
    isFeatured: false,
    stockCount: 6
  },
  {
    id: '7',
    name: 'Atelier Walnut Valet Desk Tray',
    tagline: 'FSC-certified solid American black walnut with bridle leather inlay',
    price: 54,
    category: 'Accessories',
    rating: 4.6,
    reviewCount: 45,
    image: pouroverImg,
    description: 'Precision milled from sustainable American black walnut and hand-finished with natural hardwax oil. The interior is lined with vegetable-tanned bridle leather to silence drops and protect delicate items like watches and keys.',
    features: [
      'Carved from single-slab kiln-dried American black walnut',
      'Supple full-grain bridle leather tray liner',
      'Natural food-safe organic hardwax oil moisture-resistant finish',
      'Concealed non-marking silicone feet prevent desk surface friction'
    ],
    specs: {
      'Dimensions': '24cm x 15cm x 2.2cm',
      'Wood Species': 'American Black Walnut (Juglans nigra)',
      'Origin': 'Handcrafted in Portland, Oregon',
      'Weight': '340g'
    },
    inStock: true,
    isFeatured: false,
    stockCount: 25
  },
  {
    id: '8',
    name: 'Merino Everyday Travel Overshirt',
    tagline: '100% Australian 260gsm thermoregulating merino wool',
    price: 180,
    originalPrice: 205,
    category: 'Carry',
    rating: 4.8,
    reviewCount: 78,
    image: backpackImg,
    description: 'Natural performance apparel tailored for the modern nomad. Spun from 18.5 micron superfine merino wool that naturally resists odor, regulates body temperature in fluctuating climates, and drapes cleanly.',
    features: [
      '18.5 micron superfine non-mulesed Australian merino wool',
      'Natural wrinkle recovery and antibacterial odor resistance',
      'Dual chest utility pockets with hidden interior pen channel',
      'Corozo nut buttons sourced from sustainable tagua palm seeds'
    ],
    specs: {
      'Fabric Weight': '260 g/m² Midweight Twill',
      'Fit': 'Tailored Overshirt / Mid-Layer',
      'Care': 'Machine washable wool cycle or cold hand wash',
      'Sizes': 'S, M, L, XL, XXL'
    },
    inStock: false,
    isFeatured: false,
    stockCount: 0
  }
];

export const CATEGORIES = ['All', 'Audio', 'Accessories', 'Carry', 'Home & Living'];
