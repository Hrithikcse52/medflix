import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BACK_END_URL } from "../../../env";
import "./registercard.css";
const RegisterCard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const resetDefault = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await axios.post(`${BACK_END_URL}/user/register`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      setData(response.data.user);

      console.log(response.data);
      resetDefault();
      navigate("/login");
    } catch (err) {}
  };
  return (
    <>
      <div className="container">
        <div className="box">
          <p>{data}</p>
          <form onSubmit={handleSubmit}>
            <div className="input_field">
              <label>FirstName:</label>
              <input
                value={firstName}
                type="name"
                name="firstname"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="input_field">
              <label>LastName:</label>
              <input
                value={lastName}
                type="name"
                name="lastname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="input_field">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input_field">
              <label>Password:</label>
              <input
                value={password}
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

export default RegisterCard;
