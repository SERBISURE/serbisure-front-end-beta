import React from 'react';
import { FileCheck, Users, CheckCircle, Clock } from 'lucide-react';
import { MOCK_DOCUMENTS, MOCK_WORKERS } from '../../data/mock';

const EmployeeDashboard: React.FC = () => {
    // Calculate stats
    const pendingVerifications = MOCK_DOCUMENTS.filter(d => d.status === 'pending').length;
    const verifiedWorkers = MOCK_WORKERS.filter(w => w.isVerified).length;
    const totalWorkers = MOCK_WORKERS.length;
    const today = new Date().toISOString().split('T')[0];
    const newSubmissionsToday = MOCK_DOCUMENTS.filter(d => d.submittedAt === today).length;

    const stats = [
        {
            label: 'Pending Verifications',
            value: pendingVerifications,
            icon: Clock,
            color: 'bg-amber-500',
            bg: 'bg-amber-50'
        },
        {
            label: 'Verified Workers',
            value: verifiedWorkers,
            icon: CheckCircle,
            color: 'bg-emerald-500',
            bg: 'bg-emerald-50'
        },
        {
            label: 'Total Workers',
            value: totalWorkers,
            icon: Users,
            color: 'bg-blue-500',
            bg: 'bg-blue-50'
        },
        {
            label: 'New Submissions',
            value: newSubmissionsToday,
            icon: FileCheck,
            color: 'bg-indigo-500',
            bg: 'bg-indigo-50'
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Employee Dashboard</h1>
                <p className="text-slate-500">Overview of verification activities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Verification Activity</h2>
                <div className="text-center py-8 text-slate-500">
                    No recent activity logs available (Mock Data).
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
