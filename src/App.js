import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { BACK_END_URL } from './env';
import { loginUser, logoutUser } from './redux/actions/userAuth';
import { useDispatch, useSelector } from 'react-redux';
import { PatientProfile } from './Components/PatientProfile/PatientProfile';
import Nav from './Components/Nav/Nav';
import NotFound from './pages/NotFound';
import { cookie } from './utils';
import DoctorDash from './Components/DoctorPage/DoctorDash';
import Patient from './Components/Dashboard/UI/Patient/Patient';
import Doctor from './Components/Dashboard/UI/Doctors/Doctor';
import Prescription from './Components/Prescription/Prescription';
import { Report } from './Components/Report/Report';
import { Service } from './Components/Services/Service';
import { OPDReg } from './pages/OPDReg';
import { AboutUser } from './Components/AboutUser/AboutUser';

function App() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);

    const validate_user = async () => {
        try {
            const { data: response } = await axios.get(`${BACK_END_URL}/user/check`, {
                headers: {
                    authorization: cookie.get('session', { path: '/' }),
                },
            });
            // console.log('Validate user', response);
            dispatch(
                loginUser({
                    id: response.id,
                    email: response.email,
                    name: response.name,
                    token: response.token,
                    logo: response.logo,
                })
            );
        } catch (err) {
            console.log(err);
            dispatch(logoutUser());
            window.location.href = '/login';
        }
    };

    if (!user && cookie.get('session')) {
        validate_user();
    }
    return (
        <>
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/reg/:userId" element={<OPDReg />} />
                    <Route
                        path="/login"
                        element={
                            user ? (
                                <>
                                    <Navigate replace to="/" />
                                </>
                            ) : (
                                <>
                                    <Login />
                                </>
                            )
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="dashboard/*"
                        element={
                            user ? (
                                <>
                                    <DashboardPage />
                                </>
                            ) : (
                                <Login />
                            )
                        }>
                        <Route path="patient" element={<Patient />} />
                        <Route path="patient/:id" element={<PatientProfile />} />
                        <Route path="doctor" element={<Doctor />} />
                        <Route path="doctor/:id" element={<DoctorDash />} />
                        <Route path="prescription/:id" element={<Prescription />} />
                        <Route path="report" element={<Report />} />
                        <Route path="services" element={<Service />} />
                        <Route path="about" element={<AboutUser />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
