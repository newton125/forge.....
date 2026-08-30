import React, { useState, useMemo } from 'react';
import { Product, Category, CategoryId } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  X,
  RotateCcw,
  Check,
  ChevronDown
} from 'lucide-react';
import { formatEGP } from '../utils/formatters';

interface ProductListPageProps {
  products: Product[];
  categories: Category[];
  selectedCategory: CategoryId | 'all';
  searchQuery: string;
  onSelectCategory: (catId: CategoryId | 'all') => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  onClearSearch: () => void;
}

export const ProductListPage: React.FC<ProductListPageProps> = ({
  products,
  categories,
  selectedCategory,
  searchQuery,
  onSelectCategory,
  onSelectProduct,
  onNavigateHome,
  onClearSearch
}) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(60000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract unique brands
  const allBrands = useMemo(() => {
    const brands = Array.from(new Set(products.map((p) => p.brand)));
    return brands.sort();
  }, [products]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setInStockOnly(false);
    setMaxPrice(4000);
    setMinRating(0);
    onSelectCategory('all');
    onClearSearch();
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Brands filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // In Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock && p.stock > 0);
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, selectedBrands, inStockOnly, maxPrice, minRating, sortBy]);

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    selectedBrands.length +
    (inStockOnly ? 1 : 0) +
    (maxPrice < 4000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <Breadcrumbs
          items={[
            { label: 'Catalog', onClick: () => onSelectCategory('all') },
            ...(selectedCategory !== 'all' && currentCategoryObj
              ? [{ label: currentCategoryObj.name, active: true }]
              : [{ label: 'All Equipment', active: true }])
          ]}
          onNavigateHome={onNavigateHome}
        />

        <div className="text-xs text-slate-500">
          Showing <strong className="text-slate-900 font-semibold">{filteredProducts.length}</strong> of{' '}
          {products.length} items
        </div>
      </div>

      {/* Page Title & Category Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : currentCategoryObj
              ? currentCategoryObj.name
              : 'Complete Industrial Catalog'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {currentCategoryObj
              ? currentCategoryObj.description
              : 'Browse heavy machinery, certified brushless tools, precision measuring sensors, and OSHA-compliant safety supplies.'}
          </p>
        </div>

        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="self-start md:self-auto px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>Clear Search</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs sticky top-24 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0055ce]" />
                <h3 className="text-sm font-bold text-slate-900">Procurement Filters</h3>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-medium text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFilterCount})</span>
                </button>
              )}
            </div>

            {/* Department Categories */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Departments
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => onSelectCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 text-xs font-medium rounded-lg transition flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-blue-50 text-[#0055ce] font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] text-slate-400 font-mono">{products.length}</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 text-xs font-medium rounded-lg transition flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-blue-50 text-[#0055ce] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Manufacturer / Brand
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {allBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-3.5 h-3.5 rounded text-[#0055ce] focus:ring-[#0055ce] border-slate-300"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Max Slider */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Max Price
                </h4>
                <span className="text-xs font-bold font-mono text-[#0055ce]">
                  {formatEGP(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={60000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0055ce]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>{formatEGP(200)}</span>
                <span>{formatEGP(60000)}+</span>
              </div>
            </div>

            {/* In Stock Only Toggle */}
            <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Ready to Ship</span>
                <span className="text-[10px] text-slate-500">In stock inventory only</span>
              </div>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#0055ce] focus:ring-[#0055ce] border-slate-300 cursor-pointer"
              />
            </div>

            {/* Rating Filter */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Minimum Rating
              </h4>
              <div className="grid grid-cols-4 gap-1">
                {[0, 4.0, 4.5, 4.8].map((val) => (
                  <button
                    key={val}
                    onClick={() => setMinRating(val)}
                    className={`py-1 text-xs font-semibold rounded-md border transition cursor-pointer ${
                      minRating === val
                        ? 'bg-[#0055ce] text-white border-[#0055ce]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {val === 0 ? 'All' : `${val}★+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Display Main Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort By:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-800 py-1.5 pl-3 pr-8 rounded-lg focus:outline-hidden focus:border-[#0055ce] cursor-pointer"
                >
                  <option value="featured">Best Selling / Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-white text-[#0055ce] shadow-xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                aria-label="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  layoutMode === 'list'
                    ? 'bg-white text-[#0055ce] shadow-xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Filter Pills */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400">Active:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-[#0055ce] text-xs font-semibold rounded-md border border-blue-200/50">
                  {currentCategoryObj?.name}
                  <button onClick={() => onSelectCategory('all')} className="hover:text-[#00388e]">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md border border-slate-200"
                >
                  {brand}
                  <button onClick={() => toggleBrand(brand)} className="hover:text-slate-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-200">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxPrice < 60000 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md">
                  Under {formatEGP(maxPrice)}
                  <button onClick={() => setMaxPrice(60000)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-md">
                  {minRating}★ & above
                  <button onClick={() => setMinRating(0)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Items or Empty State */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                layoutMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  layout={layoutMode}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Industrial Tools Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No products match the selected filters or part search criteria. Try loosening your price or manufacturer constraints.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
