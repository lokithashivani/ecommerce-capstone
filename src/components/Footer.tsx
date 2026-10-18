import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-xl font-bold tracking-tight text-white block">
              ShopEase
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Precision design objects, audio acoustics, and crafted lifestyle essentials built for considered living.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('#/')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('#/products')}
                  className="hover:text-white transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('#/cart')}
                  className="hover:text-white transition-colors"
                >
                  Shopping Bag
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('#/products')}
                  className="hover:text-white transition-colors"
                >
                  Audio & Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('#/products')}
                  className="hover:text-white transition-colors"
                >
                  Watches & Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('#/products')}
                  className="hover:text-white transition-colors"
                >
                  Leather & Carry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('#/products')}
                  className="hover:text-white transition-colors"
                >
                  Home & Living
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Care
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Complimentary carbon-neutral shipping on orders over $150. 30-day risk-free return trial and 2-year comprehensive manufacturer warranty.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} ShopEase Storefront. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Client-Side Routing</span>
            <span>·</span>
            <span>Secure 256-bit Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
