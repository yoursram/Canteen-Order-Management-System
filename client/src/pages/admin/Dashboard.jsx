import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import DashboardStats from '../../components/admin/DashboardStats';
import Loader from '../../components/common/Loader';
import { formatCurrency } from '../../utils/formatCurrency';
import { LayoutDashboard, Flame, Layers, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        console.error('Error fetching admin dashboard metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loader text="Computing canteen statistics & sales reports..." />;

  return (
    <div className="space-y-8 pb-12">
      
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 font-display">Canteen Admin Dashboard</h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">VJIT Canteen operational metrics, orders, and sales overview</p>
        </div>

        <Link
          to="/admin/orders"
          className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 shadow-sm"
        >
          View Incoming Orders
        </Link>
      </div>

      {/* KPI Stats Cards */}
      <DashboardStats stats={data?.stats} />

      {/* Popular Food & Sales Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Popular Food Items Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900 font-display flex items-center space-x-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Top Popular Canteen Dishes</span>
            </h3>
            <span className="text-[11px] font-semibold text-gray-400">By Quantity Sold</span>
          </div>

          <div className="divide-y divide-gray-100">
            {data?.popularItems && data.popularItems.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{item.name}</div>
                    <div className="text-[10px] text-gray-400">{formatCurrency(item.price)} per unit</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-orange-600 block">{item.total_quantity_sold} sold</span>
                  <span className="text-[10px] text-gray-400">{item.order_count} orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Sales Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900 font-display flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Sales Revenue by Category</span>
            </h3>
            <span className="text-[11px] font-semibold text-gray-400">INR</span>
          </div>

          <div className="space-y-3">
            {data?.salesByCategory && data.salesByCategory.map((cat, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-800">{cat.category_name}</span>
                  <span className="text-gray-900 font-bold">{formatCurrency(cat.category_revenue)}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (cat.category_revenue / (data.stats.total_revenue || 1)) * 100)}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
