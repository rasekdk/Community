import SettingsSection from '../Settings/SettingsSection';
import SettingsItem from '../Settings/SettingsItem';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useRemoteData from '../../hooks/useRemoteData';
import { decodeToken } from 'react-jwt';
import IconLogo from '../icons/IconLogo';
import SignButton from '../visualComponents/SignButton';
import { useRouteMatch } from 'react-router-dom';
import IconNext from '../icons/IconNext';
import { useForm } from 'react-hook-form';

const SettingsCommunityEditPage = () => {
  const [auth] = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const { REACT_APP_URL, REACT_APP_URL_IMG } = process.env;

  const location = useRouteMatch();

  const [editBio, setEditBio] = useState(false);

  const communityUrl = `${REACT_APP_URL}/c/${location.params.id}`;

  const [community, setCommunity] = useRemoteData(communityUrl, auth);

  const openEditBio = () => {
    setEditBio(!editBio);
  };

  const onBioSubmit = async (data) => {
    const formData = new FormData();
    formData.append('comBio', data.bio);

    const res = await fetch(`${REACT_APP_URL}/c/bio/${community.comName}`, {
      method: 'PUT',
      headers: {
        auth: auth,
      },
      body: formData,
    });
    const json = await res.json();
    console.log(json);
    if (json.status !== false) {
      setCommunity(json);
      setEditBio(!editBio);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('comAvatar', data.picture[0]);

    const res = await fetch(`${REACT_APP_URL}/c/avatar/${community.comName}`, {
      method: 'PUT',
      headers: {
        auth: auth,
      },
      body: formData,
    });
    const json = await res.json();
    console.log(json);
    if (json.status !== false) {
      setCommunity(json);
    }
  };

  return (
    <section className="main-section have-sub-header settings-section no-padding">
      <SettingsSection sectionTitle={'Información de usuario'} className="padding-bottom">
        <div className="settings-link unfocus-text">
          <div style={{ flexGrow: '1' }}>
            {community ? (
              community.comAvatar === 'avatar-img' || !community.comAvatar ? (
                <IconLogo className="logo ico medium" />
              ) : (
                <img
                  src={`${REACT_APP_URL_IMG}/${community.comAvatar}`}
                  alt="community avatar"
                  className=" medium ico"
                />
              )
            ) : (
              <IconLogo className="logo ico medium" />
            )}
            <form style={{ flexGrow: '1' }}>
              <label htmlFor="picture" style={{ justifyContent: 'space-between', display: 'flex' }}>
                Avatar de la comunidad
                <IconNext className="ico small next" />
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
        </div>
        <div className="settings-link unfocus-text" onClick={openEditBio}>
          <div style={{ flexGrow: '1' }}>Biografia</div>
          <IconNext className="ico small next" />
        </div>

        <div className="padding-small settings-main" style={{ backgroundColor: 'var(--dark-background)' }}>
          {editBio ? (
            <form style={{ position: 'relative', paddingBottom: '1.5rem', marginTop: '0' }}>
              <textarea ref={register} name="bio" placeholder={community.comBio} />
              <button
                className="back-button"
                style={{
                  backgroundColor: 'transparent',
                  border: '0',
                  color: 'var(--main-color)',
                  paddingRight: '.5rem',
                  position: 'absolute',
                  right: '0',
                  bottom: '0',
                  fontSize: '1rem',
                }}
                onClick={handleSubmit(onBioSubmit)}
              >
                Enviar{' '}
              </button>
            </form>
          ) : (
            <div style={{ padding: '.5rem 0' }} onClick={openEditBio}>
              {community.comBio}
            </div>
          )}
        </div>
      </SettingsSection>
    </section>
  );
};

export default SettingsCommunityEditPage;
