/**
 * ShopEase - Product Catalog Data & Rendering Module
 * Responsible for product definitions, filtering, search, and DOM rendering.
 */

const PRODUCTS = [
  {
    id: '1',
    name: 'Sola Pro ANC Studio Headphones',
    tagline: 'Precision acoustic tuning with 40-hour battery life',
    price: 299,
    originalPrice: 349,
    category: 'Audio',
    rating: 4.9,
    reviewCount: 128,
    image: 'assets/images/headphones.jpg',
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
    image: 'assets/images/watch.jpg',
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
    image: 'assets/images/backpack.jpg',
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
    image: 'assets/images/pourover.jpg',
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
    name: 'Lumen Brass Desk Task Lamp',
    tagline: 'Rotational linear dimming with 3000K warm LED guide',
    price: 145,
    originalPrice: 170,
    category: 'Home & Living',
    rating: 4.8,
    reviewCount: 63,
    image: 'assets/images/headphones.jpg',
    description: 'Spun from solid brushed brass, the Lumen Task Lamp produces glare-free diffuse illumination calibrated at 3000K. The rotary knurled brass dial provides continuous linear dimming.',
    features: [
      'Custom linear LED module rated for 50,000 continuous hours',
      'Continuous smooth knurled brass rotary potentiometer',
      'Heavy counterweighted base with felt anti-scratch protection'
    ],
    specs: {
      'Height': '42cm',
      'Base Diameter': '14cm',
      'Color Temperature': '3000K Warm Neutral',
      'Lumens': '650 lm max'
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
    image: 'assets/images/watch.jpg',
    description: 'Milled from a single block of aerospace-grade 6063 aluminum. Equipped with gasket-mounted polycarbonate switch plates and triple-mode wireless connectivity.',
    features: [
      'Gasket mounted architecture with PORON acoustic damping foam',
      'Triple-mode connectivity: Bluetooth 5.1, 2.4GHz low latency, and USB-C',
      'PBT double-shot dye-sublimated keycaps'
    ],
    specs: {
      'Layout': '65% Compact (68 keys)',
      'Case Material': 'CNC 6063 Anodized Aluminum',
      'Battery': '4,000mAh'
    },
    inStock: true,
    isFeatured: false,
    stockCount: 6
  }
];

const CATEGORIES = ['All', 'Audio', 'Accessories', 'Carry', 'Home & Living'];

// Public API
window.ShopEaseProducts = {
  getAll: () => PRODUCTS,
  getById: (id) => PRODUCTS.find((p) => p.id === id) || null,
  getCategories: () => CATEGORIES,
  
  filterProducts: (category = 'All', search = '', sortBy = 'featured', inStockOnly = false) => {
    return PRODUCTS.filter((item) => {
      if (category !== 'All' && item.category !== category) return false;
      if (inStockOnly && !item.inStock) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.reviewCount - a.reviewCount;
    });
  },

  renderCardHTML: (product) => {
    return `
      <article class="product-card" onclick="location.hash = '#/products/${product.id}'">
        <div class="card-image-box">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <button 
            class="quick-add-btn" 
            onclick="event.stopPropagation(); window.ShopEaseCart.add('${product.id}', 1);"
            title="Quick Add to Bag"
            aria-label="Add ${product.name} to bag"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>
        <div class="card-body">
          <div>
            <div class="card-meta">
              <div class="card-meta-left">
                <span class="card-category">${product.category}</span>
                <span>·</span>
                <span>${product.inStock ? 'In Stock' : 'Backorder'}</span>
              </div>
              <span class="tabular-nums">★ ${product.rating}</span>
            </div>
            <h3 class="card-title" style="margin-top: 0.35rem;">${product.name}</h3>
            <p class="card-tagline" style="margin-top: 0.25rem;">${product.tagline}</p>
          </div>
          <div class="card-footer">
            <span class="card-price tabular-nums">$${product.price}</span>
            <span class="card-action-hint">View Details &rarr;</span>
          </div>
        </div>
      </article>
    `;
  }
};
