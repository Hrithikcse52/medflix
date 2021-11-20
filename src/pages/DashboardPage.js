import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import RegisterCard from '../Components/Card/RegisterCard/RegisterCard';
import Dashboard from '../Components/Dashboard/Dashboard';
import Patient from '../Components/Dashboard/UI/Patient/Patient';

const DashboardPage = () => {
    const [update, setUpdate] = useState(false);
    return (
        <>
            <Dashboard setUpdate={setUpdate}>
                <Routes>
                    <Route
                        path="patient"
                        element={
                            <Patient update={update} setUpdate={setUpdate} />
                        }
                    />
                    <Route path="log" element={<RegisterCard />} />
                </Routes>
            </Dashboard>
        </>
    );
};

export default DashboardPage;
