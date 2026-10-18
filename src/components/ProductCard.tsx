import React, { useState } from 'react';
import { Star, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article
      onClick={() => onSelect(product.id)}
      className="group relative bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col h-full focus-within:ring-2 focus-within:ring-stone-900"
    >
      {/* Product Image Stage (65-75% visual weight) */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden shrink-0">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
              {product.category}
            </span>
            <span className="text-sm font-semibold text-stone-700 mt-1">{product.name}</span>
          </div>
        )}

        {/* Quick Add Button on Hover */}
        <div className="absolute bottom-3 right-3 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`p-2.5 rounded-lg shadow-sm font-medium text-xs flex items-center gap-1.5 transition-all ${
              !product.inStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-95'
            }`}
            aria-label={`Add ${product.name} to bag`}
            title={product.inStock ? 'Quick Add to Bag' : 'Out of Stock'}
          >
            {justAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            <span className="sr-only">Add</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <span className="uppercase tracking-wider font-medium text-[11px] text-stone-600">
                {product.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className={product.inStock ? 'text-stone-500' : 'text-amber-700 font-medium'}>
                {product.inStock ? 'In Stock' : 'Backorder'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-stone-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="tabular-nums font-medium text-[11px]">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short Tagline */}
          <p className="text-xs text-stone-500 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Price Baseline Alignment */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-stone-900 tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <span className="text-xs font-medium text-stone-500 group-hover:text-stone-900 transition-colors">
            View Details &rarr;
          </span>
        </div>
      </div>
    </article>
  );
};
