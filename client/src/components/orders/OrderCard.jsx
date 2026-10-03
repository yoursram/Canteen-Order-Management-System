import React from 'react';
import { Link } from 'react-router-dom';
import OrderStatus from './OrderStatus';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { MapPin, ArrowRight, CreditCard, ChevronRight } from 'lucide-react';

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-extrabold text-gray-900 font-display">Order #ORD{1000 + order.id}</span>
            <OrderStatus status={order.order_status} />
          </div>
          <span className="text-xs text-gray-400 font-medium block mt-0.5">
            {formatDate(order.created_at)}
          </span>
        </div>

        <Link
          to={`/orders/${order.id}`}
          className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center space-x-1 hover:underline"
        >
          <span>Track Order</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Items Summary Preview */}
      <div className="space-y-1">
        {order.items && order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-xs text-gray-600">
            <span>{item.quantity}x {item.menu_item_name || item.name}</span>
            <span className="font-semibold text-gray-800">{formatCurrency(item.subtotal)}</span>
          </div>
        ))}
      </div>

      {/* Details Bar */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3 text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-medium text-gray-700">{order.pickup_location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CreditCard className="w-3.5 h-3.5 text-blue-500" />
            <span className="uppercase font-semibold text-gray-700">{order.payment_method} ({order.payment_status})</span>
          </div>
        </div>

        <div>
          <span className="text-gray-400 font-medium mr-1">Total:</span>
          <span className="text-sm font-black text-gray-900 font-display">{formatCurrency(order.total_amount)}</span>
        </div>
      </div>

    </div>
  );
};

export default OrderCard;
