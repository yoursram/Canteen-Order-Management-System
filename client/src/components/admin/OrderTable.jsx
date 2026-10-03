import React from 'react';
import OrderStatus from '../orders/OrderStatus';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { ORDER_STEPS } from '../../constants/orderStatus';

const OrderTable = ({ orders = [], onUpdateStatus }) => {
  const allStatuses = [...ORDER_STEPS, 'CANCELLED'];

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-xs">
      <table className="w-full text-left text-xs">
        <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
          <tr>
            <th className="px-4 py-3.5">Order ID</th>
            <th className="px-4 py-3.5">Student Info</th>
            <th className="px-4 py-3.5">Ordered Items</th>
            <th className="px-4 py-3.5">Total & Payment</th>
            <th className="px-4 py-3.5">Pickup Point</th>
            <th className="px-4 py-3.5">Date</th>
            <th className="px-4 py-3.5">Current Status</th>
            <th className="px-4 py-3.5 text-right">Update Lifecycle</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 font-medium">
          {orders.map((ord) => (
            <tr key={ord.id} className="hover:bg-orange-50/30 transition-colors">
              <td className="px-4 py-3 font-bold text-gray-900 font-display">
                #ORD{1000 + ord.id}
              </td>
              <td className="px-4 py-3">
                <div className="font-bold text-gray-900">{ord.user_name}</div>
                <div className="text-[10px] text-gray-500">
                  {ord.student_id || 'N/A'} • {ord.department || 'General'}
                </div>
              </td>
              <td className="px-4 py-3 max-w-xs">
                <div className="space-y-0.5">
                  {ord.items && ord.items.map((item, idx) => (
                    <div key={idx} className="text-[11px] text-gray-700">
                      {item.quantity}x {item.menu_item_name}
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="font-extrabold text-gray-900">{formatCurrency(ord.total_amount)}</div>
                <div className="text-[10px] uppercase font-semibold text-gray-500">
                  {ord.payment_method} ({ord.payment_status})
                </div>
              </td>
              <td className="px-4 py-3 text-gray-700 font-semibold">{ord.pickup_location}</td>
              <td className="px-4 py-3 text-gray-500 text-[11px]">{formatDate(ord.created_at)}</td>
              <td className="px-4 py-3">
                <OrderStatus status={ord.order_status} />
              </td>
              <td className="px-4 py-3 text-right">
                <select
                  value={ord.order_status}
                  onChange={(e) => onUpdateStatus(ord.id, e.target.value)}
                  className="p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800 focus:outline-none focus:border-orange-500"
                >
                  {allStatuses.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
