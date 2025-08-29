import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from './StatCard'; // We will create this component next
import './admin.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        studentsInside: 0,
        studentsOutside: 0,
    });
    const [lists, setLists] = useState({
        insideCampus: [],
        onLocalOuting: [],
        onNonLocalOuting: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { 'x-auth-token': token },
                };

                // Fetch both stats and lists in parallel for efficiency
                const [statsRes, listsRes] = await Promise.all([
                    axios.get('https://cams-nf34.onrender.com/api/admin/stats', config),
                    axios.get('https://cams-nf34.onrender.com/api/admin/status-lists', config),
                ]);

                setStats(statsRes.data);
                setLists(listsRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
                // Optionally, set an error state here to show a message on the UI
            }
            setLoading(false);
        };

        fetchData();
    }, []); // Empty array ensures this runs only once on component mount

    if (loading) {
        return <p>Loading Admin Dashboard...</p>;
    }

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Admin Dashboard</h2>

            {/* Statistics Section */}
            <div className="dashboard-grid">
                <StatCard title="Total Students" value={stats.totalStudents} />
                <StatCard title="Students Inside" value={stats.studentsInside} />
                <StatCard title="Students Outside" value={stats.studentsOutside} />
            </div>

            {/* Detailed Lists Section */}
            <div className="lists-container">
                <div className="user-list">
                    <h3>Inside Campus ({lists.insideCampus.length})</h3>
                    <ul>
                        {lists.insideCampus.map(user => (
                            <li key={user._id}>{user.name} ({user.rollNo})</li>
                        ))}
                    </ul>
                </div>
                <div className="user-list">
                    <h3>On Local Outing ({lists.onLocalOuting.length})</h3>
                    <ul>
                        {lists.onLocalOuting.map(user => (
                            <li key={user._id}>{user.name} ({user.rollNo})</li>
                        ))}
                    </ul>
                </div>
                <div className="user-list">
                    <h3>On Non-Local Outing ({lists.onNonLocalOuting.length})</h3>
                    <ul>
                        {lists.onNonLocalOuting.map(user => (
                            <li key={user._id}>{user.name} ({user.rollNo})</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;