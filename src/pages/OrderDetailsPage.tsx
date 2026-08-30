import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import {
  Package,
  Truck,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  ChevronLeft,
  MapPin,
  ShieldCheck,
  Building,
  Download
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { formatEGP } from '../utils/formatters';

interface OrderDetailsPageProps {
  order: Order;
  onNavigateOrdersList: () => void;
  onNavigateHome: () => void;
}

export const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({
  order,
  onNavigateOrdersList,
  onNavigateHome
}) => {
  const { success } = useToast();

  const handleDownloadInvoice = () => {
    success('Invoice PDF Generated', `Downloaded invoice for order ${order.orderNumber}`);
    window.print();
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return <Badge variant="success" size="md">Delivered & Signed</Badge>;
      case 'Shipped':
      case 'Out for Delivery':
        return <Badge variant="primary" size="md">In Transit</Badge>;
      case 'Processing':
      case 'Confirmed':
        return <Badge variant="warning" size="md">Processing Dispatch</Badge>;
      case 'Cancelled':
        return <Badge variant="error" size="md">Cancelled</Badge>;
      default:
        return <Badge variant="neutral" size="md">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'My Account', onClick: onNavigateOrdersList },
          { label: 'Order History', onClick: onNavigateOrdersList },
          { label: order.orderNumber, active: true }
        ]}
        onNavigateHome={onNavigateHome}
      />

      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Order #{order.orderNumber}
            </h1>
            {getStatusBadge(order.status)}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>
              Placed on <strong className="text-slate-800 font-semibold">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
            </span>
            <span>•</span>
            <span className="font-mono">Carrier: {order.carrier}</span>
            <span>•</span>
            <span className="font-mono text-[#0055ce] font-semibold">Tracking #{order.trackingNumber}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateOrdersList}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </button>

          <button
            onClick={handleDownloadInvoice}
            className="px-4 py-2.5 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice PDF</span>
          </button>
        </div>
      </div>

      {/* Interactive Live Tracking Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#0055ce]" />
            <h2 className="text-base font-bold text-slate-900">Live Logistics & Freight Status</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Est. Arrival: <strong className="text-slate-900">{order.estimatedDelivery}</strong>
          </span>
        </div>

        {/* Timeline Steps */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {order.trackingSteps.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              <div
                className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  step.completed
                    ? 'bg-[#008837] text-white ring-4 ring-emerald-50'
                    : step.current
                    ? 'bg-[#0055ce] text-white ring-4 ring-blue-100'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
              </div>

              <div className="flex-1 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs font-bold ${step.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                    {step.label}
                  </h4>
                  {step.timestamp && (
                    <span className="text-[11px] font-mono text-slate-400">{step.timestamp}</span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items Manifest & Destination Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Manifest items (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Equipment Manifest ({order.items.length} Line Items)
          </h3>

          <div className="divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl bg-[#fcf9f8] border border-slate-200 object-contain p-2 mix-blend-multiply"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="font-mono">SKU: {item.sku}</span>
                      <span>•</span>
                      <span>Unit: {formatEGP(item.price)}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-800">Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-bold text-slate-900 font-mono">
                    {formatEGP(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {order.notes && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 mt-4">
              <strong className="text-slate-800 block mb-0.5">Receiving Dock Instructions:</strong>
              {order.notes}
            </div>
          )}
        </div>

        {/* Right: Summary, Address & Terms (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cost breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Billing Ledger (EGP)
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-slate-900">{formatEGP(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Wholesale Discount</span>
                  <span className="font-mono">-{formatEGP(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Freight Delivery</span>
                <span className="font-mono font-semibold text-slate-900">
                  {order.shipping === 0 ? 'FREE' : formatEGP(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Egyptian VAT (14%)</span>
                <span className="font-mono font-semibold text-slate-900">{formatEGP(order.tax)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">Total Billed</span>
                <span className="text-xl font-black text-slate-900 font-mono">{formatEGP(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Billing Address */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 text-xs">
            <div>
              <span className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0055ce]" /> Receiving Location (Egypt)
              </span>
              <p className="font-semibold text-slate-800">{order.shippingAddress.fullName}</p>
              <p className="text-slate-600">{order.shippingAddress.company}</p>
              <p className="text-slate-500 mt-1 leading-relaxed">
                {order.shippingAddress.buildingNumber ? `${order.shippingAddress.buildingNumber}, ` : ''}
                {order.shippingAddress.street}, {order.shippingAddress.district ? `${order.shippingAddress.district}, ` : ''}
                {order.shippingAddress.city}, {order.shippingAddress.governorate || order.shippingAddress.state}
              </p>
              <p className="text-slate-400 font-mono mt-1">{order.shippingAddress.phone}</p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-600" /> Commercial Payment
              </span>
              <p className="font-semibold text-slate-800 uppercase">{order.paymentDetails.method} Terms</p>
              {order.paymentDetails.purchaseOrderNumber && (
                <p className="font-mono text-slate-600 mt-0.5">PO #{order.paymentDetails.purchaseOrderNumber}</p>
              )}
              {order.paymentDetails.cardLast4 && (
                <p className="font-mono text-slate-600 mt-0.5">Card ending in {order.paymentDetails.cardLast4}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
