import React, { useState, useEffect } from 'react';
import { menuService } from '../../services/menuService';
import FoodTable from '../../components/admin/FoodTable';
import FoodForm from '../../components/admin/FoodForm';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { Utensils, Plus, Search } from 'lucide-react';

const MenuManagement = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchMenuAndCategories = async () => {
    try {
      const [menuRes, catRes] = await Promise.all([
        menuService.getMenuItems({ search }),
        menuService.getCategories()
      ]);

      if (menuRes.success) setItems(menuRes.data.menuItems);
      if (catRes.success) setCategories(catRes.data.categories);
    } catch (error) {
      console.error('Error fetching menu items for admin:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuAndCategories();
  }, [search]);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingItem) {
        await menuService.updateMenuItem(editingItem.id, formData);
      } else {
        await menuService.createMenuItem(formData);
      }
      setIsFormOpen(false);
      setEditingItem(null);
      fetchMenuAndCategories();
    } catch (error) {
      alert(error.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      await menuService.deleteMenuItem(id);
      fetchMenuAndCategories();
    } catch (error) {
      alert(error.message || 'Failed to delete item');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
              <Utensils className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 font-display">Menu Items Management</h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Add, update, or disable South Indian canteen dishes</p>
        </div>

        <Button
          onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
          variant="primary"
          className="shadow-sm font-bold text-xs"
        >
          <Plus className="w-4 h-4 mr-1" />
          <span>Add New Food Item</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter menu items by name..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Food Items Table */}
      {loading ? (
        <Loader text="Loading menu items table..." />
      ) : (
        <FoodTable
          items={items}
          onEdit={(item) => {
            setEditingItem(item);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* Food Form Modal */}
      <FoodForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={editingItem}
        categories={categories}
      />

    </div>
  );
};

export default MenuManagement;
