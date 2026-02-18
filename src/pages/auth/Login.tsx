import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const allowedUsers = JSON.parse(import.meta.env.VITE_ALLOWED_USERS || '[]');
            const match = allowedUsers.find((u: any) => u.email === email && u.password === password);

            if (match) {
                await login(email, match.role);

                // Redirect based on role
                if (match.role === 'admin') navigate('/admin');
                else if (match.role === 'worker') navigate('/worker/profile');
                else if (match.role === 'employee') navigate('/employee');
                else navigate('/employer/search');
            } else {
                alert('Invalid email or password.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check configuration.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary-600 text-white p-3 rounded-xl mb-3">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome to Serbisure</h1>
                    <p className="text-slate-500 text-sm">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email-input" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            id="email-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password-input" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            id="password-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        Sign In
                    </Button>

                    <div className="flex items-center justify-center mt-4">
                        <div className="text-sm">
                            <span className="text-slate-500">Don't have an account? </span>
                            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400">
                        Secure Verification Gateway & Intelligent Matching Engine
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
