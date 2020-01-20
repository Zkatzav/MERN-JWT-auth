import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AuthContext } from "./context/auth";
import PrivateRoute from './PrivateRoute';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';


import './App.css';

const App = () => {

  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <div className="App">
        <Router>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoute path="/home" exact component={Home} />
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;