import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';

const FoodTable = ({ items = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-xs">
      <table className="w-full text-left text-xs">
        <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
          <tr>
            <th className="px-4 py-3.5">Item</th>
            <th className="px-4 py-3.5">Category</th>
            <th className="px-4 py-3.5">Price</th>
            <th className="px-4 py-3.5">Location</th>
            <th className="px-4 py-3.5">Prep Time</th>
            <th className="px-4 py-3.5">Status</th>
            <th className="px-4 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 font-medium">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
              <td className="px-4 py-3 flex items-center space-x-3">
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-lg shrink-0"
                />
                <div>
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-[10px] text-gray-400 line-clamp-1">{item.description}</div>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold text-gray-700">
                  {item.category_name}
                </span>
              </td>
              <td className="px-4 py-3 font-bold text-gray-900">{formatCurrency(item.price)}</td>
              <td className="px-4 py-3 text-gray-600">{item.canteen_location}</td>
              <td className="px-4 py-3 text-gray-600">{item.preparation_time} mins</td>
              <td className="px-4 py-3">
                {item.is_available ? (
                  <span className="inline-flex items-center text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-semibold border border-green-200">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-green-600" /> Available
                  </span>
                ) : (
                  <span className="inline-flex items-center text-red-700 bg-red-50 px-2 py-0.5 rounded-full font-semibold border border-red-200">
                    <XCircle className="w-3 h-3 mr-1 text-red-500" /> Unavailable
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-right space-x-1">
                <button
                  onClick={() => onEdit(item)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit item"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodTable;
