export type UserRole = 'admin' | 'worker' | 'employer' | 'employee';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export type WorkerStatus = 'looking' | 'hired';

export interface WorkerProfile {
    id: string;
    userId: string;
    name: string;
    age: number;
    location: string;
    skills: string[];
    experience: number; // years
    availability: WorkerStatus;
    isVerified: boolean;
    matchScore?: number; // For simulation
    bio: string;
}

export interface JobPosting {
    id: string;
    employerId: string;
    title: string;
    description: string;
    location: string;
    salaryRange: string;
    requirements: string[];
    postedAt: string;
}

export interface Document {
    id: string;
    userId: string;
    type: 'nbi' | 'police' | 'government_id' | 'proof_of_billing';
    status: 'pending' | 'approved' | 'rejected';
    url: string; // Mock URL
    submittedAt: string;
}
