import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Tag, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartViewProps {
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
  onSelectProduct: (productId: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  onContinueShopping,
  onProceedToCheckout,
  onSelectProduct
}) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    discount,
    appliedPromo,
    promoError,
    applyPromo,
    removePromo,
    total,
    cartCount
  } = useCart();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromo(promoInput)) {
      setPromoInput('');
    }
  };

  const freeShippingTarget = 150;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingTarget) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingTarget - subtotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900">Your shopping bag is empty</h2>
        <p className="text-sm text-stone-600 mt-2 max-w-sm mx-auto">
          Explore our collection of precision audio, watches, backpacks, and home goods.
        </p>
        <button
          onClick={onContinueShopping}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Catalog</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-3">
        <div>
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Shopping Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        {/* Free Shipping Calculation */}
        <div className="bg-stone-100 p-3 rounded-xl border border-stone-200 text-xs text-stone-700 max-w-xs sm:text-right">
          {amountNeededForFreeShipping > 0 ? (
            <div>
              Add <span className="font-bold text-stone-900 tabular-nums">${amountNeededForFreeShipping}</span> more for <span className="font-semibold text-stone-900">Free Shipping</span>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-stone-900 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="text-emerald-700 font-semibold flex items-center sm:justify-end gap-1.5">
              <Check className="w-4 h-4" />
              <span>You've unlocked Free Shipping!</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Cart Itemized List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {cart.map((item) => (
              <div key={item.product.id} className="py-5 flex gap-4 sm:gap-6 items-center">
                {/* Thumbnail */}
                <div
                  onClick={() => onSelectProduct(item.product.id)}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => onSelectProduct(item.product.id)}
                      className="text-left font-semibold text-sm sm:text-base text-stone-900 hover:text-stone-700 truncate"
                    >
                      {item.product.name}
                    </button>
                    <span className="font-bold text-sm sm:text-base text-stone-900 tabular-nums shrink-0">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500">
                    Category: <span className="font-medium text-stone-700">{item.product.category}</span>
                  </p>
                  <p className="text-xs text-stone-500 tabular-nums">
                    ${item.product.price} each
                  </p>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold tabular-nums text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stockCount}
                        className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-40 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-rose-600 transition-colors py-1 px-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-stone-500">
            <span>Prices include applicable sales taxes.</span>
            <button
              onClick={onContinueShopping}
              className="text-stone-900 underline hover:text-stone-700"
            >
              Add more items
            </button>
          </div>
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
            Order Summary
          </h2>

          {/* Pricing Breakdown */}
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900 tabular-nums">${subtotal}</span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {shipping === 0 ? (
                  <span className="text-emerald-700">FREE</span>
                ) : (
                  `$${shipping}`
                )}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Discount ({appliedPromo})</span>
                <span className="tabular-nums">-${discount}</span>
              </div>
            )}

            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-stone-900">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-stone-900 tabular-nums">
                  ${total}
                </span>
                <p className="text-[11px] text-stone-400">USD</p>
              </div>
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="pt-3 border-t border-stone-100">
            {appliedPromo ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo applied: <strong>{appliedPromo}</strong></span>
                </div>
                <button
                  onClick={removePromo}
                  className="text-emerald-800 hover:text-emerald-950 underline font-semibold text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 block">
                  Have a Promo or Student Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. STUDENT20"
                    className="flex-grow px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 uppercase placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-xs text-rose-600 mt-1">{promoError}</p>
                )}
                <p className="text-[11px] text-stone-500">
                  Tip: Use <strong>STUDENT20</strong> for 20% off or <strong>SHOPEASE10</strong> for 10% off.
                </p>
              </form>
            )}
          </div>

          {/* Checkout CTA */}
          <button
            onClick={onProceedToCheckout}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-stone-900 hover:bg-stone-800 flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-sm"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-stone-500 text-center">
            <ShieldCheck className="w-4 h-4 text-stone-700" />
            <span>Encrypted 256-bit secure checkout</span>
          </div>

        </div>

      </div>

    </div>
  );
};
