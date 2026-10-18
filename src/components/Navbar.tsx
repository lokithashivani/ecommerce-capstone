import React from 'react';
import { ShoppingBag, ArrowRight, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const { cartCount } = useCart();

  const navLinks = [
    { label: 'Home', path: '#/' },
    { label: 'Catalog', path: '#/products' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('#/')}
          className="text-xl font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
          aria-label="ShopEase Home"
        >
          ShopEase
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          {navLinks.map((link) => {
            const isActive =
              link.path === '#/'
                ? currentPath === '/' || currentPath === ''
                : currentPath.startsWith(link.path.replace('#', ''));
            return (
              <button
                key={link.label}
                onClick={() => onNavigate(link.path)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
                  isActive
                    ? 'border-stone-900 text-stone-900 font-semibold'
                    : 'border-transparent hover:text-stone-900 hover:border-stone-300'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action cluster (Search & Cart) */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
              aria-label="Search catalog"
              title="Quick Search (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => onNavigate('#/cart')}
            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
            aria-label={`View shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums bg-stone-700 text-stone-100 px-1.5 py-0.5 rounded text-[11px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
