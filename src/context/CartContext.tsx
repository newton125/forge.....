import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types';
import { cartService, CartCalculation } from '../services/cartService';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  promoCode?: string;
  loading: boolean;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  applyPromoCode: (code: string) => Promise<void>;
  removePromoCode: () => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartData, setCartData] = useState<CartCalculation>({
    items: [],
    itemCount: 0,
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const { success, error, info } = useToast();

  const refreshCart = useCallback(async () => {
    try {
      const res = await cartService.getCart();
      setCartData(res.data);
    } catch (err) {
      console.error('Failed to load cart', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    try {
      const res = await cartService.addToCart(product, quantity);
      setCartData(res.data);
      success('Added to Equipment Cart', `${quantity}x ${product.name}`);
    } catch (err: any) {
      error('Could not add to cart', err.message);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await cartService.updateQuantity(productId, quantity);
      setCartData(res.data);
    } catch (err: any) {
      error('Failed to update quantity', err.message);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const res = await cartService.removeFromCart(productId);
      setCartData(res.data);
      info('Item Removed', 'Hardware removed from order.');
    } catch (err: any) {
      error('Failed to remove item', err.message);
    }
  };

  const applyPromoCode = async (code: string) => {
    try {
      const res = await cartService.applyPromoCode(code);
      setCartData(res.data);
      success('Promo Discount Applied', res.message);
    } catch (err: any) {
      error('Invalid Promo Code', err.message);
      throw err;
    }
  };

  const removePromoCode = async () => {
    try {
      const res = await cartService.removePromoCode();
      setCartData(res.data);
      info('Promo Removed', 'Discount coupon removed from order.');
    } catch (err: any) {
      error('Failed to remove promo', err.message);
    }
  };

  const clearCart = async () => {
    try {
      const res = await cartService.clearCart();
      setCartData(res.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...cartData,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        applyPromoCode,
        removePromoCode,
        clearCart,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
