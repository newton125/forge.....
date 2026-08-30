import React from 'react';
import { Order } from '../types';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  FileText,
  MapPin
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { formatEGP } from '../utils/formatters';

interface OrderConfirmationPageProps {
  order: Order;
  onViewOrderDetails: (order: Order) => void;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onViewOrderDetails,
  onNavigateHome,
  onNavigateCatalog
}) => {
  const { success } = useToast();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border-4 border-emerald-100 shadow-xs animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0055ce]">
            Commercial Order Confirmed (Egypt)
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Order #{order.orderNumber}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            Thank you for choosing FORGE. A commercial invoice and freight tracking link have been dispatched to your corporate account.
          </p>
        </div>

        {/* Quick Order Highlights Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 text-left">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#0055ce]" />
              <span>Est. Dock Arrival</span>
            </div>
            <div className="text-xs font-bold text-slate-900 font-mono">
              {order.estimatedDelivery}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Truck className="w-3.5 h-3.5 text-[#008837]" />
              <span>Carrier</span>
            </div>
            <div className="text-xs font-bold text-slate-900 truncate">
              {order.carrier}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>Total Authorized</span>
            </div>
            <div className="text-xs font-bold text-slate-900 font-mono">
              {formatEGP(order.total)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-slate-100">
          <button
            onClick={() => onViewOrderDetails(order)}
            className="px-6 py-3 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>Track Order & Manifest</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onNavigateCatalog}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Continue Procurement
          </button>
        </div>
      </div>

      {/* Manifest Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          Dispatched Equipment Manifest ({order.items.length} SKUs)
        </h3>

        <div className="divide-y divide-slate-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 object-contain p-1 mix-blend-multiply"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    SKU: {item.sku} • Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-900 font-mono">
                {formatEGP(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Destination & Payment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-900 flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#0055ce]" /> Receiving Location (Egypt)
            </span>
            <p className="font-semibold text-slate-700">{order.shippingAddress.fullName}</p>
            <p className="text-slate-500">{order.shippingAddress.company}</p>
            <p className="text-slate-500 mt-1">
              {order.shippingAddress.buildingNumber ? `${order.shippingAddress.buildingNumber}, ` : ''}
              {order.shippingAddress.street}, {order.shippingAddress.district ? `${order.shippingAddress.district}, ` : ''}
              {order.shippingAddress.city}, {order.shippingAddress.governorate || order.shippingAddress.state}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-900 flex items-center gap-1 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Commercial Verification
            </span>
            <p className="font-semibold text-slate-700 uppercase">
              {order.paymentDetails.method} Terms
            </p>
            {order.paymentDetails.purchaseOrderNumber && (
              <p className="font-mono text-slate-600 mt-0.5">
                Ref PO: {order.paymentDetails.purchaseOrderNumber}
              </p>
            )}
            <p className="text-slate-500 mt-1 font-mono">Tracking: {order.trackingNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
