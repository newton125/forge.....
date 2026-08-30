import {
  AdminDashboardStats,
  Customer,
  InventoryItemSummary,
  Order,
  Product
} from '../types';
import {
  INITIAL_ADMIN_STATS,
  INITIAL_CUSTOMERS,
  PRODUCTS,
  INITIAL_ORDERS
} from '../data/mockData';
import { getStoredItem, setStoredItem, delay, ApiResponse } from './apiClient';

const STATS_KEY = 'admin_stats';
const CUSTOMERS_KEY = 'customers';
const ORDERS_KEY = 'orders';
const PRODUCTS_KEY = 'products';

if (!localStorage.getItem(`forge_${STATS_KEY}`)) {
  setStoredItem(STATS_KEY, INITIAL_ADMIN_STATS);
}
if (!localStorage.getItem(`forge_${CUSTOMERS_KEY}`)) {
  setStoredItem(CUSTOMERS_KEY, INITIAL_CUSTOMERS);
}

export const adminService = {
  async getDashboardStats(): Promise<ApiResponse<AdminDashboardStats>> {
    await delay(150);
    const products = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);
    const orders = getStoredItem<Order[]>(ORDERS_KEY, INITIAL_ORDERS);
    const customers = getStoredItem<Customer[]>(CUSTOMERS_KEY, INITIAL_CUSTOMERS);

    const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;
    const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing' || o.status === 'Confirmed').length;
    const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.total : sum), 2439000);

    const stats: AdminDashboardStats = {
      totalRevenue,
      revenueGrowthPercentage: 14.8,
      pendingOrdersCount: pendingOrdersCount + 140,
      lowStockItemsCount: lowStockCount,
      totalCustomersCount: customers.length + 1835,
      newCustomersCount: 84,
      totalProductsCount: products.length
    };

    return {
      data: stats,
      success: true
    };
  },

  async getCustomers(searchQuery?: string): Promise<ApiResponse<Customer[]>> {
    await delay(150);
    let customers = getStoredItem<Customer[]>(CUSTOMERS_KEY, INITIAL_CUSTOMERS);
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      customers = customers.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q)
      );
    }
    return {
      data: customers,
      success: true
    };
  },

  async getInventory(): Promise<ApiResponse<InventoryItemSummary[]>> {
    await delay(150);
    const products = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);
    const inventory: InventoryItemSummary[] = products.map((p) => {
      let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
      if (p.stock === 0) status = 'Out of Stock';
      else if (p.stock <= p.lowStockThreshold) status = 'Low Stock';

      return {
        id: p.id,
        sku: p.sku,
        name: p.name,
        category: p.category,
        stock: p.stock,
        minThreshold: p.lowStockThreshold,
        reorderQuantity: 50,
        status,
        lastRestocked: '2026-08-20'
      };
    });

    return {
      data: inventory,
      success: true
    };
  },

  async quickRestock(productId: string, quantityToAdd: number): Promise<ApiResponse<{ id: string; newStock: number }>> {
    await delay(200);
    const products = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);
    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) {
      throw new Error('Product not found in inventory');
    }
    products[index].stock += quantityToAdd;
    products[index].inStock = products[index].stock > 0;
    setStoredItem(PRODUCTS_KEY, products);

    return {
      data: { id: productId, newStock: products[index].stock },
      success: true,
      message: `Successfully restocked ${quantityToAdd} units for SKU ${products[index].sku}.`
    };
  }
};
