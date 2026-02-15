import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import Button from '../../components/ui/Button';
import { UserPlus, ShieldCheck } from 'lucide-react';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('worker'); // Default to worker
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Register the new user and log them in immediately
        await register(name, email, role);

        switch (role) {
            case 'worker': navigate('/worker/profile'); break;
            case 'employer': navigate('/employer/search'); break;
            default: navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                        <UserPlus size={24} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Join Serbisure today
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
                                I am a...
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('worker')}
                                    className={`py-3 px-4 border rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${role === 'worker'
                                        ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500'
                                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <ShieldCheck size={18} />
                                    Kasambahay
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('employer')}
                                    className={`py-3 px-4 border rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${role === 'employer'
                                        ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500'
                                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <UserPlus size={18} />
                                    Employer
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                    placeholder="Juan Dela Cruz"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                    placeholder="juan@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            isLoading={isLoading}
                        >
                            Sign Up
                        </Button>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="text-sm">
                            <span className="text-slate-500">Already have an account? </span>
                            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
