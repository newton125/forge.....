import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';
import { getStoredItem, setStoredItem, delay, ApiResponse } from './apiClient';

const WISHLIST_KEY = 'wishlist';

// Seed initial wishlist with 2 items
const INITIAL_WISHLIST: Product[] = [
  PRODUCTS[2], // Fluke Multimeter
  PRODUCTS[5]  // Ingersoll Rand Air Impact Wrench
];

if (!localStorage.getItem(`forge_${WISHLIST_KEY}`)) {
  setStoredItem(WISHLIST_KEY, INITIAL_WISHLIST);
}

export const wishlistService = {
  async getWishlist(): Promise<ApiResponse<Product[]>> {
    await delay(100);
    const items = getStoredItem<Product[]>(WISHLIST_KEY, INITIAL_WISHLIST);
    return {
      data: items,
      success: true
    };
  },

  async toggleWishlist(product: Product): Promise<ApiResponse<{ isInWishlist: boolean; items: Product[] }>> {
    await delay(150);
    let items = getStoredItem<Product[]>(WISHLIST_KEY, INITIAL_WISHLIST);
    const exists = items.some((p) => p.id === product.id);

    if (exists) {
      items = items.filter((p) => p.id !== product.id);
    } else {
      items = [product, ...items];
    }

    setStoredItem(WISHLIST_KEY, items);
    return {
      data: { isInWishlist: !exists, items },
      success: true,
      message: exists
        ? `Removed ${product.name} from saved equipment.`
        : `Saved ${product.name} to equipment wishlist.`
    };
  },

  async removeFromWishlist(productId: string): Promise<ApiResponse<Product[]>> {
    await delay(100);
    let items = getStoredItem<Product[]>(WISHLIST_KEY, INITIAL_WISHLIST);
    items = items.filter((p) => p.id !== productId);
    setStoredItem(WISHLIST_KEY, items);
    return {
      data: items,
      success: true,
      message: 'Item removed from saved list'
    };
  },

  async isInWishlist(productId: string): Promise<boolean> {
    const items = getStoredItem<Product[]>(WISHLIST_KEY, INITIAL_WISHLIST);
    return items.some((p) => p.id === productId);
  }
};
