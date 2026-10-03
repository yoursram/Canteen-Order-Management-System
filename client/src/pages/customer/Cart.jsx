import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, tax, total } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 space-y-4">
        <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto text-3xl">
          🛒
        </div>
        <h2 className="text-2xl font-black text-gray-900 font-display">Your Canteen Cart is Empty</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          You haven't added any items yet. Explore our South Indian canteen menu to place an order.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <Utensils className="w-4 h-4" />
          <span>Browse Canteen Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-3">
          <Link to="/menu" className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-black text-gray-900 font-display">Shopping Cart ({cartItems.length} items)</h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-500 font-bold hover:text-red-700 flex items-center space-x-1"
        >
          <Trash2 className="w-4 h-4" />
          <span>Empty Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart items list */}
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* Summary sidebar */}
        <div>
          <CartSummary subtotal={subtotal} tax={tax} total={total} />
        </div>

      </div>
    </div>
  );
};

export default Cart;
