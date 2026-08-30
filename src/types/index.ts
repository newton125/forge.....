export type CategoryId = 
  | 'power-tools' 
  | 'hand-tools' 
  | 'safety-gear' 
  | 'welding' 
  | 'fasteners' 
  | 'machinery' 
  | 'electrical' 
  | 'pneumatics';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  itemCount: number;
  image: string;
}

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  company?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  stock: number;
  lowStockThreshold: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  specs: ProductSpec[];
  tags: string[];
  warranty: string;
  weight: string;
  dimensions?: string;
  certifications?: string[];
  leadTime?: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 
  | 'Pending' 
  | 'Processing' 
  | 'Confirmed' 
  | 'Shipped' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'Cancelled';

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current?: boolean;
}

export interface OrderItem {
  productId: string;
  sku: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  company?: string;
  governorate?: string;
  city: string;
  district?: string;
  street: string;
  buildingNumber?: string;
  apartmentOrSuite?: string;
  landmark?: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
}

export interface PaymentDetails {
  method: 'card' | 'invoice' | 'cod' | 'wire';
  cardLast4?: string;
  cardBrand?: string;
  purchaseOrderNumber?: string;
  billingAddressSameAsShipping: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  estimatedDelivery: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  paymentDetails: PaymentDetails;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  trackingNumber: string;
  carrier: string;
  trackingSteps: TrackingStep[];
  notes?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  role: 'customer' | 'admin';
  avatar?: string;
  savedAddresses: Address[];
  preferences: {
    orderUpdatesEmail: boolean;
    orderUpdatesSms: boolean;
    promotionalOffers: boolean;
    inventoryAlerts: boolean;
  };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  joinedDate: string;
  status: 'Active' | 'Inactive' | 'VIP';
  avatarInitials: string;
}

export interface FilterState {
  search: string;
  category: CategoryId | 'all';
  brands: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  minRating: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

export interface AdminDashboardStats {
  totalRevenue: number;
  revenueGrowthPercentage: number;
  pendingOrdersCount: number;
  lowStockItemsCount: number;
  totalCustomersCount: number;
  newCustomersCount: number;
  totalProductsCount: number;
}

export interface InventoryItemSummary {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  minThreshold: number;
  reorderQuantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastRestocked: string;
}
