import React from 'react';
import FoodCard from './FoodCard';

const FoodGrid = ({ items = [], onViewDetails }) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center my-6 space-y-3">
        <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto text-2xl">
          🍲
        </div>
        <h3 className="text-lg font-bold text-gray-800">No Food Items Found</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          We couldn't find any canteen items matching your search or category filter. Try clearing filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
      {items.map((item) => (
        <FoodCard key={item.id} item={item} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default FoodGrid;
