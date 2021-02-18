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

const SettingsCommunityBioPage = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const { REACT_APP_URL, REACT_APP_URL_IMG } = process.env;
  const history = useHistory();

  const decodedToken = decodeToken(auth);
  const userUrl = `${REACT_APP_URL}/u/${decodedToken.name}`;

  const [user, setUser] = useRemoteData(userUrl, auth);

  const [openDefaultImages, setOpenDefaultImages] = useState();

  const handleBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('picture', data.picture[0]);

    console.log(formData);

    const res = await fetch(`${REACT_APP_URL}/c/avatar`, {
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
            <button onClick={handleBack} className="back-button">
              Cancelar{' '}
            </button>
          </form>
        </div>
      </SettingsSection>
    </section>
  );
};

export default SettingsCommunityBioPage;
