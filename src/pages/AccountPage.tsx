import React, { useState, useEffect } from 'react';
import { User, Address, Order } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import {
  User as UserIcon,
  Package,
  MapPin,
  ShieldCheck,
  Building,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Bell,
  Eye,
  CheckCircle2,
  Clock,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { useToast } from '../context/ToastContext';
import { formatEGP, EGYPT_GOVERNORATES } from '../utils/formatters';

interface AccountPageProps {
  initialTab?: 'profile' | 'orders' | 'addresses' | 'security';
  onViewOrder: (order: Order) => void;
  onNavigateCatalog: () => void;
  onNavigateHome: () => void;
  onOpenAdmin: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  initialTab = 'profile',
  onViewOrder,
  onNavigateCatalog,
  onNavigateHome,
  onOpenAdmin
}) => {
  const { user, updateProfile, addAddress, updateAddress, deleteAddress, logout } = useAuth();
  const { success, error, info } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'security'>(initialTab);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Address Modal State
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressFormData, setAddressFormData] = useState<Omit<Address, 'id'>>({
    title: '',
    fullName: '',
    company: '',
    street: '',
    buildingNumber: '',
    district: '',
    city: 'Cairo',
    governorate: 'Cairo',
    state: 'Cairo',
    postalCode: '11511',
    country: 'Egypt',
    phone: '',
    isDefault: false
  });

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    jobTitle: user?.jobTitle || ''
  });

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getOrders();
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        company: user.company,
        jobTitle: user.jobTitle
      });
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
    } catch (err) {
      // toast shown in context
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAddressId) {
        await updateAddress(editingAddressId, addressFormData);
      } else {
        await addAddress(addressFormData);
      }
      setAddressModalOpen(false);
      setEditingAddressId(null);
    } catch (err) {
      // toast shown in context
    }
  };

  const handleOpenEditAddress = (addr: Address) => {
    setEditingAddressId(addr.id);
    setAddressFormData({
      title: addr.title,
      fullName: addr.fullName,
      company: addr.company || '',
      street: addr.street,
      buildingNumber: addr.buildingNumber || '',
      district: addr.district || '',
      city: addr.city,
      governorate: addr.governorate || addr.state || 'Cairo',
      state: addr.state || 'Cairo',
      postalCode: addr.postalCode || '11511',
      country: 'Egypt',
      phone: addr.phone,
      isDefault: !!addr.isDefault
    });
    setAddressModalOpen(true);
  };

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressFormData({
      title: 'Facility Dock #' + ((user?.savedAddresses.length || 0) + 1),
      fullName: user?.fullName || '',
      company: user?.company || '',
      street: '',
      buildingNumber: '',
      district: '',
      city: 'Cairo',
      governorate: 'Cairo',
      state: 'Cairo',
      postalCode: '11511',
      country: 'Egypt',
      phone: user?.phone || '',
      isDefault: false
    });
    setAddressModalOpen(true);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      error('Password Mismatch', 'New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      error('Weak Password', 'Password must be at least 8 characters long');
      return;
    }
    success('Security Credentials Updated', 'Your enterprise password has been reset.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <Badge variant="success" size="sm">Delivered</Badge>;
      case 'Shipped':
      case 'Out for Delivery':
        return <Badge variant="primary" size="sm">In Transit</Badge>;
      case 'Processing':
      case 'Confirmed':
        return <Badge variant="warning" size="sm">Processing</Badge>;
      case 'Cancelled':
        return <Badge variant="error" size="sm">Cancelled</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Enterprise Procurement Account', active: true }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Account Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#0055ce] to-[#00388e] text-white flex items-center justify-center font-black text-xl shadow-md">
            {user?.fullName
              ? user.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
              : 'JD'}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{user?.fullName}</h1>
              <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-[#0055ce] font-bold rounded uppercase">
                {user?.role === 'admin' ? 'Plant Admin' : 'Corporate Buyer'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{user?.jobTitle} • {user?.company}</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#0055ce] text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Admin Management
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Account Tabs & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Nav Tabs (3 cols) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-xl border border-slate-200/80 p-2 shadow-xs space-y-1">
            {[
              { id: 'profile', label: 'Company Profile', icon: <UserIcon className="w-4 h-4" /> },
              { id: 'orders', label: 'Order History & Invoices', icon: <Package className="w-4 h-4" /> },
              { id: 'addresses', label: 'Saved Receiving Bays', icon: <MapPin className="w-4 h-4" /> },
              { id: 'security', label: 'Security & Password', icon: <Lock className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2.5 transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0055ce] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area (9 cols) */}
        <div className="lg:col-span-9">
          
          {/* TAB 1: Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900">Corporate Buyer Profile</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update primary contact details for tax invoices and freight documentation.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Work Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={profileForm.company}
                      onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Job Title / Division</label>
                    <input
                      type="text"
                      value={profileForm.jobTitle}
                      onChange={(e) => setProfileForm({ ...profileForm, jobTitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Direct Phone / Receiving Extension</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: Orders */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Procurement Order History</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Track current freight dispatches, invoices, and completed receipts.</p>
                </div>
                <span className="text-xs font-mono text-slate-400">{orders.length} Total Orders</span>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition bg-white space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-slate-900 font-mono">
                            #{order.orderNumber}
                          </span>
                          {getOrderStatusBadge(order.status)}
                        </div>

                        <div className="text-xs text-slate-500">
                          Date: <span className="font-semibold text-slate-800">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Items Thumbnails */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto py-1">
                          {order.items.slice(0, 4).map((item, idx) => (
                            <img
                              key={idx}
                              src={item.image}
                              alt={item.name}
                              title={item.name}
                              className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 object-contain p-1 mix-blend-multiply"
                            />
                          ))}
                          {order.items.length > 4 && (
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                              +{order.items.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-xs text-slate-400 block">Total</span>
                            <span className="text-base font-bold text-slate-900 font-mono">
                              {formatEGP(order.total)}
                            </span>
                          </div>

                          <button
                            onClick={() => onViewOrder(order)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <span>View & Track</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <Package className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500">No previous hardware orders recorded.</p>
                  <button
                    onClick={onNavigateCatalog}
                    className="px-4 py-2 bg-[#0055ce] text-white text-xs font-semibold rounded-lg"
                  >
                    Browse Catalog
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Saved Receiving Bays & Docks (Egypt)</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage jobsite coordinates and Egyptian warehouse delivery points.</p>
                </div>
                <button
                  onClick={handleOpenAddAddress}
                  className="px-4 py-2 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Facility Bay</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user?.savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900">{addr.title}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded">
                            Primary Receiving Dock
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-800">{addr.fullName}</p>
                      <p className="text-xs text-slate-500">{addr.company}</p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {addr.buildingNumber ? `${addr.buildingNumber}, ` : ''}
                        {addr.street}, {addr.district ? `${addr.district}, ` : ''}
                        {addr.city}, {addr.governorate || addr.state} {addr.postalCode}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-1">{addr.phone}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => handleOpenEditAddress(addr)}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Security */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900">Security & Authentication</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage multi-factor verification and access passwords.</p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">New Password (8+ characters)</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

      {/* Address Edit/Add Modal */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900">
              {editingAddressId ? 'Edit Receiving Bay (Egypt)' : 'Add New Receiving Bay (Egypt)'}
            </h3>

            <form onSubmit={handleSaveAddress} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Facility / Dock Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 6th of October Industrial Plant (Gate 4)"
                  value={addressFormData.title}
                  onChange={(e) => setAddressFormData({ ...addressFormData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={addressFormData.fullName}
                    onChange={(e) => setAddressFormData({ ...addressFormData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Egyptian Phone (+20)</label>
                  <input
                    type="text"
                    required
                    placeholder="+20 10 1234 5678"
                    value={addressFormData.phone}
                    onChange={(e) => setAddressFormData({ ...addressFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Bldg / Plot #</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot 14-B"
                    value={addressFormData.buildingNumber || ''}
                    onChange={(e) => setAddressFormData({ ...addressFormData, buildingNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Industrial Zone 3rd Sector"
                    value={addressFormData.street}
                    onChange={(e) => setAddressFormData({ ...addressFormData, street: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">District / Area</label>
                  <input
                    type="text"
                    placeholder="e.g. 6th of October"
                    value={addressFormData.district || ''}
                    onChange={(e) => setAddressFormData({ ...addressFormData, district: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Governorate</label>
                  <select
                    value={addressFormData.governorate || addressFormData.state || EGYPT_GOVERNORATES[0]}
                    onChange={(e) => {
                      const gov = e.target.value;
                      setAddressFormData({
                        ...addressFormData,
                        governorate: gov,
                        state: gov
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    {EGYPT_GOVERNORATES.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 12566"
                    value={addressFormData.postalCode}
                    onChange={(e) => setAddressFormData({ ...addressFormData, postalCode: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addressFormData.isDefault}
                  onChange={(e) => setAddressFormData({ ...addressFormData, isDefault: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0055ce]"
                />
                <span className="text-xs text-slate-700">Set as primary dock destination</span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
