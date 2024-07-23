import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Schedule = () => {
    const [sessions, setSessions] = useState([]);
    const [course, setCourse] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleScheduleSession = () => {
        setSessions([...sessions, { course, date, time }]);
        setCourse('');
        setDate('');
        setTime('');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Schedule</h2>
            <div className="mb-4">
                <label className="block mb-2">Course</label>
                <input 
                    type="text" 
                    value={course} 
                    onChange={(e) => setCourse(e.target.value)} 
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
            <button onClick={handleScheduleSession} className="bg-teal-500 text-white px-4 py-2 rounded">Schedule Session</button>
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Scheduled Sessions</h3>
                <ul>
                    {sessions.map((session, index) => (
                        <li key={index} className="mb-2">
                            <h4 className="font-bold">{session.course}</h4>
                            <p>{session.date} at {session.time}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Schedule;
