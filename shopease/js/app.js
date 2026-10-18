/**
 * ShopEase - Main Application Controller
 * Initializes views, coordinates router, product catalog, cart, and UI interactions.
 */

window.ShopEaseApp = {
  currentCategory: 'All',
  searchQuery: '',
  sortBy: 'featured',
  inStockOnly: false,

  init: () => {
    // Register Hash Routes
    window.ShopEaseRouter.register('#/', window.ShopEaseApp.renderHome);
    window.ShopEaseRouter.register('#/products', window.ShopEaseApp.renderProducts);
    window.ShopEaseRouter.register('#/products/:id', window.ShopEaseApp.renderProductDetail);
    window.ShopEaseRouter.register('#/cart', window.ShopEaseApp.renderCart);

    // Initialize router and cart badge
    window.ShopEaseRouter.init();
    window.ShopEaseCart.updateBadge();
  },

  // 1. Home View
  renderHome: () => {
    const appEl = document.getElementById('app');
    const featured = window.ShopEaseProducts.getAll().filter((p) => p.isFeatured);

    appEl.innerHTML = `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container hero-grid">
          <div>
            <span class="hero-kicker">Curated Collection · 2026 Edition</span>
            <h1 class="hero-title">Essential tools and craft objects for considered living.</h1>
            <p class="hero-desc">
              ShopEase combines acoustically balanced audio, precision horology, handcrafted leather goods, and artisanal tableware. Built for daily durability.
            </p>
            <div class="hero-actions">
              <a href="#/products" class="btn-primary">Browse Catalog &rarr;</a>
            </div>
            <div class="trust-strip">
              <div class="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 17h4V5H2v12h3m11 0h3l3-3v-4h-6v7zM6 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/></svg>
                <span>Free shipping over $150</span>
              </div>
              <span>·</span>
              <div class="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>2-Year Warranty</span>
              </div>
              <span>·</span>
              <div class="trust-item">
                <span>30-Day Risk-Free Returns</span>
              </div>
            </div>
          </div>
          <div class="hero-media-wrapper">
            <img src="assets/images/hero.jpg" alt="ShopEase Modern Architectural Showroom" />
          </div>
        </div>
      </section>

      <!-- Featured Grid -->
      <section class="container" style="padding: 4rem 1.5rem;">
        <div class="section-header">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; color: var(--text-muted);">Flagship Releases</span>
            <h2 style="font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-top: 0.25rem;">Featured Collection</h2>
          </div>
          <a href="#/products" style="font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); text-decoration: none;">
            View All ${window.ShopEaseProducts.getAll().length} Products &rarr;
          </a>
        </div>
        <div class="product-grid">
          ${featured.map((p) => window.ShopEaseProducts.renderCardHTML(p)).join('')}
        </div>
      </section>
    `;
  },

  // 2. Catalog View
  renderProducts: () => {
    const appEl = document.getElementById('app');
    const categories = window.ShopEaseProducts.getCategories();
    const filtered = window.ShopEaseProducts.filterProducts(
      window.ShopEaseApp.currentCategory,
      window.ShopEaseApp.searchQuery,
      window.ShopEaseApp.sortBy,
      window.ShopEaseApp.inStockOnly
    );

    appEl.innerHTML = `
      <section class="container catalog-section">
        <div class="section-header">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; color: var(--text-muted);">Catalog Directory</span>
            <h2 style="font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-top: 0.25rem;">Browse All Products</h2>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">Filtered by category, price, and stock status.</p>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted);" class="tabular-nums">
            Showing <strong>${filtered.length}</strong> items
          </div>
        </div>

        <!-- Controls Bar -->
        <div class="controls-bar">
          <div class="category-tabs">
            ${categories.map((cat) => `
              <button 
                class="tab-btn ${window.ShopEaseApp.currentCategory === cat ? 'active' : ''}"
                onclick="window.ShopEaseApp.setCategory('${cat}')"
              >
                ${cat}
              </button>
            `).join('')}
          </div>

          <div class="filter-group">
            <div class="search-input-wrapper">
              <input 
                type="text" 
                class="search-input" 
                placeholder="Search products..." 
                value="${window.ShopEaseApp.searchQuery}"
                oninput="window.ShopEaseApp.setSearch(this.value)"
              />
            </div>

            <select class="sort-select" onchange="window.ShopEaseApp.setSort(this.value)">
              <option value="featured" ${window.ShopEaseApp.sortBy === 'featured' ? 'selected' : ''}>Featured First</option>
              <option value="price-asc" ${window.ShopEaseApp.sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-desc" ${window.ShopEaseApp.sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
              <option value="rating" ${window.ShopEaseApp.sortBy === 'rating' ? 'selected' : ''}>Top Rated</option>
            </select>

            <label style="font-size: 0.75rem; font-weight: 500; display: flex; align-items: center; gap: 0.375rem; cursor: pointer;">
              <input 
                type="checkbox" 
                ${window.ShopEaseApp.inStockOnly ? 'checked' : ''}
                onchange="window.ShopEaseApp.setStockOnly(this.checked)"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </div>

        <!-- Grid -->
        ${filtered.length > 0 ? `
          <div class="product-grid">
            ${filtered.map((p) => window.ShopEaseProducts.renderCardHTML(p)).join('')}
          </div>
        ` : `
          <div style="text-align: center; padding: 4rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-strong); border-radius: var(--radius-lg);">
            <p style="font-weight: 600; color: var(--text-primary);">No products match your criteria</p>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">Try clearing your search query or choosing another category.</p>
            <button onclick="window.ShopEaseApp.resetFilters()" class="btn-secondary" style="margin-top: 1rem; font-size: 0.75rem;">Clear All Filters</button>
          </div>
        `}
      </section>
    `;
  },

  setCategory: (cat) => {
    window.ShopEaseApp.currentCategory = cat;
    window.ShopEaseApp.renderProducts();
  },

  setSearch: (q) => {
    window.ShopEaseApp.searchQuery = q;
    window.ShopEaseApp.renderProducts();
  },

  setSort: (s) => {
    window.ShopEaseApp.sortBy = s;
    window.ShopEaseApp.renderProducts();
  },

  setStockOnly: (checked) => {
    window.ShopEaseApp.inStockOnly = checked;
    window.ShopEaseApp.renderProducts();
  },

  resetFilters: () => {
    window.ShopEaseApp.currentCategory = 'All';
    window.ShopEaseApp.searchQuery = '';
    window.ShopEaseApp.sortBy = 'featured';
    window.ShopEaseApp.inStockOnly = false;
    window.ShopEaseApp.renderProducts();
  },

  // 3. Product Details View (PDP)
  renderProductDetail: (id) => {
    const appEl = document.getElementById('app');
    const product = window.ShopEaseProducts.getById(id);

    if (!product) {
      appEl.innerHTML = `
        <div class="container" style="text-align: center; padding: 5rem 0;">
          <h2>Product Not Found</h2>
          <a href="#/products" class="btn-primary" style="margin-top: 1rem;">Back to Catalog</a>
        </div>
      `;
      return;
    }

    appEl.innerHTML = `
      <div class="container pdp-wrapper">
        <a href="#/products" class="pdp-back-btn">&larr; Back to Catalog</a>

        <div class="pdp-grid">
          <!-- Gallery Stage Left -->
          <div class="pdp-gallery">
            <img src="${product.image}" alt="${product.name}" />
          </div>

          <!-- Contiguous Purchase Module Right -->
          <div class="pdp-module">
            <div class="pdp-header">
              <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: var(--text-muted);">${product.category}</span>
              <h1 class="pdp-title">${product.name}</h1>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">${product.tagline}</p>
            </div>

            <div class="pdp-price-row">
              <span class="pdp-price tabular-nums">$${product.price}</span>
              <span style="font-size: 0.75rem; font-weight: 600; color: ${product.inStock ? 'var(--accent-emerald)' : 'var(--accent-amber)'};">
                ${product.inStock ? `In Stock (${product.stockCount} available)` : 'Backorder'}
              </span>
            </div>

            <!-- Quantity & Add Action -->
            <div style="display: flex; gap: 1rem; align-items: center;">
              <div class="qty-control">
                <button class="qty-btn" onclick="const q = document.getElementById('pdp-qty'); q.value = Math.max(1, parseInt(q.value)-1);">-</button>
                <input id="pdp-qty" type="text" value="1" readonly class="qty-val" style="width: 40px; text-align: center; border: none; background: transparent;" />
                <button class="qty-btn" onclick="const q = document.getElementById('pdp-qty'); q.value = parseInt(q.value)+1;">+</button>
              </div>

              <button 
                class="btn-primary" 
                style="flex-grow: 1; justify-content: center;"
                onclick="window.ShopEaseCart.add('${product.id}', parseInt(document.getElementById('pdp-qty').value));"
              >
                Add to Bag
              </button>
            </div>

            <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; margin-top: 0.5rem;">
              ${product.description}
            </p>

            <div>
              <h4 style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Key Features</h4>
              <ul style="font-size: 0.75rem; color: var(--text-secondary); padding-left: 1rem; line-height: 1.6;">
                ${product.features.map((f) => `<li>${f}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <!-- Specifications Table -->
        <div style="margin-top: 3rem; max-width: 700px;">
          <h3 style="font-size: 1.125rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">Technical Specifications</h3>
          <table class="specs-table">
            <tbody>
              ${Object.entries(product.specs).map(([k, v]) => `
                <tr>
                  <td>${k}</td>
                  <td class="tabular-nums">${v}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 4. Shopping Cart View
  renderCart: () => {
    const appEl = document.getElementById('app');
    const items = window.ShopEaseCart.getItems();
    const subtotal = window.ShopEaseCart.getSubtotal();
    const coupon = window.ShopEaseCart.getCoupon();
    const discount = coupon ? Math.round(subtotal * coupon.rate) : 0;
    const shipping = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 15;
    const total = Math.max(0, subtotal - discount + shipping);

    if (items.length === 0) {
      appEl.innerHTML = `
        <div class="container cart-wrapper" style="text-align: center; padding: 5rem 0;">
          <h2 style="font-size: 1.5rem; font-weight: 700;">Your shopping bag is empty</h2>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.5rem;">Explore our curated selection of tools and design objects.</p>
          <a href="#/products" class="btn-primary" style="margin-top: 1.5rem;">Browse Products</a>
        </div>
      `;
      return;
    }

    appEl.innerHTML = `
      <div class="container cart-wrapper">
        <h1 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 2rem;">
          Shopping Bag (${items.length} ${items.length === 1 ? 'item' : 'items'})
        </h1>

        <div class="cart-layout">
          <!-- Item List -->
          <div>
            ${items.map((item) => `
              <div class="cart-item">
                <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img" />
                <div style="flex-grow: 1;">
                  <div style="display: flex; justify-content: space-between; align-items: start;">
                    <h3 style="font-size: 0.9375rem; font-weight: 600;">${item.product.name}</h3>
                    <span class="tabular-nums" style="font-weight: 700;">$${item.product.price * item.quantity}</span>
                  </div>
                  <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">$${item.product.price} each</p>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
                    <div class="qty-control">
                      <button class="qty-btn" onclick="window.ShopEaseCart.updateQty('${item.id}', ${item.quantity - 1})">-</button>
                      <span class="qty-val">${item.quantity}</span>
                      <button class="qty-btn" onclick="window.ShopEaseCart.updateQty('${item.id}', ${item.quantity + 1})">+</button>
                    </div>

                    <button 
                      onclick="window.ShopEaseCart.remove('${item.id}')"
                      style="background: none; border: none; font-size: 0.75rem; color: var(--accent-rose); cursor: pointer;"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Summary Box -->
          <div class="cart-summary-box">
            <h3 style="font-size: 1rem; font-weight: 700; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
              Summary
            </h3>

            <div class="summary-row">
              <span>Subtotal</span>
              <span class="tabular-nums font-semibold">$${subtotal}</span>
            </div>

            <div class="summary-row">
              <span>Shipping</span>
              <span>${shipping === 0 ? '<strong style="color:var(--accent-emerald);">FREE</strong>' : `$${shipping}`}</span>
            </div>

            ${discount > 0 ? `
              <div class="summary-row" style="color: var(--accent-emerald);">
                <span>Discount (${coupon.code})</span>
                <span class="tabular-nums">-$${discount}</span>
              </div>
            ` : ''}

            <div class="summary-row summary-total">
              <span>Total</span>
              <span class="tabular-nums">$${total}</span>
            </div>

            <!-- Coupon Input -->
            <div style="margin-top: 0.5rem;">
              <div style="display: flex; gap: 0.5rem;">
                <input id="coupon-box" type="text" placeholder="Promo code (STUDENT20)" style="flex-grow: 1; padding: 0.4rem 0.6rem; font-size: 0.75rem; border: 1px solid var(--border-strong); border-radius: var(--radius-sm);" />
                <button 
                  onclick="const res = window.ShopEaseCart.applyCoupon(document.getElementById('coupon-box').value); alert(res.message); window.ShopEaseApp.renderCart();"
                  class="btn-secondary" 
                  style="padding: 0.4rem 0.75rem; font-size: 0.75rem;"
                >
                  Apply
                </button>
              </div>
              <p style="font-size: 0.6875rem; color: var(--text-muted); margin-top: 0.375rem;">Tip: Use <strong>STUDENT20</strong> for 20% off!</p>
            </div>

            <button 
              onclick="window.ShopEaseApp.showCheckout(${total})" 
              class="btn-primary" 
              style="width: 100%; justify-content: center; margin-top: 0.5rem;"
            >
              Checkout ($${total})
            </button>
          </div>
        </div>
      </div>
    `;
  },

  showCheckout: (total) => {
    const orderId = `SE-${Math.floor(100000 + Math.random() * 900000)}`;
    const confirmOrder = confirm(`Authorize purchase of $${total}? Click OK to place order #${orderId}`);
    if (confirmOrder) {
      window.ShopEaseCart.clear();
      alert(`Order #${orderId} Confirmed!\n\nThank you for shopping with ShopEase. A receipt has been generated.`);
      location.hash = '#/';
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.ShopEaseApp.init();
});
