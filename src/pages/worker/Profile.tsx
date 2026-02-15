import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_WORKERS } from '../../data/mock';
import Button from '../../components/ui/Button';
import { MapPin, Briefcase, Star, Edit2, Save, CheckCircle, Shield } from 'lucide-react';
import clsx from 'clsx';

const WorkerProfile: React.FC = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Find current worker profile
    const workerProfile = MOCK_WORKERS.find(w => w.userId === user?.id) || MOCK_WORKERS[0]; // Fallback for demo if admin views

    // Local state for editing (mock)
    const [bio, setBio] = useState(workerProfile.bio);
    const [status, setStatus] = useState(workerProfile.availability);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
                <div className="h-32 bg-gradient-to-r from-primary-500 to-indigo-600"></div>
                <div className="px-8 pb-6">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end gap-4">
                            <img src={user?.avatar} alt={user?.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md relative z-10" />
                            <div className="mb-1">
                                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    {workerProfile.name}
                                    {workerProfile.isVerified && <Shield size={20} className="text-primary-500 fill-primary-100" />}
                                </h1>
                                <p className="text-slate-500 flex items-center gap-1">
                                    <MapPin size={14} />
                                    {workerProfile.location}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                                <span className={clsx("w-2.5 h-2.5 rounded-full", status === 'looking' ? "bg-emerald-500" : "bg-slate-400")}></span>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as 'looking' | 'hired')}
                                    className="bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 p-0 cursor-pointer"
                                >
                                    <option value="looking">Looking for Work</option>
                                    <option value="hired">Hired / Unavailable</option>
                                </select>
                            </div>
                            <Button variant="outline" size="sm" icon={<Edit2 size={14} />} onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-2 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">About Me</h3>
                                {isEditing ? (
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 min-h-[100px]"
                                    />
                                ) : (
                                    <p className="text-slate-600 leading-relaxed">{bio}</p>
                                )}
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Skills & Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {workerProfile.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                    {isEditing && (
                                        <button className="px-3 py-1 border border-dashed border-slate-300 text-slate-400 rounded-full text-sm hover:text-primary-600 hover:border-primary-300">
                                            + Add Skill
                                        </button>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end">
                                    <Button icon={<Save size={16} />} onClick={() => setIsEditing(false)}>Save Changes</Button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Briefcase size={18} className="text-slate-400" />
                                    Work Overview
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 text-sm">Experience</span>
                                        <span className="font-medium text-slate-900">{workerProfile.experience} Years</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 text-sm">Age</span>
                                        <span className="font-medium text-slate-900">{workerProfile.age} Years Old</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 text-sm">Verification</span>
                                        <span className={clsx("font-medium", workerProfile.isVerified ? "text-emerald-600" : "text-slate-900")}>
                                            {workerProfile.isVerified ? 'Verified' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                                <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                                    <Star size={18} className="text-purple-500" />
                                    Verification Badge
                                </h4>
                                <p className="text-sm text-purple-700 mb-3">
                                    {workerProfile.isVerified
                                        ? "You are a Verified Worker! Your profile is boosted."
                                        : "Complete your document upload to get the Verified Badge."}
                                </p>
                                {workerProfile.isVerified ? (
                                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                                        <CheckCircle size={16} /> Verified Active
                                    </div>
                                ) : (
                                    <Button size="sm" variant="secondary" className="w-full">Upload Documents</Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerProfile;
