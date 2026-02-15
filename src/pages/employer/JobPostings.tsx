import React from 'react';
import { MOCK_JOBS } from '../../data/mock';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { MapPin, DollarSign, Clock, Plus, MoreHorizontal } from 'lucide-react';

const EmployerJobs: React.FC = () => {
    const { user } = useAuth();
    const myJobs = MOCK_JOBS.filter(j => j.employerId === user?.id) || MOCK_JOBS; // Fallback for demo

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Training Jobs</h1>
                    <p className="text-slate-500 text-sm">Manage your open positions.</p>
                </div>
                <Button icon={<Plus size={18} />}>Post New Job</Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {myJobs.map(job => (
                        <div key={job.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{job.title}</h3>
                                <p className="text-slate-600 text-sm mb-3 line-clamp-1">{job.description}</p>

                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={14} /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <DollarSign size={14} /> {job.salaryRange}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} /> Posted {job.postedAt}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2 ml-4">
                                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
                                    Active
                                </span>
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {myJobs.length === 0 && (
                        <div className="p-12 text-center text-slate-400">
                            You haven't posted any jobs yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployerJobs;
