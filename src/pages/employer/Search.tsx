import React, { useState } from 'react';
import { MOCK_WORKERS } from '../../data/mock';
import Button from '../../components/ui/Button';
import { Search, MapPin, Filter, ShieldCheck, Heart } from 'lucide-react';

const EmployerSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('All');

    // Mock "Matching Engine" Logic
    const filteredWorkers = MOCK_WORKERS.filter(worker => {
        const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSkill = selectedSkill === 'All' || worker.skills.includes(selectedSkill);
        return matchesSearch && matchesSkill;
    }).map(worker => ({
        ...worker,
        // Simulate dynamic match score based on search - using deterministic calc for mock to avoid impure render warning
        matchScore: searchTerm ? 80 + (worker.name.length % 20) : 0
    })).sort((a, b) => b.matchScore - a.matchScore);

    const allSkills = Array.from(new Set(MOCK_WORKERS.flatMap(w => w.skills)));

    return (
        <div className="flex gap-6 h-[calc(100vh-8rem)]">
            {/* Filters Sidebar */}
            <div className="w-64 flex-shrink-0 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Find Candidates</h1>
                    <p className="text-sm text-slate-500">AI-Powered Matching</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                        <Filter size={18} />
                        Smart Filters
                    </div>

                    <div className="space-y-4">
                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Skills / Role</span>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="skill"
                                        checked={selectedSkill === 'All'}
                                        onChange={() => setSelectedSkill('All')}
                                        className="text-primary-600 focus:ring-primary-500"
                                    />
                                    {' '}All Skills
                                </label>
                                {allSkills.map(skill => (
                                    <label key={skill} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="skill"
                                            checked={selectedSkill === skill}
                                            onChange={() => setSelectedSkill(skill)}
                                            className="text-primary-600 focus:ring-primary-500"
                                        />
                                        {skill}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Availability</span>
                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" defaultChecked />
                                {' '}Looking for Work
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Search Bar */}
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 mb-6 flex items-center gap-2">
                    <Search className="text-slate-400 ml-2" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, location, or keywords..."
                        className="flex-1 py-2 px-2 focus:outline-none text-slate-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button>Search</Button>
                </div>

                {/* Results Grid */}
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {filteredWorkers.map(worker => (
                            <div key={worker.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                                {worker.matchScore > 0 && (
                                    <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                                        {worker.matchScore}% Match
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <div className="relative">
                                        <img src={`https://ui-avatars.com/api/?name=${worker.name.replace(' ', '+')}&background=random`} alt={worker.name} className="w-16 h-16 rounded-full" />
                                        {worker.isVerified && (
                                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" title="Verified Worker">
                                                <ShieldCheck size={20} className="text-primary-500 fill-primary-100" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-slate-900">{worker.name}</h3>
                                                <p className="text-sm text-slate-500 flex items-center gap-1">
                                                    <MapPin size={12} /> {worker.location}
                                                </p>
                                            </div>
                                            <button className="text-slate-300 hover:text-rose-500 transition-colors">
                                                <Heart size={20} />
                                            </button>
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                            {worker.skills.map(skill => (
                                                <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="text-xs text-slate-500">
                                                <span className="font-bold text-slate-900">{worker.experience} Years</span> Exp.
                                            </div>
                                            <Button size="sm" onClick={() => alert('Connect Request Sent! Double-Blind Privacy Active.')}>Connect</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredWorkers.length === 0 && (
                            <div className="col-span-full py-12 text-center text-slate-400">
                                No workers found matching your criteria.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerSearch;
