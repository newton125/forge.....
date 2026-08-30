import { Order, OrderStatus, Address, PaymentDetails } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';
import { getStoredItem, setStoredItem, delay, ApiResponse } from './apiClient';
import { cartService } from './cartService';

const ORDERS_KEY = 'orders';

if (!localStorage.getItem(`forge_${ORDERS_KEY}`)) {
  setStoredItem(ORDERS_KEY, INITIAL_ORDERS);
}

export interface CreateOrderPayload {
  shippingAddress: Address;
  paymentDetails: PaymentDetails;
  notes?: string;
}

export const orderService = {
  async getOrders(): Promise<ApiResponse<Order[]>> {
    await delay(200);
    const orders = getStoredItem<Order[]>(ORDERS_KEY, INITIAL_ORDERS);
    return {
      data: orders,
      success: true
    };
  },

  async getOrderById(idOrNumber: string): Promise<ApiResponse<Order>> {
    await delay(150);
    const orders = getStoredItem<Order[]>(ORDERS_KEY, INITIAL_ORDERS);
    const order = orders.find(
      (o) => o.id === idOrNumber || o.orderNumber.toLowerCase() === idOrNumber.toLowerCase()
    );
    if (!order) {
      throw new Error(`Order ${idOrNumber} not found.`);
    }
    return {
      data: order,
      success: true
    };
  },

  async createOrder(payload: CreateOrderPayload): Promise<ApiResponse<Order>> {
    await delay(450);
    const cartRes = await cartService.getCart();
    const cart = cartRes.data;

    if (cart.items.length === 0) {
      throw new Error('Your cart is empty. Please add industrial hardware before checking out.');
    }

    const orderNumber = `FRG-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `FX-${Math.floor(100000000 + Math.random() * 900000000)}-US`;

    const now = new Date();
    const estDeliveryDate = new Date();
    estDeliveryDate.setDate(now.getDate() + 4);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: now.toISOString(),
      estimatedDelivery: estDeliveryDate.toISOString().split('T')[0],
      status: 'Confirmed',
      items: cart.items.map((item) => ({
        productId: item.product.id,
        sku: item.product.sku,
        name: item.product.name,
        image: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity
      })),
      shippingAddress: payload.shippingAddress,
      paymentDetails: payload.paymentDetails,
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      tax: cart.tax,
      discount: cart.discount,
      total: cart.total,
      trackingNumber,
      carrier: 'FedEx Freight Industrial Express',
      notes: payload.notes,
      trackingSteps: [
        {
          status: 'Confirmed',
          label: 'Order Placed & Verified',
          description: 'Commercial invoice generated and payment pre-authorized.',
          timestamp: 'Just now',
          completed: true,
          current: true
        },
        {
          status: 'Processing',
          label: 'Warehouse Picked & Packaged',
          description: 'Barcodes verified at FORGE Central Logistics Hub.',
          completed: false
        },
        {
          status: 'Shipped',
          label: 'In Transit via FedEx Freight',
          description: 'Departing main terminal.',
          completed: false
        },
        {
          status: 'Out for Delivery',
          label: 'Out for Delivery',
          description: 'Scheduled with delivery bay truck dispatch.',
          completed: false
        },
        {
          status: 'Delivered',
          label: 'Delivered & Signed',
          description: 'Requires signature from receiving bay manager.',
          completed: false
        }
      ]
    };

    const orders = getStoredItem<Order[]>(ORDERS_KEY, INITIAL_ORDERS);
    setStoredItem(ORDERS_KEY, [newOrder, ...orders]);

    // Clear cart
    await cartService.clearCart();

    return {
      data: newOrder,
      success: true,
      message: `Order ${orderNumber} has been successfully placed!`
    };
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<ApiResponse<Order>> {
    await delay(200);
    const orders = getStoredItem<Order[]>(ORDERS_KEY, INITIAL_ORDERS);
    const index = orders.findIndex((o) => o.id === orderId || o.orderNumber === orderId);
    if (index === -1) {
      throw new Error('Order not found');
    }

    const order = orders[index];
    order.status = status;

    // Update tracking steps to match
    order.trackingSteps = order.trackingSteps.map((step) => {
      const stepIndex = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(step.status);
      const targetIndex = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(status);

      if (stepIndex <= targetIndex) {
        return { ...step, completed: true, current: stepIndex === targetIndex };
      }
      return { ...step, completed: false, current: false };
    });

    orders[index] = order;
    setStoredItem(ORDERS_KEY, orders);

    return {
      data: order,
      success: true,
      message: `Order status updated to ${status}`
    };
  },

  async cancelOrder(orderId: string): Promise<ApiResponse<Order>> {
    await delay(200);
    return this.updateOrderStatus(orderId, 'Cancelled');
  }
};
