import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Utensils, ShoppingBag, Users, BarChart3, Layers } from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    { label: 'Overview Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Order Management', path: '/admin/orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { label: 'Menu Management', path: '/admin/menu', icon: <Utensils className="w-4 h-4" /> },
    { label: 'Categories', path: '/admin/categories', icon: <Layers className="w-4 h-4" /> },
    { label: 'Students & Users', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { label: 'Reports & Sales', path: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] p-4 space-y-6 border-r border-slate-800 shrink-0 hidden md:block">
      <div className="px-3 py-2 bg-slate-800/60 rounded-xl border border-slate-700/50">
        <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">Admin Control Panel</h3>
        <p className="text-[11px] text-slate-400 font-medium">VJIT Canteen Management</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
