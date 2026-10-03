import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User, Mail, Phone, GraduationCap, Building2, Calendar, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-black text-gray-900 font-display">Student Profile</h1>
        <p className="text-xs text-gray-500">Academic & personal details registered with VJIT Canteen</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xs space-y-6">
        
        {/* User avatar & title */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-2xl flex items-center justify-center font-display shadow-md">
            {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-display">{user.name}</h2>
            <div className="flex items-center space-x-2 text-xs font-semibold text-orange-600 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{user.role === 'ADMIN' ? 'Canteen Administrator' : 'VJIT Student'}</span>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
            <span className="text-gray-400 font-semibold flex items-center space-x-1">
              <GraduationCap className="w-3.5 h-3.5 text-orange-500" />
              <span>Student Roll ID</span>
            </span>
            <p className="font-extrabold text-sm text-gray-900 font-display">{user.student_id || 'N/A'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
            <span className="text-gray-400 font-semibold flex items-center space-x-1">
              <Building2 className="w-3.5 h-3.5 text-orange-500" />
              <span>Department</span>
            </span>
            <p className="font-extrabold text-sm text-gray-900 font-display">{user.department || 'N/A'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
            <span className="text-gray-400 font-semibold flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              <span>Academic Year & Section</span>
            </span>
            <p className="font-extrabold text-sm text-gray-900 font-display">{user.year || 'N/A'} (Section {user.section || 'A'})</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
            <span className="text-gray-400 font-semibold flex items-center space-x-1">
              <Mail className="w-3.5 h-3.5 text-orange-500" />
              <span>Registered Email</span>
            </span>
            <p className="font-bold text-sm text-gray-900 truncate">{user.email}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
            <span className="text-gray-400 font-semibold flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>Contact Number</span>
            </span>
            <p className="font-bold text-sm text-gray-900">{user.phone}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
            <span className="text-gray-400 font-semibold flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-orange-500" />
              <span>Account Role</span>
            </span>
            <p className="font-bold text-sm text-gray-900">{user.role}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
