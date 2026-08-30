import React, { useState, useRef, useEffect } from 'react';
import { ForgeLogo } from '../common/ForgeLogo';
import {
  Search,
  ShoppingCart,
  Heart,
  User as UserIcon,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Zap,
  Package,
  Layers,
  LogOut,
  MapPin,
  Flame,
  Wrench,
  Activity,
  Cpu,
  Wind
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { CategoryId } from '../../types';
import { formatEGP } from '../../utils/formatters';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, payload?: any) => void;
  onSearch: (query: string) => void;
  onSelectCategory: (catId: CategoryId | 'all') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onSearch,
  onSelectCategory
}) => {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const { itemCount: cartCount, subtotal } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setShowCategoryMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      onNavigate('catalog');
    }
  };

  const categoriesList: { id: CategoryId; name: string; icon: React.ReactNode }[] = [
    { id: 'power-tools', name: 'Power Tools', icon: <Zap className="w-4 h-4 text-amber-500" /> },
    { id: 'hand-tools', name: 'Hand Tools', icon: <Wrench className="w-4 h-4 text-blue-500" /> },
    { id: 'safety-gear', name: 'Safety & PPE', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
    { id: 'welding', name: 'Welding & Cutting', icon: <Flame className="w-4 h-4 text-orange-500" /> },
    { id: 'pneumatics', name: 'Pneumatics & Air', icon: <Wind className="w-4 h-4 text-sky-500" /> },
    { id: 'electrical', name: 'Electrical & Testing', icon: <Activity className="w-4 h-4 text-violet-500" /> },
    { id: 'machinery', name: 'Heavy Machinery', icon: <Cpu className="w-4 h-4 text-slate-600" /> }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigate('home');
              }}
              className="flex items-center gap-2 group cursor-pointer focus:outline-hidden hover:opacity-95 transition-opacity"
              aria-label="FORGE Homepage"
            >
              <ForgeLogo variant="horizontal" size="md" tagline="PROFESSIONAL TOOLS" theme="light" />
            </button>
          </div>

          {/* Search Form (Desktop & Tablet) */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by part number, SKU, manufacturer, or spec (e.g. 20V Brushless, Fluke, Miller)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-24 py-2.5 text-sm bg-[#fcf9f8] border border-slate-200 hover:border-slate-300 focus:border-[#0055ce] focus:bg-white rounded-xl transition duration-150 focus:outline-hidden shadow-2xs font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3.5 py-1.5 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-semibold rounded-lg transition shadow-xs cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist */}
            <button
              onClick={() => onNavigate('wishlist')}
              className={`p-2.5 rounded-xl border relative transition cursor-pointer ${
                currentView === 'wishlist'
                  ? 'bg-blue-50 border-blue-200 text-[#0055ce]'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              aria-label="View Wishlist"
              title="Saved Hardware"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => onNavigate('cart')}
              className={`p-2.5 rounded-xl border relative flex items-center gap-2 transition cursor-pointer ${
                currentView === 'cart'
                  ? 'bg-blue-50 border-blue-200 text-[#0055ce]'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              aria-label="View Cart"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0055ce] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
              <span className="hidden xl:inline text-xs font-bold font-mono text-slate-900">
                {formatEGP(subtotal)}
              </span>
            </button>

            {/* User Account / Sign In Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
                aria-label="User Account Menu"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                    {user?.fullName ? user.fullName.substring(0, 2).toUpperCase() : <UserIcon className="w-4 h-4" />}
                  </div>
                )}

                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {isAuthenticated ? user?.fullName.split(' ')[0] : 'Sign In'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium leading-none">
                    {user?.role === 'admin' ? 'Admin Portal' : 'My Account'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-semibold text-slate-900">{user?.fullName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                        <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 bg-blue-50 text-[#0055ce] font-semibold rounded uppercase">
                          {user?.role} Account
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            onNavigate('account', { tab: 'profile' });
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <UserIcon className="w-4 h-4 text-slate-400" />
                          <span>Enterprise Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            onNavigate('account', { tab: 'orders' });
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <Package className="w-4 h-4 text-slate-400" />
                          <span>Order History & Invoices</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            onNavigate('account', { tab: 'addresses' });
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>Saved Facilities / Docks</span>
                        </button>
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            onNavigate('admin');
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-[#0055ce] hover:bg-blue-50/50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <Layers className="w-4 h-4 text-[#0055ce]" />
                          <span>Open Admin Dashboard</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            logout();
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3">
                      <p className="text-xs text-slate-600 mb-3">
                        Sign in for B2B wholesale pricing, tax-exempt purchasing, and real-time shipment tracking.
                      </p>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigate('auth', { mode: 'signin' });
                        }}
                        className="w-full py-2 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-semibold rounded-lg transition text-center cursor-pointer"
                      >
                        Sign In / Register
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 md:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Secondary Category Subnav (Desktop) */}
        <div className="hidden md:flex items-center justify-between border-t border-slate-100 py-2.5 text-xs font-medium">
          <div className="flex items-center gap-1 overflow-x-auto">
            
            {/* All Equipment Dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Departments</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {showCategoryMenu && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onSelectCategory('all');
                      onNavigate('catalog');
                      setShowCategoryMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-900 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>Browse Entire Catalog</span>
                    <span className="text-[10px] text-slate-400">3,500+ items</span>
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  {categoriesList.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        onNavigate('catalog');
                        setShowCategoryMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-blue-50/60 hover:text-[#0055ce] flex items-center gap-2.5 cursor-pointer"
                    >
                      {cat.icon}
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Direct Links */}
            {categoriesList.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onNavigate('catalog');
                }}
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-[#0055ce] hover:bg-blue-50/50 transition whitespace-nowrap cursor-pointer"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }}>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                type="text"
                placeholder="Search part number, brand, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-20 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
              />
              <button
                type="submit"
                className="absolute right-1 px-3 py-1 bg-[#0055ce] text-white text-xs font-semibold rounded-md"
              >
                Search
              </button>
            </div>
          </form>

          {/* Mobile Categories */}
          <div className="space-y-1 pt-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Browse Categories
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigate('catalog');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-[#0055ce] hover:bg-blue-50 rounded-lg"
            >
              All Hardware & Equipment
            </button>
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onNavigate('catalog');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Mobile Navigation Links */}
          <div className="border-t border-slate-100 pt-3 space-y-1">
            <button
              onClick={() => {
                onNavigate('account', { tab: 'orders' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
            >
              <Package className="w-4 h-4 text-slate-400" />
              <span>Track Orders & Invoices</span>
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-[#0055ce] hover:bg-blue-50 rounded-lg flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Admin Management Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
