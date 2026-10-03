import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CartContext } from '../../context/CartContext';
import { ShoppingBag, Utensils, LogOut, User, LayoutDashboard, Clock } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItemCount, setIsDrawerOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-xl tracking-tight text-gray-900 font-display">VJIT</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-semibold uppercase tracking-wider">Canteen</span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium hidden sm:block">Digital Food Ordering System</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Home</Link>
          <Link to="/menu" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Menu</Link>

          {user && !isAdmin && (
            <Link to="/orders" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>My Orders</span>
            </Link>
          )}

          {isAdmin && (
            <Link to="/admin/dashboard" className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center space-x-1.5 px-3 py-1.5 bg-orange-50 rounded-lg border border-orange-200">
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>
          )}
        </nav>

        {/* Right Side Actions: Cart & Auth */}
        <div className="flex items-center space-x-4">
          
          {/* Cart Icon */}
          {!isAdmin && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
              title="View Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItemCount}
                </span>
              )}
            </button>
          )}

          {/* User Account Controls */}
          {user ? (
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                <div className="text-[11px] text-gray-500 font-medium">
                  {isAdmin ? 'Canteen Admin' : `${user.student_id || 'Student'} • ${user.department || ''}`}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-sm hover:shadow transition-all"
              >
                Register
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
