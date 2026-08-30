import React from 'react';
import { Product } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/common/ProductCard';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Package
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface WishlistPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateCatalog: () => void;
  onNavigateHome: () => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onSelectProduct,
  onNavigateCatalog,
  onNavigateHome
}) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { success } = useToast();

  const handleAddAllToCart = () => {
    wishlist.forEach((p) => {
      addToCart(p, 1);
    });
    success('All Items Added to Cart', `${wishlist.length} saved products transferred to cart.`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full mx-auto flex items-center justify-center">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Your Saved Wishlist is Empty</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Bookmark high-torque tools, safety gear, and precision equipment for future procurement requisition.
          </p>
        </div>
        <button
          onClick={onNavigateCatalog}
          className="px-6 py-3 bg-[#0055ce] hover:bg-[#0043a8] text-white text-sm font-bold rounded-xl shadow-md transition cursor-pointer"
        >
          Explore Industrial Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[{ label: 'Saved Equipment Wishlist', active: true }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Saved Industrial Equipment ({wishlist.length} Items)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Hardware items saved for future purchase orders and plant approvals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearWishlist}
            className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={handleAddAllToCart}
            className="px-5 py-2.5 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add All to Equipment Cart</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
            layout="grid"
          />
        ))}
      </div>
    </div>
  );
};
