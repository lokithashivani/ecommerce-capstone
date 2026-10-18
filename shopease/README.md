# ShopEase — E-Commerce Product Catalog

A comprehensive, modular Web Development Capstone Project demonstrating modern frontend architecture, zero-dependency client-side hash routing, and web performance optimization.

---

## 📌 Project Overview

**ShopEase** is a production-ready e-commerce catalog featuring:
- **Homepage**: Architectural campaign hero banner with direct call-to-actions and featured collection highlights.
- **Product Catalog**: Responsive multi-column grid with live search, category filtering tabs, price/rating sorting, and in-stock toggles.
- **Product Detail View (PDP)**: Contiguous purchase module, image gallery, technical specifications table, stock indicators, and quantity steppers.
- **Interactive Shopping Bag**: Itemized cart with local persistence, quantity adjustment, coupon code redemption (`STUDENT20`, `SHOPEASE10`), free shipping threshold tracker, and order checkout with confirmation receipts.
- **Client-Side Hash Routing**: Instant view navigation via `window.location.hash` with back/forward history support and zero page reloads.

---

## 📁 Project Architecture & File Hierarchy

ShopEase enforces strict separation of concerns across dedicated files:

```
shopease/
│
├── index.html          # Main webpage semantic DOM structure & execution order
├── css/
│   └── style.css       # Layout grid, 60-30-10 palette, fluid typography, zero-pill discipline
├── js/
│   ├── app.js          # App controller orchestrating views, search, and checkout
│   ├── products.js     # Catalog repository, search/filtering logic, and card HTML renderer
│   ├── router.js       # Client-side hash router (location.hash) with zero reload latency
│   └── cart.js         # Cart state, quantities, localStorage sync, and coupon calculations
├── assets/
│   └── images/         # High-resolution optimized product & hero imagery
└── README.md           # Production-ready documentation & deployment instructions
```

### Module Responsibilities

| File | Purpose |
| :--- | :--- |
| **`index.html`** | Houses semantic landmarks (`<header>`, `<main id="app">`, `<footer>`) and connects stylesheet with modular JavaScript scripts in execution order. |
| **`css/style.css`** | Implements the **60-30-10 color rule** (60% stone canvas, 30% white surfaces, 10% dark accent), fluid typography using `Plus Jakarta Sans`, and **zero-pill discipline**. |
| **`js/products.js`** | Single source of truth for the product catalog. Provides `filterProducts()` for multi-condition filtering and `renderCardHTML()` for template generation. |
| **`js/cart.js`** | Encapsulates cart state in `localStorage`. Handles increment/decrement logic, coupon codes (`STUDENT20`), and free shipping thresholds ($150 target). |
| **`js/router.js`** | Watches `window.location.hash` and the `hashchange` event. Parses paths and parameters (e.g. `#/products/:id`) without server requests. |
| **`js/app.js`** | Wires up event listeners, mounts active view templates into `<main id="app">`, and handles search input and checkout dialogs. |

---

## 🚦 Client-Side Routing Implementation

Client-side routing allows users to navigate across different views seamlessly without triggering full-page browser reloads:

| Route Hash | View Rendered | User Action / Content |
| :--- | :--- | :--- |
| `#/` | **Home Page** | Campaign hero banner, trust signals, and featured flagship collection |
| `#/products` | **Catalog Page** | Full responsive grid with category tabs, search input, price sorting, and stock toggle |
| `#/products/1` | **Product Detail (PDP)** | Gallery stage, technical specifications table, quantity selector, and buy CTA |
| `#/cart` | **Shopping Bag** | Itemized cart summary, free shipping meter, coupon redemption, and checkout |

### Routing Mechanism
```javascript
// js/router.js
window.addEventListener('hashchange', () => {
  const hash = window.location.hash || '#/';
  const routeHandler = routes[hash] || routes['#/'];
  routeHandler();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

---

## ⚡ Performance Optimizations (Step 4 Audit)

ShopEase is built to achieve top scores ($\ge 95$) in Google Chrome Lighthouse:

1. **Lazy Loading on Media**: Product images specify `loading="lazy"` to defer loading below-the-fold media until scroll approach.
2. **Zero Layout Shifts (Cumulative Layout Shift = 0)**: Explicit `aspect-ratio: 4/3` and `16/10` containers ensure layout stability before images finish downloading.
3. **Tabular Numerals**: Prices, stock counts, and cart totals use `tabular-nums` (`font-variant-numeric: tabular-nums`) preventing layout jank when digits change.
4. **Zero-Pill Typography Discipline**: Metadata is styled as unboxed text with typographic separators (`·`), reducing DOM element bloat and avoiding candy-badge clichés.
5. **Touch Target Accessibility**: All interactive buttons, tabs, and links maintain $\ge 44\text{px}$ touch targets meeting WCAG AA standards.
6. **Local Persistence**: Cart state persists automatically using browser `localStorage` (`shopease_cart_vanilla_v1`).

---

## 🚀 Production Deployment Guide

Deploy ShopEase to modern cloud platforms with a free tier and instant public SSL URL.

---

### Method A: Deploying to Netlify (Recommended)

Netlify offers the fastest deployment for static and modular web applications.

#### Option 1: Netlify Drag & Drop (Zero Configuration)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and log in.
2. Drag and drop the `shopease/` folder directly into the browser upload area.
3. Netlify will publish your site in seconds and provide a live URL (e.g., `https://shopease-store.netlify.app`).

#### Option 2: Netlify Git Continuous Deployment
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial ShopEase catalog release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In the [Netlify Dashboard](https://app.netlify.com), click **Add new site** > **Import an existing project**.
3. Select **GitHub** and authorize your repository.
4. Configure Build Settings:
   - **Base directory**: `shopease`
   - **Build command**: *(leave blank for static, or `npm run build` for Vite)*
   - **Publish directory**: `shopease` *(or `dist` if building via Vite)*
5. Click **Deploy Site**. Netlify will build and deploy your site with automatic HTTPS.

#### Option 3: Netlify CLI
```bash
npm install -g netlify-cli
cd shopease
netlify deploy --prod --dir=.
```

---

### Method B: Deploying to Vercel

Vercel provides edge delivery with instant previews and global CDN caching.

#### Option 1: Vercel Web Dashboard (GitHub Import)
1. Push your code to GitHub.
2. Log in to [vercel.com](https://vercel.com) and click **Add New...** > **Project**.
3. Import your GitHub repository.
4. In the **Project Settings**:
   - **Root Directory**: Click *Edit* and select `shopease` (or root if using the Vite bundle).
   - **Framework Preset**: Select `Other` (or `Vite` if deploying root).
   - **Build Command**: *(leave empty for static)*
   - **Output Directory**: *(leave empty for static, or `dist` for Vite)*
5. Click **Deploy**. Vercel will output a live domain (e.g. `https://shopease-catalog.vercel.app`).

#### Option 2: Vercel CLI
```bash
npm install -g vercel
# From project directory
vercel --prod
```
When prompted:
- Set up and deploy: **Yes**
- Which scope: *(select your account)*
- Link to existing project: **No**
- Project name: `shopease-catalog`
- In which directory is your code located: `./shopease` (or `./`)
- Want to modify settings: **No**

---

### Method C: Deploying to Render

Render is a modern cloud hosting platform with free SSL, automated Git deployments, and global CDN.

#### Step-by-Step Instructions:
1. Push your project to GitHub or GitLab.
2. Log in to the [Render Dashboard](https://dashboard.render.com).
3. Click the **New +** button in the top navigation and select **Static Site**.
4. Connect your GitHub repository.
5. Configure the site settings:
   - **Name**: `shopease-catalog`
   - **Branch**: `main`
   - **Root Directory**: `shopease` *(or leave blank for root)*
   - **Build Command**: *(leave blank for static HTML/JS/CSS, or `npm run build` for Vite)*
   - **Publish Directory**: `.` *(or `dist` if using Vite build)*
6. Click **Create Static Site**.
7. Render will provision the build and output your public URL (e.g., `https://shopease-catalog.onrender.com`).

---

## 🛠️ Local Development & Testing

### Option 1: Run with any local HTTP server
Because `shopease/` uses native ES modules and hash routing, it can be tested with any lightweight server:
```bash
# Using Python 3
cd shopease
python3 -m http.server 8000

# Or using Node.js npx serve
npx serve shopease -p 8000
```
Open `http://localhost:8000` in your web browser.

### Option 2: Run with Vite Dev Server
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 🏷️ Test Coupons & Checkout Flow

- **`STUDENT20`**: Applies a 20% discount on the entire cart subtotal.
- **`SHOPEASE10`**: Applies a 10% discount on orders.
- **Free Shipping Threshold**: Orders with a subtotal $\ge \$150$ automatically receive free delivery.
- **Checkout Authorization**: Click *Checkout* in the shopping bag to review the total and place an order. An order ID (e.g. `SE-482910`) and confirmation receipt will be generated.

---

## 📊 Chrome Lighthouse Audit Verification

To demonstrate compliance with the performance criteria:
1. Open Google Chrome in an **Incognito Window** (to disable extensions).
2. Navigate to your deployed public URL or local server.
3. Open Developer Tools (`F12` or `Ctrl + Shift + I`).
4. Select the **Lighthouse** tab.
5. Choose **Device**: *Mobile* or *Desktop*, and select **Categories**: *Performance, Accessibility, Best Practices, SEO*.
6. Click **Analyze page load**.
7. Observe scores exceeding **95+** across all categories thanks to native lazy loading, zero layout shifts, clean markup, and zero unnecessary scripts.
