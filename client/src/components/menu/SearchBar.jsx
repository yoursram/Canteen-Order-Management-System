import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm = '', onChangeSearch }) => {
  return (
    <div className="relative max-w-md w-full my-2">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onChangeSearch(e.target.value)}
        placeholder="Search dosa, biryani, coffee, meals..."
        className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all shadow-xs"
      />
      {searchTerm && (
        <button
          onClick={() => onChangeSearch('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
