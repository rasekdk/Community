import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { AuthContext } from '../providers/AuthProvider';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    formState: { isSubmitting },
  } = useForm();

  const [auth] = useContext(AuthContext);
  const history = useHistory();

  const { REACT_APP_URL } = process.env;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await fetch(`${REACT_APP_URL}/post`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          auth: auth,
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <fieldset>
        <label>
          username
          <ErrorMessage className="error-message" error={errors.name} />
        </label>
        <input
          name="name"
          type="text"
          onChange={() => clearErrors('name')}
          ref={register({
            required: true,
          })}
        />
      </fieldset>

      <fieldset>
        <label>
          password
          <ErrorMessage className="error-message" error={errors.password} />
        </label>
        <input
          name="password"
          type="password"
          onChange={() => clearErrors('password')}
          ref={register({ required: true, minLength: 4 })}
        />
      </fieldset>

      <ErrorMessage className="error-message" error={errors.custom} />
      <input disabled={isSubmitting} type="submit" value="Enviar" />
    </form>
  );
};

export default LoginForm;
