import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Loader from '../../components/common/Loader';
import { Users, Search, GraduationCap } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminService.getAllUsers();
        if (res.success) {
          setUsers(res.data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    (u.student_id && u.student_id.toLowerCase().includes(search.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(search.toLowerCase())) ||
    (u.department && u.department.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 font-display">Student & User Management</h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Registered VJIT students and admin accounts</p>
        </div>

        <div className="relative max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, roll ID, department..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {loading ? (
        <Loader text="Loading registered students..." />
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="px-4 py-3.5">Student / User</th>
                <th className="px-4 py-3.5">Student ID</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Year & Section</th>
                <th className="px-4 py-3.5">Contact Phone</th>
                <th className="px-4 py-3.5">Role</th>
                <th className="px-4 py-3.5">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-bold text-gray-900">{u.name}</div>
                    <div className="text-[10px] text-gray-400">{u.email}</div>
                  </td>
                  <td className="px-4 py-3 font-bold text-orange-600">{u.student_id || 'N/A'}</td>
                  <td className="px-4 py-3 text-gray-800 font-semibold">{u.department || 'N/A'}</td>
                  <td className="px-4 py-3 text-gray-600">{u.year ? `${u.year} (Sec ${u.section})` : 'N/A'}</td>
                  <td className="px-4 py-3 text-gray-700">{u.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-[11px]">{formatDate(u.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default UserManagement;
