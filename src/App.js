import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cookies from 'universal-cookie';

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
    const cookie = new Cookies();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="dashboard"
                    element={
                        cookie.get('token') ? (
                            <DashboardPage />
                        ) : (
                            <Navigate
                                to={{
                                    pathname: '/login',
                                }}
                            />
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
