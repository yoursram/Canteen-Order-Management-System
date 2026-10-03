import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { ShoppingBag, IndianRupee, Clock, CheckCircle, Users, Utensils } from 'lucide-react';

const DashboardStats = ({ stats = {} }) => {
  const cards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.total_revenue || 0),
      icon: <IndianRupee className="w-5 h-5 text-emerald-600" />,
      bgColor: 'bg-emerald-50 border-emerald-100'
    },
    {
      title: "Today's Orders",
      value: stats.todays_orders || 0,
      icon: <ShoppingBag className="w-5 h-5 text-blue-600" />,
      bgColor: 'bg-blue-50 border-blue-100'
    },
    {
      title: 'Pending Kitchen Orders',
      value: stats.pending_orders || 0,
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      bgColor: 'bg-amber-50 border-amber-100'
    },
    {
      title: 'Completed Orders',
      value: stats.completed_orders || 0,
      icon: <CheckCircle className="w-5 h-5 text-purple-600" />,
      bgColor: 'bg-purple-50 border-purple-100'
    },
    {
      title: 'Registered Students',
      value: stats.total_students || 0,
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      bgColor: 'bg-indigo-50 border-indigo-100'
    },
    {
      title: 'Active Menu Items',
      value: stats.available_menu_items || 0,
      icon: <Utensils className="w-5 h-5 text-orange-600" />,
      bgColor: 'bg-orange-50 border-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`p-5 rounded-2xl border ${card.bgColor} shadow-xs space-y-2 transition-transform hover:-translate-y-0.5`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600">{card.title}</span>
            <div className="p-2 rounded-xl bg-white shadow-xs">{card.icon}</div>
          </div>
          <div className="text-2xl font-black text-gray-900 font-display">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
