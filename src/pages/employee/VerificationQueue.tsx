import React, { useState } from 'react';
import { MOCK_DOCUMENTS, MOCK_USERS, MOCK_WORKERS } from '../../data/mock';
import { Check, X, ExternalLink, Eye, FileCheck } from 'lucide-react';
import Button from '../../components/ui/Button';

const VerificationQueue: React.FC = () => {
    // Merge data to get comprehensive view
    const pendingDocs = MOCK_DOCUMENTS.filter(d => d.status === 'pending').map(doc => {
        const worker = MOCK_WORKERS.find(w => w.userId === doc.userId);
        const user = MOCK_USERS.find(u => u.id === doc.userId);
        return {
            ...doc,
            workerName: worker?.name || user?.name || 'Unknown',
            workerAvatar: user?.avatar,
            workerLocation: worker?.location || 'Unknown'
        };
    });

    const [selectedDoc, setSelectedDoc] = useState<typeof pendingDocs[0] | null>(null);

    const handleApprove = (id: string) => {
        alert(`Document ${id} approved! (Mock Action)`);
        // In real app, this would call API to update status
        setSelectedDoc(null);
    };

    const handleReject = (id: string) => {
        alert(`Document ${id} rejected! (Mock Action)`);
        setSelectedDoc(null);
    };

    return (
        <div className="h-[calc(100vh-theme(spacing.24))] flex gap-6">
            {/* Left Side: List */}
            <div className="w-1/3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="font-bold text-slate-800">Verification Queue</h2>
                    <span className="text-xs text-slate-500">{pendingDocs.length} pending items</span>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {pendingDocs.length === 0 ? (
                        <div className="text-center py-8 text-slate-400 text-sm">
                            No pending documents.
                        </div>
                    ) : (
                        pendingDocs.map(doc => (
                            <div
                                key={doc.id}
                                onClick={() => setSelectedDoc(doc)}
                                onKeyDown={(e) => e.key === 'Enter' && setSelectedDoc(doc)}
                                role="button"
                                tabIndex={0}
                                className={`p-3 rounded-lg cursor-pointer border transition-colors ${selectedDoc?.id === doc.id
                                    ? 'bg-primary-50 border-primary-200'
                                    : 'bg-white border-transparent hover:bg-slate-50 border-slate-100'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <img src={doc.workerAvatar} alt={doc.workerName} className="w-10 h-10 rounded-full bg-slate-200" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900 text-sm truncate">{doc.workerName}</p>
                                        <p className="text-xs text-slate-500 capitalize">{doc.type} Clearance</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Side: Detail / Split Screen */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                {selectedDoc ? (
                    <>
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h2 className="font-bold text-slate-800">{selectedDoc.workerName}</h2>
                                <p className="text-xs text-slate-500">Submitted on {selectedDoc.submittedAt}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="danger" size="sm" icon={<X size={16} />} onClick={() => handleReject(selectedDoc.id)}>
                                    Reject
                                </Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-700" size="sm" icon={<Check size={16} />} onClick={() => handleApprove(selectedDoc.id)}>
                                    Approve
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
                            <div className="grid grid-cols-2 gap-6">
                                {/* Profile Info */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-slate-700 uppercase text-xs tracking-wider">Worker Profile</h3>
                                    <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500 text-sm">Location</span>
                                            <span className="text-slate-900 text-sm font-medium">{selectedDoc.workerLocation}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500 text-sm">User ID</span>
                                            <span className="text-slate-900 text-sm font-medium font-mono">{selectedDoc.userId}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Document Preview */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-slate-700 uppercase text-xs tracking-wider">Document Preview</h3>
                                    <div className="aspect-[3/4] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 relative group cursor-pointer hover:border-primary-400 transition-colors">
                                        <div className="text-center">
                                            <ExternalLink className="mx-auto mb-2 text-slate-400" size={32} />
                                            <span className="text-sm text-slate-500">Click to view full size</span>
                                        </div>
                                        {/* Mock Image Placeholder */}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                            <Eye className="text-slate-700" />
                                        </div>
                                    </div>
                                    <p className="text-center text-xs text-slate-500">
                                        Filename: {selectedDoc.type}_scan_2023.jpg
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <FileCheck size={32} className="text-slate-300" />
                        </div>
                        <p>Select a document from the queue to start verification.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationQueue;
