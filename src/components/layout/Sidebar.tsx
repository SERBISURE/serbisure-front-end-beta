import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    FileCheck,
    Briefcase,
    Search,
    UserCircle,
    FileText,
    LogOut,
    ShieldCheck,
    MessageSquare,
    AlertTriangle
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const getLinks = () => {
        switch (user.role) {
            case 'admin':
                return [
                    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
                    { to: '/admin/verification', icon: ShieldCheck, label: 'Verification' },
                    { to: '/admin/users', icon: Users, label: 'User Management' },
                ];
            case 'worker':
                return [
                    { to: '/worker/profile', icon: UserCircle, label: 'My Portfolio' },
                    { to: '/worker/documents', icon: FileCheck, label: 'Documents' },
                    { to: '/messages', icon: MessageSquare, label: 'Messages' },
                ];
            case 'employer':
                return [
                    { to: '/employer/search', icon: Search, label: 'Find Workers' },
                    { to: '/employer/jobs', icon: Briefcase, label: 'My Job Postings' },
                    { to: '/messages', icon: MessageSquare, label: 'Messages' },
                ];
            default:
                return [];
        }
    };

    return (
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col fixed left-0 top-0 z-30">
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                        <ShieldCheck size={24} />
                    </div>
                    <span className="text-xl font-bold text-slate-800">Serbisure</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 pl-1">Trusted Domestic Care</p>
            </div>

            <div className="p-4 flex-1">
                <div className="mb-6">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">Using as {user.role}</p>
                    <nav className="space-y-1">
                        {getLinks().map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to.split('/').length === 2}
                                className={({ isActive }) => clsx(
                                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                )}
                            >
                                <link.icon size={18} />
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">Safety & Support</p>
                    <nav className="space-y-1">
                        <NavLink
                            to="/report-incident"
                            className={({ isActive }) => clsx(
                                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left',
                                isActive ? 'bg-rose-50 text-rose-700' : 'text-rose-600 hover:bg-rose-50'
                            )}
                        >
                            <AlertTriangle size={18} />
                            Report Incident
                        </NavLink>
                        <NavLink
                            to="/terms"
                            className={({ isActive }) => clsx(
                                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            )}
                        >
                            <FileText size={18} />
                            Code of Conduct
                        </NavLink>
                    </nav>
                </div>
            </div>

            <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 px-3 mb-4">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-primary-100"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
