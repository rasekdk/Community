import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useRemoteData from '../../hooks/useRemoteData';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';

import { decodeToken } from 'react-jwt';
import IconLogo from '../icons/IconLogo';
import SettingsSection from '../Settings/SettingsSection';
import IconNext from '../icons/IconNext';
import SettingsItem from '../Settings/SettingsItem';

const SettingsAvatarPage = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const { REACT_APP_URL, REACT_APP_URL_IMG } = process.env;
  const history = useHistory();

  const decodedToken = decodeToken(auth);
  const userUrl = `${REACT_APP_URL}/u/${decodedToken.name}`;

  const [user, setUser] = useRemoteData(userUrl, auth);
  const [avatars] = useRemoteData(`${REACT_APP_URL}/t/img`, auth);

  const [openDefaultImages, setOpenDefaultImages] = useState();

  const handleBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const selectDefaultAvatar = (e) => {
    const src = e.target.src;

    const diff = (diffMe, diffBy) => diffMe.split(diffBy).join('');

    const url = diff(src, REACT_APP_URL_IMG);

    const newAvatar = {
      userAvatar: `${url}`,
    };

    const updateData = async () => {
      const res = await fetch(`${REACT_APP_URL}/u/default`, {
        method: 'PUT',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newAvatar),
      });
      const json = await res.json();

      if (json.status !== false) {
        setAuth(json.auth);
        setUser(json.user);
      }
    };
    updateData();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('picture', data.picture[0]);

    console.log(formData);

    const res = await fetch(`${REACT_APP_URL}/u/avatar`, {
      method: 'PUT',
      headers: {
        auth: auth,
      },
      body: formData,
    });
    const json = await res.json();
    if (json.status !== false) {
      setAuth(json.auth);
      setUser(json.user);
    }
  };

  const useOpenDefaultImages = () => {
    setOpenDefaultImages(!openDefaultImages);
  };

  return (
    <section className="main-section  no-sub-header settings-section no-padding">
      <header className="settings-header">
        <button onClick={handleBack} className="back-button">
          Volver
        </button>
        <h1>Avatar</h1>
      </header>
      <SettingsSection sectionTitle={'Avatar'} className="padding-bottom">
        <div className="user-header">
          {user ? (
            user.userAvatar === 'avatar-img' || !user.userAvatar ? (
              <IconLogo className="logo ico x-large" />
            ) : (
              <img
                src={`${REACT_APP_URL_IMG}/${user.userAvatar}`}
                alt="user avatar"
                className=" ico"
                style={{ width: '8rem', height: '8rem' }}
              />
            )
          ) : (
            <IconLogo className="logo ico x-large" />
          )}
          <form style={{ width: '100%' }}>
            <label htmlFor="picture" className="btn full">
              Sube una imagen
            </label>
            <input
              ref={register}
              type="file"
              name="picture"
              id="picture"
              className="fileInput"
              onChange={handleSubmit(onSubmit)}
            />
          </form>
        </div>
        <div
          className="settings-link"
          onClick={useOpenDefaultImages}
          style={openDefaultImages ? { marginBottom: '0' } : { marginBottom: '0.25rem' }}
        >
          <div>Selecciona una imagen por defecto</div>
          <IconNext className="ico small next" />
        </div>
        {openDefaultImages ? (
          <div className="avatar-grid" style={{ backgroundColor: 'var(--dark-background)' }}>
            {avatars.map((avatar) => (
              <div className="avatar-selector" key={avatar.url}>
                <img
                  src={`${REACT_APP_URL_IMG}${avatar.url}`}
                  alt={`avatar ${avatar.topicName}`}
                  onClick={selectDefaultAvatar}
                  name={avatar.url}
                />
                <input></input>
              </div>
            ))}
          </div>
        ) : null}
      </SettingsSection>
    </section>
  );
};

export default SettingsAvatarPage;
