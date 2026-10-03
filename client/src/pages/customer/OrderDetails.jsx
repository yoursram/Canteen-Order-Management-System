import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import OrderTimeline from '../../components/orders/OrderTimeline';
import OrderStatus from '../../components/orders/OrderStatus';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { ArrowLeft, Clock, MapPin, CreditCard, User, AlertCircle } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState('');

  const fetchOrderDetails = async () => {
    try {
      const res = await orderService.getOrderById(id);
      if (res.success) {
        setOrder(res.data.order);
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError(err.message || 'Unable to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    // Auto polling every 10 seconds for live order status updates
    const interval = setInterval(fetchOrderDetails, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    try {
      const res = await orderService.cancelOrder(id);
      if (res.success) {
        setOrder(res.data.order);
      }
    } catch (err) {
      alert(err.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Loader text="Loading live order status tracker..." />;

  if (error || !order) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="text-xl font-bold text-gray-900">Order Not Found</h3>
        <p className="text-xs text-gray-500">{error || 'Could not locate order details.'}</p>
        <Link to="/orders" className="text-xs font-bold text-orange-600 hover:underline">Back to Orders</Link>
      </div>
    );
  }

  const maxPrepTime = order.items
    ? Math.max(...order.items.map((i) => i.preparation_time || 15))
    : 15;

  const canCancel = order.order_status === 'PENDING' || order.order_status === 'CONFIRMED';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Back button & Title */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-3">
          <Link to="/orders" className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-gray-900 font-display">Order #ORD{1000 + order.id}</h1>
              <OrderStatus status={order.order_status} />
            </div>
            <span className="text-xs text-gray-500 font-medium">Placed on {formatDate(order.created_at)}</span>
          </div>
        </div>

        {canCancel && (
          <Button
            variant="danger"
            size="sm"
            disabled={cancelling}
            onClick={handleCancelOrder}
          >
            {cancelling ? 'Cancelling...' : 'Cancel Order'}
          </Button>
        )}
      </div>

      {/* Live Timeline Tracker */}
      <OrderTimeline currentStatus={order.order_status} />

      {/* Estimated Prep Banner */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-orange-500 text-white rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-orange-950 uppercase tracking-wider">Estimated Preparation Time</h4>
            <p className="text-sm font-extrabold text-orange-900">Approximately {maxPrepTime} minutes</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
            Pickup at {order.pickup_location}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ordered items breakdown */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900 font-display border-b border-gray-100 pb-2">
            Items Ordered
          </h3>

          <div className="divide-y divide-gray-100">
            {order.items && order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'}
                    alt={item.menu_item_name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{item.menu_item_name}</div>
                    <div className="text-gray-500">{formatCurrency(item.price)} x {item.quantity}</div>
                  </div>
                </div>
                <div className="font-extrabold text-gray-900">{formatCurrency(item.subtotal)}</div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Canteen Tax (5% GST):</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm text-gray-900 pt-2 border-t border-gray-100">
              <span>Grand Total:</span>
              <span className="text-orange-600 font-display">{formatCurrency(order.total_amount)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          
          {/* Pickup Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-2 text-xs">
            <h4 className="font-bold text-gray-900 font-display flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Pickup Counter</span>
            </h4>
            <p className="font-bold text-gray-800 text-sm">{order.pickup_location}</p>
            <p className="text-gray-500">Show Order #ORD{1000 + order.id} at the counter upon pickup.</p>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-2 text-xs">
            <h4 className="font-bold text-gray-900 font-display flex items-center space-x-1.5">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span>Payment Details</span>
            </h4>
            <div className="space-y-1 text-gray-700">
              <div className="flex justify-between">
                <span>Method:</span>
                <span className="font-bold">{order.payment_method}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span className="font-bold uppercase text-orange-600">{order.payment_status}</span>
              </div>
              {order.payment?.transaction_id && (
                <div className="flex justify-between font-mono text-[10px] text-gray-500 pt-1 border-t">
                  <span>Txn ID:</span>
                  <span>{order.payment.transaction_id}</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
