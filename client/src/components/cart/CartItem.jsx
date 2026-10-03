import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 space-x-3">
      
      {/* Thumbnail */}
      <img
        src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'}
        alt={item.name}
        className="w-14 h-14 object-cover rounded-lg shrink-0"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-gray-900 truncate font-display">{item.name}</h4>
        <p className="text-xs font-medium text-gray-500">{formatCurrency(item.price)} each</p>
        <p className="text-xs font-bold text-orange-600 mt-0.5">{formatCurrency(parseFloat(item.price) * item.quantity)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-lg p-1">
        <button
          onClick={() => onUpdateQuantity(item.id, -1)}
          className="p-1 hover:bg-gray-100 rounded text-gray-600 transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-xs font-bold w-5 text-center text-gray-800">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, 1)}
          className="p-1 hover:bg-gray-100 rounded text-gray-600 transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        title="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </button>

    </div>
  );
};

export default CartItem;
