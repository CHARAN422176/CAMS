import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import authService from './services/auth';
import Login from './components/auth/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentPortal from './components/student/StudentPortal';
import Navbar from './components/layout/Navbar';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
    }, []);

    if (user === null) {
        // If no user is logged in, show the Login page
        return <Login />;
    }

    // If a user is logged in, show the appropriate dashboard with a Navbar
    return (
        <Router>
            <Navbar user={user} />
            <div style={{ paddingTop: '80px', padding: '20px' }}>
                 <Routes>
                    {user.role === 'Admin' && (
                        <Route path="/" element={<AdminDashboard />} />
                    )}
                    {user.role === 'Student' && (
                        <Route path="/" element={<StudentPortal />} />
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;