import React from 'react';
import {
    Outlet,
    //  Route,
    //  Routes
} from 'react-router';
import Dashboard from '../Components/Dashboard/Dashboard';
// import Doctor from '../Components/Dashboard/UI/Doctors/Doctor';
// import Patient from '../Components/Dashboard/UI/Patient/Patient';

const DashboardPage = () => {
    // const [update, setUpdate] = useState(false);
    // const [newPtOpenModal, setPtOpenModal] = useState(false);
    // console.log('haello', newPtOpenModal);
    return (
        <>
            <Dashboard
            // setUpdate={setUpdate}
            // setOpenModal={setPtOpenModal}
            // openModal={newPtOpenModal}
            >
                <Outlet />

                {/* <Routes>
                    <Route
                        path="patient"
                        element={
                            <Patient
                                update={update}
                                setUpdate={setUpdate}
                                setOpenModal={setPtOpenModal}
                            />
                        }
                    />
                    <Route path="doctor" element={<Doctor />} />

                    <Route path="prescription" element={<Doctor />} />
                    <Route path="report" element={<Doctor />} />
                    <Route path="settings" element={<Doctor />} />
                </Routes> */}
            </Dashboard>
        </>
    );
};

export default DashboardPage;
