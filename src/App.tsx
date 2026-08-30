import React, { useState, useEffect, useMemo } from 'react';
import { Product, CategoryId, Order } from './types';
import { PRODUCTS as initialProducts, CATEGORIES as categories } from './data/mockData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { AuthPage } from './pages/AuthPage';
import { AdminPage } from './pages/AdminPage';

type ViewType =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'order-details'
  | 'account'
  | 'wishlist'
  | 'auth'
  | 'admin';

export function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialProducts[0]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [accountTab, setAccountTab] = useState<'profile' | 'orders' | 'addresses' | 'security'>('profile');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleSelectCategory = (catId: CategoryId | 'all') => {
    setSelectedCategory(catId);
    setCurrentView('catalog');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('catalog');
  };

  const handleNavigate = (view: string, payload?: any) => {
    if (payload?.tab) {
      setAccountTab(payload.tab);
    }
    if (view === 'catalog' && payload?.category) {
      setSelectedCategory(payload.category);
    }
    setCurrentView(view as ViewType);
  };

  const handleOrderPlaced = (order: Order) => {
    setLastPlacedOrder(order);
    setCurrentView('order-confirmation');
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrderDetails(order);
    setCurrentView('order-details');
  };

  // Related products for current detail
  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return initialProducts.slice(0, 4);
    return initialProducts
      .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
      .slice(0, 4);
  }, [selectedProduct]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onSelectCategory={handleSelectCategory}
        onNavigate={handleNavigate}
        onOpenCartDrawer={() => setCartDrawerOpen(true)}
      />

      {/* Main App Router View */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            categories={categories}
            featuredProducts={initialProducts}
            onSelectProduct={handleSelectProduct}
            onSelectCategory={handleSelectCategory}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'catalog' && (
          <ProductListPage
            products={initialProducts}
            categories={categories}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onNavigateHome={() => setCurrentView('home')}
            onClearSearch={() => setSearchQuery('')}
          />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            relatedProducts={relatedProducts}
            onSelectProduct={handleSelectProduct}
            onNavigateCatalog={() => setCurrentView('catalog')}
            onNavigateHome={() => setCurrentView('home')}
            onNavigateCheckout={() => setCurrentView('checkout')}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            onNavigateCheckout={() => setCurrentView('checkout')}
            onNavigateCatalog={() => setCurrentView('catalog')}
            onNavigateHome={() => setCurrentView('home')}
            onSelectProduct={handleSelectProduct}
            suggestedProducts={initialProducts.slice(0, 4)}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            onOrderPlaced={handleOrderPlaced}
            onNavigateCart={() => setCurrentView('cart')}
            onNavigateHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'order-confirmation' && lastPlacedOrder && (
          <OrderConfirmationPage
            order={lastPlacedOrder}
            onViewOrderDetails={handleViewOrderDetails}
            onNavigateHome={() => setCurrentView('home')}
            onNavigateCatalog={() => setCurrentView('catalog')}
          />
        )}

        {currentView === 'order-details' && selectedOrderDetails && (
          <OrderDetailsPage
            order={selectedOrderDetails}
            onNavigateOrdersList={() => {
              setAccountTab('orders');
              setCurrentView('account');
            }}
            onNavigateHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'account' && (
          <AccountPage
            initialTab={accountTab}
            onViewOrder={handleViewOrderDetails}
            onNavigateCatalog={() => setCurrentView('catalog')}
            onNavigateHome={() => setCurrentView('home')}
            onOpenAdmin={() => setCurrentView('admin')}
          />
        )}

        {currentView === 'wishlist' && (
          <WishlistPage
            onSelectProduct={handleSelectProduct}
            onNavigateCatalog={() => setCurrentView('catalog')}
            onNavigateHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'auth' && (
          <AuthPage
            initialMode="login"
            onNavigateHome={() => setCurrentView('home')}
            onSuccess={() => setCurrentView('account')}
          />
        )}

        {currentView === 'admin' && (
          <AdminPage
            onNavigateHome={() => setCurrentView('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      {/* Global Slide-Out Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onNavigateCart={() => setCurrentView('cart')}
        onNavigateCheckout={() => setCurrentView('checkout')}
        onSelectProduct={handleSelectProduct}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
