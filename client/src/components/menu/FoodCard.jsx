import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Clock, Plus, MapPin, CheckCircle2, XCircle } from 'lucide-react';

const FoodCard = ({ item, onViewDetails }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Food Image with Badges */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Preparation Time Pill */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center space-x-1">
          <Clock className="w-3 h-3 text-orange-400" />
          <span>{item.preparation_time || 15} mins</span>
        </div>

        {/* Canteen Location Pill */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-800 text-[11px] px-2.5 py-1 rounded-full font-semibold flex items-center space-x-1 shadow-sm">
          <MapPin className="w-3 h-3 text-orange-500" />
          <span>{item.canteen_location || 'Main Canteen'}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded">
              {item.category_name || 'Canteen Special'}
            </span>
            <span className="flex items-center space-x-1 text-xs">
              {item.is_available ? (
                <span className="text-green-600 font-semibold flex items-center"><CheckCircle2 className="w-3 h-3 mr-0.5" /> In Stock</span>
              ) : (
                <span className="text-red-500 font-semibold flex items-center"><XCircle className="w-3 h-3 mr-0.5" /> Sold Out</span>
              )}
            </span>
          </div>

          <h3
            onClick={() => onViewDetails && onViewDetails(item)}
            className="text-base font-bold text-gray-900 font-display hover:text-orange-600 cursor-pointer line-clamp-1 transition-colors"
          >
            {item.name}
          </h3>
          
          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Footer Price & Add Button */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Price</span>
            <span className="text-lg font-extrabold text-gray-900 font-display">
              {formatCurrency(item.price)}
            </span>
          </div>

          <button
            onClick={() => addToCart(item)}
            disabled={!item.is_available}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center space-x-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FoodCard;
