
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/shared/ProtectedRoute';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin
import AdminDashboard from './pages/admin/Dashboard';
import AdminVerification from './pages/admin/Verification';
import AdminUsers from './pages/admin/Users';

// Worker
import WorkerProfile from './pages/worker/Profile';
import WorkerDocuments from './pages/worker/Documents';

// Employer
import EmployerSearch from './pages/employer/Search';
import EmployerJobs from './pages/employer/JobPostings';

// Employee
import EmployeeDashboard from './pages/employee/Dashboard';
import VerificationQueue from './pages/employee/VerificationQueue';

// Shared
import Messages from './pages/shared/Messages';
import ReportIncident from './pages/shared/ReportIncident';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<Layout />}>
                        {/* Admin Routes */}
                        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/verification" element={<AdminVerification />} />
                            <Route path="/admin/users" element={<AdminUsers />} />
                        </Route>

                        {/* Worker Routes */}
                        <Route element={<ProtectedRoute allowedRoles={['worker']} />}>
                            <Route path="/worker/profile" element={<WorkerProfile />} />
                            <Route path="/worker/documents" element={<WorkerDocuments />} />
                        </Route>

                        {/* Employer Routes */}
                        <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
                            <Route path="/employer/search" element={<EmployerSearch />} />
                            <Route path="/employer/jobs" element={<EmployerJobs />} />
                        </Route>

                        {/* Employee Routes */}
                        <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
                            <Route path="/employee" element={<EmployeeDashboard />} />
                            <Route path="/employee/verification" element={<VerificationQueue />} />
                        </Route>

                        {/* Shared Routes */}
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/report-incident" element={<ReportIncident />} />

                        {/* Fallback / Redirect */}
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
