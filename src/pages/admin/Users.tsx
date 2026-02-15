import React, { useState } from 'react';
import { MOCK_USERS } from '../../data/mock';
import Button from '../../components/ui/Button';
import { Search, MoreVertical, Shield, Ban } from 'lucide-react';
import clsx from 'clsx';

const AdminUsers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<'all' | 'worker' | 'employer' | 'admin'>('all');

    const filteredUsers = MOCK_USERS.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                    <p className="text-slate-500 text-sm">Manage accounts, roles, and permissions.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { }}>Export Data</Button>
                    <Button size="sm" onClick={() => { }}>Add User</Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value as 'all' | 'worker' | 'employer' | 'admin')}
                        >
                            <option value="all">All Roles</option>
                            <option value="worker">Workers</option>
                            <option value="employer">Employers</option>
                            <option value="admin">Admins</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-500 text-sm">
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Access</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-medium text-slate-900">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={clsx(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                                            user.role === 'admin' && "bg-purple-100 text-purple-800",
                                            user.role === 'worker' && "bg-blue-100 text-blue-800",
                                            user.role === 'employer' && "bg-amber-100 text-amber-800",
                                        )}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            {' '}Active
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-500">
                                        Full Access
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1 hover:bg-slate-200 rounded text-slate-500" title="Manage Permissions">
                                                <Shield size={16} />
                                            </button>
                                            <button className="p-1 hover:bg-rose-100 hover:text-rose-600 rounded text-slate-500" title="Suspend User">
                                                <Ban size={16} />
                                            </button>
                                            <button className="p-1 hover:bg-slate-200 rounded text-slate-500">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className="p-8 text-center text-slate-400">
                            No users found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
