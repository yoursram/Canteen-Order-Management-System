import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import OrderCard from '../../components/orders/OrderCard';
import Loader from '../../components/common/Loader';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getUserOrders();
        if (res.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error('Error loading student orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-2 border-b border-gray-200 pb-4">
        <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 font-display">My Order History</h1>
          <p className="text-xs text-gray-500">Track current canteen orders and view previous order receipts</p>
        </div>
      </div>

      {loading ? (
        <Loader text="Fetching your canteen orders..." />
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-3">
          <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto text-2xl">
            📋
          </div>
          <h3 className="text-lg font-bold text-gray-800">No Orders Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            You haven't placed any canteen orders yet. Hungry? Check out the menu!
          </p>
          <Link
            to="/menu"
            className="inline-block px-5 py-2.5 bg-orange-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-orange-700"
          >
            Go to Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <OrderCard key={ord.id} order={ord} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
