import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { BACK_END_URL } from "./env";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  console.log(BACK_END_URL);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACK_END_URL}/user/create`, {
        name: "Hrithik Prasad",
      });
      console.log(response);
      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button onClick={handleClick}> Get Data From Backend </button>
          <p> {user} </p>
        </a>
      </header>
    </div>
  );
}

export default App;
