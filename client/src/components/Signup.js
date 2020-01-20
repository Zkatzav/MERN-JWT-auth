import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from "../context/auth";

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const userInfo = { name, email, password }
    axios.post("/api/user/signup", userInfo)
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
        <h3>Signup</h3>
        <input
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder="Full Name"
        /><br />
        <input
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        /><br />
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        /><br />
        <button type="submit">Submit</button>
      </form>
      <Link to="/">Already have an account?</Link>
      {
        errorMessage &&
        <p style={{ color: "red" }}>{errorMessage}</p>
      }
    </div>
  );
};

export default Signup;