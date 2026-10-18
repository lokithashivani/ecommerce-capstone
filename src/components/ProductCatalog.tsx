import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product, FilterState } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  initialCategory = 'All',
  initialSearch = ''
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    searchQuery: initialSearch,
    sortBy: 'featured',
    inStockOnly: false
  });

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      if (filters.category !== 'All' && item.category !== filters.category) {
        return false;
      }
      // In-stock match
      if (filters.inStockOnly && !item.inStock) {
        return false;
      }
      // Search match
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesTagline = item.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTagline) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first, then review count
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.reviewCount - a.reviewCount;
    });
  }, [products, filters]);

  const resetFilters = () => {
    setFilters({
      category: 'All',
      searchQuery: '',
      sortBy: 'featured',
      inStockOnly: false
    });
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.searchQuery !== '' ||
    filters.sortBy !== 'featured' ||
    filters.inStockOnly;

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-stone-500">
            Catalog Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Browse All Products
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Carefully engineered goods. Filter by category, price, or availability.
          </p>
        </div>

        <div className="text-xs text-stone-500 tabular-nums">
          Showing <span className="font-semibold text-stone-900">{filteredProducts.length}</span> of {products.length} items
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="py-6 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Interactive Category Tabs (Segmented Button Group - Rule 1.A Compliant) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setFilters((prev) => ({ ...prev, category }))}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  filters.category === category
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search products..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="relative min-w-[140px]">
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as FilterState['sortBy']
                  }))
                }
                className="w-full appearance-none pl-3 pr-8 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
                aria-label="Sort products"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-500" />
            </div>

            {/* In-Stock Filter Toggle */}
            <label className="flex items-center gap-2 text-xs text-stone-700 font-medium cursor-pointer select-none px-2 py-2">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
                className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900 border-stone-300"
              />
              <span className="whitespace-nowrap">In Stock Only</span>
            </label>

            {/* Clear All Filters */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-stone-500 hover:text-stone-900 underline whitespace-nowrap px-1"
              >
                Reset
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center border border-dashed border-stone-300 rounded-2xl bg-stone-50/50 my-6">
          <p className="text-sm font-semibold text-stone-900">No matching products found</p>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, selecting "All" categories, or unchecking "In Stock Only".
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </section>
  );
};
