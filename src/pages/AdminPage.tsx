import React, { useState, useEffect } from 'react';
import { Product, Order, OrderStatus, CategoryId } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import {
  Package,
  Truck,
  DollarSign,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  Layers,
  Users,
  Building,
  Sparkles,
  ArrowUpRight,
  Check,
  X
} from 'lucide-react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { useToast } from '../context/ToastContext';
import { formatEGP } from '../utils/formatters';

interface AdminPageProps {
  onNavigateHome: () => void;
  onSelectProduct: (p: Product) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigateHome, onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'inventory' | 'buyers'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Add / Edit Product Modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<{
    name: string;
    brand: string;
    sku: string;
    category: CategoryId;
    price: number;
    stock: number;
    weight: string;
    description: string;
    featured: boolean;
  }>({
    name: '',
    brand: 'DeWalt Industrial',
    sku: '',
    category: 'power-tools',
    price: 3499,
    stock: 25,
    weight: '2.9 kg',
    description: '',
    featured: false
  });

  const { success, error, info } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        productService.getProducts(),
        orderService.getOrders()
      ]);
      setProducts(prodRes.data);
      setOrders(ordRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      brand: 'DeWalt Industrial',
      sku: `FRG-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'power-tools',
      price: 4299,
      stock: 30,
      weight: '2.5 kg',
      description: 'Industrial grade brushless equipment for high-duty continuous operation in Egyptian facilities.',
      featured: false
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProductForm({
      name: p.name,
      brand: p.brand,
      sku: p.sku,
      category: p.category,
      price: p.price,
      stock: p.stock,
      weight: p.weight,
      description: p.description,
      featured: !!p.featured
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProductId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProductId
            ? {
                ...p,
                ...productForm,
                inStock: productForm.stock > 0
              }
            : p
        )
      );
      success('SKU Updated', `Successfully modified SKU ${productForm.sku}`);
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: productForm.name,
        brand: productForm.brand,
        sku: productForm.sku,
        category: productForm.category,
        price: productForm.price,
        stock: productForm.stock,
        lowStockThreshold: 10,
        inStock: productForm.stock > 0,
        rating: 4.8,
        reviewCount: 1,
        featured: productForm.featured,
        images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'],
        weight: productForm.weight,
        warranty: '3-Year Limited Commercial Warranty',
        description: productForm.description,
        features: [
          'High torque brushless motor design',
          'Heavy gauge industrial housing',
          'Overload thermal protection system'
        ],
        specs: [
          { name: 'Motor', value: 'Brushless High-Output' },
          { name: 'Housing', value: 'Reinforced Composite' }
        ],
        tags: ['industrial', 'heavy-duty']
      };
      setProducts((prev) => [newProduct, ...prev]);
      success('New SKU Registered', `Added ${newProduct.name} to central catalog`);
    }
    setProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    info('SKU Deactivated', `Removed ${name} from active inventory catalog`);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const updated = await orderService.updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated.data : o)));
      success('Logistics Status Updated', `Order ${updated.data.orderNumber} set to ${newStatus}`);
    } catch (err: any) {
      error('Failed to update status', err.message);
    }
  };

  const handleRestock = (productId: string, amount: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stock: p.stock + amount, inStock: true }
          : p
      )
    );
    success('Inventory Restocked', `Added +${amount} units to inventory ledger.`);
  };

  const lowStockProducts = products.filter((p) => p.stock < 15);
  const totalGMV = orders.reduce((sum, o) => sum + o.total, 4850000);

  const corporateBuyers = [
    { name: 'Orascom Construction SAE', contact: 'Ahmed Mansour', spend: 'EGP 3,450,000', creditLine: 'EGP 5,000,000 Net 30', status: 'Active Verified' },
    { name: 'El Sewedy Electric Industrial', contact: 'Tarek El-Sayed', spend: 'EGP 2,180,000', creditLine: 'EGP 4,000,000 Net 30', status: 'Active Verified' },
    { name: 'Hassan Allam Holding', contact: 'Mahmoud Khalil', spend: 'EGP 4,620,000', creditLine: 'EGP 10,000,000 Net 30', status: 'Active Verified' },
    { name: 'Arab Contractors (Osman Ahmed Osman)', contact: 'Youssef El-Gohary', spend: 'EGP 1,940,000', creditLine: 'EGP 3,500,000 Net 30', status: 'Reviewing Terms' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Plant Operations & Admin Portal', active: true }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Admin Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-50 text-[#0055ce] font-bold text-[10px] rounded uppercase">
              Plant Operations
            </span>
            <span className="text-xs text-slate-400 font-mono">Hub ID: EG-CAIRO-CENTRAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Central Distribution & Inventory Control (Egypt)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage live freight dispatch schedules across Egyptian governorates, catalog SKUs, and commercial Net 30 corporate accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAddProduct}
            className="px-4 py-2.5 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Equipment SKU</span>
          </button>
        </div>
      </div>

      {/* 4 Operations Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Gross Procurement Volume</span>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">
              {formatEGP(totalGMV)}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" /> +14.8% vs last month
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-[#0055ce] rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Live Active Orders</span>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">
              {orders.length} Dispatches
            </div>
            <span className="text-[11px] text-slate-400 font-mono mt-1 block">
              99.8% On-Time Carrier SLA
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-[#008837] rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Active Catalog SKUs</span>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">
              {products.length} Products
            </div>
            <span className="text-[11px] text-[#0055ce] font-semibold mt-1 block">
              8 Hardware Categories
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Low Stock Safety Alerts</span>
            <div className="text-2xl font-black text-rose-600 font-mono mt-1">
              {lowStockProducts.length} Items
            </div>
            <span className="text-[11px] text-rose-500 font-semibold mt-1 block">
              Immediate Re-order Recommended
            </span>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Admin Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="flex border-b border-slate-200 px-6 pt-4 space-x-6 overflow-x-auto bg-slate-50/50">
          {[
            { id: 'products', label: `Product Catalog (${products.length})`, icon: <Package className="w-4 h-4" /> },
            { id: 'orders', label: `Logistics & Orders (${orders.length})`, icon: <Truck className="w-4 h-4" /> },
            { id: 'inventory', label: `Inventory Alerts (${lowStockProducts.length})`, icon: <AlertTriangle className="w-4 h-4" /> },
            { id: 'buyers', label: 'Verified Corporate Buyers', icon: <Users className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#0055ce] text-[#0055ce]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: Product Catalog Table */}
        {activeTab === 'products' && (
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative max-w-sm w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search catalog by SKU, name, or brand..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                />
              </div>

              <span className="text-xs text-slate-400">
                Showing {products.filter((p) => p.name.toLowerCase().includes(searchFilter.toLowerCase())).length} SKUs
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <th className="py-3 px-4">Tool / Machine</th>
                    <th className="py-3 px-4">SKU / Brand</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Bay Stock</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products
                    .filter(
                      (p) =>
                        p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        p.sku.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        p.brand.toLowerCase().includes(searchFilter.toLowerCase())
                    )
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-10 h-10 object-contain rounded bg-white p-1 border border-slate-200 mix-blend-multiply"
                            />
                            <div>
                              <div
                                onClick={() => onSelectProduct(p)}
                                className="font-bold text-slate-900 hover:text-[#0055ce] cursor-pointer line-clamp-1"
                              >
                                {p.name}
                              </div>
                              <span className="text-[10px] text-slate-400">{p.weight}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-mono font-semibold text-slate-800">{p.sku}</div>
                          <span className="text-[10px] text-slate-500">{p.brand}</span>
                        </td>
                        <td className="py-3 px-4 capitalize text-slate-700">
                          {p.category.replace('-', ' ')}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {formatEGP(p.price)}
                        </td>
                        <td className="py-3 px-4 font-mono">
                          <span
                            className={`font-bold ${
                              p.stock < 15 ? 'text-rose-600 font-bold' : 'text-slate-800'
                            }`}
                          >
                            {p.stock} units
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {p.stock > 0 ? (
                            <Badge variant="success" size="sm">Available</Badge>
                          ) : (
                            <Badge variant="error" size="sm">Backorder</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-slate-500 hover:text-[#0055ce] hover:bg-blue-50 rounded-md transition cursor-pointer"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition cursor-pointer"
                              title="Delete SKU"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Orders & Dispatch Management */}
        {activeTab === 'orders' && (
          <div className="p-6 space-y-4">
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <th className="py-3 px-4">Order / PO #</th>
                    <th className="py-3 px-4">Company & Receiver</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Manifest</th>
                    <th className="py-3 px-4">Authorized Total</th>
                    <th className="py-3 px-4">Logistics Status</th>
                    <th className="py-3 px-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-slate-900 block">
                          #{o.orderNumber}
                        </span>
                        {o.paymentDetails.purchaseOrderNumber && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            PO: {o.paymentDetails.purchaseOrderNumber}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{o.shippingAddress.company}</div>
                        <div className="text-[10px] text-slate-400">{o.shippingAddress.fullName} ({o.shippingAddress.city}, {o.shippingAddress.governorate || o.shippingAddress.state})</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {o.items.length} SKUs ({o.items.reduce((s, i) => s + i.quantity, 0)} pcs)
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {formatEGP(o.total)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            o.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : o.status === 'Shipped'
                              ? 'bg-blue-50 text-[#0055ce] border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className="bg-slate-50 border border-slate-300 text-slate-800 text-xs py-1 px-2 rounded-lg font-semibold cursor-pointer"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped (In Transit)</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Inventory Alerts */}
        {activeTab === 'inventory' && (
          <div className="p-6 space-y-4">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-rose-900">Safety Threshold Alert Protocol</h4>
                <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">
                  Items below 15 units trigger automatic plant procurement replenishment notices. Click "Instant Restock" to simulate supply chain fulfillment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl border border-rose-200 bg-white flex items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-12 h-12 object-contain bg-slate-50 p-1 rounded border border-slate-200 mix-blend-multiply"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">SKU: {p.sku} • {p.brand}</p>
                      <span className="text-xs font-bold text-rose-600 block mt-1">
                        Only {p.stock} units remaining in bay!
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRestock(p.id, 50)}
                    className="px-3 py-1.5 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-lg shadow-xs transition shrink-0 cursor-pointer"
                  >
                    Restock +50 Units
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Corporate Buyers */}
        {activeTab === 'buyers' && (
          <div className="p-6 space-y-4">
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <th className="py-3 px-4">Corporate Enterprise</th>
                    <th className="py-3 px-4">Primary Buyer</th>
                    <th className="py-3 px-4">YTD Spend</th>
                    <th className="py-3 px-4">Authorized Credit Line</th>
                    <th className="py-3 px-4">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {corporateBuyers.map((b, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{b.name}</td>
                      <td className="py-3 px-4 text-slate-700">{b.contact}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{b.spend}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-[#0055ce]">{b.creditLine}</td>
                      <td className="py-3 px-4">
                        <Badge variant="success" size="sm">{b.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingProductId ? 'Edit Industrial Equipment SKU' : 'Register New Hardware SKU'}
              </h3>
              <button onClick={() => setProductModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Equipment Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 20V MAX Brushless 1/2 in. High Torque Impact Wrench"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Brand / OEM</label>
                  <input
                    type="text"
                    required
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Department</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as CategoryId })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="power-tools">Power Tools</option>
                    <option value="hand-tools">Hand Tools</option>
                    <option value="safety-gear">Safety Gear</option>
                    <option value="welding">Welding</option>
                    <option value="pneumatics">Pneumatics</option>
                    <option value="electrical">Electrical</option>
                    <option value="measuring">Measuring</option>
                    <option value="heavy-machinery">Heavy Machinery</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Unit Price (EGP)</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Gross Weight</label>
                <input
                  type="text"
                  placeholder="e.g. 3.2 kg"
                  value={productForm.weight}
                  onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Engineering Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0055ce]"
                />
                <span className="text-xs text-slate-700 font-semibold">
                  Highlight as Featured Equipment on Homepage
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0055ce] hover:bg-[#0043a8] text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Save SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
