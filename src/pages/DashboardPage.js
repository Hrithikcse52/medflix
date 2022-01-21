import React from 'react';
import { Outlet } from 'react-router';
import Dashboard from '../Components/Dashboard/Dashboard';
const DashboardPage = () => {
    document.title = 'Dashboard-Medflix';
    return (
        <>
            <Dashboard>
                <Outlet />
            </Dashboard>
        </>
    );
};

export default DashboardPage;
