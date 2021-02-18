import userEvent from '@testing-library/user-event';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { decodeToken } from 'react-jwt';
import { useHistory, Link } from 'react-router-dom';
import useRemoteData from '../../hooks/useRemoteData';
import ErrorMessage from '../forms/ErrorMessage';
import { AuthContext } from '../providers/AuthProvider';

const SettingsUserNamePage = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);
  const { REACT_APP_URL } = process.env;
  const url = `${REACT_APP_URL}/u/${decodedToken.name}`;

  const [user, setUser] = useRemoteData(url, auth);

  const [canSend, setCanSend] = useState(false);

  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    formState: { isSubmitting },
  } = useForm();
  const history = useHistory();

  const handleBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleChange = (e) => {
    if (
      e.target.form[0].value.length >= 4 &&
      e.target.form[1].value.length >= 4 &&
      e.target.form[2].value.length >= 4 &&
      e.target.form[1].value === e.target.form[2].value
    ) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
    clearErrors();
  };

  const handleClick = () => {
    if (!window.confirm('Estas seguro de que quieres cambiar el email?')) {
      history.goBack();
    }
  };

  const onSubmit = async (data) => {
    const body = new FormData();
    body.append('currentPassword', `${data.password}`);
    body.append('userPassword', `${data.newPassword}`);
    body.append('userRepeatPassword', `${data.repeatPassword}`);
    try {
      const res = await fetch(`${REACT_APP_URL}/u/password`, {
        method: 'PUT',
        headers: {
          auth: auth,
        },
        body: body,
      });
      const json = await res.json();

      const jsonError = json.error;

      console.log(json);

      if (jsonError) {
        switch (jsonError) {
          case 'La contraseña no es correcta':
            return setError('password', {
              type: 'custom',
              message: 'La contraseña no es correcta',
            });
          case '"repeatPassword" must be [ref:password]':
            return setError('repeatPassword', {
              type: 'custom',
              message: 'Las contraseñas no coinciden',
            });
          case '"password" length must be at least 4 characters long':
            return setError('password repeatPassword newPassword', {
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
        setUser(json.user);
        setAuth(json.auth);
        history.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="main-section  no-sub-header settings-section no-padding">
      <header className="settings-header">
        <button onClick={handleBack} className="back-button">
          Cancelar{' '}
        </button>
        <h1>Contraseña</h1>
        {canSend ? (
          <button onClick={handleSubmit(onSubmit)}>Listo</button>
        ) : (
          <button disabled className="disabled">
            Listo
          </button>
        )}
      </header>
      <main className="padding-small settings-main">
        <form onChange={handleChange}>
          <label htmlFor="name">
            Actual
            <ErrorMessage className="error-message" error={errors.password} />
          </label>
          <input
            name="password"
            type="password"
            placeholder="Contraseña actual"
            onChange={handleChange}
            onClick={handleClick}
            ref={register({
              required: true,
            })}
          />
          <label htmlFor="name">
            Nueva
            <ErrorMessage className="error-message" error={errors.newPassword} />
          </label>
          <input
            name="newPassword"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            ref={register({
              required: true,
            })}
          />

          <input
            name="repeatPassword"
            type="password"
            placeholder="Confirma contraseña"
            onChange={handleChange}
            ref={register({
              required: true,
            })}
          />
          <ErrorMessage className="error-message" error={errors.repeatPassword} />
        </form>
      </main>
    </section>
  );
};

export default SettingsUserNamePage;
