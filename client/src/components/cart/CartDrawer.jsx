import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { X, ShoppingBag, Trash2 } from 'lucide-react';

const CartDrawer = () => {
  const {
    cartItems,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    tax,
    total
  } = useContext(CartContext);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-orange-50/50">
            <div className="flex items-center space-x-2 text-gray-900 font-bold font-display text-base">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
              <span>Your Food Cart</span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-orange-200 text-orange-800 rounded-full">
                {cartItems.length} items
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center space-x-1 p-1 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  🛒
                </div>
                <h4 className="text-sm font-bold text-gray-700">Your cart is empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Browse the VJIT Canteen menu and add your favorite South Indian dishes.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))
            )}
          </div>

          {/* Drawer Footer / Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              <CartSummary
                subtotal={subtotal}
                tax={tax}
                total={total}
                onCheckout={() => setIsDrawerOpen(false)}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
