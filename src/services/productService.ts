import { Product, Category, CategoryId } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { getStoredItem, setStoredItem, delay, ApiResponse } from './apiClient';

const PRODUCTS_KEY = 'products';
const CATEGORIES_KEY = 'categories';

// Initialize storage if needed
if (!localStorage.getItem(`forge_${PRODUCTS_KEY}`)) {
  setStoredItem(PRODUCTS_KEY, PRODUCTS);
}
if (!localStorage.getItem(`forge_${CATEGORIES_KEY}`)) {
  setStoredItem(CATEGORIES_KEY, CATEGORIES);
}

export interface ProductQueryParams {
  category?: CategoryId | 'all';
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  minRating?: number;
  brands?: string[];
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

export const productService = {
  async getCategories(): Promise<ApiResponse<Category[]>> {
    await delay(150);
    const categories = getStoredItem<Category[]>(CATEGORIES_KEY, CATEGORIES);
    return {
      data: categories,
      success: true
    };
  },

  async getProducts(params: ProductQueryParams = {}): Promise<ApiResponse<Product[]>> {
    await delay(200);
    let items = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);

    // Filter by Category
    if (params.category && params.category !== 'all') {
      items = items.filter((p) => p.category === params.category);
    }

    // Filter by Search Query
    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by Brands
    if (params.brands && params.brands.length > 0) {
      items = items.filter((p) => params.brands!.includes(p.brand));
    }

    // Filter by Price
    if (params.minPrice !== undefined) {
      items = items.filter((p) => p.price >= params.minPrice!);
    }
    if (params.maxPrice !== undefined) {
      items = items.filter((p) => p.price <= params.maxPrice!);
    }

    // Filter by Stock
    if (params.inStockOnly) {
      items = items.filter((p) => p.inStock && p.stock > 0);
    }

    // Filter by Rating
    if (params.minRating !== undefined && params.minRating > 0) {
      items = items.filter((p) => p.rating >= params.minRating!);
    }

    // Sort
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          items.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          items.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          items.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          items.sort((a, b) => b.id.localeCompare(a.id));
          break;
        case 'featured':
        default:
          items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }
    }

    const total = items.length;
    const page = params.page || 1;
    const limit = params.limit || 24;
    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);

    return {
      data: paginatedItems,
      success: true,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    await delay(150);
    const items = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);
    const product = items.find((p) => p.id === id || p.sku === id);
    if (!product) {
      throw new Error(`Product with ID '${id}' was not found.`);
    }
    return {
      data: product,
      success: true
    };
  },

  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    await delay(150);
    const items = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);
    const featured = items.filter((p) => p.featured || p.bestSeller).slice(0, 6);
    return {
      data: featured,
      success: true
    };
  },

  async getRelatedProducts(productId: string, category: string): Promise<ApiResponse<Product[]>> {
    await delay(150);
    const items = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);
    const related = items
      .filter((p) => p.id !== productId && p.category === category)
      .slice(0, 4);
    return {
      data: related.length ? related : items.filter((p) => p.id !== productId).slice(0, 4),
      success: true
    };
  },

  async createProduct(newProductData: Omit<Product, 'id'>): Promise<ApiResponse<Product>> {
    await delay(300);
    const items = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);
    const newProduct: Product = {
      ...newProductData,
      id: `frg-${Date.now().toString().slice(-6)}`,
      inStock: newProductData.stock > 0
    };
    const updated = [newProduct, ...items];
    setStoredItem(PRODUCTS_KEY, updated);
    return {
      data: newProduct,
      success: true,
      message: 'Product created successfully.'
    };
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<ApiResponse<Product>> {
    await delay(250);
    const items = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);
    const index = items.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Product not found for update');
    }
    const updatedProduct: Product = {
      ...items[index],
      ...updates,
      inStock: (updates.stock !== undefined ? updates.stock : items[index].stock) > 0
    };
    items[index] = updatedProduct;
    setStoredItem(PRODUCTS_KEY, items);
    return {
      data: updatedProduct,
      success: true,
      message: 'Product updated successfully.'
    };
  },

  async deleteProduct(id: string): Promise<ApiResponse<{ id: string }>> {
    await delay(200);
    const items = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);
    const filtered = items.filter((p) => p.id !== id);
    setStoredItem(PRODUCTS_KEY, filtered);
    return {
      data: { id },
      success: true,
      message: 'Product deleted from catalog.'
    };
  },

  async updateStock(id: string, newStock: number): Promise<ApiResponse<Product>> {
    await delay(200);
    const items = getStoredItem<Product[]>(PRODUCTS_KEY, PRODUCTS);
    const index = items.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    items[index].stock = Math.max(0, newStock);
    items[index].inStock = items[index].stock > 0;
    setStoredItem(PRODUCTS_KEY, items);
    return {
      data: items[index],
      success: true,
      message: `Stock level updated to ${items[index].stock} units.`
    };
  }
};
