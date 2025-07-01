import React from 'react';
import './AdminDashboard.css';

function DashboardCard({ title, count, color }) {
    return (
        <div className="dashboard-card" style={{ backgroundColor: color }}>
            <h3>{title}</h3>
            <p>{count}</p>
        </div>
    );
}

export default DashboardCard;
