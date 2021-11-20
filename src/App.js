import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { BACK_END_URL } from './env';
import { loginUser } from './redux/actions/userAuth';
import { useDispatch, useSelector } from 'react-redux';

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
                    withCredentials: true,
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
        }
    };
    const cookie = new Cookies();
    if (!user && cookie.get('session')) {
        validate_user();
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="dashboard"
                    element={
                        user ? (
                            <>
                                <DashboardPage />
                            </>
                        ) : (
                            <Login />
                        )
                    }
                >
                    <Route path="patient" />
                    <Route path="log" />
                    <Route path="prescption" />
                    <Route path="report" />
                    <Route path="analysis" />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
