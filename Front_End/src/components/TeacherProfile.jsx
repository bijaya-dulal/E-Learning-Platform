import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherProfile = () => {
    const [teacher, setTeacher] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                const email = localStorage.getItem('email'); // Retrieve user email from local storage
                const sessionId = sessionStorage.getItem('session_id'); // Retrieve session ID from storage
                const response = await axios.get(`/api/teacher/?email=${email}`, {
                    headers: {
                        'Authorization': `Session ${sessionId}`, // Pass session ID in headers or as needed
                    },
                });
                setTeacher(response.data);
                setDescription(response.data.bio); // Set the initial description from the teacher data
            } catch (error) {
                console.error('Error fetching teacher details:', error);
            }
        };
        fetchTeacherDetails();
    }, []);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]); // Set the actual file object for upload
    };

    const handleSave = async () => {
        try {
            const sessionId = sessionStorage.getItem('session_id'); // Retrieve session ID from storage
            const email = localStorage.getItem('email'); // Retrieve user email from local storage

            const formData = new FormData();
            formData.append('bio', description);
            if (photo) {
                formData.append('photo', photo); // Append the file object, not URL
            }

            await axios.put(`/api/teacher/?email=${email}`, formData, {
                headers: {
                    'Authorization': `Session ${sessionId}`, // Pass session ID in headers or as needed
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                },
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>
            <div className="mb-4">
                <img 
                    src={teacher.photo ? `http://localhost:8000${teacher.photo}` : 'default-photo.png'} 
                    alt="Teacher" 
                    className="w-32 h-32 object-cover rounded-full" 
                />
               
                <input 
                    type="file" 
                    onChange={handlePhotoChange} 
                    className="mt-2" 
                />
            </div>
            <p>Update Picture</p>
            <h2 className="text-2xl font-bold">{teacher.name}</h2>
            <h1 className="text-2xl font-bold">Email:{teacher.email}</h1>
            <div className="mb-4">
                <label className="block mb-2"></label>
                <h2 className="text-2xl font-bold">About Yourself</h2>
                

                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button 
                className="bg-teal-500 text-white px-4 py-2 rounded" 
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    );
};

export default TeacherProfile;
