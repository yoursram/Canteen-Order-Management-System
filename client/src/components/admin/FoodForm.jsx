import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

const FoodForm = ({ isOpen, onClose, onSubmit, initialData = null, categories = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: categories[0]?.id || 1,
    canteen_location: 'Main Canteen',
    preparation_time: 15,
    image_url: '',
    is_available: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        category_id: initialData.category_id || categories[0]?.id || 1,
        canteen_location: initialData.canteen_location || 'Main Canteen',
        preparation_time: initialData.preparation_time || 15,
        image_url: initialData.image_url || '',
        is_available: initialData.is_available !== undefined ? initialData.is_available : true
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: categories[0]?.id || 1,
        canteen_location: 'Main Canteen',
        preparation_time: 15,
        image_url: '',
        is_available: true
      });
    }
  }, [initialData, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Canteen Food Item' : 'Add New Food Item'}>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Item Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Masala Dosa"
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Category *</label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Price (₹) *</label>
            <input
              type="number"
              step="0.5"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="50.00"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Canteen Location</label>
            <select
              value={formData.canteen_location}
              onChange={(e) => setFormData({ ...formData, canteen_location: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
            >
              <option value="Main Canteen">Main Canteen</option>
              <option value="Hostel Canteen">Hostel Canteen</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Prep Time (minutes)</label>
            <input
              type="number"
              value={formData.preparation_time}
              onChange={(e) => setFormData({ ...formData, preparation_time: parseInt(e.target.value) })}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief item description..."
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input
            type="checkbox"
            id="is_available"
            checked={formData.is_available}
            onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
            className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
          />
          <label htmlFor="is_available" className="font-semibold text-gray-800">
            Currently Available for Ordering
          </label>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">
            {initialData ? 'Update Item' : 'Save Item'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FoodForm;
