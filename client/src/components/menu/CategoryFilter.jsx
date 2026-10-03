import React from 'react';

const CategoryFilter = ({ categories = [], selectedCategory = '', onSelectCategory }) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none my-4">
      <button
        onClick={() => onSelectCategory('')}
        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
          selectedCategory === ''
            ? 'bg-slate-900 text-white shadow-md'
            : 'bg-white border border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-600'
        }`}
      >
        All Items
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.name)}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === cat.name
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-600'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
