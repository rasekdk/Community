import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { AuthContext } from '../providers/AuthProvider';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    formState: { isSubmitting },
  } = useForm();

  const [, setAuth] = useContext(AuthContext);

  const { REACT_APP_URL } = process.env;

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${REACT_APP_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      const jsonError = json.error;
      if (jsonError) {
        console.log('errors', errors);
        console.log('esta escribiendo esto', jsonError);
        setAuth('');
        switch (jsonError) {
          case 'El usuario no es correcto':
            return setError('name', {
              type: 'custom',
              message: 'No existe ningún usuario cobn estos datos',
            });
          case 'La contraseña no es correcta':
            return setError('password', {
              type: 'custom',
              message: 'La contraseña no es correcta',
            });
          default:
            return setError('custom', {
              type: 'custom',
              message: 'Ha habido un error, intentalo mas tarde',
            });
        }
      } else {
        setAuth(json.auth);
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
