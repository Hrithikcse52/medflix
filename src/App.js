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

// function Root() {
//   const routes = useRoutes([
//     { path: "/", element: <Home /> },
//     { path: "/login", element: <Login /> },
//     { path: "/register", element: <Register /> },
//     {
//       path: "/dashboard",
//       element: <DashboardPage />,
//       children: [
//         { path: "patient", element: <Register /> },
//         { path: "logs", element: <Login /> },
//       ],
//     },
//   ]);

//   return routes;
// }

function App() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);

    const validate_user = async () => {
        try {
            const { data: response } = await axios.get(
                `${BACK_END_URL}/user/check`,
                {
                    headers: {
                        authorization: cookie.get('session', { path: '/' }),
                    },
                }
            );
            // console.log('Validate user', response);
            dispatch(
                loginUser({
                    email: response.email,
                    fullName: response.full_name,
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
    return (
        <>
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/patient/:id" element={<PatientProfile />} />
                    <Route path="/doctorPanel/:id" element={<DoctorDash />} />
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
                        <Route path="patient" />
                        <Route path="log" />
                        <Route path="prescription" />
                        <Route path="report" />
                        <Route path="settings" />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
