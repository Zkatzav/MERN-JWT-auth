import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

import { useAuth } from "../context/auth";


const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const userInfo = { email, password }
    axios.post("/api/user/login", userInfo)
      .then(response => {
        setAuthTokens(response.data)
        setLoggedIn(true);
      })
      .catch(err => setErrorMessage(err.response.data))
  };
  if (isLoggedIn) {
    return <Redirect to="/home" />;
  };
  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h3>Log In</h3>
        <input
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Email" />
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
      <Link to="/signup">Don't have an account?</Link>
      {
        errorMessage &&
        <p style={{ color: "red" }}>{errorMessage}</p>
      }
    </div>
  );
};

export default Login;