import api from './api';

export const menuService = {
  getMenuItems: async (params) => {
    return await api.get('/menu', { params });
  },
  getMenuItemById: async (id) => {
    return await api.get(`/menu/${id}`);
  },
  getCategories: async () => {
    return await api.get('/categories');
  },
  createMenuItem: async (data) => {
    return await api.post('/menu', data);
  },
  updateMenuItem: async (id, data) => {
    return await api.put(`/menu/${id}`, data);
  },
  deleteMenuItem: async (id) => {
    return await api.delete(`/menu/${id}`);
  },
  createCategory: async (data) => {
    return await api.post('/categories', data);
  },
  updateCategory: async (id, data) => {
    return await api.put(`/categories/${id}`, data);
  },
  deleteCategory: async (id) => {
    return await api.delete(`/categories/${id}`);
  }
};
