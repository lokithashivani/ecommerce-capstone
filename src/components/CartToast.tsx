import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartToastProps {
  onViewCart: () => void;
}

export const CartToast: React.FC<CartToastProps> = ({ onViewCart }) => {
  const { lastAddedProduct, dismissToast } = useCart();

  if (!lastAddedProduct) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-stone-900 text-white rounded-xl shadow-2xl p-4 border border-stone-800 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">
            Added to your bag
          </p>
          <p className="text-[11px] text-stone-400 truncate">
            {lastAddedProduct.quantity}× {lastAddedProduct.product.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onViewCart}
          className="px-3 py-1.5 bg-white text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Bag</span>
        </button>
        <button
          onClick={dismissToast}
          className="p-1 text-stone-400 hover:text-white rounded"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
