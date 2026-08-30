import React, { useState } from 'react';
import { Product } from '../types';
import { RatingStars } from '../components/common/RatingStars';
import { Badge } from '../components/common/Badge';
import { QuantityInput } from '../components/common/QuantityInput';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/common/ProductCard';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Heart,
  ShoppingCart,
  Zap,
  FileText,
  RotateCcw,
  Share2,
  Check,
  Building,
  Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatEGP } from '../utils/formatters';

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateCatalog: () => void;
  onNavigateHome: () => void;
  onNavigateCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  relatedProducts,
  onSelectProduct,
  onNavigateCatalog,
  onNavigateHome,
  onNavigateCheckout
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'warranty' | 'shipping'>('specs');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success } = useToast();

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onNavigateCheckout();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    success('Link Copied', 'Product link copied to clipboard.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: 'Catalog', onClick: onNavigateCatalog },
            { label: product.brand, onClick: onNavigateCatalog },
            { label: product.name, active: true }
          ]}
          onNavigateHome={onNavigateHome}
        />

        <button
          onClick={handleShare}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 p-1.5 rounded-md hover:bg-slate-100 transition cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share Spec Sheet</span>
        </button>
      </div>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full h-80 sm:h-96 md:h-112 bg-[#fcf9f8] rounded-xl border border-slate-100 overflow-hidden flex items-center justify-center p-6">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {product.featured && (
              <div className="absolute top-3 left-3">
                <Badge variant="primary" size="sm">
                  <Zap className="w-3 h-3 inline mr-1 fill-current" /> High-Torque Pro Line
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg border-2 bg-slate-50 overflow-hidden shrink-0 p-1.5 transition cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#0055ce] shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information, Pricing, and Purchasing (7 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0055ce]">
                {product.brand}
              </span>
              <span className="text-xs font-mono text-slate-500">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Stock Status */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <RatingStars rating={product.rating} count={product.reviewCount} showCount size="md" />
              <span className="text-slate-300">•</span>
              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  In Stock ({product.stock} units in Egypt Hub)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  Factory Backorder (Lead time 7-10 days)
                </span>
              )}
            </div>

            {/* Price section */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                  {formatEGP(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-slate-400 line-through font-mono">
                    {formatEGP(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium">/ unit</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Commercial Net 30 terms available at checkout. Applicable delivery & 14% Egyptian VAT calculated during order review.
              </p>
            </div>

            {/* Wholesale Tier Breakdown Card */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#0055ce]" />
                  Volume Tier Wholesale Pricing (Egypt)
                </span>
                <span className="text-[11px] text-[#0055ce] font-semibold">Tier 1 Automatic</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-700">1 - 4 Units</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">{formatEGP(product.price)}</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-700">5 - 19 Units</div>
                  <div className="font-bold text-[#0055ce] font-mono mt-0.5">{formatEGP(product.price * 0.92)}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Save 8%</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-700">20+ Units</div>
                  <div className="font-bold text-[#0055ce] font-mono mt-0.5">{formatEGP(product.price * 0.85)}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Save 15%</div>
                </div>
              </div>
            </div>

            {/* Description Summary */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Action Stepper & Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                <QuantityInput
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={product.stock || 99}
                  size="md"
                />
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition cursor-pointer ${
                  isSaved
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                <span>{isSaved ? 'In Saved Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="py-3 px-6 bg-[#0055ce] hover:bg-[#0043a8] active:bg-[#00388e] disabled:bg-slate-200 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Equipment Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="py-3 px-6 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 disabled:bg-slate-200 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Express Bay Checkout</span>
              </button>
            </div>

            {/* Trust and logistics guarantee */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0055ce] shrink-0" />
                <span>Dispatches from Cairo & Giza Hubs in 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{product.warranty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section (Specifications, Features, Warranty, Shipping) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex border-b border-slate-200 space-x-6 overflow-x-auto">
          {[
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'features', label: 'Key Engineering Features' },
            { id: 'warranty', label: 'Agency Warranty & Compliance' },
            { id: 'shipping', label: 'Egypt Dispatch & Delivery Schedule' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#0055ce] text-[#0055ce]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Specs Table */}
        {activeTab === 'specs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}
                  >
                    <td className="py-3 px-4 font-semibold text-slate-700 w-1/3 sm:w-1/4">
                      {spec.name}
                    </td>
                    <td className="py-3 px-4 text-slate-900 font-mono font-medium">
                      {spec.value}
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold text-slate-700">Gross Weight</td>
                  <td className="py-3 px-4 text-slate-900 font-mono">{product.weight}</td>
                </tr>
                {product.certifications && (
                  <tr className="border-b border-slate-100 bg-white">
                    <td className="py-3 px-4 font-semibold text-slate-700">Certifications</td>
                    <td className="py-3 px-4 text-slate-900 font-medium">
                      {product.certifications.join(', ')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Key Features Checklist */}
        {activeTab === 'features' && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Engineering Highlights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <Check className="w-4 h-4 text-[#0055ce] shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Warranty */}
        {activeTab === 'warranty' && (
          <div className="space-y-4 max-w-2xl text-xs text-slate-600 leading-relaxed">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/60 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0055ce] shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{product.warranty}</h4>
                <p className="mt-1 text-slate-600">
                  Includes authorized Egyptian agency coverage for defective components, motor burnouts under standard industrial operational parameters, and official local service centers in Cairo, Giza, and Alexandria.
                </p>
              </div>
            </div>
            <p>
              FORGE is an authorized primary distributor in Egypt. All purchased equipment includes official factory registration serial credentials directly mapped to your corporate tax card / buyer ID for expedited claims.
            </p>
          </div>
        )}

        {/* Tab 4: Shipping */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 max-w-2xl text-xs text-slate-600 leading-relaxed">
            <h4 className="text-sm font-bold text-slate-900">Egypt Logistics & Receiving Bay Protocol</h4>
            <p>
              Standard orders are packed within 4 hours at our 10th of Ramadan & Cairo Fulfillment Hubs. Heavy freight machinery ships palletized with liftgate assistance included across Greater Cairo, Alexandria, Suez, and industrial zones.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block">Greater Cairo & Alexandria Express</span>
                <span className="text-slate-500">24-48 hours direct to jobsite or workshop</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block">Industrial Zone Freight</span>
                <span className="text-slate-500">Palletized heavy equipment direct to receiving dock across all governorates</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Industrial Equipment Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0055ce]">
                Compatible Setup
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Recommended Complementary Equipment
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelectProduct={onSelectProduct}
                layout="grid"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

