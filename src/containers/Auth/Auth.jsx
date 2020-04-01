import React, { useState, Fragment } from 'react';

import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';

import { authHandler } from '../../utils/signup.-login';
import './Auth.css';

const Auth = ({ accountInit }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [path, setPath] = useState('login');
  const [auth, setAuth] = useState({});
  const [authError, setAuthError] = useState(null);

  const onChangeHandler = event => {
    setAuth({ ...auth, [event.target.id]: event.target.value });
  };

  const loginToggler = () => {
    setIsLoggingIn(!isLoggingIn);
    setPath(!isLoggingIn ? 'login' : 'signup');
    setAuthError(null);
    setAuth(null);
  };

  const onSubmitHandler = async event => {
    event.preventDefault();

    const response = await authHandler(auth, path);

    if (response.token) {
      accountInit(response);
    } else {
      setAuthError(<p className="warning">{response}</p>);
    }
  };

  const authMessage = isLoggingIn ? (
    <Fragment>
      <p>Don't have an account? </p>
      <p>
        <span onClick={loginToggler} className="span-highlight">
          Switch to sign-up
        </span>
      </p>
    </Fragment>
  ) : (
    <Fragment>
      <p>Already have an account? </p>
      <p>
        <span onClick={loginToggler} className="span-highlight">
          Switch to login
        </span>
      </p>
    </Fragment>
  );

  let inputLayout;

  if (isLoggingIn) {
    inputLayout = (
      <Fragment>
        <FormInput
          id="email"
          type="email"
          name="Email"
          changeHandler={onChangeHandler}
          required={true}
        />
        <FormInput
          id="password"
          type="password"
          name="Password"
          changeHandler={onChangeHandler}
          required={true}
        />
        <Button styling="button-success">
          {isLoggingIn ? 'Log In' : 'Sign Up'}
        </Button>
        {authMessage}
        {authError && authError}
      </Fragment>
    );
  } else {
    inputLayout = (
      <Fragment>
        <FormInput
          id="firstName"
          type="text"
          name="First Name"
          changeHandler={onChangeHandler}
          required={true}
        />
        <FormInput
          id="lastName"
          type="text"
          name="Last Name"
          changeHandler={onChangeHandler}
          required={true}
        />
        <FormInput
          id="email"
          type="email"
          name="Email"
          changeHandler={onChangeHandler}
          required={true}
        />
        <FormInput
          id="password"
          type="password"
          name="Password"
          changeHandler={onChangeHandler}
          required={true}
        />
        <Button styling={'button-success'}>
          {isLoggingIn ? 'Log In' : 'Sign Up'}
        </Button>
        {authMessage}
        {authError && authError}
      </Fragment>
    );
  }

  return (
    <div className="Auth-Overlay">
      <div className="Auth">
        <h3>Welcome to</h3>
        <h1>
          <span className="span-green">FX</span> Da
          <span className="span-green">$</span>hboard
        </h1>
        <form onSubmit={onSubmitHandler}>{inputLayout}</form>
      </div>
    </div>
  );
};

export default Auth;