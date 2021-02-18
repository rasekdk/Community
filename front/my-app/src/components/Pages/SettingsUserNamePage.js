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
    if (e.target.value.length > 3) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
    clearErrors('name');
  };

  const handleClick = () => {
    if (!window.confirm('Estas seguro de que quieres cambiar el nombre de usuario?')) {
      history.goBack();
    }
  };

  const onSubmit = async (data) => {
    const body = new FormData();
    body.append('userName', data.name);

    console.log(`${REACT_APP_URL}/u/name/${decodedToken.name}`);
    try {
      const res = await fetch(`${REACT_APP_URL}/u/name`, {
        method: 'PUT',
        headers: {
          auth: auth,
        },
        body: body,
      });
      const json = await res.json();

      console.log(json);
      setUser(json.user);
      setAuth(json.auth);
      history.goBack();
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
        <h1>Nombre de usuario</h1>
        {canSend ? (
          <button onClick={handleSubmit(onSubmit)}>Listo</button>
        ) : (
          <button disabled className="disabled">
            Listo
          </button>
        )}
      </header>
      <main className="padding-small settings-main">
        <h2>Actual</h2>
        <p>u/{user.userName}</p>

        <form>
          <label htmlFor="name">Nuevo</label>
          <input
            name="name"
            type="text"
            placeholder="Nombre de usuario"
            onChange={handleChange}
            onClick={handleClick}
            ref={register({
              required: true,
            })}
          />
          <ErrorMessage className="error-message" error={errors.password} />
        </form>
      </main>
    </section>
  );
};

export default SettingsUserNamePage;
