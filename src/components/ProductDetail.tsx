import React, { useState } from 'react';
import { ArrowLeft, Star, Plus, Minus, Check, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductCard } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (productId: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  allProducts,
  onBack,
  onSelectProduct
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Breadcrumb / Back button */}
      <nav className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors py-1 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Catalog</span>
        </button>

        <div className="text-xs text-stone-500 hidden sm:flex items-center gap-1.5">
          <span>Catalog</span>
          <span aria-hidden="true">/</span>
          <span>{product.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-stone-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </nav>

      {/* Main PDP Grid (Contiguous Gallery Left, Purchase Module Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Visual Asset Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            {!imageError ? (
              <img
                src={product.image}
                alt={product.name}
                loading="eager"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-500 p-6 text-center">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                  {product.category}
                </span>
                <h3 className="text-xl font-bold text-stone-800 mt-2">{product.name}</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm">{product.tagline}</p>
              </div>
            )}
          </div>

          {/* Micro trust indicators */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 text-xs text-stone-600 text-center">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-stone-700" />
              <span className="font-medium text-stone-800">Dispatch in 24h</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-stone-200">
              <ShieldCheck className="w-4 h-4 text-stone-700" />
              <span className="font-medium text-stone-800">2-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-stone-700" />
              <span className="font-medium text-stone-800">Free 30d Returns</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 lg:sticky lg:top-24">
          
          {/* Header Metadata */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-wider font-semibold text-stone-600">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="ml-1 font-semibold tabular-nums text-stone-900">{product.rating}</span>
                </div>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 leading-snug">
              {product.name}
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Pricing & Availability */}
          <div className="py-4 border-y border-stone-100 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-900 tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="text-xs">
              {product.inStock ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  In Stock ({product.stockCount} units available)
                </span>
              ) : (
                <span className="text-amber-800 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  Currently Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Quantity and Add to Cart Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Quantity
              </span>
              <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || !product.inStock}
                  className="p-2 text-stone-600 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-semibold tabular-nums text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  disabled={quantity >= product.stockCount || !product.inStock}
                  className="p-2 text-stone-600 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
                !product.inStock
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {quantity} to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.inStock ? `Add to Bag · $${product.price * quantity}` : 'Unavailable'}</span>
                </>
              )}
            </button>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Overview
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Features Bullet List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Key Features
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-stone-900 font-semibold">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Specifications Table */}
      <div className="mt-16 pt-10 border-t border-stone-200 max-w-4xl">
        <h3 className="text-xl font-bold text-stone-900 mb-4">
          Technical Specifications
        </h3>
        <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
          <table className="w-full text-left text-xs sm:text-sm">
            <tbody className="divide-y divide-stone-200">
              {Object.entries(product.specs).map(([label, val], idx) => (
                <tr key={label} className={idx % 2 === 0 ? 'bg-stone-50/50' : 'bg-white'}>
                  <td className="py-3 px-4 font-medium text-stone-500 w-1/3">
                    {label}
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-900 tabular-nums">
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-10 border-t border-stone-200">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                You May Also Appreciate
              </span>
              <h3 className="text-xl font-bold text-stone-900 mt-1">
                Related Design Objects
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
