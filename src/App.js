import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import Auth from './containers/Auth';

const App = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const initialiseAccount = token => {
    localStorage.setItem('token', JSON.stringify(token));
    setIsLoggedIn(true);
    setToken(token);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Auth accountInit={initialiseAccount} />}
          />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
