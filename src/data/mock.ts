import { User, WorkerProfile, JobPosting, Document } from '../types';

export const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Admin User', email: 'admin@serbisure.com', role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Admin+User' },
    { id: 'u2', name: 'Maria Santos', email: 'maria@gmail.com', role: 'worker', avatar: 'https://ui-avatars.com/api/?name=Maria+Santos' },
    { id: 'u3', name: 'Juana Dela Cruz', email: 'juana@gmail.com', role: 'worker', avatar: 'https://ui-avatars.com/api/?name=Juana+Dela+Cruz' },
    { id: 'u4', name: 'Mrs. Cruz', email: 'mrs.cruz@gmail.com', role: 'employer', avatar: 'https://ui-avatars.com/api/?name=Mrs+Cruz' },
    { id: 'u5', name: 'Mr. Tan', email: 'mr.tan@gmail.com', role: 'employer', avatar: 'https://ui-avatars.com/api/?name=Mr+Tan' },
];

export const MOCK_WORKERS: WorkerProfile[] = [
    {
        id: 'w1',
        userId: 'u2',
        name: 'Maria Santos',
        age: 35,
        location: 'Quezon City',
        skills: ['Cooking', 'Child Care', 'Cleaning'],
        experience: 5,
        availability: 'looking',
        isVerified: true,
        bio: 'Experienced kasambahay with 5 years of experience in cooking and child care. Reliable and hardworking.',
    },
    {
        id: 'w2',
        userId: 'u3',
        name: 'Juana Dela Cruz',
        age: 28,
        location: 'Makati',
        skills: ['Elderly Care', 'Cleaning'],
        experience: 2,
        availability: 'hired',
        isVerified: false,
        bio: 'Dedicated helper with experience in elderly care.',
    },
];

export const MOCK_JOBS: JobPosting[] = [
    {
        id: 'j1',
        employerId: 'u4',
        title: 'Experienced Cook Needed',
        description: 'Looking for a kasambahay who can cook Filipino dishes.',
        location: 'Quezon City',
        salaryRange: '8,000 - 10,000 PHP',
        requirements: ['Cooking', 'Stay-in'],
        postedAt: '2023-10-25',
    },
    {
        id: 'j2',
        employerId: 'u5',
        title: 'Elderly Care Assistant',
        description: 'Need someone to look after my elderly mother.',
        location: 'Makati',
        salaryRange: '12,000 PHP',
        requirements: ['Elderly Care', 'Stay-out'],
        postedAt: '2023-10-26',
    },
];

export const MOCK_DOCUMENTS: Document[] = [
    { id: 'd1', userId: 'u2', type: 'nbi', status: 'approved', url: '#', submittedAt: '2023-10-01' },
    { id: 'd2', userId: 'u2', type: 'police', status: 'approved', url: '#', submittedAt: '2023-10-01' },
    { id: 'd3', userId: 'u3', type: 'nbi', status: 'pending', url: '#', submittedAt: '2023-10-20' },
];
