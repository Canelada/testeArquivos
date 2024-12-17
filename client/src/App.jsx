import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/files')
            .then(res => setFiles(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:5000/files/upload', formData)
            .then(res => setFiles([...files, res.data]))
            .catch(err => {
                console.error('Error uploading file:', err);
                if (err.response) {
                    console.error('Response data:', err.response.data);
                    console.error('Response status:', err.response.status);
                    console.error('Response headers:', err.response.headers);
                }
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            <ul>
                {files.map(file => (
                    <li key={file._id}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;