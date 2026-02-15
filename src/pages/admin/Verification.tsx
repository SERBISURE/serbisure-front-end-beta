import React, { useState } from 'react';
import { MOCK_DOCUMENTS, MOCK_USERS, MOCK_WORKERS } from '../../data/mock';
import Button from '../../components/ui/Button';
import { CheckCircle, XCircle, FileText, ChevronRight, User as UserIcon } from 'lucide-react';
import clsx from 'clsx';

const AdminVerification: React.FC = () => {
    const pendingDocs = MOCK_DOCUMENTS.filter(d => d.status === 'pending');
    const [selectedDocId, setSelectedDocId] = useState<string | null>(pendingDocs[0]?.id || null);

    const selectedDoc = MOCK_DOCUMENTS.find(d => d.id === selectedDocId);
    const selectedUser = selectedDoc ? MOCK_USERS.find(u => u.id === selectedDoc.userId) : null;
    const selectedWorkerProfile = selectedDoc ? MOCK_WORKERS.find(w => w.userId === selectedDoc.userId) : null;

    const handleVerification = (status: 'approved' | 'rejected') => {
        // In a real app, this would make an API call
        alert(`Document ${status.toUpperCase()} for ${selectedUser?.name}`);
        // Optimistically remove from list for demo
        // setSelectedDocId(nextId...)
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Verification Gateway</h1>
                    <p className="text-slate-500 text-sm">Review worker documents against their profiles.</p>
                </div>
                <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                    {pendingDocs.length} Pending Requests
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Left Sidebar: Request List */}
                <div className="w-1/4 bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto">
                    <div className="p-4 border-b border-slate-100 font-medium text-slate-700">Pending Queue</div>
                    <div className="divide-y divide-slate-100">
                        {pendingDocs.map(doc => {
                            const user = MOCK_USERS.find(u => u.id === doc.userId);
                            return (
                                <button
                                    key={doc.id}
                                    onClick={() => setSelectedDocId(doc.id)}
                                    className={clsx(
                                        "w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group",
                                        selectedDocId === doc.id && "bg-blue-50 border-l-4 border-primary-500"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                                            <p className="text-xs text-slate-500 capitalize">{doc.type.replace('_', ' ')}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className={clsx("text-slate-400 group-hover:text-primary-500", selectedDocId === doc.id && "text-primary-500")} />
                                </button>
                            )
                        })}
                        {pendingDocs.length === 0 && (
                            <div className="p-8 text-center text-slate-400 text-sm">
                                No pending documents.
                            </div>
                        )}
                    </div>
                </div>

                {/* Center: User Profile */}
                <div className="w-1/3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                    <div className="p-4 border-b border-slate-100 font-medium text-slate-700 flex items-center gap-2">
                        <UserIcon size={18} />
                        Applicant Profile
                    </div>
                    {selectedUser && selectedWorkerProfile ? (
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="text-center mb-6">
                                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-50" />
                                <h2 className="text-xl font-bold text-slate-900">{selectedUser.name}</h2>
                                <p className="text-slate-500">{selectedUser.email}</p>
                                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                    ID: {selectedUser.id}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</span>
                                    <p className="text-sm text-slate-900 font-medium">{selectedWorkerProfile.location}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Experience</span>
                                    <p className="text-sm text-slate-900 font-medium">{selectedWorkerProfile.experience} Years</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skills</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedWorkerProfile.skills.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Availability</span>
                                    <p className="text-sm font-medium capitalize flex items-center gap-2 mt-1">
                                        <span className={clsx("w-2 h-2 rounded-full", selectedWorkerProfile.availability === 'looking' ? "bg-emerald-500" : "bg-slate-400")}></span>
                                        {selectedWorkerProfile.availability}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-slate-400">Select a document to view profile</div>
                    )}
                </div>

                {/* Right: Document View */}
                <div className="flex-1 bg-slate-800 rounded-xl shadow-lg border border-slate-700 flex flex-col overflow-hidden">
                    <div className="p-4 bg-slate-900 border-b border-slate-700 text-slate-200 font-medium flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FileText size={18} />
                            Submitted Document
                        </div>
                        {selectedDoc && <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300 capitalize">{selectedDoc.type.replace('_', ' ')}</span>}
                    </div>

                    <div className="flex-1 bg-slate-800 relative flex items-center justify-center p-4">
                        {selectedDoc ? (
                            <div className="text-center">
                                <div className="w-full max-w-sm mx-auto aspect-[3/4] bg-white rounded shadow-lg flex items-center justify-center mb-4">
                                    {/* Placeholder for actual image/pdf */}
                                    <p className="text-slate-400 font-medium">Document Preview<br />(NBI Clearance)</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-slate-500">No document selected</div>
                        )}
                    </div>

                    {selectedDoc && (
                        <div className="p-4 bg-slate-900 border-t border-slate-700 flex gap-4 justify-end">
                            <Button variant="danger" icon={<XCircle size={18} />} onClick={() => handleVerification('rejected')}>
                                Reject
                            </Button>
                            <Button className="bg-emerald-600 hover:bg-emerald-700" icon={<CheckCircle size={18} />} onClick={() => handleVerification('approved')}>
                                Verify & Approve
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminVerification;
