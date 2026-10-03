import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Loader from '../../components/common/Loader';
import { formatCurrency } from '../../utils/formatCurrency';
import { BarChart3, TrendingUp, DollarSign, Award, Layers } from 'lucide-react';

const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        console.error('Error fetching sales reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <Loader text="Generating comprehensive sales reports..." />;

  return (
    <div className="space-y-8 pb-12">
      
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 font-display">Sales & Performance Analytics</h1>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">Comprehensive financial and item demand analytics for VJIT Canteen</p>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md space-y-1">
          <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">Gross Canteen Revenue</span>
          <div className="text-3xl font-black font-display">{formatCurrency(data?.stats.total_revenue || 0)}</div>
          <p className="text-[11px] text-emerald-100 pt-2 border-t border-white/20">From completed & paid customer orders</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-md space-y-1">
          <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider">Total Orders Processed</span>
          <div className="text-3xl font-black font-display">{data?.stats.total_orders || 0}</div>
          <p className="text-[11px] text-blue-100 pt-2 border-t border-white/20">Today's Orders: {data?.stats.todays_orders || 0}</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl shadow-md space-y-1">
          <span className="text-xs font-semibold text-amber-100 uppercase tracking-wider">Fulfillment Rate</span>
          <div className="text-3xl font-black font-display">
            {data?.stats.total_orders
              ? `${Math.round(((data.stats.completed_orders || 0) / data.stats.total_orders) * 100)}%`
              : '100%'}
          </div>
          <p className="text-[11px] text-amber-100 pt-2 border-t border-white/20">Completed: {data?.stats.completed_orders || 0} orders</p>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Popular Food Demand Ranking */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 font-display flex items-center space-x-2 border-b border-gray-100 pb-3">
            <Award className="w-5 h-5 text-orange-500" />
            <span>Most In-Demand Food Items</span>
          </h3>

          <div className="space-y-3">
            {data?.popularItems && data.popularItems.map((item, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-xs">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-gray-900">{item.name}</div>
                    <div className="text-gray-500">{formatCurrency(item.price)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-orange-600 text-sm">{item.total_quantity_sold} Units Sold</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Revenue Contribution */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 font-display flex items-center space-x-2 border-b border-gray-100 pb-3">
            <Layers className="w-5 h-5 text-amber-500" />
            <span>Revenue Breakdown by Food Category</span>
          </h3>

          <div className="space-y-3">
            {data?.salesByCategory && data.salesByCategory.map((cat, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{cat.category_name}</span>
                  <span className="text-orange-600">{formatCurrency(cat.category_revenue)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>Items Sold: {cat.total_items_sold}</span>
                  <span>
                    Share: {Math.round((cat.category_revenue / (data.stats.total_revenue || 1)) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Reports;
