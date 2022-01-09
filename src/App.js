import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { BACK_END_URL } from './env';
import { loginUser, logoutUser } from './redux/actions/userAuth';
import { useDispatch, useSelector } from 'react-redux';
import PatientProfile from './Components/PatientProfile/PatientProfile';
import Nav from './Components/Nav/Nav';
import NotFound from './pages/NotFound';
import { cookie } from './utils';
import DoctorDash from './Components/DoctorPage/DoctorDash';
import Patient from './Components/Dashboard/UI/Patient/Patient';
import Doctor from './Components/Dashboard/UI/Doctors/Doctor';
import Prescription from './Components/Prescription/Prescription';
import { Report } from './Components/Report/Report';
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
                    email: response.email,
                    name: response.name,
                    token: response.token,
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
    //TODO: check if login is done redirec to home. user cant assess login if session is present
    return (
        <>
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/patient/:id" element={<PatientProfile />} />
                    {/* <Route path="/doctorPanel/:id" element={<DoctorDash />} /> */}
                    <Route path="/prescription/:id" element={<Prescription />} />

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
                        <Route path="doctor" element={<Doctor />} />
                        <Route path="doctor/:id" element={<DoctorDash />} />
                        <Route path="prescription/:id" element={<Prescription />} />
                        <Route path="report" element={<Report />} />
                        <Route path="settings" element={<Doctor />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
