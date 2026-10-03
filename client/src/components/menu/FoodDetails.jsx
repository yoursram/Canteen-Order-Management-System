import React, { useContext } from 'react';
import Modal from '../common/Modal';
import { CartContext } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Clock, MapPin, Plus, CheckCircle2, XCircle } from 'lucide-react';

const FoodDetails = ({ item, isOpen, onClose }) => {
  const { addToCart } = useContext(CartContext);

  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.name}>
      <div className="space-y-4">
        <div className="h-56 rounded-xl overflow-hidden bg-gray-100 relative">
          <img
            src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center space-x-1">
            <Clock className="w-3 h-3 text-orange-400" />
            <span>{item.preparation_time} mins prep time</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md uppercase">
            {item.category_name}
          </span>
          <span className="text-xs font-semibold flex items-center">
            {item.is_available ? (
              <span className="text-green-600 flex items-center"><CheckCircle2 className="w-4 h-4 mr-1" /> Available in Canteen</span>
            ) : (
              <span className="text-red-500 flex items-center"><XCircle className="w-4 h-4 mr-1" /> Currently Sold Out</span>
            )}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {item.description}
        </p>

        <div className="p-3 bg-gray-50 rounded-xl space-y-1 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>Prepared at: <strong className="text-gray-800">{item.canteen_location || 'Main Canteen'}</strong></span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Item Price</span>
            <span className="text-2xl font-black text-gray-900 font-display">
              {formatCurrency(item.price)}
            </span>
          </div>

          <button
            onClick={() => {
              addToCart(item);
              onClose();
            }}
            disabled={!item.is_available}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 disabled:opacity-40"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FoodDetails;
