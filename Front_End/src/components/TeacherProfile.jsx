import React, { useState } from 'react';

const TeacherProfile = () => {
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');

    const handlePhotoChange = (e) => {
        setPhoto(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>
            <div className="mb-4">
                <img src={photo || 'default-photo.png'} alt="Teacher" className="w-32 h-32 object-cover rounded-full" />
                <input type="file" onChange={handlePhotoChange} className="mt-2" />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button className="bg-teal-500 text-white px-4 py-2 rounded">Save</button>
        </div>
    );
};

export default TeacherProfile;
