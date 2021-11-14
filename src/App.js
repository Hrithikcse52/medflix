import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  // const [user, setUser] = useState("");

  // console.log(BACK_END_URL);
  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(`${BACK_END_URL}/user/create`, {
  //       name: "Hrithik Prasad",
  //     });
  //     console.log(response);
  //     setUser(response.data.user);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
