import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import { AppProvider } from './context/context';
import './App.css';
import TradeHistory from './containers/TradeHistory/TradeHistory';
import Charts from './containers/Charts/Charts';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const initialiseAccount = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    setToken(token);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken(null);
  };

  useEffect(() => {
    if (localStorage.token) {
      setToken(JSON.parse(localStorage.token));
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  let routes;

  if (isLoggedIn) {
    routes = (
      <BrowserRouter>
        <Navbar logout={logoutHandler} />
        <TradeHistory token={token.user.token} user={token.user} />
        <Charts token={token.user.token} user={token.user} />
        <Switch></Switch>
      </BrowserRouter>
    );
  } else {
    routes = (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Auth accountInit={initialiseAccount} />}
          />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <div className="App">
      <AppProvider value={{ token, initialiseAccount }}>{routes}</AppProvider>
    </div>
  );
};

export default App;
