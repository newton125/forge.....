import React, { useState } from 'react';
import { Address, PaymentDetails, Order } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  ShieldCheck,
  CreditCard,
  FileText,
  Truck,
  CheckCircle2,
  Building,
  Lock,
  ArrowRight,
  ChevronLeft,
  Loader2,
  MapPin,
  Check,
  Banknote
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { useToast } from '../context/ToastContext';
import { formatEGP, EGYPT_GOVERNORATES } from '../utils/formatters';

interface CheckoutPageProps {
  onOrderPlaced: (order: Order) => void;
  onNavigateCart: () => void;
  onNavigateHome: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onOrderPlaced,
  onNavigateCart,
  onNavigateHome
}) => {
  const { user } = useAuth();
  const { items, subtotal, discount, shipping, tax, total } = useCart();
  const { success, error } = useToast();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 1: Shipping Address State
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user?.savedAddresses?.find((a) => a.isDefault)?.id || user?.savedAddresses?.[0]?.id || 'custom'
  );

  const [customAddress, setCustomAddress] = useState<Address>({
    id: 'addr-custom',
    title: 'Custom Jobsite / Plant Facility',
    fullName: user?.fullName || 'Eng. Ahmed Mansour',
    company: user?.company || 'Industrial Partner SAE',
    street: 'Industrial Zone B3, Plot 18',
    buildingNumber: 'Building 18',
    apartmentOrSuite: 'Bay B-12',
    district: 'Industrial Area',
    city: '10th of Ramadan',
    governorate: 'Sharqia - 10th of Ramadan (الشرقية - العاشر من رمضان)',
    landmark: 'Opposite Egyptian Steel Complex',
    country: 'Egypt',
    phone: user?.phone || '+20 10 2345 8901',
    isDefault: false
  });

  // Step 2: Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'invoice' | 'cod' | 'wire'>('invoice');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [cardName, setCardName] = useState(user?.fullName || 'Eng. Ahmed Mansour');
  const [poNumber, setPoNumber] = useState('PO-EGY-2026-0994');
  const [notes, setNotes] = useState('Deliver to Bay #3 receiving dock. Heavy equipment forklift available on site.');

  const getActiveAddress = (): Address => {
    if (selectedAddressId === 'custom' || !user?.savedAddresses) {
      return customAddress;
    }
    const found = user.savedAddresses.find((a) => a.id === selectedAddressId);
    return found || customAddress;
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const activeAddress = getActiveAddress();

      const paymentDetails: PaymentDetails = {
        method: paymentMethod,
        billingAddressSameAsShipping: true,
        ...(paymentMethod === 'card'
          ? { cardLast4: cardNumber.slice(-4) || '4242', cardBrand: 'Corporate Visa / Meeza' }
          : {}),
        ...(paymentMethod === 'invoice'
          ? { purchaseOrderNumber: poNumber || `PO-EG-${Date.now().toString().slice(-6)}` }
          : {})
      };

      const res = await orderService.createOrder({
        shippingAddress: activeAddress,
        paymentDetails,
        notes
      });

      success('Order Placed Successfully', `Confirmation #${res.data.orderNumber}`);
      onOrderPlaced(res.data);
    } catch (err: any) {
      error('Failed to Place Order', err.message || 'Payment processing error');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Cart', onClick: onNavigateCart },
          { label: 'Enterprise Checkout (Egypt)', active: true }
        ]}
        onNavigateHome={onNavigateHome}
      />

      {/* Progress Steps Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          {[
            { num: 1, title: 'Receiving Dock & Location' },
            { num: 2, title: 'Commercial Payment Terms' },
            { num: 3, title: 'Review & Dispatch' }
          ].map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                    currentStep > s.num
                      ? 'bg-[#008837] text-white'
                      : currentStep === s.num
                      ? 'bg-[#0055ce] text-white ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-slate-900">{s.title}</div>
                  <div className="text-[10px] text-slate-400">Step {s.num} of 3</div>
                </div>
              </div>
              {idx < 2 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition ${
                    currentStep > idx + 1 ? 'bg-[#008837]' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Grid (Form Left 8 cols vs Summary Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Step Content Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: Shipping Facility */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Step 1: Receiving Facility & Egyptian Delivery Location</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Select a pre-registered industrial site or specify jobsite governorate and district coordinates.</p>
                </div>
                <Truck className="w-6 h-6 text-[#0055ce]" />
              </div>

              {/* Saved Addresses Radio Cards */}
              {user?.savedAddresses && user.savedAddresses.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">Pre-Registered Egyptian Facilities:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {user.savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                          selectedAddressId === addr.id
                            ? 'border-[#0055ce] bg-blue-50/40 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900">{addr.title}</span>
                            {addr.isDefault && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-slate-700">{addr.fullName}</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {addr.buildingNumber ? `${addr.buildingNumber}, ` : ''}{addr.street}, {addr.district ? `${addr.district}, ` : ''}{addr.city}, {addr.governorate || addr.state}
                          </p>
                          {addr.landmark && (
                            <p className="text-[11px] text-slate-500 mt-0.5">Landmark: {addr.landmark}</p>
                          )}
                          <p className="text-[11px] text-slate-400 mt-1 font-mono">{addr.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enter Custom Address Form Option */}
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="addressOption"
                    checked={selectedAddressId === 'custom'}
                    onChange={() => setSelectedAddressId('custom')}
                    className="w-4 h-4 text-[#0055ce] focus:ring-[#0055ce]"
                  />
                  <span className="text-xs font-bold text-slate-800">Use Custom Egyptian Jobsite / Facility Address</span>
                </label>

                {selectedAddressId === 'custom' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Attention / Receiver Name</label>
                      <input
                        type="text"
                        value={customAddress.fullName}
                        onChange={(e) => setCustomAddress({ ...customAddress, fullName: e.target.value })}
                        placeholder="e.g. Eng. Ahmed Mansour"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Company / Plant Division</label>
                      <input
                        type="text"
                        value={customAddress.company}
                        onChange={(e) => setCustomAddress({ ...customAddress, company: e.target.value })}
                        placeholder="e.g. El Sewedy Heavy Engineering SAE"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Governorate (المحافظة)</label>
                      <select
                        value={customAddress.governorate || customAddress.state || ''}
                        onChange={(e) => setCustomAddress({ ...customAddress, governorate: e.target.value, state: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce] bg-white"
                      >
                        {EGYPT_GOVERNORATES.map((gov) => (
                          <option key={gov} value={gov}>
                            {gov}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">City / Industrial Area (المدينة / المنطقة الصناعية)</label>
                      <input
                        type="text"
                        value={customAddress.city}
                        onChange={(e) => setCustomAddress({ ...customAddress, city: e.target.value })}
                        placeholder="e.g. 10th of Ramadan / 6th of October / Borg El Arab"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">District / Zone (الحي / القطاع)</label>
                      <input
                        type="text"
                        value={customAddress.district || ''}
                        onChange={(e) => setCustomAddress({ ...customAddress, district: e.target.value })}
                        placeholder="e.g. Industrial Zone B3 / 4th Industrial Area"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Building No. / Plot No. (رقم المبنى / القطعة)</label>
                      <input
                        type="text"
                        value={customAddress.buildingNumber || ''}
                        onChange={(e) => setCustomAddress({ ...customAddress, buildingNumber: e.target.value })}
                        placeholder="e.g. Building 18, Plot 42"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Street Address / Receiving Dock Bay</label>
                      <input
                        type="text"
                        value={customAddress.street}
                        onChange={(e) => setCustomAddress({ ...customAddress, street: e.target.value })}
                        placeholder="e.g. Central Logistics Road, Loading Bay B-12"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Nearest Landmark (علامة مميزة)</label>
                      <input
                        type="text"
                        value={customAddress.landmark || ''}
                        onChange={(e) => setCustomAddress({ ...customAddress, landmark: e.target.value })}
                        placeholder="e.g. Near Juhayna Square / Opposite Steel Mill"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Egyptian Contact Phone (رقم الهاتف)</label>
                      <input
                        type="text"
                        value={customAddress.phone}
                        onChange={(e) => setCustomAddress({ ...customAddress, phone: e.target.value })}
                        placeholder="+20 10 XXXX XXXX"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce] font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Special Instructions */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Dock Delivery & Site Receiving Bay Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Gate pass requirement, forklift operator contact, security protocol at industrial zone..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onNavigateCart}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Cart
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Step 2: Commercial Payment & Egyptian Billing Terms</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Select corporate purchase invoicing (Net 30), bank wire transfer, credit card (Meeza/Visa), or Cash on Delivery.</p>
                </div>
                <Lock className="w-5 h-5 text-emerald-600" />
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    id: 'invoice',
                    title: 'Purchase Order (Net 30)',
                    desc: 'Official electronic tax invoice (فاتورة إلكترونية)',
                    icon: <FileText className="w-5 h-5 text-[#0055ce]" />
                  },
                  {
                    id: 'card',
                    title: 'Cards & Meeza (ميزة)',
                    desc: 'Meeza, Visa, Mastercard',
                    icon: <CreditCard className="w-5 h-5 text-amber-500" />
                  },
                  {
                    id: 'wire',
                    title: 'Bank Transfer (NBE / CIB)',
                    desc: 'Direct corporate banking in EGP',
                    icon: <Building className="w-5 h-5 text-emerald-600" />
                  },
                  {
                    id: 'cod',
                    title: 'Cash / Check on Delivery',
                    desc: 'الدفع عند الاستلام بالموقع',
                    icon: <Banknote className="w-5 h-5 text-indigo-600" />
                  }
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-4 rounded-xl border-2 transition cursor-pointer ${
                      paymentMethod === m.id
                        ? 'border-[#0055ce] bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {m.icon}
                      <span className="text-xs font-bold text-slate-900">{m.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{m.desc}</p>
                  </div>
                ))}
              </div>

              {/* PO Invoicing Form */}
              {paymentMethod === 'invoice' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Building className="w-4 h-4 text-[#0055ce]" />
                    <span>Commercial Purchase Order (Net 30 Terms with Egyptian Tax Registration)</span>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Purchase Order (PO) Reference Number (أمر التوريد)
                    </label>
                    <input
                      type="text"
                      value={poNumber}
                      onChange={(e) => setPoNumber(e.target.value)}
                      placeholder="e.g. PO-ELSEWEDY-2026-0881"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:border-[#0055ce] font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    An official electronic tax invoice (فاتورة ضريبية إلكترونية) compliant with ETA (مصلحة الضرائب المصرية) and Net 30 remittance details will be sent to <strong>{user?.email}</strong>.
                  </p>
                </div>
              )}

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>256-Bit Encrypted Card Gateway (Accepts Egyptian Meeza, Visa & Mastercard)</span>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Cardholder Name (الاسم على البطاقة)</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Card Number (رقم البطاقة / ميزة)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">CVC / CVV</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Wire ACH Notice */}
              {paymentMethod === 'wire' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block">FORGE Industrial Egypt Corporate Banking Details:</span>
                  <p className="font-mono text-[11px] text-slate-600 leading-relaxed">
                    Bank: Commercial International Bank (CIB Egypt) / National Bank of Egypt (NBE)<br />
                    Account Name: FORGE Industrial Supplies Egypt SAE (شركة فورج للمهمات الصناعية)<br />
                    IBAN (EGP): EG380002000100000029381029102<br />
                    Commercial Registry (السجل التجاري): 392810 - Cairo<br />
                    Tax Card (البطاقة الضريبية): 582-991-304
                  </p>
                </div>
              )}

              {/* Cash on Delivery Notice */}
              {paymentMethod === 'cod' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block">Cash or Corporate Check on Delivery (الدفع عند الاستلام بالموقع):</span>
                  <p className="text-[11px] text-slate-600">
                    Pay our delivery driver upon equipment inspection at your workshop or plant facility. Official stamped receipt and tax invoice will be handed over on delivery.
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Dock Address
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition cursor-pointer"
                >
                  <span>Review Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Review & Placement */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Step 3: Final Order Authorization</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Verify equipment manifests and delivery destination in Egypt.</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-[#008837]" />
              </div>

              {/* Destination & Payment Summary Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0055ce]" /> Receiving Destination (Egypt)
                    </span>
                    <button onClick={() => setCurrentStep(1)} className="text-[11px] text-[#0055ce] font-semibold hover:underline cursor-pointer">
                      Edit
                    </button>
                  </div>
                  <p className="font-semibold text-slate-800">{getActiveAddress().fullName}</p>
                  <p className="text-slate-600">{getActiveAddress().company}</p>
                  <p className="text-slate-500 mt-1">
                    {getActiveAddress().buildingNumber ? `${getActiveAddress().buildingNumber}, ` : ''}
                    {getActiveAddress().street}, {getActiveAddress().district ? `${getActiveAddress().district}, ` : ''}
                    {getActiveAddress().city}, {getActiveAddress().governorate || getActiveAddress().state}
                  </p>
                  {getActiveAddress().landmark && (
                    <p className="text-[11px] text-slate-500">Landmark: {getActiveAddress().landmark}</p>
                  )}
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{getActiveAddress().phone}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#0055ce]" /> Billing Method
                    </span>
                    <button onClick={() => setCurrentStep(2)} className="text-[11px] text-[#0055ce] font-semibold hover:underline cursor-pointer">
                      Edit
                    </button>
                  </div>
                  <p className="font-semibold text-slate-800 uppercase">{paymentMethod} Terms</p>
                  {paymentMethod === 'invoice' && <p className="font-mono text-slate-600 mt-0.5">PO: {poNumber}</p>}
                  {paymentMethod === 'card' && <p className="font-mono text-slate-600 mt-0.5">Card ending in {cardNumber.slice(-4)}</p>}
                  {paymentMethod === 'wire' && <p className="text-slate-600 mt-0.5">Bank Wire (CIB / NBE)</p>}
                  {paymentMethod === 'cod' && <p className="text-slate-600 mt-0.5">Cash / Check on Delivery (الدفع عند الاستلام)</p>}
                  <p className="text-slate-500 mt-1">Electronic tax invoice billed to corporate accounting</p>
                </div>
              </div>

              {/* Items Table in Review */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Ordered Hardware Manifest ({items.length} SKUs):</span>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-contain mix-blend-multiply bg-white rounded p-1" />
                        <div>
                          <p className="font-semibold text-slate-900 line-clamp-1">{product.name}</p>
                          <span className="text-slate-400 font-mono text-[10px]">SKU: {product.sku} • Qty: {quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold font-mono text-slate-900">{formatEGP(product.price * quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Payment
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 bg-[#008837] hover:bg-[#00702d] active:bg-[#005d25] disabled:opacity-50 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authorizing Logistics Dispatch...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authorize & Place Order ({formatEGP(total)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary (Right 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5 sticky top-24">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Breakdown
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-slate-900">{formatEGP(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Commercial Discount</span>
                  <span className="font-mono font-semibold">-{formatEGP(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery across Egypt</span>
                <span className="font-mono font-semibold text-slate-900">
                  {shipping === 0 ? <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span> : formatEGP(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VAT (14% ضريبة القيمة المضافة)</span>
                <span className="font-mono font-semibold text-slate-900">{formatEGP(tax)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">Authorized Total</span>
                <span className="text-2xl font-black text-slate-900 font-mono">{formatEGP(total)}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Egyptian Commercial Guarantee</span>
              </div>
              <p>
                All purchases are backed by official agency warranties in Egypt and full Egyptian Electronic Tax Invoicing (منظومة الفاتورة الإلكترونية).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

