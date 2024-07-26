// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// const Schedule = () => {
//     const [sessions, setSessions] = useState([]);
//     const [course, setCourse] = useState('');
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');

//     const handleScheduleSession = () => {
//         setSessions([...sessions, { course, date, time }]);
//         setCourse('');
//         setDate('');
//         setTime('');
//     };

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Schedule</h2>
//             <div className="mb-4">
//                 <label className="block mb-2">Course</label>
//                 <input 
//                     type="text" 
//                     value={course} 
//                     onChange={(e) => setCourse(e.target.value)} 
//                     className="w-full p-2 border border-gray-300 rounded"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block mb-2">Date</label>
//                 <input 
//                     type="date" 
//                     value={date} 
//                     onChange={(e) => setDate(e.target.value)} 
//                     className="w-full p-2 border border-gray-300 rounded"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block mb-2">Time</label>
//                 <input 
//                     type="time" 
//                     value={time} 
//                     onChange={(e) => setTime(e.target.value)} 
//                     className="w-full p-2 border border-gray-300 rounded"
//                 />
//             </div>
//             <button onClick={handleScheduleSession} className="bg-teal-500 text-white px-4 py-2 rounded">Schedule Session</button>
//             <div className="mt-6">
//                 <h3 className="text-xl font-bold mb-4">Scheduled Sessions</h3>
//                 <ul>
//                     {sessions.map((session, index) => (
//                         <li key={index} className="mb-2">
//                             <h4 className="font-bold">{session.course}</h4>
//                             <p>{session.date} at {session.time}</p>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Schedule;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Schedule = () => {
    const [sessions, setSessions] = useState([]);
    const [course, setCourse] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();

    const handleScheduleSession = async () => {
        try {
            const csrfToken = Cookies.get('csrftoken');
            const sessionId = sessionStorage.getItem('session_id');
            
            if (!sessionId) {
                alert('You need to log in first.');
                navigate('/signin');
                return;
            }
            
            const response = await axios.post(
                '/api/schedule/',
                { course, date, time },
                {
                    headers: {
                        'Authorization': `Session ${sessionId}`,
                        'X-CSRFToken': csrfToken,
                    },
                }
            );

            if (response.status === 201) {
                // Store course in localStorage
                localStorage.setItem('course', course);
                
                setSessions([...sessions, response.data]);
                setCourse('');
                setDate('');
                setTime('');
                
                alert('Session scheduled successfully!');
            } else {
                alert('Scheduling session failed.');
            }
        } catch (error) {
            console.error('Error scheduling session:', error);
            alert('Scheduling session failed.');
        }
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
