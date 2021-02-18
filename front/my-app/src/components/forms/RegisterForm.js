import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { AuthContext } from '../providers/AuthProvider';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    formState: { isSubmitting },
  } = useForm();
  const [, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const { REACT_APP_URL } = process.env;

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${REACT_APP_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      const jsonError = json.error;
      if (jsonError) {
        setAuth('');
        switch (jsonError) {
          case 'used name':
            return setError('name', {
              type: 'custom',
              message: 'Ya hay un usuario con este nombre',
            });
          case 'used email':
            return setError('email', {
              type: 'custom',
              message: 'Ya hay un usuario con este email',
            });
          case '"repeatPassword" must be [ref:password]':
            return setError('repeatPassword', {
              type: 'custom',
              message: 'Las contraseñas no coinciden',
            });
          case '"password" length must be at least 4 characters long':
            return setError('password', {
              type: 'custom',
              message: 'La contraseña debe de tener al menos 4 caracteres',
            });
          default:
            return setError('custom', {
              type: 'custom',
              message: 'Ha habido un error, intentalo mas tarde',
            });
        }
      } else {
        setAuth(json.auth);
        history.push('/register/topic');
      }
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
          email
          <ErrorMessage className="error-message" error={errors.email} />
        </label>
        <input
          name="email"
          type="email"
          onChange={() => clearErrors('email')}
          ref={register({ required: true, minLength: 4 })}
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

      <fieldset>
        <label>
          repeat password
          <ErrorMessage className="error-message" error={errors.repeatPassword} />
        </label>
        <input
          name="repeatPassword"
          type="password"
          onChange={() => clearErrors('repeatPassword')}
          ref={register({ required: true, minLength: 4 })}
        />
      </fieldset>

      <input disabled={isSubmitting} type="submit" value="Enviar" />
      <ErrorMessage className="error-message" error={errors.custom} />
    </form>
  );
};

export default RegisterForm;
