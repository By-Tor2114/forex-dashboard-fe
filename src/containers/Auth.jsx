import React, { useState, Fragment } from 'react';

import FormInput from '../components/FormInput/FormInput';
import Button from '../components/Button/Button';

import { authHandler } from '../utils/signup.-login';
import './Auth.css';

const Auth = ({ accountInit }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [path, setPath] = useState('login');
  const [auth, setAuth] = useState({});
  const [authError, setAuthError] = useState(null);

  const onChangeHandler = event => {
    setAuth({ ...auth, [event.target.type]: event.target.value });
  };

  const loginToggler = () => {
    setIsLoggingIn(!isLoggingIn);
    setPath(!isLoggingIn ? 'login' : 'signup');
    setAuthError(null);
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

  return (
    <div className="Auth-Overlay">
      <div className="Auth">
        <form onSubmit={onSubmitHandler}>
          <FormInput
            type={'email'}
            name={'Email'}
            changeHandler={onChangeHandler}
            required={true}
          />
          <FormInput
            type={'password'}
            name={'Password'}
            changeHandler={onChangeHandler}
            required={true}
          />
          <Button styling={'button-success'}>
            {isLoggingIn ? 'Log In' : 'Sign Up'}
          </Button>
          {authMessage}
          {authError && authError}
        </form>
      </div>
    </div>
  );
};

export default Auth;
