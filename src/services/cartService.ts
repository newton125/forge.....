import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/mockData';
import { getStoredItem, setStoredItem, delay, ApiResponse } from './apiClient';

const CART_KEY = 'cart_items';
const PROMO_KEY = 'cart_promo';

// Seed initial cart with 1 high-demand product so the cart page is immediately demonstrative
const INITIAL_CART: CartItem[] = [
  {
    product: PRODUCTS[0], // DeWalt 20V Max Drill
    quantity: 2
  },
  {
    product: PRODUCTS[4], // 3M Respirator
    quantity: 4
  }
];

if (!localStorage.getItem(`forge_${CART_KEY}`)) {
  setStoredItem(CART_KEY, INITIAL_CART);
}

export interface CartCalculation {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  promoCode?: string;
  shipping: number;
  tax: number;
  total: number;
}

export const cartService = {
  async getCart(): Promise<ApiResponse<CartCalculation>> {
    await delay(100);
    const items = getStoredItem<CartItem[]>(CART_KEY, INITIAL_CART);
    const promoCode = getStoredItem<string | null>(PROMO_KEY, 'FORGEPRO');
    return {
      data: this.calculateCart(items, promoCode || undefined),
      success: true
    };
  },

  calculateCart(items: CartItem[], promoCode?: string): CartCalculation {
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    let discount = 0;
    if (promoCode) {
      const code = promoCode.toUpperCase().trim();
      if (code === 'FORGEPRO' || code === 'PRO50') {
        discount = Math.min(1500, subtotal * 0.15); // 1,500 EGP max or 15%
      } else if (code === 'SUMMER20' || code === 'SAVE20') {
        discount = subtotal * 0.20;
      } else if (code === 'FREESHIP') {
        discount = 150.00;
      }
    }

    // Free delivery on orders over 2,000 EGP across Egypt
    const shipping = subtotal >= 2000 || subtotal === 0 ? 0 : 150.00;
    const taxableAmount = Math.max(0, subtotal - discount);
    // Egyptian standard VAT is 14%
    const tax = Number((taxableAmount * 0.14).toFixed(2));
    const total = Number((taxableAmount + shipping + tax).toFixed(2));

    return {
      items,
      itemCount,
      subtotal,
      discount,
      promoCode,
      shipping,
      tax,
      total
    };
  },

  async addToCart(product: Product, quantity: number = 1): Promise<ApiResponse<CartCalculation>> {
    await delay(150);
    const items = getStoredItem<CartItem[]>(CART_KEY, INITIAL_CART);
    const promoCode = getStoredItem<string | null>(PROMO_KEY, null);

    const existingIndex = items.findIndex((i) => i.product.id === product.id);
    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    setStoredItem(CART_KEY, items);
    return {
      data: this.calculateCart(items, promoCode || undefined),
      success: true,
      message: `Added ${product.name} to your equipment order.`
    };
  },

  async updateQuantity(productId: string, quantity: number): Promise<ApiResponse<CartCalculation>> {
    await delay(150);
    let items = getStoredItem<CartItem[]>(CART_KEY, INITIAL_CART);
    const promoCode = getStoredItem<string | null>(PROMO_KEY, null);

    if (quantity <= 0) {
      items = items.filter((i) => i.product.id !== productId);
    } else {
      items = items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    }

    setStoredItem(CART_KEY, items);
    return {
      data: this.calculateCart(items, promoCode || undefined),
      success: true
    };
  },

  async removeFromCart(productId: string): Promise<ApiResponse<CartCalculation>> {
    await delay(150);
    const items = getStoredItem<CartItem[]>(CART_KEY, INITIAL_CART).filter(
      (i) => i.product.id !== productId
    );
    const promoCode = getStoredItem<string | null>(PROMO_KEY, null);
    setStoredItem(CART_KEY, items);
    return {
      data: this.calculateCart(items, promoCode || undefined),
      success: true,
      message: 'Item removed from order'
    };
  },

  async applyPromoCode(code: string): Promise<ApiResponse<CartCalculation>> {
    await delay(200);
    const validCodes = ['FORGEPRO', 'PRO50', 'SUMMER20', 'SAVE20', 'FREESHIP'];
    const formatted = code.toUpperCase().trim();

    if (!validCodes.includes(formatted)) {
      throw new Error(`Promo code "${code}" is invalid or expired for industrial orders.`);
    }

    setStoredItem(PROMO_KEY, formatted);
    const items = getStoredItem<CartItem[]>(CART_KEY, INITIAL_CART);
    return {
      data: this.calculateCart(items, formatted),
      success: true,
      message: `Commercial promo code "${formatted}" applied successfully!`
    };
  },

  async removePromoCode(): Promise<ApiResponse<CartCalculation>> {
    await delay(100);
    localStorage.removeItem(`forge_${PROMO_KEY}`);
    const items = getStoredItem<CartItem[]>(CART_KEY, INITIAL_CART);
    return {
      data: this.calculateCart(items, undefined),
      success: true
    };
  },

  async clearCart(): Promise<ApiResponse<CartCalculation>> {
    await delay(100);
    setStoredItem(CART_KEY, []);
    localStorage.removeItem(`forge_${PROMO_KEY}`);
    return {
      data: this.calculateCart([], undefined),
      success: true
    };
  }
};
