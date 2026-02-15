import React from 'react';
import { MessageSquare, Shield, Lock } from 'lucide-react';

const Messages: React.FC = () => {
    return (
        <div className="h-[calc(100vh-8rem)] flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="text-center max-w-md p-6">
                <div className="bg-primary-50 p-4 rounded-full inline-flex mb-4">
                    <MessageSquare size={32} className="text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Secure Communication</h2>
                <p className="text-slate-500 mb-6">
                    Chat with potential matches safely. Your personal contact details are hidden until you mutually agree to share them.
                </p>

                <div className="flex justify-center gap-8 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                        <Shield size={16} /> Verified Users Only
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock size={16} /> End-to-End Encryption
                    </div>
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm italic text-slate-500">
                    "Double-Blind Privacy Masking is active."
                </div>
            </div>
        </div>
    );
};

export default Messages;
