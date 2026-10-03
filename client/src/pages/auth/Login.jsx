import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { Utensils, KeyRound, Mail, AlertCircle, ShieldCheck, UserCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      if (data.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Failed to login. Please check email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    setEmail('admin@collegecanteen.com');
    setPassword('Admin@123');
  };

  const handleDemoStudent = () => {
    setEmail('ramkumar@student.com');
    setPassword('Student@123');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-100">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-orange-100 p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white mx-auto shadow-md">
            <Utensils className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 font-display">VJIT Canteen</h2>
          <p className="text-xs text-gray-500 font-medium">Sign in to order food or manage canteen operations</p>
        </div>

        {/* Demo Quick Fill Buttons */}
        <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/60 space-y-2">
          <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider text-center">Quick Demo Login Shortcuts</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoStudent}
              className="px-3 py-1.5 bg-white text-amber-900 border border-amber-200 rounded-xl text-xs font-bold hover:bg-amber-100 flex items-center justify-center space-x-1 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-orange-600" />
              <span>Student Account</span>
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center justify-center space-x-1 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Admin Account</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ramkumar@student.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 focus:bg-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full py-3 text-sm font-bold shadow-md"
          >
            {loading ? 'Authenticating...' : 'Sign In to Account'}
          </Button>
        </form>

        {/* Footer link */}
        <div className="text-center text-xs text-gray-500 font-medium">
          New VJIT Student?{' '}
          <Link to="/register" className="text-orange-600 font-bold hover:underline">
            Create Student Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
