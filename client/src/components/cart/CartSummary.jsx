import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ subtotal, tax, total, onCheckout, isCheckoutPage = false }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-orange-100 p-5 shadow-xs space-y-4">
      <h3 className="text-base font-bold text-gray-900 font-display border-b border-gray-100 pb-3">
        Order Price Breakdown
      </h3>

      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-800">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Canteen Tax (5% GST)</span>
          <span className="font-semibold text-gray-800">{formatCurrency(tax)}</span>
        </div>
        <div className="pt-3 border-t border-gray-100 flex justify-between text-sm font-bold text-gray-900">
          <span>Grand Total</span>
          <span className="text-base text-orange-600 font-display">{formatCurrency(total)}</span>
        </div>
      </div>

      {!isCheckoutPage && (
        <button
          onClick={() => {
            if (onCheckout) onCheckout();
            navigate('/checkout');
          }}
          disabled={subtotal === 0}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default CartSummary;
