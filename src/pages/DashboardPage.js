import React from 'react';
import { Route, Routes } from 'react-router';
import RegisterCard from '../Components/Card/RegisterCard/RegisterCard';
import Dashboard from '../Components/Dashboard/Dashboard';
import Patient from '../Components/Dashboard/UI/Patient/Patient';

const DashboardPage = () => {
    return (
        <>
            <Dashboard>
                <Routes>
                    <Route path="patient" element={<Patient />} />
                    <Route path="log" element={<RegisterCard />} />
                </Routes>
            </Dashboard>
        </>
    );
};

export default DashboardPage;
