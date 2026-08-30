import React from 'react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';
import { QuantityInput } from '../common/QuantityInput';
import {
  X,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatEGP } from '../../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateCart: () => void;
  onNavigateCheckout: () => void;
  onSelectProduct: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateCart,
  onNavigateCheckout,
  onSelectProduct
}) => {
  const { items, itemCount, subtotal, shipping, total, updateQuantity, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0055ce]" />
              <h2 className="text-base font-bold text-slate-900">
                Equipment Cart ({itemCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0055ce] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-500">
                    Add certified power tools or equipment to dispatch your order.
                  </p>
                </div>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-start gap-3"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-16 h-16 rounded-lg bg-white border border-slate-200 p-1 shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold text-[#0055ce] uppercase tracking-wider block">
                      {product.brand}
                    </span>
                    <h4
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="text-xs font-bold text-slate-900 truncate hover:text-[#0055ce] cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-slate-900 block mt-0.5">
                      {formatEGP(product.price)}
                    </span>

                    <div className="flex items-center justify-between mt-2">
                      <QuantityInput
                        value={quantity}
                        onChange={(q) => updateQuantity(product.id, q)}
                        min={1}
                        max={product.stock || 99}
                        size="sm"
                      />
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-400 hover:text-rose-600 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-slate-900">{formatEGP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery (Egypt)</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {shipping === 0 ? <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span> : formatEGP(shipping)}
                  </span>
                </div>
                <div className="border-t border-slate-100 pt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Total</span>
                  <span className="text-lg font-black text-slate-900 font-mono">{formatEGP(total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateCart();
                  }}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  View Full Cart
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateCheckout();
                  }}
                  className="w-full py-2.5 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Commercial Net 30 Terms Eligible</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
