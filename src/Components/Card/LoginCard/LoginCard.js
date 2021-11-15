import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { BACK_END_URL } from "../../../env";

import "./logincard.css";
const LoginCard = () => {
  const cookie = new Cookies();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test@test");
  const [data, setData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await axios.post(`${BACK_END_URL}/user/login`, {
        email,
        password,
      });
      setData(response.data);
      cookie.set("token", response.data.token, { path: "/" });
      console.log(response.data);
    } catch (err) {}
  };
  return (
    <>
      <div className="container">
        <div className="box">
          {/* <Box bg="tomato" maxW="xl" p={4} color="white"> */}
          This is the Box
          <p> axios : {data && data.full_name} </p>
          <form onSubmit={handleSubmit} className="fields">
            <div className="input_field">
              <label>Email:</label>
              <Input
                placeholder="Basic usage"
                value={email}
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {/* <input
                value={email}
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              /> */}
            </div>
            <div className="input_field">
              <label>Password:</label>
              <Input
                placeholder="Basic usage"
                value={password}
                type="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {/* <input
                value={password}
                type="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              /> */}
            </div>
            <div className="input_field">
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
              {/* <button type="submit">Submit</button> */}
            </div>
          </form>
          {/* </Box> */}
        </div>
      </div>
    </>
  );
};

export default LoginCard;
