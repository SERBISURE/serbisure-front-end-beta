import React from 'react';
import { MOCK_USERS, MOCK_JOBS, MOCK_DOCUMENTS } from '../../data/mock';
import { Users, FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    trend?: string;
    trendUp?: boolean;
    color: string;
}> = ({ title, value, icon: Icon, trend, trendUp, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
        <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
            {trend && (
                <p className={clsx("text-xs font-medium mt-2 flex items-center gap-1", trendUp ? "text-emerald-600" : "text-rose-600")}>
                    <TrendingUp size={14} />
                    {trend}
                </p>
            )}
        </div>
        <div className={clsx("p-3 rounded-lg", color)}>
            <Icon size={24} className="text-white" />
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    const totalVerified = MOCK_USERS.filter(u => u.role === 'worker' || u.role === 'employer').length; // Mock logic
    const activeJobs = MOCK_JOBS.length;
    const pendingDocs = MOCK_DOCUMENTS.filter(d => d.status === 'pending').length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
                <p className="text-slate-500 text-sm">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Verified Users"
                    value={totalVerified}
                    icon={CheckCircle}
                    trend="+12% from last month"
                    trendUp={true}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Active Job Postings"
                    value={activeJobs}
                    icon={FileText}
                    trend="+5 new today"
                    trendUp={true}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Pending Verifications"
                    value={pendingDocs}
                    icon={Clock}
                    trend={pendingDocs > 5 ? "High volume" : "Normal volume"}
                    trendUp={pendingDocs <= 5}
                    color="bg-orange-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                        <button className="text-sm text-primary-600 font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                                    <Users size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">New worker registration</p>
                                    <p className="text-xs text-slate-500">Maria Santos uploaded NBI Clearance</p>
                                    <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">System Health</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-600 font-medium">Server Uptime</span>
                                <span className="text-emerald-600 font-bold">99.9%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-600 font-medium">Storage Usage</span>
                                <span className="text-blue-600 font-bold">45%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
