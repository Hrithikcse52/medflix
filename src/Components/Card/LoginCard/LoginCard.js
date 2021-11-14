import axios from "axios";
import React, { useState } from "react";
import { BACK_END_URL } from "../../../env";
import "./logincard.css";
const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await axios.post(`${BACK_END_URL}/user/create`, {
        name: email,
      });
      setData(response.data.user);
      console.log(response.data);
    } catch (err) {}
  };
  return (
    <>
      <div className="container">
        <div className="box">
          <p>{data}</p>
          <form onSubmit={handleSubmit}>
            {/* <div className="input_field">
              <label>Name:</label>
              <input type="text" name="name" />
            </div> */}
            <div className="input_field">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input_field">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="input_field">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
