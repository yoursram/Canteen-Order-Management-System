import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { menuService } from '../../services/menuService';
import FoodGrid from '../../components/menu/FoodGrid';
import FoodDetails from '../../components/menu/FoodDetails';
import Loader from '../../components/common/Loader';
import { Utensils, Sparkles, Clock, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

const Home = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, catRes] = await Promise.all([
          menuService.getMenuItems({ available: true }),
          menuService.getCategories()
        ]);

        if (menuRes.success) {
          // Take first 8 items for homepage popular grid
          setPopularItems(menuRes.data.menuItems.slice(0, 8));
        }

        if (catRes.success) {
          setCategories(catRes.data.categories);
        }
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 rounded-3xl text-white p-8 md:p-12 shadow-xl my-4">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>VJIT Canteen Ordering Portal</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight leading-tight">
            Welcome to VJIT Canteen
          </h1>

          <p className="text-lg font-medium text-amber-100 leading-relaxed">
            Good food. Quick orders. Less waiting. Skip long canteen lines by ordering ahead from your phone!
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="px-6 py-3 bg-white text-orange-600 font-extrabold rounded-2xl shadow-lg hover:bg-orange-50 transition-all flex items-center space-x-2 text-sm"
            >
              <Utensils className="w-4 h-4" />
              <span>Explore Canteen Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Decorative Badge Overlay */}
        <div className="absolute right-4 bottom-4 hidden md:block opacity-20 pointer-events-none">
          <Utensils className="w-64 h-64 text-white" />
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start space-x-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 font-display">Live Prep Estimates</h3>
            <p className="text-xs text-gray-500 mt-1">See exact preparation time for Idli, Dosa, Biryani, and Meals.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 font-display">Pickup Locations</h3>
            <p className="text-xs text-gray-500 mt-1">Choose pickup from Main Canteen Counter, Hostel A, or Hostel B.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 font-display">Simulated Payments</h3>
            <p className="text-xs text-gray-500 mt-1">Pay via Cash, UPI, or Card with instant order confirmation.</p>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900 font-display">Browse Food Categories</h2>
          <Link to="/menu" className="text-xs font-bold text-orange-600 hover:underline">View All Category Menus</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/menu?category=${encodeURIComponent(cat.name)}`}
              className="p-3 bg-white hover:bg-orange-50 rounded-2xl border border-gray-100 hover:border-orange-200 shadow-xs hover:shadow-md text-center transition-all group"
            >
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                {cat.name === 'Breakfast' ? '🥞' :
                 cat.name === 'South Indian Meals' ? '🍱' :
                 cat.name === 'Rice Items' ? '🍲' :
                 cat.name === 'Snacks' ? '🥟' :
                 cat.name === 'Fast Food' ? '🍔' :
                 cat.name === 'Beverages' ? '☕' :
                 cat.name === 'Desserts' ? '🍨' : '🍟'}
              </div>
              <span className="text-xs font-bold text-gray-800 block truncate group-hover:text-orange-600">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's Popular Dishes Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 font-display">Today's Specials & Popular Food</h2>
            <p className="text-xs text-gray-500">Most ordered South Indian delicacies in VJIT campus today</p>
          </div>
          <Link to="/menu" className="text-xs font-bold text-orange-600 hover:underline flex items-center space-x-1">
            <span>Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <Loader text="Fetching fresh menu items..." />
        ) : (
          <FoodGrid items={popularItems} onViewDetails={(food) => setSelectedFood(food)} />
        )}
      </section>

      {/* Food Detail Modal */}
      <FoodDetails
        item={selectedFood}
        isOpen={Boolean(selectedFood)}
        onClose={() => setSelectedFood(null)}
      />

    </div>
  );
};

export default Home;
