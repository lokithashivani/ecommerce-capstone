import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, OrderConfirmation } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  appliedPromo: string | null;
  promoError: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  total: number;
  lastAddedProduct: { product: Product; quantity: number } | null;
  dismissToast: () => void;
  completeOrder: (customer: OrderConfirmation['customer']) => OrderConfirmation;
  recentOrders: OrderConfirmation[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopease_cart_v1';
const ORDERS_STORAGE_KEY = 'shopease_orders_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [lastAddedProduct, setLastAddedProduct] = useState<{ product: Product; quantity: number } | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderConfirmation[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Persist orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(recentOrders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [recentOrders]);

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (!lastAddedProduct) return;
    const timer = setTimeout(() => {
      setLastAddedProduct(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [lastAddedProduct]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(next[existingIndex].quantity + quantity, product.stockCount);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty,
          selectedColor: selectedColor || next[existingIndex].selectedColor
        };
        return next;
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stockCount), selectedColor }];
    });

    setLastAddedProduct({ product, quantity });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const clampedQty = Math.min(quantity, item.product.stockCount);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setPromoError(null);
  };

  const dismissToast = () => setLastAddedProduct(null);

  const applyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setPromoError('Please enter a coupon code.');
      return false;
    }
    if (clean === 'STUDENT20') {
      setAppliedPromo('STUDENT20');
      setPromoError(null);
      return true;
    }
    if (clean === 'SHOPEASE10' || clean === 'WELCOME10') {
      setAppliedPromo(clean);
      setPromoError(null);
      return true;
    }
    setPromoError('Invalid coupon code. Try STUDENT20 or SHOPEASE10.');
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Free shipping threshold: $150
  const shipping = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 15;

  let discountRate = 0;
  if (appliedPromo === 'STUDENT20') {
    discountRate = 0.2;
  } else if (appliedPromo === 'SHOPEASE10' || appliedPromo === 'WELCOME10') {
    discountRate = 0.1;
  }
  const discount = Math.round(subtotal * discountRate);
  const total = Math.max(0, subtotal - discount + shipping);

  const completeOrder = (customer: OrderConfirmation['customer']): OrderConfirmation => {
    const confirmation: OrderConfirmation = {
      orderId: `SE-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cart],
      subtotal,
      shipping,
      discount,
      total,
      customer
    };

    setRecentOrders((prev) => [confirmation, ...prev]);
    clearCart();
    return confirmation;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        discount,
        appliedPromo,
        promoError,
        applyPromo,
        removePromo,
        total,
        lastAddedProduct,
        dismissToast,
        completeOrder,
        recentOrders
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
