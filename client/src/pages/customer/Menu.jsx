import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { menuService } from '../../services/menuService';
import FoodGrid from '../../components/menu/FoodGrid';
import CategoryFilter from '../../components/menu/CategoryFilter';
import SearchBar from '../../components/menu/SearchBar';
import FoodDetails from '../../components/menu/FoodDetails';
import Loader from '../../components/common/Loader';
import { Utensils } from 'lucide-react';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await menuService.getCategories();
        if (res.success) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory) params.category = selectedCategory;
        if (searchTerm) params.search = searchTerm;

        const res = await menuService.getMenuItems(params);
        if (res.success) {
          setMenuItems(res.data.menuItems);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [selectedCategory, searchTerm]);

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    if (categoryName) {
      setSearchParams({ category: categoryName });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Menu Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
              <Utensils className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 font-display">VJIT Canteen Menu</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">Browse fresh South Indian dishes, hot beverages, meals, and snacks.</p>
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onChangeSearch={setSearchTerm} />
      </div>

      {/* Category Pills Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
        <span>
          Showing <strong className="text-gray-900 font-bold">{menuItems.length}</strong> canteen items
          {selectedCategory && ` in '${selectedCategory}'`}
        </span>
      </div>

      {/* Food Grid */}
      {loading ? (
        <Loader text="Loading delicious canteen food items..." />
      ) : (
        <FoodGrid items={menuItems} onViewDetails={(food) => setSelectedFood(food)} />
      )}

      {/* Food Detail Specs Modal */}
      <FoodDetails
        item={selectedFood}
        isOpen={Boolean(selectedFood)}
        onClose={() => setSelectedFood(null)}
      />

    </div>
  );
};

export default Menu;
