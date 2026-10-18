import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // toggle if already handled, or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
      <div className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search audio, watches, backpacks, homeware..."
            className="w-full text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-stone-500 hover:text-stone-900 bg-stone-100 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Suggestions'}
          </div>

          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product.id);
                  onClose();
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-100 cursor-pointer transition-colors group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-semibold text-stone-900 group-hover:text-stone-700 truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate">{product.tagline}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-stone-900 tabular-nums">
                    ${product.price}
                  </span>
                  <p className="text-[10px] text-stone-400">{product.category}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-stone-500">
              No products found matching "{query}"
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
