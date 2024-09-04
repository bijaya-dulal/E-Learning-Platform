import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';  // Import Cookies to manage CSRF token
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Schedule = () => {
    const [sessions, setSessions] = useState([]);
    const [courses, setCourses] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');

    const navigate = useNavigate();  // Initialize navigate function

    useEffect(() => {
        // Fetch students
        const fetchStudents = async () => {
            try {
                const csrfToken = Cookies.get('csrftoken');
                const response = await axios.get('/api/students/', {
                    headers: {
                        'X-CSRFToken': csrfToken,  // Include CSRF token in the header
                    },
                });
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        // Fetch sessions
        const fetchSessions = async () => {
            try {
                const csrfToken = Cookies.get('csrftoken');
                const response = await axios.get('/api/schedule/', {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                });
                setSessions(response.data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };
        fetchSessions();
    }, []);

    const handleScheduleSession = async () => {
        try {
            const csrfToken = Cookies.get('csrftoken');
            const response = await axios.post(
                '/api/schedule/',
                { course: courses, date, time, student: selectedStudent },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                }
            );
            setSessions(prevSessions => [...prevSessions, response.data]);
            setCourses('');
            setDate('');
            setTime('');
            setSelectedStudent('');
        } catch (error) {
            console.error('Error scheduling session:', error);
            alert('Scheduling session failed.');
        }
    };

    const handleStartMeeting = (session) => {
        // Save the student's information to localStorage
        localStorage.setItem('selectedStudent', JSON.stringify(session.student));

        // Navigate to VideoCall component
        navigate(`/videocall`);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Schedule</h2>
            <div className="mb-4">
                <label className="block mb-2">Course</label>
                <input 
                    type="text" 
                    value={courses} 
                    onChange={(e) => setCourses(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Date</label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Time</label>
                <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Select Student</label>
                <select 
                    value={selectedStudent} 
                    onChange={(e) => setSelectedStudent(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select a student</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.username}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleScheduleSession} className="bg-teal-500 text-white px-4 py-2 rounded">Schedule Session</button>
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Scheduled Sessions</h3>
                <ul>
                    {sessions.map((session) => (
                        <li key={session.id} className="mb-2 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">{session.course}</h4>
                                <p>{session.date} at {session.time}</p>
                                <p>Student: {session.student}</p> {/* Display student username */}
                            </div>
                            <button 
                                onClick={() => handleStartMeeting(session)} 
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Start Meeting
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Schedule;
