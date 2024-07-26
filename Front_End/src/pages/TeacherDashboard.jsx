import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TeacherProfile from '../components/TeacherProfile';
import TeacherCourses from '../components/TeacherCourses';
import Schedule from '../components/Schedule';
import Footer from '../components/Footer';
import axios from 'axios';

const TeacherDashboard = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate(); // Hook for navigation
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }

        const fetchUserDetails = async () => {
            try {
                const sessionId = sessionStorage.getItem('session_id'); // Retrieve session ID from storage
                const response = await axios.get('/api/user/', {
                    headers: {
                        'Authorization': `Session ${sessionId}`, // Pass session ID in headers or as needed
                    },
                });
                setUser(response.data.user);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, [location.state?.tab]);

    const handleLogout = async () => {
        try {
            const sessionId = sessionStorage.getItem('session_id');
            await axios.post('/api/logout/', {}, {
                headers: {
                    'Authorization': `Session ${sessionId}`,
                },
            });
            localStorage.removeItem('session-id');
            sessionStorage.removeItem('session_id'); // Clear session ID from storage
            navigate('/signin'); // Redirect to sign-in page
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

   

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <TeacherProfile user={user} />;
            case 'courses':
                return <TeacherCourses  user={user}/>;
            case 'schedule':
                return <Schedule user={user} />;
            default:
                return <TeacherProfile user={user} />;
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
                            <li onClick={handleLogout} className="cursor-pointer p-4 hover:bg-teal-600">Logout</li> {/* Logout button */}
                            
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
