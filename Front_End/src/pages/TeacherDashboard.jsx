import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TeacherProfile from '../components/TeacherProfile';
import TeacherCourses from '../components/TeacherCourses';
import Schedule from '../components/Schedule';
import Footer from '../components/Footer';

const TeacherDashboard = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state?.tab]);

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <TeacherProfile />;
            case 'courses':
                return <TeacherCourses />;
            case 'schedule':
                return <Schedule />;
            default:
                return <TeacherProfile />;
        }
    };

    return (
        <div>
            <div className="flex min-h-screen">
                <aside className="w-1/5 bg-teal-500 text-white">
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Teacher Dashboard</h2>
                    </div>
                    <nav>
                        <ul>
                            <li onClick={() => setActiveTab('profile')} className="cursor-pointer p-4 hover:bg-teal-600">Teacher Profile</li>
                            <li onClick={() => setActiveTab('courses')} className="cursor-pointer p-4 hover:bg-teal-600">Courses</li>
                            <li onClick={() => setActiveTab('schedule')} className="cursor-pointer p-4 hover:bg-teal-600">Schedule</li>
                            <li className="cursor-pointer p-4 hover:bg-teal-600">Logout</li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-6 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default TeacherDashboard;
