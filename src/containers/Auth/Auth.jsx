import React, { useState, Fragment } from 'react';

import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';

import { authHandler } from '../../utils/signup.-login';
import './Auth.css';
import Spinner from '../../components/Spinner/Spinner';

const Auth = ({ accountInit }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [path, setPath] = useState('login');
  const [auth, setAuth] = useState({});
  const [authError, setAuthError] = useState(null);
  const [passMessage, setPassMessage] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  const onChangeHandler = (event) => {
    setAuth({ ...auth, [event.target.id]: event.target.value });
  };

  const loginToggler = () => {
    setAuth({});
    setIsLoggingIn(!isLoggingIn);
    setPath(!isLoggingIn ? 'login' : 'signup');
    setAuthError(null);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(path);
    setShowSpinner(true);

    if (path === 'signup' && auth.confirmPassword) {
      if (auth.password !== auth.confirmPassword) {
        setPassMessage(<p className="warning">Passwords do not match. </p>);
      } else {
        setPassMessage(null);

        const response = await authHandler(auth, path);

        if (response.user) {
          accountInit(response);
        } else {
          setAuthError(<p className="warning">{response}</p>);
        }
      }
    } else {
      setPassMessage(null);

      const response = await authHandler(auth, path);

      if (response.user) {
        accountInit(response);
      } else {
        setAuthError(<p className="warning">{response}</p>);
      }
    }
  };

  const authMessage = isLoggingIn ? (
    <Fragment>
      {showSpinner && !authError && <Spinner />}
      <p>Don't have an account? </p>
      <p>
        <span onClick={loginToggler} className="span-highlight">
          Switch to sign-up
        </span>
      </p>
    </Fragment>
  ) : (
    <Fragment>
      {showSpinner && !authError && <Spinner />}
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
          minPass={6}
        />
        <FormInput
          id="confirmPassword"
          type="password"
          name="Confirm Password"
          changeHandler={onChangeHandler}
          required={true}
          minPass={6}
        />
        {passMessage && passMessage}
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
