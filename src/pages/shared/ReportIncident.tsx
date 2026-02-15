import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { AlertTriangle, Send } from 'lucide-react';

const ReportIncident: React.FC = () => {
    const [type, setType] = useState('Safety Concern');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
                <div className="inline-flex bg-emerald-100 p-3 rounded-full text-emerald-600 mb-4">
                    <Send size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Report Submitted</h2>
                <p className="text-slate-500">Our safety team will review your report immediately. Thank you for helping keep Serbisure safe.</p>
                <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>Submit Another</Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
                <div className="inline-flex text-rose-600 mb-2">
                    <AlertTriangle size={32} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Report an Incident</h1>
                <p className="text-slate-500 text-sm">We take your safety seriously. Please provide details below.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="incident-type" className="block text-sm font-medium text-slate-700 mb-1">Incident Type</label>
                        <select
                            id="incident-type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        >
                            <option>Safety Concern</option>
                            <option>Harassment</option>
                            <option>Fraud / Scam</option>
                            <option>No-Show</option>
                            <option>Contract Violation</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="incident-description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea
                            id="incident-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                            placeholder="Please describe what happened..."
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" variant="danger" className="w-full">
                            Submit Report
                        </Button>
                        <p className="text-xs text-center text-slate-400 mt-4">
                            Your report is confidential and visible only to the Serbisure Safety Team.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportIncident;
