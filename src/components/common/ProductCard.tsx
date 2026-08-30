import React from 'react';
import { Product } from '../../types';
import { RatingStars } from './RatingStars';
import { Badge } from './Badge';
import { Heart, ShoppingCart, Check, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion } from 'motion/react';
import { formatEGP } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  layout = 'grid'
}) => {
  const { addToCart, items: cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);
  const cartItem = cartItems.find((i) => i.product.id === product.id);
  const inCartCount = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (layout === 'list') {
    return (
      <div
        id={`product-card-list-${product.id}`}
        onClick={() => onSelectProduct(product)}
        className="group bg-white rounded-xl border border-slate-200/80 hover:border-[#0055ce]/40 transition-all duration-200 hover:shadow-md p-4 flex flex-col sm:flex-row items-center gap-5 cursor-pointer relative"
      >
        {/* Thumbnail */}
        <div className="relative w-full sm:w-48 h-40 bg-slate-50 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-2">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          {product.stock <= product.lowStockThreshold && product.stock > 0 && (
            <div className="absolute top-2 left-2">
              <Badge variant="warning" size="xs">
                Low Stock ({product.stock})
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0055ce]">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#0055ce] transition line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <RatingStars rating={product.rating} count={product.reviewCount} showCount size="sm" />
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <Check className="w-3 h-3" /> Ready to Dispatch
            </span>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900 font-mono">
                {formatEGP(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  {formatEGP(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`p-2.5 rounded-lg border transition ${
                  isSaved
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="px-4 py-2 bg-[#0055ce] hover:bg-[#0043a8] active:bg-[#00388e] text-white rounded-lg font-medium text-xs flex items-center gap-2 transition shadow-xs cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{inCartCount > 0 ? `In Cart (${inCartCount})` : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout
  return (
    <motion.div
      id={`product-card-grid-${product.id}`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-xl border border-slate-200/80 hover:border-[#0055ce]/40 transition-all duration-200 hover:shadow-lg p-4 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top badges & Wishlist */}
      <div className="relative">
        <div className="flex items-center justify-between gap-1 mb-2 z-10">
          <div className="flex items-center gap-1 flex-wrap">
            {product.featured && (
              <Badge variant="primary" size="xs">
                <Zap className="w-2.5 h-2.5 inline mr-0.5 fill-current" /> Pro Gear
              </Badge>
            )}
            {product.stock <= product.lowStockThreshold && product.stock > 0 ? (
              <Badge variant="warning" size="xs">
                Low Stock
              </Badge>
            ) : product.stock === 0 ? (
              <Badge variant="error" size="xs">
                Out of Stock
              </Badge>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`p-1.5 rounded-full backdrop-blur-xs transition ${
              isSaved
                ? 'bg-rose-50 text-rose-600 shadow-xs'
                : 'bg-white/80 hover:bg-slate-100 text-slate-400 hover:text-slate-700 shadow-xs'
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Product Image */}
        <div className="w-full h-44 bg-[#fcf9f8] rounded-lg overflow-hidden flex items-center justify-center p-3 mb-3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-400 mb-1 uppercase">
            <span className="text-[#0055ce] font-semibold">{product.brand}</span>
            <span className="font-mono text-[10px]">{product.sku}</span>
          </div>

          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-[#0055ce] transition line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <RatingStars rating={product.rating} count={product.reviewCount} showCount size="xs" />
          </div>
        </div>

        {/* Price and Cart Button */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-900 font-mono">
                {formatEGP(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-slate-400 line-through font-mono">
                  {formatEGP(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium block">
              {product.inStock ? 'In Stock • Egypt Hub' : 'Lead time 5-7 days'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="p-2.5 bg-[#0055ce] hover:bg-[#0043a8] active:bg-[#00388e] disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-lg transition shadow-xs shrink-0 cursor-pointer"
            aria-label="Add to cart"
            title={inCartCount > 0 ? `${inCartCount} already in cart` : 'Add to cart'}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
