import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';

const StudentPortal = () => {
    // We will now fetch the real status from the backend
    const [status, setStatus] = useState('Loading...'); // Initial state
    const [loading, setLoading] = useState(false);

    // This hook will run once when the component loads to get the user's actual status
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'x-auth-token': token } };
                const res = await axios.get('https://cams-nf34.onrender.com/api/student/status', config);
                setStatus(res.data.currentStatus); // Set status from the server's response
            } catch (error) {
                console.error("Could not fetch user status", error);
                setStatus('Error');
            }
        };

        fetchStatus();
    }, []); // The empty array [] ensures this runs only once

    // This function will handle logging an exit
    const handleLogExit = async (outingType) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            // CORRECTED URL: Added port and fixed the endpoint path
            await axios.post('https://cams-nf34.onrender.com/api/student/log-exit', { outingType }, config);
            
            alert(`Your ${outingType} outing has been logged!`);
            setStatus(`${outingType} Outing`);
        } catch (error) {
            // Improved error handling
            if (error.response && error.response.data) {
                alert(error.response.data.msg);
            } else {
                alert('An error occurred. Could not log exit.');
            }
        }
        setLoading(false);
    };
    
    // This function will handle logging an entry
    const handleLogEntry = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            // CORRECTED URL: Fixed the endpoint path
            await axios.post('https://cams-nf34.onrender.com/api/student/log-entry', {}, config);

            alert('Welcome back! Your entry has been logged.');
            setStatus('Inside');
        } catch (error) {
            // Improved error handling
            if (error.response && error.response.data) {
                alert(error.response.data.msg);
            } else {
                alert('An error occurred. Could not log entry.');
            }
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Student Dashboard</h2>
            <hr />
            <h3>Your Current Status: <strong>{status}</strong></h3>

            {status === 'Inside' ? (
                <div>
                    <h4>Going Out?</h4>
                    <button onClick={() => handleLogExit('Local')} disabled={loading}>
                        Log Local Outing
                    </button>
                    <button onClick={() => handleLogExit('Non-Local')} disabled={loading}>
                        Log Non-Local Outing
                    </button>
                </div>
            ) : (
                <div>
                    <h4>Returning to Campus?</h4>
                    <button onClick={handleLogEntry} disabled={loading}>
                        Log My Entry
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentPortal;