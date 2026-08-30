import React, { useState } from 'react';
import { Product } from '../types';
import { QuantityInput } from '../components/common/QuantityInput';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Check,
  X,
  ShoppingBag,
  Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatEGP } from '../utils/formatters';

interface CartPageProps {
  onNavigateCheckout: () => void;
  onNavigateCatalog: () => void;
  onNavigateHome: () => void;
  onSelectProduct: (product: Product) => void;
  suggestedProducts: Product[];
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigateCheckout,
  onNavigateCatalog,
  onNavigateHome,
  onSelectProduct,
  suggestedProducts
}) => {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    promoCode,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const { error } = useToast();

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    try {
      await applyPromoCode(promoInput);
      setPromoInput('');
    } catch (err: any) {
      // toast shown in context
    } finally {
      setPromoLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-blue-50 text-[#0055ce] rounded-full mx-auto flex items-center justify-center">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Your Equipment Cart is Empty</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You currently have no hardware items or machinery reserved for dispatch in Egypt.
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
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Catalog', onClick: onNavigateCatalog },
          { label: 'Equipment Cart', active: true }
        ]}
        onNavigateHome={onNavigateHome}
      />

      <div className="flex items-baseline justify-between border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Commercial Equipment Order ({itemCount} {itemCount === 1 ? 'Item' : 'Items'})
        </h1>
        <button
          onClick={onNavigateCatalog}
          className="text-xs font-bold text-[#0055ce] hover:underline cursor-pointer"
        >
          + Add More Gear
        </button>
      </div>

      {/* Main Grid: Cart Items (Left 8 cols) vs Order Summary (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Item Rows */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Product Info with Image */}
              <div
                onClick={() => onSelectProduct(product)}
                className="flex items-center gap-4 cursor-pointer group flex-1"
              >
                <div className="w-20 h-20 bg-[#fcf9f8] rounded-lg border border-slate-100 p-2 shrink-0 flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider text-[#0055ce] uppercase">
                    {product.brand} • SKU: {product.sku}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0055ce] transition line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono">
                    {formatEGP(product.price)} each
                  </div>
                </div>
              </div>

              {/* Quantity Stepper, Item Total & Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                <QuantityInput
                  value={quantity}
                  onChange={(val) => updateQuantity(product.id, val)}
                  min={1}
                  max={product.stock || 99}
                  size="sm"
                />

                <div className="text-right shrink-0">
                  <span className="text-base font-bold text-slate-900 font-mono block">
                    {formatEGP(product.price * quantity)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  aria-label="Remove item"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Freight Dispatch Notice */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center gap-3 text-xs text-slate-700">
            <Truck className="w-5 h-5 text-[#0055ce] shrink-0" />
            <div>
              <span className="font-bold text-slate-900">Priority Logistics Routing: </span>
              {shipping === 0
                ? 'Your order qualifies for FREE commercial delivery across Egypt.'
                : `Add ${formatEGP(Math.max(0, 2000 - subtotal))} more to qualify for Free Commercial Delivery across Egypt.`}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5 sticky top-24">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Procurement Summary
            </h2>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Equipment Subtotal</span>
                <span className="font-mono font-semibold text-slate-900">{formatEGP(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Promo Discount ({promoCode})
                  </span>
                  <span className="font-mono font-semibold">-{formatEGP(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Estimated Delivery</span>
                <span className="font-mono font-semibold text-slate-900">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                  ) : (
                    formatEGP(shipping)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>VAT (14% ضريبة القيمة المضافة)</span>
                <span className="font-mono font-semibold text-slate-900">{formatEGP(tax)}</span>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">Estimated Total</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900 font-mono block">
                    {formatEGP(total)}
                  </span>
                  <span className="text-[10px] text-slate-400">EGP, Net 30 Terms Available</span>
                </div>
              </div>
            </div>

            {/* Promo Code Coupon Form */}
            <div className="border-t border-slate-100 pt-4">
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Coupon: {promoCode}</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. FORGEPRO)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#0055ce] uppercase"
                    />
                    <button
                      type="submit"
                      disabled={promoLoading}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition cursor-pointer disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    Try code <strong className="text-slate-700">FORGEPRO</strong> for wholesale discount
                  </span>
                </form>
              )}
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={onNavigateCheckout}
              className="w-full py-3.5 px-4 bg-[#0055ce] hover:bg-[#0043a8] active:bg-[#00388e] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Guarantee Pills */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>OEM Factory Certified Hardware (Egypt)</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#0055ce] shrink-0" />
                <span>PO Invoicing & Egyptian Tax Exemption Supported</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

