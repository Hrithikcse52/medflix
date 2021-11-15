import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Root() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/dashboard",
      element: <DashboardPage />,
      children: [
        { path: "patient", element: <Register /> },
        { path: "logs", element: <Login /> },
      ],
    },
  ]);

  return routes;
}

function App() {
  // return (
  //   <Router>
  //     <Root />
  //   </Router>
  // );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="dashboard" element={<DashboardPage />}>
          <Route path="patient" />
          <Route path="logs" />
          <Route path="prescption" />
          <Route path="report" />
          <Route path="analysis" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
