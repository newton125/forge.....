import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { wishlistService } from '../services/wishlistService';
import { useToast } from './ToastContext';

interface WishlistContextType {
  items: Product[];
  count: number;
  loading: boolean;
  toggleWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, info, error } = useToast();

  const refreshWishlist = useCallback(async () => {
    try {
      const res = await wishlistService.getWishlist();
      setItems(res.data);
    } catch (err) {
      console.error('Failed to load wishlist', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const toggleWishlist = async (product: Product) => {
    try {
      const res = await wishlistService.toggleWishlist(product);
      setItems(res.data.items);
      if (res.data.isInWishlist) {
        success('Saved to Wishlist', product.name);
      } else {
        info('Removed from Wishlist', product.name);
      }
    } catch (err: any) {
      error('Wishlist Error', err.message);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const res = await wishlistService.removeFromWishlist(productId);
      setItems(res.data);
      info('Item Removed', 'Equipment removed from wishlist.');
    } catch (err: any) {
      error('Error', err.message);
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some((p) => p.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        loading,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
