import React from 'react';
import './admin.css';

const StatCard = ({ title, value }) => {
    return (
        <div className="stat-card">
            <div className="stat-info">
                <p>{title}</p>
                <span>{value}</span>
            </div>
        </div>
    );
};

export default StatCard;