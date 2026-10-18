/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { useHashRouter } from './router/useHashRouter';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetail } from './components/ProductDetail';
import { CartView } from './components/CartView';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { CartToast } from './components/CartToast';
import { Footer } from './components/Footer';
import { ArrowRight, Compass, Shield, Sparkles } from 'lucide-react';
import { ProductCard } from './components/ProductCard';

function MainApp() {
  const { route, navigate, isHome, isProducts, isProductDetail, isCart } = useHashRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Determine current active product for detail view
  const currentProduct = route.productId
    ? PRODUCTS.find((p) => p.id === route.productId) || null
    : null;

  const handleSelectProduct = (id: string) => {
    navigate(`#/products/${id}`);
  };

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-stone-900 selection:text-white">
      
      {/* 3-Zone Compliant Navbar */}
      <Navbar
        currentPath={route.path}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router Content */}
      <main className="flex-grow">
        {/* Route: Home (#/) */}
        {isHome && (
          <div>
            <HeroSection
              onExplore={() => navigate('#/products')}
            />

            {/* Featured Collection Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Flagship Releases
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                    Featured Collection
                  </h2>
                </div>
                <button
                  onClick={() => navigate('#/products')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-stone-700 transition-colors"
                >
                  <span>View All {PRODUCTS.length} Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={handleSelectProduct}
                  />
                ))}
              </div>
            </section>

            {/* Design & Engineering Philosophy Section (Anti-Slop Craft Story) */}
            <section className="bg-stone-100/70 border-y border-stone-200 py-16 md:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Material Honesty
                    </span>
                    <h2 
                      className="text-2xl sm:text-3xl font-bold text-stone-900"
                      style={{ textWrap: 'balance' }}
                    >
                      Objects manufactured with intention and longevity.
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      We reject artificial obsolescence. Each item in our catalog uses genuine materials—vegetable-tanned Tuscan leather, 316L surgical steel, aerospace aluminum, and high-fire unglazed stoneware—calibrated for ten or more years of continuous daily service.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => navigate('#/products')}
                        className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        Explore Material Specs
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-stone-200/80 space-y-2">
                      <div className="text-stone-900 font-bold text-sm">Acoustic Precision</div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Titanium-coated biocellulose drivers tuned for studio mastering transparency without artificial bass mud.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-stone-200/80 space-y-2">
                      <div className="text-stone-900 font-bold text-sm">Sapphire Optics</div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Anti-reflective double-domed sapphire crystals matching Mohs hardness 9 for scratch-free resilience.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-stone-200/80 space-y-2">
                      <div className="text-stone-900 font-bold text-sm">Full-Grain Leather</div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Vegetable-tanned skins developing an organic golden patina uniquely shaped by your travels.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Route: Catalog (#/products) */}
        {isProducts && (
          <ProductCatalog
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            initialCategory={route.queryParams['category'] || 'All'}
            initialSearch={route.queryParams['search'] || ''}
          />
        )}

        {/* Route: Product Details (#/products/:id) */}
        {isProductDetail && (
          currentProduct ? (
            <ProductDetail
              product={currentProduct}
              allProducts={PRODUCTS}
              onBack={() => navigate('#/products')}
              onSelectProduct={handleSelectProduct}
            />
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
              <h2 className="text-2xl font-bold text-stone-900">Product Not Found</h2>
              <p className="text-xs text-stone-500 mt-2">
                The requested item could not be retrieved from the catalog repository.
              </p>
              <button
                onClick={() => navigate('#/products')}
                className="mt-6 px-6 py-2.5 text-xs font-semibold bg-stone-900 text-white rounded-lg"
              >
                Return to Catalog
              </button>
            </div>
          )
        )}

        {/* Route: Cart (#/cart) */}
        {isCart && (
          <CartView
            onContinueShopping={() => navigate('#/products')}
            onProceedToCheckout={() => setIsCheckoutOpen(true)}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Checkout Modal Flow */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order) => {
          // Stay in modal to view confirmed receipt
        }}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
      />

      {/* Non-intrusive Cart Toast */}
      <CartToast onViewCart={() => navigate('#/cart')} />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
