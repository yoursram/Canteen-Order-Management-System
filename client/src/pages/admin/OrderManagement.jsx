import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import OrderTable from '../../components/admin/OrderTable';
import Loader from '../../components/common/Loader';
import { ShoppingBag, RefreshCw } from 'lucide-react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAllOrders();
      if (res.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.error('Error loading admin orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      alert(error.message || 'Failed to update order status');
    }
  };

  const filteredOrders = filterStatus
    ? orders.filter((o) => o.order_status === filterStatus)
    : orders;

  return (
    <div className="space-y-6 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 font-display">Incoming Kitchen & Order Management</h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Real-time order fulfillment & status updating portal</p>
        </div>

        <button
          onClick={fetchOrders}
          className="px-3.5 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
          <span>Refresh Live Queue</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {['', 'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterStatus === st
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            {st === '' ? 'All Orders' : st}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader text="Fetching kitchen queue..." />
      ) : (
        <OrderTable orders={filteredOrders} onUpdateStatus={handleUpdateStatus} />
      )}

    </div>
  );
};

export default OrderManagement;
