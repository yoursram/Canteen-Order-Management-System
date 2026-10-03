import api from './api';

export const adminService = {
  getDashboardStats: async () => {
    return await api.get('/admin/dashboard');
  },
  getAllOrders: async () => {
    return await api.get('/admin/orders');
  },
  updateOrderStatus: async (id, order_status) => {
    return await api.put(`/admin/orders/${id}/status`, { order_status });
  },
  getAllUsers: async () => {
    return await api.get('/users');
  }
};
