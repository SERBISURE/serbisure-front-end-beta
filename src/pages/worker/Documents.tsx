import React from 'react';
import { MOCK_DOCUMENTS } from '../../data/mock';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { FileText, CheckCircle, Clock, Upload, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

const WorkerDocuments: React.FC = () => {
    const { user } = useAuth();
    const myDocs = MOCK_DOCUMENTS.filter(d => d.userId === user?.id);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'rejected': return 'text-rose-600 bg-rose-50 border-rose-100';
            default: return 'text-orange-600 bg-orange-50 border-orange-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle size={16} />;
            case 'rejected': return <AlertCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const requiredDocs = [
        { type: 'nbi', label: 'NBI Clearance' },
        { type: 'police', label: 'Police Clearance' },
        { type: 'government_id', label: 'Government ID' },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Document Verification</h1>
                <p className="text-slate-500 text-sm">Upload your documents to get the Verified Badge.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requiredDocs.map(reqInfo => {
                    const existingDoc = myDocs.find(d => d.type === reqInfo.type);

                    return (
                        <div key={reqInfo.type} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{reqInfo.label}</h3>
                                        <p className="text-xs text-slate-500">Required for verification</p>
                                    </div>
                                </div>
                                {existingDoc && (
                                    <div className={clsx("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", getStatusColor(existingDoc.status))}>
                                        {getStatusIcon(existingDoc.status)}
                                        <span className="capitalize">{existingDoc.status}</span>
                                    </div>
                                )}
                            </div>

                            {existingDoc ? (
                                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 border border-slate-100 mb-4">
                                    <p className="truncate">file_upload_{existingDoc.id}.jpg</p>
                                    <p className="text-xs text-slate-400 mt-1">Uploaded on {existingDoc.submittedAt}</p>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center mb-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <Upload size={24} className="mx-auto text-slate-400 mb-2 group-hover:text-primary-500" />
                                    <p className="text-sm text-slate-600 font-medium">Click to upload</p>
                                    <p className="text-xs text-slate-400">JPG, PNG or PDF</p>
                                </div>
                            )}

                            <div className="flex gap-2">
                                {existingDoc?.status === 'rejected' || !existingDoc ? (
                                    <Button className="w-full">
                                        {existingDoc ? 'Re-upload Document' : 'Upload Document'}
                                    </Button>
                                ) : (
                                    <Button variant="outline" className="w-full" disabled>
                                        Processing / Verified
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkerDocuments;
