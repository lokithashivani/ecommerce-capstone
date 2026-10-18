import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Wallet, Banknote, ShieldCheck, Printer, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderConfirmation } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: OrderConfirmation) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { cart, subtotal, shipping, discount, total, completeOrder } = useCart();

  const [formData, setFormData] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Portland',
    postalCode: '97201',
    paymentMethod: 'card'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = completeOrder({
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        paymentMethod:
          formData.paymentMethod === 'card'
            ? 'Credit Card (ending 4242)'
            : formData.paymentMethod === 'applepay'
            ? 'Apple Pay / Digital Wallet'
            : 'Cash on Delivery (COD)'
      });
      setIsSubmitting(false);
      setCompletedOrder(order);
      onOrderSuccess(order);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {completedOrder ? 'Order Confirmed' : 'Complete Your Purchase'}
            </h2>
            <p className="text-xs text-stone-500">
              {completedOrder ? 'Thank you for shopping with ShopEase' : 'Enter shipping and payment details'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {completedOrder ? (
            /* Order Confirmation View */
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  Order #{completedOrder.orderId}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Placed on {completedOrder.date} · A confirmation has been recorded
                </p>
              </div>

              {/* Order Receipt Details */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs space-y-3">
                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-stone-200">
                  <div>
                    <span className="text-stone-400 uppercase font-semibold text-[10px]">Recipient</span>
                    <p className="font-semibold text-stone-800 mt-0.5">{completedOrder.customer.fullName}</p>
                    <p className="text-stone-600">{completedOrder.customer.address}</p>
                    <p className="text-stone-600">{completedOrder.customer.city}, {completedOrder.customer.postalCode}</p>
                  </div>
                  <div>
                    <span className="text-stone-400 uppercase font-semibold text-[10px]">Payment & Status</span>
                    <p className="font-semibold text-stone-800 mt-0.5">{completedOrder.customer.paymentMethod}</p>
                    <p className="text-emerald-700 font-semibold mt-1">Status: Processing for Dispatch</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2 pt-1">
                  <span className="text-stone-400 uppercase font-semibold text-[10px]">Purchased Items</span>
                  {completedOrder.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center text-stone-700">
                      <span>{item.quantity}× {item.product.name}</span>
                      <span className="font-semibold tabular-nums text-stone-900">${item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-3 border-t border-stone-200 space-y-1">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="tabular-nums">${completedOrder.subtotal}</span>
                  </div>
                  {completedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount</span>
                      <span className="tabular-nums">-${completedOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping</span>
                    <span>{completedOrder.shipping === 0 ? 'FREE' : `$${completedOrder.shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-200">
                    <span>Total Paid</span>
                    <span className="tabular-nums">${completedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 font-semibold text-xs text-stone-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 font-semibold text-xs text-white transition-colors text-center"
                >
                  Return to Store
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Customer Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Shipping Destination
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-3 border-t border-stone-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Payment Method
                </h3>
                
                <div className="grid grid-cols-3 gap-2">
                  <label
                    className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer text-xs transition-colors ${
                      formData.paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="sr-only"
                    />
                    <CreditCard className="w-5 h-5 mb-1" />
                    <span className="font-medium">Card</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer text-xs transition-colors ${
                      formData.paymentMethod === 'applepay'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="applepay"
                      checked={formData.paymentMethod === 'applepay'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                      className="sr-only"
                    />
                    <Wallet className="w-5 h-5 mb-1" />
                    <span className="font-medium">Digital Wallet</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer text-xs transition-colors ${
                      formData.paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="sr-only"
                    />
                    <Banknote className="w-5 h-5 mb-1" />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Order Total Review */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center text-xs">
                <div>
                  <span className="text-stone-500 font-medium">Order Total to Charge:</span>
                  <p className="text-stone-400 text-[11px]">{cart.length} unique products ({shipping === 0 ? 'Free Shipping' : `+$${shipping} Shipping`})</p>
                </div>
                <span className="text-xl font-bold text-stone-900 tabular-nums">${total}</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Authorizing Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize & Place Order (${total})</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
