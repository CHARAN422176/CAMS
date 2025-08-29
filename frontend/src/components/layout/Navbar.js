import React from 'react';
import authService from '../../services/auth';
import './layout.css';

const Navbar = ({ user }) => {
    const handleLogout = () => {
        authService.logout();
        window.location.href = '/';
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                Hi, {user.name} ({user.role})
            </div>
            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>
        </nav>
    );
};
export default Navbar;