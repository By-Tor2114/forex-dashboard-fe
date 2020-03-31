import React, { useState } from 'react';

import './Auth.css';
import FormInput from '../components/FormInput/FormInput';
import Button from '../components/Button/Button';

const Auth = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [path, setPath] = useState('login');

  const onChangeHandler = () => {};

  const onSubmitHandler = () => {};

  return (
    <div className="Auth">
      <form onSubmit={onSubmitHandler}>
        <FormInput
          type={'email'}
          name={'Email'}
          placeholder={'your@email.com'}
          changeHandler={onChangeHandler}
          required={true}
        />
        <FormInput
          type={'password'}
          name={'Password'}
          placeholder={'Password'}
          changeHandler={onChangeHandler}
          required={true}
        />
        <Button style={'button-success'}>Log In</Button>
      </form>
    </div>
  );
};

export default Auth;
