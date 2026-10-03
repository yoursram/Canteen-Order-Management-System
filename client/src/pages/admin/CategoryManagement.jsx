import React, { useState, useEffect } from 'react';
import { menuService } from '../../services/menuService';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { Layers, Plus, Edit2, Trash2 } from 'lucide-react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await menuService.getCategories();
      if (res.success) setCategories(res.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (cat = null) => {
    setEditingCategory(cat);
    setName(cat ? cat.name : '');
    setDescription(cat ? cat.description : '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await menuService.updateCategory(editingCategory.id, { name, description });
      } else {
        await menuService.createCategory({ name, description });
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      alert(error.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete category?')) return;
    try {
      await menuService.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      alert(error.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 font-display">Category Management</h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Manage canteen menu food categories</p>
        </div>

        <Button onClick={() => handleOpenModal()} variant="primary" className="text-xs font-bold shadow-sm">
          <Plus className="w-4 h-4 mr-1" />
          <span>Add Category</span>
        </Button>
      </div>

      {loading ? (
        <Loader text="Loading categories..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 font-display text-sm">{cat.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
              </div>
              <div className="flex items-center space-x-1 shrink-0 ml-4">
                <button onClick={() => handleOpenModal(cat)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCategory ? 'Edit Category' : 'Add Category'}>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Category Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Combos"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Category overview..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="pt-4 border-t flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Category</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
