import React from 'react'

import { useAuth } from "../context/auth";

const Home = () => {

  const { setAuthTokens } = useAuth();
  const logOut = () => {
    setAuthTokens();
  };
  return (
    <div>
      <h1>Home Page</h1>
    <button onClick={logOut}>LogOut</button>
    </div>
  );
};

export default Home;
