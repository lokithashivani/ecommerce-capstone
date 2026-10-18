/**
 * ShopEase - Shopping Cart Module
 * Handles local persistence, item additions, quantity management, discounts, and totals.
 */

const CART_KEY = 'shopease_cart_vanilla_v1';

let cartItems = [];
let appliedCoupon = null;

try {
  const saved = localStorage.getItem(CART_KEY);
  if (saved) cartItems = JSON.parse(saved);
} catch (e) {
  cartItems = [];
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (e) {
    console.error('Failed to save cart', e);
  }
  updateBadge();
}

function updateBadge() {
  const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const badgeEls = document.querySelectorAll('.cart-badge');
  badgeEls.forEach((el) => {
    el.textContent = count;
  });
}

function showToast(message) {
  let toast = document.getElementById('shopease-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'shopease-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1c1917;
      color: #fafaf9;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: opacity 0.2s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="location.hash='#/cart'" style="background:#ffffff; color:#1c1917; border:none; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:600; cursor:pointer;">View Bag</button>
  `;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
  }, 3200);
}

window.ShopEaseCart = {
  add: (productId, quantity = 1) => {
    const product = window.ShopEaseProducts.getById(productId);
    if (!product) return;

    const existing = cartItems.find((i) => i.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cartItems.push({ id: productId, quantity });
    }
    saveCart();
    showToast(`Added ${product.name} to your bag`);
    if (location.hash === '#/cart' && window.ShopEaseApp) {
      window.ShopEaseApp.renderCart();
    }
  },

  remove: (productId) => {
    cartItems = cartItems.filter((i) => i.id !== productId);
    saveCart();
    if (window.ShopEaseApp) {
      window.ShopEaseApp.renderCart();
    }
  },

  updateQty: (productId, quantity) => {
    if (quantity <= 0) {
      window.ShopEaseCart.remove(productId);
      return;
    }
    const item = cartItems.find((i) => i.id === productId);
    if (item) {
      item.quantity = quantity;
      saveCart();
      if (window.ShopEaseApp) {
        window.ShopEaseApp.renderCart();
      }
    }
  },

  clear: () => {
    cartItems = [];
    appliedCoupon = null;
    saveCart();
    if (window.ShopEaseApp) {
      window.ShopEaseApp.renderCart();
    }
  },

  getItems: () => {
    return cartItems.map((item) => ({
      ...item,
      product: window.ShopEaseProducts.getById(item.id)
    })).filter((i) => i.product !== null);
  },

  getCount: () => cartItems.reduce((acc, item) => acc + item.quantity, 0),

  getSubtotal: () => {
    const items = window.ShopEaseCart.getItems();
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  },

  applyCoupon: (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'STUDENT20') {
      appliedCoupon = { code: 'STUDENT20', rate: 0.2 };
      return { success: true, message: 'Student discount (20% OFF) applied!' };
    }
    if (clean === 'SHOPEASE10') {
      appliedCoupon = { code: 'SHOPEASE10', rate: 0.1 };
      return { success: true, message: 'Promo discount (10% OFF) applied!' };
    }
    return { success: false, message: 'Invalid code. Try STUDENT20 or SHOPEASE10.' };
  },

  getCoupon: () => appliedCoupon,

  updateBadge: updateBadge
};

// Initial badge update on load
document.addEventListener('DOMContentLoaded', updateBadge);
